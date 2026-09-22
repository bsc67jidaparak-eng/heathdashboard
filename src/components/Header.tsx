import React from 'react';
import { HeartPulse, RefreshCw, ExternalLink, Database, PlusCircle, User, Calendar, ShieldCheck } from 'lucide-react';
import { GOOGLE_SHEET_ID, GOOGLE_SHEET_URL } from '../data/healthData';
import { RISK_COLORS } from '../types';

interface HeaderProps {
  lastUpdated: string;
  isSyncing: boolean;
  onRefresh: () => void;
  onOpenSheetModal: () => void;
  onOpenAddModal: () => void;
  totalRecords: number;
}

export const Header: React.FC<HeaderProps> = ({
  lastUpdated,
  isSyncing,
  onRefresh,
  onOpenSheetModal,
  onOpenAddModal,
  totalRecords,
}) => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-pink-500/15 border border-pink-400/30">
      {/* Decorative background shapes */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Title and details */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium tracking-wide text-white border border-white/25">
              <HeartPulse className="w-3.5 h-3.5 animate-pulse text-pink-200" />
              <span>Smart Healthcare Analytics</span>
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-900/30 backdrop-blur-md text-xs font-medium text-pink-100 border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>ฐานข้อมูลผู้ตรวจ {totalRecords.toLocaleString()} คน</span>
            </div>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
              Health Overview
              <span className="text-sm sm:text-base font-normal px-2.5 py-0.5 rounded-lg bg-pink-700/40 border border-pink-300/30 text-pink-100">
                แดชบอร์ดภาพรวมสุขภาพ
              </span>
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-pink-100 font-light leading-relaxed">
              ระบบติดตามสถานะสุขภาพ เฝ้าระวังความเสี่ยงโรคไม่ติดต่อเรื้อรัง (NCDs) และวิเคราะห์พฤติกรรมสุขภาพของประชากรเชิงลึก
            </p>
          </div>

          {/* Metadata badges: Creator & Update timestamp with direct link */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-pink-100">
            {/* Creator Name */}
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/20">
              <User className="w-4 h-4 text-pink-200" />
              <span>ผู้จัดทำ:</span>
              <strong className="text-white font-semibold underline decoration-pink-300 underline-offset-2">
                นางสาวจิดาภา รักไร่
              </strong>
            </div>

            {/* Timestamp */}
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/20">
              <Calendar className="w-4 h-4 text-pink-200" />
              <span>อัปเดตล่าสุด:</span>
              <span className="text-white font-semibold">{lastUpdated}</span>
            </div>

            {/* Direct Link to Google Sheet */}
            <a
              href={GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl border border-white/30 font-medium transition-all shadow-xs"
              title="เปิดลิงก์ Google Sheet สำหรับกรอกข้อมูลเพิ่มเติม"
            >
              <span>🔗 ลิงก์กรอกข้อมูลบน Google Sheet</span>
              <ExternalLink className="w-3 h-3 text-pink-100" />
            </a>
          </div>

          {/* Color-Coded Risk Indicators: เสี่ยงสูงมากสีแดง เสี่ยงสูงสีส้ม เสี่ยงปานกลางสีเหลือง และเสี่ยงต่ำสีเขียว */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-600 text-white font-bold border border-red-300/40 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span>เสี่ยงสูงมากสีแดง</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#f97316] text-white font-bold border border-orange-300/40 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                <span>เสี่ยงสูงสีส้ม</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#eab308] text-yellow-950 font-bold border border-yellow-200 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-950" />
                <span>เสี่ยงปานกลางสีเหลือง</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#22c55e] text-white font-bold border border-emerald-300/40 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                <span>เสี่ยงต่ำสีเขียว</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls & Sheet Integration */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {/* Add Record Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-pink-700 hover:bg-pink-50 active:bg-pink-100 font-bold text-xs sm:text-sm shadow-md transition-all group"
          >
            <PlusCircle className="w-4 h-4 text-pink-600 group-hover:rotate-90 transition-transform" />
            <span>กรอกข้อมูลเพิ่มเติม</span>
          </button>

          {/* Google Sheet ID Button */}
          <button
            onClick={onOpenSheetModal}
            className="group flex items-center justify-between sm:justify-start gap-2 px-3.5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/25 transition-all text-xs font-medium text-white shadow-sm"
            title="คลิกเพื่อดูรายละเอียดการเชื่อมโยง Google Sheet"
          >
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-pink-200 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-[10px] text-pink-200 leading-tight">Sheet ID</div>
                <div className="font-mono text-xs font-bold text-white truncate max-w-[120px]">
                  {GOOGLE_SHEET_ID.slice(0, 7)}...{GOOGLE_SHEET_ID.slice(-4)}
                </div>
              </div>
            </div>
          </button>

          {/* Refresh Data Button */}
          <button
            onClick={onRefresh}
            disabled={isSyncing}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 active:bg-white/35 border border-white/25 text-white transition-all text-xs font-semibold shadow-sm disabled:opacity-75"
            title="รีเฟรชข้อมูลล่าสุด"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-white ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'ซิงค์...' : 'รีเฟรช'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
