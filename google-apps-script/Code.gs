/**
 * ============================================================================
 * IMAGINE PRINTERS - MULTI-FORM GOOGLE SHEETS AUTOMATION (APPS SCRIPT)
 * WITH AUTOMATIC EMAIL NOTIFICATION TO: imaginestd@gmail.com
 * ============================================================================
 * 
 * Features:
 * 1. Automatic multi-tab creation based on form types:
 *    - "Callback Requests" (from Call Back Modal across all pages)
 *    - "Contact Inquiries" (from Contact RFQ / Inquiry Form)
 *    - Any custom form in the future automatically creates its own tab!
 * 2. Styled dark header rows with bold white text & freeze panes.
 * 3. Formats mobile numbers as text strings (preserves leading zeros & '+' signs).
 * 4. High-performance non-blocking processing with concurrency LockService.
 * 5. Indian Standard Time (IST Asia/Kolkata) automatic timestamping.
 * 6. Automated instant email alerts to imaginestd@gmail.com triggered immediately
 *    AFTER lead data is securely stored and flushed to the Google Sheet.
 * 
 * SETUP INSTRUCTIONS:
 * 1. In your Google Sheet ("imaginprinter"), click: Extensions > Apps Script.
 * 2. Replace all existing code with this file.
 * 3. (Optional) Run "setupSheets" to format sheet tabs if not already done.
 * 4. (Optional) Run "testSendLeadNotification" to test authorization & verify email delivery.
 * 5. Click: Deploy > Manage deployments.
 * 6. Click Edit (pencil icon) on the active Web App deployment.
 * 7. Under Version, select "New version".
 * 8. Click "Deploy".
 * ============================================================================
 */

// Configuration
var TIMEZONE = "Asia/Kolkata";
var DATE_FORMAT = "dd/MM/yyyy, hh:mm:ss a";
// Target lead notification email address
var NOTIFICATION_EMAIL = "imaginestd@gmail.com";
var ENABLE_EMAIL_NOTIFICATIONS = true;

// Form schemas with column headers
var FORM_SCHEMAS = {
  "Callback Requests": [
    "Timestamp",
    "Name / Company",
    "Mobile Number",
    "Requirement",
    "Source Page",
    "Status"
  ],
  "Contact Inquiries": [
    "Timestamp",
    "Full Name",
    "Phone / WhatsApp",
    "Email",
    "Service Required",
    "Quantity / Specs / Notes",
    "Source Page",
    "Status"
  ]
};

/**
 * Run this function once manually from the Apps Script editor
 * to initialize both styled tabs in your blank spreadsheet!
 */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Setup Callback Requests tab
  getOrCreateSheet(ss, "Callback Requests", FORM_SCHEMAS["Callback Requests"]);
  
  // Setup Contact Inquiries tab
  getOrCreateSheet(ss, "Contact Inquiries", FORM_SCHEMAS["Contact Inquiries"]);
  
  // If default blank "Sheet1" exists and is empty, delete it
  var defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && defaultSheet.getLastRow() === 0 && ss.getSheets().length > 1) {
    try {
      ss.deleteSheet(defaultSheet);
    } catch (e) {
      Logger.log("Could not delete Sheet1: " + e);
    }
  }
  
  SpreadsheetApp.flush();
  Logger.log("Sheets successfully configured!");
}

