/**
 * Google Sheets Integration Service for Earthwise Pest Management
 * Automatically captures and appends calendar booking leads to Google Sheets.
 */

export interface BookingLeadRecord {
  reference: string;
  fullName: string;
  phone: string;
  email: string;
  suburb: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  propertyType?: string;
  source?: string;
  notes?: string;
}

const DEFAULT_SHEET_TITLE = 'Earthwise Pest Management — Booking Leads';
const SPREADSHEET_STORAGE_KEY = 'earthwise_google_sheet_id';
const SPREADSHEET_URL_KEY = 'earthwise_google_sheet_url';

export const getStoredSpreadsheetId = (): string | null => {
  try {
    return localStorage.getItem(SPREADSHEET_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const getStoredSpreadsheetUrl = (): string | null => {
  try {
    return localStorage.getItem(SPREADSHEET_URL_KEY);
  } catch {
    return null;
  }
};

export const setStoredSpreadsheetId = (id: string, url?: string) => {
  try {
    localStorage.setItem(SPREADSHEET_STORAGE_KEY, id);
    if (url) {
      localStorage.setItem(SPREADSHEET_URL_KEY, url);
    } else {
      localStorage.setItem(SPREADSHEET_URL_KEY, `https://docs.google.com/spreadsheets/d/${id}/edit`);
    }
  } catch {
    // Ignore storage errors
  }
};

/**
 * Creates a brand new Google Sheet specifically formatted for Earthwise Pest Management leads.
 */
export const createLeadsSpreadsheet = async (
  accessToken: string,
  customTitle: string = DEFAULT_SHEET_TITLE
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: customTitle,
      },
      sheets: [
        {
          properties: {
            title: 'Booking Leads',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Logged At (SAST)' } },
                    { userEnteredValue: { stringValue: 'Lead Ref' } },
                    { userEnteredValue: { stringValue: 'Client Name' } },
                    { userEnteredValue: { stringValue: 'Phone Number' } },
                    { userEnteredValue: { stringValue: 'Email Address' } },
                    { userEnteredValue: { stringValue: 'Cape Town Suburb' } },
                    { userEnteredValue: { stringValue: 'Service / Pest Focus' } },
                    { userEnteredValue: { stringValue: 'Preferred Date' } },
                    { userEnteredValue: { stringValue: 'Preferred Slot' } },
                    { userEnteredValue: { stringValue: 'Property Type' } },
                    { userEnteredValue: { stringValue: 'Channel Source' } },
                    { userEnteredValue: { stringValue: 'Inspection Notes / Findings' } },
                    { userEnteredValue: { stringValue: 'Lead Status' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create Google Sheet: ${errorText}`);
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;
  const spreadsheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // Format header row with Earthwise Forest Green theme
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: data.sheets[0].properties.sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 13,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 27 / 255,
                    green: 67 / 255,
                    blue: 50 / 255,
                  },
                  textFormat: {
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    fontSize: 10,
                    bold: true,
                  },
                  horizontalAlignment: 'CENTER',
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
            },
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: data.sheets[0].properties.sheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: 13,
              },
            },
          },
        ],
      }),
    });
  } catch (err) {
    console.warn('Header styling batchUpdate error (non-fatal):', err);
  }

  setStoredSpreadsheetId(spreadsheetId, spreadsheetUrl);
  return { spreadsheetId, spreadsheetUrl };
};

/**
 * Searches the user's Drive for an existing Earthwise leads sheet, or returns stored ID, or creates a new one.
 */
export const findOrCreateLeadsSpreadsheet = async (
  accessToken: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string; isNew: boolean }> => {
  const storedId = getStoredSpreadsheetId();
  if (storedId) {
    // Validate stored sheet exists and is accessible
    try {
      const checkRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${storedId}?fields=spreadsheetId,properties.title,spreadsheetUrl`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (checkRes.ok) {
        const checkData = await checkRes.json();
        const url = checkData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${storedId}/edit`;
        setStoredSpreadsheetId(storedId, url);
        return { spreadsheetId: storedId, spreadsheetUrl: url, isNew: false };
      }
    } catch {
      // Stored sheet was invalid or deleted, continue searching Drive
    }
  }

  // Search Drive for file with our default title
  try {
    const q = encodeURIComponent(`name = '${DEFAULT_SHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`);
    const driveRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,webViewLink)&pageSize=1`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (driveRes.ok) {
      const driveData = await driveRes.json();
      if (driveData.files && driveData.files.length > 0) {
        const file = driveData.files[0];
        const url = file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`;
        setStoredSpreadsheetId(file.id, url);
        return { spreadsheetId: file.id, spreadsheetUrl: url, isNew: false };
      }
    }
  } catch (err) {
    console.warn('Drive search fallback error:', err);
  }

  // Not found anywhere, create fresh sheet
  const created = await createLeadsSpreadsheet(accessToken, DEFAULT_SHEET_TITLE);
  return { ...created, isNew: true };
};

/**
 * Appends a customer lead row to the Google Sheet.
 */
export const appendLeadToGoogleSheet = async (
  accessToken: string,
  lead: BookingLeadRecord,
  spreadsheetIdParam?: string
): Promise<{ success: boolean; spreadsheetUrl?: string; rowAppended?: number }> => {
  let spreadsheetId = spreadsheetIdParam || getStoredSpreadsheetId();

  if (!spreadsheetId) {
    const found = await findOrCreateLeadsSpreadsheet(accessToken);
    spreadsheetId = found.spreadsheetId;
  }

  // Format timestamp in local South African time
  const now = new Date();
  const timestampStr = now.toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const rowValues = [
    timestampStr,
    lead.reference || `EW-${Math.floor(10000 + Math.random() * 90000)}`,
    lead.fullName || 'Anonymous / Walk-in',
    lead.phone || '',
    lead.email || '',
    lead.suburb || 'Cape Town',
    lead.service || 'Eco-Treatments',
    lead.preferredDate || 'Earliest Available',
    lead.preferredTime || 'Morning Slot (08:00 - 12:00)',
    lead.propertyType || 'Residential',
    lead.source || 'Calendar Booking Form',
    lead.notes || '',
    'New — Pending Confirmation',
  ];

  // First check sheet title
  let sheetName = 'Booking Leads';
  try {
    const metaRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties.title`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (metaRes.ok) {
      const meta = await metaRes.json();
      if (meta.sheets && meta.sheets.length > 0) {
        sheetName = meta.sheets[0].properties.title;
      }
    }
  } catch {
    sheetName = 'Sheet1';
  }

  const range = encodeURIComponent(`'${sheetName}'!A:M`);
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const appendRes = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!appendRes.ok) {
    const errText = await appendRes.text();
    throw new Error(`Failed appending row to Google Sheet: ${errText}`);
  }

  const appendData = await appendRes.json();
  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  return {
    success: true,
    spreadsheetUrl,
    rowAppended: appendData.updates?.updatedRows || 1,
  };
};

/**
 * Reads recent leads from the Google Sheet for dashboard review.
 */
export const getRecentLeadsFromSheet = async (
  accessToken: string,
  spreadsheetIdParam?: string
): Promise<Array<{ values: string[]; rowIndex: number }>> => {
  const spreadsheetId = spreadsheetIdParam || getStoredSpreadsheetId();
  if (!spreadsheetId) return [];

  // Read metadata for first sheet name
  let sheetName = 'Booking Leads';
  try {
    const metaRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties.title`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (metaRes.ok) {
      const meta = await metaRes.json();
      if (meta.sheets && meta.sheets.length > 0) {
        sheetName = meta.sheets[0].properties.title;
      }
    }
  } catch {
    sheetName = 'Sheet1';
  }

  const range = encodeURIComponent(`'${sheetName}'!A2:M100`);
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) return [];

  const data = await res.json();
  if (!data.values) return [];

  return data.values.map((row: string[], index: number) => ({
    values: row,
    rowIndex: index + 2,
  })).reverse(); // Most recent first
};
