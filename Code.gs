/**
 * Google Apps Script Backend for Web Portal
 * Purpose: Serve as a REST API to fetch links from Google Sheets
 * 
 * Instructions:
 * 1. Create a Google Sheet and name the sheet tab "Links"
 * 2. Add headers: id, name, description, url, icon, category, role, color, sort_order, status, created_at
 * 3. Deploy this script as a Web App with access: "Anyone"
 */

function doGet(e) {
  const action = (e.parameter.action || '').toLowerCase();
  
  if (action === 'links') {
    return getLinks();
  }
  
  return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getLinks() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Links');
    
    if (!sheet) {
      throw new Error('Sheet "Links" not found');
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    const links = rows
      .map(row => {
        let obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      })
      .filter(link => link.status === 'active') // Only active links
      .sort((a, b) => (parseInt(a.sort_order) || 0) - (parseInt(b.sort_order) || 0)); // Sort by order
      
    return ContentService.createTextOutput(JSON.stringify(links))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
