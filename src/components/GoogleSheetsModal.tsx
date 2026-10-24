import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  PlusCircle, 
  LogOut, 
  Sparkles, 
  ShieldCheck,
  Send
} from 'lucide-react';
import { 
  googleSignIn, 
  googleSignOut, 
  getAccessToken, 
  getCurrentUser, 
  subscribeToAuth 
} from '../services/googleAuth';
import { 
  findOrCreateLeadsSpreadsheet, 
  createLeadsSpreadsheet, 
  getStoredSpreadsheetId, 
  getStoredSpreadsheetUrl, 
  getRecentLeadsFromSheet,
  appendLeadToGoogleSheet
} from '../services/googleSheets';
import type { User } from 'firebase/auth';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({ isOpen, onClose }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(getStoredSpreadsheetId());
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(getStoredSpreadsheetUrl());
  const [recentRows, setRecentRows] = useState<Array<{ values: string[]; rowIndex: number }>>([]);
  const [loadingRows, setLoadingRows] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user, token) => {
      setCurrentUser(user);
      setAccessToken(token);
      if (token) {
        syncSpreadsheetInfo(token);
      } else {
        setRecentRows([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const syncSpreadsheetInfo = async (token: string) => {
    setLoadingRows(true);
    try {
      const sheet = await findOrCreateLeadsSpreadsheet(token);
      setSpreadsheetId(sheet.spreadsheetId);
      setSpreadsheetUrl(sheet.spreadsheetUrl);
      
      const rows = await getRecentLeadsFromSheet(token, sheet.spreadsheetId);
      setRecentRows(rows);
    } catch (err: any) {
      console.warn('Could not sync spreadsheet info:', err);
    } finally {
      setLoadingRows(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      setStatusMessage('Google Workspace authorized successfully.');
      await syncSpreadsheetInfo(res.accessToken);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to authenticate with Google.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await googleSignOut();
      setStatusMessage('Signed out of Google Workspace.');
      setRecentRows([]);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNewSheet = async () => {
    if (!accessToken) return;
    const confirmed = window.confirm(
      'Create a brand new "Earthwise Pest Management — Booking Leads" spreadsheet in your Google Drive with formatted columns?'
    );
    if (!confirmed) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const newSheet = await createLeadsSpreadsheet(accessToken);
      setSpreadsheetId(newSheet.spreadsheetId);
      setSpreadsheetUrl(newSheet.spreadsheetUrl);
      setStatusMessage('New formatted spreadsheet created in your Google Drive.');
      const rows = await getRecentLeadsFromSheet(accessToken, newSheet.spreadsheetId);
      setRecentRows(rows);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create spreadsheet.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTestLead = async () => {
    if (!accessToken || !spreadsheetId) return;
    const confirmed = window.confirm(
      'Append a test inspection lead row to your connected Google Sheet to verify real-time capture?'
    );
    if (!confirmed) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const testLead = {
        reference: `EW-${Math.floor(10000 + Math.random() * 90000)}`,
        fullName: 'Test Booking Inquiry (Dr. A. Marais)',
        phone: '+27 82 555 1234',
        email: 'client@example.co.za',
        suburb: 'Constantia',
        service: 'Eco-Treatments (Cockroaches & Ants)',
        preferredDate: new Date().toLocaleDateString('en-ZA'),
        preferredTime: 'Morning (09:00 - 11:00)',
        propertyType: 'Residential Villa',
        source: 'Google Sheets Integration Test',
        notes: 'Lead capture verification verified via calendar booking engine.',
      };

      await appendLeadToGoogleSheet(accessToken, testLead, spreadsheetId);
      setStatusMessage('Test lead successfully appended to your Google Sheet!');
      const rows = await getRecentLeadsFromSheet(accessToken, spreadsheetId);
      setRecentRows(rows);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to append test lead.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl border border-[#CBD5E1] shadow-2xl overflow-hidden relative my-auto">
        
        {/* Header Ribbon */}
        <div className="bg-[#1B4332] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] border border-[#52B788]/40 flex items-center justify-center text-white shadow-sm">
              <FileSpreadsheet className="w-6 h-6 text-[#52B788]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold font-serif-italic">Google Sheets Lead Capture</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#52B788] text-[#1B4332]">
                  Live Integration
                </span>
              </div>
              <p className="text-xs text-[#D8ECE0] mt-0.5">
                Automatically logs all incoming inspection bookings and contact leads to your Google Sheet.
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Notifications */}
          {statusMessage && (
            <div className="p-3 bg-[#EAF4EE] text-[#1B4332] border border-[#D8ECE0] rounded-xl text-xs flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#52B788] shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs flex items-center space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Authentication State */}
          {!currentUser || !accessToken ? (
            <div className="bg-[#F4F7F5] rounded-2xl p-6 border border-[#D8ECE0] text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white mx-auto flex items-center justify-center shadow-xs border border-[#CBD5E1]">
                <ShieldCheck className="w-6 h-6 text-[#1B4332]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#1B4332]">Connect Your Google Account</h3>
                <p className="text-xs text-[#4A5568] max-w-md mx-auto leading-relaxed">
                  Sign in with your Google Workspace or Gmail account to enable real-time lead capture directly into a dedicated Google Sheet.
                </p>
              </div>

              {/* Official Google Sign-In Button */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className="inline-flex items-center space-x-3 px-5 py-3 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 shadow-sm transition-all text-sm font-semibold text-gray-700 hover:shadow-md cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>{isLoading ? 'Connecting to Google...' : 'Sign in with Google'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              
              {/* Connected User Account Bar */}
              <div className="bg-[#F4F7F5] rounded-2xl p-4 border border-[#D8ECE0] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Google User'}
                      className="w-10 h-10 rounded-full border border-[#52B788]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-sm">
                      {currentUser.email ? currentUser.email[0].toUpperCase() : 'G'}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-xs text-[#1B4332]">
                        {currentUser.displayName || 'Google Account'}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#52B788]"></span>
                    </div>
                    <p className="text-[11px] text-[#4A5568]">{currentUser.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-gray-50 text-[#4A5568] hover:text-[#1B4332] text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Active Google Sheet Details */}
              <div className="border border-[#D8ECE0] rounded-2xl p-4 bg-white space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileSpreadsheet className="w-4 h-4 text-[#52B788]" />
                    <span className="text-xs font-bold text-[#1B4332]">Target Destination Sheet:</span>
                  </div>
                  {spreadsheetUrl && (
                    <a
                      href={spreadsheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-[#2D6A4F] hover:text-[#1B4332] font-bold underline"
                    >
                      <span>Open in Google Sheets</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="p-3 bg-[#F4F7F5] rounded-xl border border-[#D8ECE0] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#1B4332]">Earthwise Pest Management — Booking Leads</p>
                    <p className="text-[11px] text-[#718096] font-mono mt-0.5 truncate max-w-xs">
                      ID: {spreadsheetId || 'Provisioning...'}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#EAF4EE] text-[#1B4332] font-bold text-[10px] border border-[#D8ECE0]">
                    Active Sync
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={handleSendTestLead}
                    disabled={isLoading || !spreadsheetId}
                    className="px-3.5 py-2 rounded-xl bg-[#1B4332] hover:bg-[#132A20] text-white text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-[#52B788]" />
                    <span>Send Test Lead Row</span>
                  </button>

                  <button
                    onClick={handleCreateNewSheet}
                    disabled={isLoading}
                    className="px-3.5 py-2 rounded-xl border border-[#CBD5E1] bg-white hover:bg-gray-50 text-[#1B4332] text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs disabled:opacity-50"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>Create Fresh Spreadsheet</span>
                  </button>

                  <button
                    onClick={() => accessToken && syncSpreadsheetInfo(accessToken)}
                    disabled={isLoading || loadingRows}
                    className="p-2 rounded-xl border border-[#CBD5E1] bg-white hover:bg-gray-50 text-[#4A5568] text-xs transition-all cursor-pointer shadow-2xs"
                    title="Refresh data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingRows ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Recent Leads Preview from Sheet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1B4332] uppercase tracking-wider text-[11px]">
                    Recent Captured Leads in Sheet ({recentRows.length})
                  </span>
                  {loadingRows && <span className="text-[11px] text-[#718096]">Fetching latest rows...</span>}
                </div>

                <div className="border border-[#E2E8F0] rounded-xl overflow-hidden max-h-48 overflow-y-auto bg-gray-50 text-xs">
                  {recentRows.length === 0 ? (
                    <div className="p-6 text-center text-[#718096]">
                      <p>No leads logged yet. Submit a test lead or book through the calendar form to see entries live!</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {recentRows.slice(0, 5).map((row, idx) => (
                        <div key={idx} className="p-3 bg-white hover:bg-[#F4F7F5] transition-colors flex items-center justify-between text-xs">
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-[#1B4332]">{row.values[2] || 'Anonymous'}</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-gray-100 rounded text-gray-700">
                                {row.values[1] || 'REF'}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#4A5568]">
                              {row.values[5] || 'Cape Town'} • {row.values[6] || 'Service'}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-gray-500 block">{row.values[0] || ''}</span>
                            <span className="inline-block mt-0.5 text-[9px] px-2 py-0.2 rounded-full bg-[#EAF4EE] text-[#1B4332] font-semibold">
                              {row.values[12] || 'Captured'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Security & POPIA Information */}
          <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#718096]">
            <span>🔒 Direct Google Sheets v4 API • Zero third-party storage</span>
            <span>POPIA & Act 36 Compliant</span>
          </div>

        </div>

      </div>
    </div>
  );
};