/**
 * Handles POST requests from the website (background non-blocking submission)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other concurrent executions to finish
  try {
    lock.waitLock(10000);
  } catch (err) {
    return createJsonResponse({ status: "error", message: "Server busy, lock timeout" });
  }

  try {
    var data = {};
    
    // Parse JSON or URL-encoded form data
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var formType = data.formType || "Callback Requests";
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestamp = Utilities.formatDate(new Date(), TIMEZONE, DATE_FORMAT);

    var sheet, rowData;

    if (formType === "Callback Requests" || formType.indexOf("Callback") !== -1) {
      sheet = getOrCreateSheet(ss, "Callback Requests", FORM_SCHEMAS["Callback Requests"]);
      rowData = [
        timestamp,
        data.name || data.cbName || "Not provided",
        "'" + (data.phone || data.cbPhone || "Not provided"), // Leading quote ensures text format
        data.service || data.cbService || "General Printing",
        data.sourcePage || data.page || "Website",
        data.status || "New Lead"
      ];
    } else if (formType === "Contact Inquiries" || formType.indexOf("Inquiry") !== -1 || formType.indexOf("Contact") !== -1) {
      sheet = getOrCreateSheet(ss, "Contact Inquiries", FORM_SCHEMAS["Contact Inquiries"]);
      rowData = [
        timestamp,
        data.name || data.formName || "Not provided",
        "'" + (data.phone || data.formPhone || "Not provided"),
        data.email || data.formEmail || "Not provided",
        data.service || data.formService || "General Inquiry",
        data.message || data.formMessage || "No message provided",
        data.sourcePage || data.page || "Contact Page",
        data.status || "New Lead"
      ];
    } else {
      // Dynamic fallback for any future custom form
      var customHeaders = ["Timestamp"];
      var keys = Object.keys(data).filter(function(k) { return k !== "formType"; });
      for (var i = 0; i < keys.length; i++) {
        customHeaders.push(keys[i]);
      }
      sheet = getOrCreateSheet(ss, formType, customHeaders);
      
      rowData = [timestamp];
      for (var j = 0; j < keys.length; j++) {
        var val = data[keys[j]];
        if (typeof val === "string" && /^\+?\d{8,}$/.test(val)) {
          val = "'" + val; // treat as phone/text
        }
        rowData.push(val !== undefined ? val : "");
      }
    }

    // 1. Append lead row to spreadsheet
    sheet.appendRow(rowData);

    // 2. Format new row styling
    var lastRow = sheet.getLastRow();
    var rowRange = sheet.getRange(lastRow, 1, 1, rowData.length);
    rowRange.setVerticalAlignment("middle");
    rowRange.setFontFamily("Plus Jakarta Sans");
    rowRange.setFontSize(10);
    
    // Subtle alternate row shading
    if (lastRow % 2 === 0) {
      rowRange.setBackground("#F8FAFC");
    } else {
      rowRange.setBackground("#FFFFFF");
    }

    // 3. Commit and flush data to Google Sheet immediately (guaranteed data storage)
    SpreadsheetApp.flush();

    // 4. Fire email notification after data is stored in the sheet
    var emailStatus = "disabled";
    var emailError = null;
    if (ENABLE_EMAIL_NOTIFICATIONS) {
      try {
        sendLeadNotificationEmail(formType, data, timestamp);
        emailStatus = "sent";
      } catch (mailErr) {
        emailStatus = "failed";
        emailError = mailErr.toString();
        Logger.log("Warning: Failed to send lead notification email: " + mailErr.toString());
      }
    }

    return createJsonResponse({
      status: "success",
      tab: sheet.getName(),
      row: lastRow,
      emailStatus: emailStatus,
      emailError: emailError
    });

  } catch (error) {
    Logger.log("doPost Error: " + error.toString());
    return createJsonResponse({ status: "error", error: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Sends formatted email alert with lead details to imaginestd@gmail.com
 */
