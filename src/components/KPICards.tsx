import React from 'react';
import { Users, Droplets, Activity, Gauge, Percent, Scale, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { KPISummary } from '../types';

interface KPICardsProps {
  kpi: KPISummary;
}

export const KPICards: React.FC<KPICardsProps> = ({ kpi }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {/* 1. จำนวน (Total Count - 30 คน) */}
      <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-pink-100/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100/40 rounded-full blur-xl group-hover:scale-110 transition-transform pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-pink-700">1. จำนวน (Count)</span>
          <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight flex items-baseline gap-1.5">
            <span>{kpi.totalCount.toLocaleString()}</span>
            <span className="text-sm font-semibold text-pink-600">คน</span>
          </div>
          <p className="text-xs text-pink-600 font-medium mt-1 flex items-center gap-1">
            <span>จำนวนผู้รับการตรวจ (กลุ่มตัวอย่าง {kpi.totalCount} คน)</span>
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-pink-50 flex items-center justify-between text-[11px] text-gray-500">
          <span>ประเภทสถิติ</span>
          <span className="font-semibold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-md">
            จำนวน {kpi.totalCount} คน
          </span>
        </div>
      </div>

      {/* 2. ค่าเฉลี่ย (Average Blood Sugar & BMI) */}
      <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-pink-100/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100/40 rounded-full blur-xl group-hover:scale-110 transition-transform pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">2. ค่าเฉลี่ย (Average)</span>
          <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
            <Droplets className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight flex items-baseline gap-1">
            {kpi.avgBloodSugar}
            <span className="text-xs font-normal text-gray-500">mg/dL</span>
          </div>
          <p className="text-xs text-rose-600 font-medium mt-1">
            น้ำตาลในเลือดเฉลี่ย (FBS)
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-pink-50 flex items-center justify-between text-[11px] text-gray-500">
          <span>BMI เฉลี่ย</span>
          <span className="font-semibold text-gray-800">
            {kpi.avgBMI} <span className="text-[10px] text-gray-400">kg/m²</span>
          </span>
        </div>
      </div>

      {/* 3. ค่าต่ำสุด (Minimum) */}
      <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-pink-100/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/30 rounded-full blur-xl group-hover:scale-110 transition-transform pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">3. ค่าต่ำสุด (Min)</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <ArrowDownRight className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight flex items-baseline gap-1">
            {kpi.minSystolicBP}
            <span className="text-xs font-normal text-gray-500">mmHg</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            ความดันตัวบนต่ำสุด (BP Min)
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-pink-50 flex items-center justify-between text-[11px] text-gray-500">
          <span>น้ำตาลต่ำสุด</span>
          <span className="font-semibold text-gray-800">
            {kpi.minBloodSugar} <span className="text-[10px] text-gray-400">mg/dL</span>
          </span>
        </div>
      </div>

      {/* 4. ค่าสูงสุด (Maximum) */}
      <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-pink-100/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-100/40 rounded-full blur-xl group-hover:scale-110 transition-transform pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">4. ค่าสูงสุด (Max)</span>
          <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight flex items-baseline gap-1">
            {kpi.maxSystolicBP}
            <span className="text-xs font-normal text-gray-500">mmHg</span>
          </div>
          <p className="text-xs text-red-600 font-medium mt-1">
            ความดันตัวบนสูงสุด (BP Max)
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-pink-50 flex items-center justify-between text-[11px] text-gray-500">
          <span>น้ำตาลสูงสุด</span>
          <span className="font-semibold text-rose-700">
            {kpi.maxBloodSugar} <span className="text-[10px] text-gray-400">mg/dL</span>
          </span>
        </div>
      </div>

      {/* 5. สัดส่วน (Ratio) */}
      <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-pink-100/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100/40 rounded-full blur-xl group-hover:scale-110 transition-transform pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">5. สัดส่วนเพศ</span>
          <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
            <Scale className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight flex items-baseline gap-1">
            {kpi.femaleRatio} : {kpi.maleRatio}
          </div>
          <p className="text-xs text-pink-600 font-medium mt-1">
            สัดส่วน หญิง : ชาย (%)
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-pink-50 flex items-center justify-between text-[11px] text-gray-500">
          <span>ประเภทสถิติ</span>
          <span className="font-semibold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-md">
            สัดส่วน (Ratio)
          </span>
        </div>
      </div>

      {/* 6. ร้อยละ (Percentage) */}
      <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-pink-100/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-200/40 rounded-full blur-xl group-hover:scale-110 transition-transform pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-rose-700">6. ร้อยละ (Percentage)</span>
          <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-red-600 tracking-tight flex items-baseline gap-1">
            {kpi.highRiskPercentage}%
          </div>
          <p className="text-xs text-gray-600 font-medium mt-1 flex items-center gap-1">
            <span>ผู้มีความเสี่ยงสูง/สูงมาก</span>
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-pink-50 flex items-center justify-between text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#f97316]" />
            <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
            <span>เสี่ยงสูง-สูงมาก</span>
          </span>
          <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
            {kpi.highRiskPercentage}% ({Math.round(kpi.totalCount * kpi.highRiskPercentage / 100)} คน)
          </span>
        </div>
      </div>
    </div>
  );
};
