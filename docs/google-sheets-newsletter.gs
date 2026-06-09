const NOTIFICATION_EMAIL = "jolene.fjl@gmail.com";
const SHEET_NAME = "Signups";

function doPost(event) {
  try {
    const data = JSON.parse(event.postData.contents);
    const expectedSecret =
      PropertiesService.getScriptProperties().getProperty("NEWSLETTER_SECRET");

    if (!expectedSecret || data.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    const email = String(data.email || "").trim().toLowerCase();
    const source = String(data.source || "/");

    if (!email || !email.includes("@")) {
      return jsonResponse({ ok: false, error: "Invalid email" });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(["Signed up at", "Email", "Source"]);
      sheet.setFrozenRows(1);
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      const lastRow = sheet.getLastRow();
      const existingEmails =
        lastRow > 1
          ? sheet
              .getRange(2, 2, lastRow - 1, 1)
              .getDisplayValues()
              .flat()
              .map((value) => String(value).trim().toLowerCase())
          : [];

      if (existingEmails.includes(email)) {
        return jsonResponse({ ok: true, duplicate: true });
      }

      sheet.appendRow([new Date(), email, source]);
    } finally {
      lock.releaseLock();
    }

    MailApp.sendEmail(
      NOTIFICATION_EMAIL,
      "New Infrequent Flyer newsletter signup",
      `A new reader signed up.\n\nEmail: ${email}\nSource: ${source}`,
    );

    return jsonResponse({ ok: true, duplicate: false });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