function sendLeadNotificationEmail(formType, data, timestamp) {
  var name = data.name || data.cbName || data.formName || "Customer";
  var phone = data.phone || data.cbPhone || data.formPhone || "Not provided";
  var email = data.email || data.formEmail || "Not provided";
  var service = data.service || data.cbService || data.formService || "General Inquiry";
  var message = data.message || data.formMessage || data.notes || "Not specified";
  var sourcePage = data.sourcePage || data.page || "Website";

  // Clean phone number for quick actions (WhatsApp link and Call link)
  var cleanPhone = String(phone).replace(/[^\d]/g, "");
  if (cleanPhone.length === 10) {
    cleanPhone = "91" + cleanPhone; // Prefix India country code if 10 digits
  }
  var whatsappUrl = cleanPhone ? "https://wa.me/" + cleanPhone : "";
  var phoneCallUrl = cleanPhone ? "tel:+" + cleanPhone : "";

  var subject = "🔔 New Query Received: " + formType + " - " + name + " (" + phone + ")";

  // Plain Text Fallback
  var plainTextBody = 
    "NEW QUERY IS COMING FROM WEBSITE\n" +
    "=========================================\n" +
    "A new query has arrived and has been stored in your Google Sheet.\n\n" +
    "QUERY DETAILS:\n" +
    "-----------------------------------------\n" +
    "• Form Type:        " + formType + "\n" +
    "• Received At:      " + timestamp + "\n" +
    "• Customer Name:    " + name + "\n" +
    "• Mobile / WhatsApp:" + phone + "\n" +
    "• Email Address:    " + email + "\n" +
    "• Service Required: " + service + "\n" +
    "• Message / Specs:  " + message + "\n" +
    "• Source Page:      " + sourcePage + "\n" +
    "-----------------------------------------\n\n" +
    "Respond quickly to convert this lead!\n" +
    "— Imagine Printers Lead Automation System";

  // Modern, high-conversion HTML Email Template
  var htmlBody = 
    '<!DOCTYPE html>' +
    '<html>' +
    '<head><meta charset="utf-8"></head>' +
    '<body style="margin:0; padding:24px 0; background-color:#F1F5F9; font-family:\'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color:#1E293B;">' +
      '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
        '<tr>' +
          '<td align="center">' +
            '<table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#FFFFFF; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.06); border:1px solid #E2E8F0;">' +
              
              '<!-- Header -->' +
              '<tr>' +
                '<td style="background-color:#0E1322; padding:28px 32px; border-bottom:4px solid #10B981;">' +
                  '<div style="font-size:12px; font-weight:700; color:#10B981; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:6px;">🚀 IMAGINE PRINTERS &bull; LEAD ALERT</div>' +
                  '<h1 style="color:#FFFFFF; margin:0; font-size:22px; font-weight:700; line-height:1.3;">New Query is Coming!</h1>' +
                  '<p style="color:#94A3B8; margin:6px 0 0 0; font-size:14px;">A new customer query was submitted on your website and stored in your Google Sheet.</p>' +
                '</td>' +
              '</tr>' +

              '<!-- Query Details Section -->' +
              '<tr>' +
                '<td style="padding:32px;">' +
                  '<div style="font-size:14px; font-weight:700; color:#0F172A; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:14px; border-bottom:2px solid #E2E8F0; padding-bottom:8px;">' +
                    '📋 Query Details' +
                  '</div>' +

                  '<table width="100%" border="0" cellspacing="0" cellpadding="10" style="font-size:14px; border-collapse:collapse;">' +
                    '<tr style="background:#F8FAFC;">' +
                      '<td width="38%" style="color:#64748B; font-weight:600; border-bottom:1px solid #EDF2F7;">Query Type</td>' +
                      '<td width="62%" style="color:#0F172A; font-weight:700; border-bottom:1px solid #EDF2F7;">' + escapeHtml(formType) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                      '<td style="color:#64748B; font-weight:600; border-bottom:1px solid #EDF2F7;">Received At</td>' +
                      '<td style="color:#0F172A; font-weight:600; border-bottom:1px solid #EDF2F7;">' + escapeHtml(timestamp) + '</td>' +
                    '</tr>' +
                    '<tr style="background:#F8FAFC;">' +
                      '<td style="color:#64748B; font-weight:600; border-bottom:1px solid #EDF2F7;">Customer / Company</td>' +
                      '<td style="color:#0F172A; font-weight:700; font-size:15px; border-bottom:1px solid #EDF2F7;">' + escapeHtml(name) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                      '<td style="color:#64748B; font-weight:600; border-bottom:1px solid #EDF2F7;">Mobile / WhatsApp</td>' +
                      '<td style="color:#0284C7; font-weight:700; font-size:16px; border-bottom:1px solid #EDF2F7;">' +
                        '<a href="tel:' + escapeHtml(phone) + '" style="color:#0284C7; text-decoration:none;">' + escapeHtml(phone) + '</a>' +
                      '</td>' +
                    '</tr>' +
                    '<tr style="background:#F8FAFC;">' +
                      '<td style="color:#64748B; font-weight:600; border-bottom:1px solid #EDF2F7;">Email Address</td>' +
                      '<td style="color:#0F172A; border-bottom:1px solid #EDF2F7;">' + escapeHtml(email) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                      '<td style="color:#64748B; font-weight:600; border-bottom:1px solid #EDF2F7;">Service Required</td>' +
                      '<td style="color:#0F172A; font-weight:600; border-bottom:1px solid #EDF2F7;">' + escapeHtml(service) + '</td>' +
                    '</tr>' +
                    '<tr style="background:#F8FAFC;">' +
                      '<td style="color:#64748B; font-weight:600; border-bottom:1px solid #EDF2F7; vertical-align:top;">Message / Specs</td>' +
                      '<td style="color:#0F172A; line-height:1.5; border-bottom:1px solid #EDF2F7;">' + escapeHtml(message) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                      '<td style="color:#64748B; font-weight:600;">Source Webpage</td>' +
                      '<td style="color:#64748B; font-size:13px;">' + escapeHtml(sourcePage) + '</td>' +
                    '</tr>' +
                  '</table>' +

                  '<!-- Action Buttons -->' +
                  '<div style="margin-top:28px; padding-top:20px; border-top:1px dashed #CBD5E1; text-align:center;">' +
                    (whatsappUrl ? 
                      '<a href="' + whatsappUrl + '" target="_blank" style="display:inline-block; background-color:#16A34A; color:#FFFFFF; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:700; font-size:14px; margin-right:10px; box-shadow:0 2px 6px rgba(22,163,74,0.3);">' +
                        '💬 Reply on WhatsApp' +
                      '</a>' : '') +
                    (phoneCallUrl ? 
                      '<a href="' + phoneCallUrl + '" style="display:inline-block; background-color:#0284C7; color:#FFFFFF; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:700; font-size:14px; box-shadow:0 2px 6px rgba(2,132,199,0.3);">' +
                        '📞 Call Customer' +
                      '</a>' : '') +
                  '</div>' +
                '</td>' +
              '</tr>' +

              '<!-- Footer -->' +
              '<tr>' +
                '<td style="background:#F8FAFC; padding:18px 32px; border-top:1px solid #E2E8F0; text-align:center; font-size:12px; color:#64748B;">' +
                  '✅ <strong style="color:#0F172A;">Data Stored:</strong> This query was saved to your Google Sheet before this email was fired.<br>' +
                  'Imagine Printers Automation &bull; Rapid Lead Notification System' +
                '</td>' +
              '</tr>' +

            '</table>' +
          '</td>' +
        '</tr>' +
      '</table>' +
    '</body>' +
    '</html>';

  // Send email via MailApp, with GmailApp as fallback
  var mailSent = false;
  try {
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: plainTextBody,
      htmlBody: htmlBody,
      name: "Imagine Printers Leads"
    });
    mailSent = true;
    Logger.log("Lead notification emailed via MailApp to: " + NOTIFICATION_EMAIL);
  } catch (mailAppErr) {
    Logger.log("MailApp warning: " + mailAppErr.toString() + ". Attempting GmailApp fallback...");
    try {
      GmailApp.sendEmail(NOTIFICATION_EMAIL, subject, plainTextBody, {
        htmlBody: htmlBody,
        name: "Imagine Printers Leads"
      });
      mailSent = true;
      Logger.log("Lead notification emailed via GmailApp fallback to: " + NOTIFICATION_EMAIL);
    } catch (gmailErr) {
      Logger.log("Both MailApp and GmailApp failed: " + gmailErr.toString());
      throw new Error("Email sending failed: " + gmailErr.toString());
    }
  }
}

