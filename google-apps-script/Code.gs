/**
 * ============================================================================
 * IMAGINE PRINTERS - MULTI-FORM GOOGLE SHEETS AUTOMATION (APPS SCRIPT)
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
 * 
 * SETUP INSTRUCTIONS:
 * 1. In your Google Sheet ("imaginprinter"), click: Extensions > Apps Script.
 * 2. Replace all existing code with this file.
 * 3. (Optional) Select function "setupSheets" in top toolbar and click "Run".
 *    -> This creates the tabs with styled headers immediately!
 * 4. Click: Deploy > New deployment.
 * 5. Select type: "Web app".
 * 6. Set Description: "Imagine Printers Lead Collector".
 * 7. Set "Execute as": "Me" (your email).
 * 8. Set "Who has access": "Anyone". (CRITICAL for website form submission).
 * 9. Click "Deploy", review permissions, and COPY the Web App URL.
 * 10. Paste that URL into js/main.js in your website.
 * ============================================================================
 */

// Configuration
var TIMEZONE = "Asia/Kolkata";
var DATE_FORMAT = "dd/MM/yyyy, hh:mm:ss a";

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

    // Append lead row
    sheet.appendRow(rowData);

    // Format new row styling
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

    SpreadsheetApp.flush();
    return createJsonResponse({ status: "success", tab: sheet.getName(), row: lastRow });

  } catch (error) {
    Logger.log("doPost Error: " + error.toString());
    return createJsonResponse({ status: "error", error: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handles GET requests (Health check endpoint)
 */
function doGet(e) {
  return createJsonResponse({
    status: "active",
    message: "Imagine Printers Google Sheets API is live and accepting submissions.",
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
