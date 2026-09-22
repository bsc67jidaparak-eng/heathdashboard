import React, { useState } from 'react';
import { X, Database, ExternalLink, RefreshCw, Upload, Check, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { GOOGLE_SHEET_ID, GOOGLE_SHEET_URL } from '../data/healthData';

interface GoogleSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSync: (customUrl?: string) => Promise<void>;
  onImportCSV: (file: File) => void;
  isSyncing: boolean;
  syncStatus: string;
}

export const GoogleSheetModal: React.FC<GoogleSheetModalProps> = ({
  isOpen,
  onClose,
  onSync,
  onImportCSV,
  isSyncing,
  syncStatus
}) => {
  const [customSheetUrl, setCustomSheetUrl] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImportCSV(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-pink-200 overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white border border-white/30">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">การเชื่อมโยง Google Sheet</h3>
              <p className="text-xs text-pink-100 mt-0.5">
                Sheet ID: <span className="font-mono">{GOOGLE_SHEET_ID}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-gray-600">
          {/* Connection Status Box */}
          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">สถานะการเชื่อมโยงข้อมูล:</span>
              <span className="inline-flex items-center gap-1 text-pink-700 bg-pink-100 px-2.5 py-0.5 rounded-full font-medium">
                <FileSpreadsheet className="w-3.5 h-3.5 text-pink-600" />
                {syncStatus}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              ระบบเชื่อมโยงโดยตรงกับ Google Sheet รหัส <code>{GOOGLE_SHEET_ID}</code> และมีระบบสำรองข้อมูลอัตโนมัติ (Live Built-in Data Engine) 
              เพื่อให้แดชบอร์ดสามารถประมวลผลสถิติและกราฟได้อย่างสมบูรณ์แบบตลอดเวลา
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100/80 text-pink-700 font-semibold border border-pink-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>เปิดดูไฟล์บน Google Sheets</span>
            </a>

            <button
              onClick={() => onSync()}
              disabled={isSyncing}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-semibold shadow-sm transition-all disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'กำลังซิงค์ข้อมูล...' : 'สั่งรีเฟรชข้อมูลจาก Sheet'}</span>
            </button>
          </div>

          {/* Manual File Upload */}
          <div className="pt-3 border-t border-pink-100">
            <label className="block font-semibold text-gray-800 mb-1">
              นำเข้าไฟล์ข้อมูล CSV (Manual Import)
            </label>
            <p className="text-[11px] text-gray-500 mb-2">
              หากต้องการนำเข้าไฟล์ CSV สุขภาพชุดใหม่ที่ดาวน์โหลดมาจาก Google Sheet:
            </p>
            <label className="border-2 border-dashed border-pink-200 hover:border-pink-400 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer bg-pink-50/20 hover:bg-pink-50/50 transition-colors">
              <Upload className="w-6 h-6 text-pink-500" />
              <span className="font-medium text-pink-700">คลิกเพื่อเลือกไฟล์ CSV หรือลากไฟล์มาวางที่นี่</span>
              <span className="text-[10px] text-gray-400">รองรับไฟล์ .csv</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium text-xs transition-colors"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