/**
 * Helper to escape HTML characters in email template
 */
function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Handles GET requests (Health check and email diagnostic endpoint)
 */
function doGet(e) {
  var testEmailResult = null;
  if (e && e.parameter && e.parameter.testEmail === "true") {
    try {
      sendLeadNotificationEmail("Manual Test Ping", {
        name: "Permission Verification",
        phone: "9820636646",
        email: NOTIFICATION_EMAIL,
        service: "Testing Automated Lead Alert",
        message: "This test email confirms your Google account has authorized email sending!"
      }, Utilities.formatDate(new Date(), TIMEZONE, DATE_FORMAT));
      testEmailResult = "SUCCESS: Email delivered to " + NOTIFICATION_EMAIL;
    } catch (err) {
      testEmailResult = "ERROR: " + err.toString();
    }
  }

  return createJsonResponse({
    status: "active",
    message: "Imagine Printers Google Sheets API is live and accepting submissions.",
    notificationEmail: NOTIFICATION_EMAIL,
    testEmailResult: testEmailResult,
    timestamp: Utilities.formatDate(new Date(), TIMEZONE, DATE_FORMAT)
  });
}

/**
 * Helper: Find existing sheet or create new sheet with professional styling
 */
function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    
    // Setup Header Row
    if (headers && headers.length > 0) {
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setValues([headers]);
      
      // Luxury styling: Brand Dark #0E1322 background with bold white text
      headerRange.setBackground("#0E1322");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontFamily("Plus Jakarta Sans");
      headerRange.setFontSize(10);
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 36);
      
      // Freeze header row
      sheet.setFrozenRows(1);
      
      // Auto-resize columns
      for (var col = 1; col <= headers.length; col++) {
        sheet.autoResizeColumn(col);
        var curWidth = sheet.getColumnWidth(col);
        sheet.setColumnWidth(col, Math.max(curWidth + 30, 130));
      }
    }
  }
  
  return sheet;
}

/**
 * Helper: Creates JSON output with CORS support
 */
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * One-Click Test Function:
 * Run this function directly from the Apps Script editor toolbar to verify
 * authorization and check that the email arrives at imaginestd@gmail.com!
 */
function testSendLeadNotification() {
  var testTimestamp = Utilities.formatDate(new Date(), TIMEZONE, DATE_FORMAT);
  var testData = {
    formType: "Contact Inquiries",
    name: "Kapil (Test Lead)",
    phone: "+91 98206 36646",
    email: "client@example.com",
    service: "Digital & Offset Printing",
    message: "This is a test notification verifying that lead emails arrive at imaginestd@gmail.com after data is stored in the sheet.",
    sourcePage: "Website Test Runner",
    status: "New Lead"
  };

  sendLeadNotificationEmail("Contact Inquiries", testData, testTimestamp);
  Logger.log("Test email successfully dispatched to " + NOTIFICATION_EMAIL);
}
