import React from 'react';
import { Filter, Search, RotateCcw, UserCheck, ShieldAlert, MapPin, Calendar } from 'lucide-react';
import { FilterState } from '../types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  regions: string[];
  totalResults: number;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  regions,
  totalResults,
}) => {
  const isFiltered =
    filters.search !== '' ||
    filters.gender !== 'all' ||
    filters.ageGroup !== 'all' ||
    filters.riskLevel !== 'all' ||
    filters.region !== 'all';

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-sm border border-pink-100 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-pink-50">
        <div className="flex items-center gap-2 text-pink-700 font-semibold text-sm">
          <Filter className="w-4 h-4 text-pink-500" />
          <span>ระบบคัดกรองข้อมูลสุขภาพ (Interactive Filters)</span>
          <span className="text-xs font-normal text-gray-500">
            (พบผลลัพธ์ {totalResults.toLocaleString()} รายการ)
          </span>
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/80 px-2.5 py-1 rounded-lg transition-colors font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ล้างตัวกรองทั้งหมด</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div className="relative">
          <label className="block text-[11px] font-medium text-gray-500 mb-1">
            ค้นหาชื่อ / รหัส HN / จังหวัด
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="พิมพ์คำค้นหา..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-pink-50/40 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:border-pink-500 text-gray-800 placeholder-gray-400 transition-all"
            />
          </div>
        </div>

        {/* Filter 1: Gender */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-medium text-gray-500 mb-1">
            <UserCheck className="w-3.5 h-3.5 text-pink-400" />
            <span>เพศ (Gender)</span>
          </label>
          <select
            value={filters.gender}
            onChange={(e) => onFilterChange('gender', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-pink-50/40 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:border-pink-500 text-gray-800 transition-all cursor-pointer"
          >
            <option value="all">ทุกเพศ (All)</option>
            <option value="หญิง">เพศหญิง</option>
            <option value="ชาย">เพศชาย</option>
          </select>
        </div>

        {/* Filter 2: Age Group */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-medium text-gray-500 mb-1">
            <Calendar className="w-3.5 h-3.5 text-pink-400" />
            <span>กลุ่มอายุ (Age Group)</span>
          </label>
          <select
            value={filters.ageGroup}
            onChange={(e) => onFilterChange('ageGroup', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-pink-50/40 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:border-pink-500 text-gray-800 transition-all cursor-pointer"
          >
            <option value="all">ทุกช่วงอายุ (All Ages)</option>
            <option value="18-29">วัยหนุ่มสาว (18-29 ปี)</option>
            <option value="30-44">วัยทำงานตอนต้น (30-44 ปี)</option>
            <option value="45-59">วัยกลางคน (45-59 ปี)</option>
            <option value="60+">ผู้สูงอายุ (60 ปีขึ้นไป)</option>
          </select>
        </div>

        {/* Filter 3: Risk Level */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-medium text-gray-500 mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>ระดับความเสี่ยง (Risk Level)</span>
          </label>
          <select
            value={filters.riskLevel}
            onChange={(e) => onFilterChange('riskLevel', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-pink-50/40 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:border-pink-500 text-gray-800 transition-all cursor-pointer"
          >
            <option value="all">ทุกระดับความเสี่ยง</option>
            <option value="ต่ำ">🟢 เสี่ยงต่ำสีเขียว</option>
            <option value="ปานกลาง">🟡 เสี่ยงปานกลางสีเหลือง</option>
            <option value="สูง">🟠 เสี่ยงสูงสีส้ม</option>
            <option value="สูงมาก">🔴 เสี่ยงสูงมากสีแดง</option>
          </select>
        </div>

        {/* Filter 4: Region */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-medium text-gray-500 mb-1">
            <MapPin className="w-3.5 h-3.5 text-pink-400" />
            <span>เขตพื้นที่ / ภูมิภาค (Region)</span>
          </label>
          <select
            value={filters.region}
            onChange={(e) => onFilterChange('region', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-pink-50/40 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:border-pink-500 text-gray-800 transition-all cursor-pointer"
          >
            <option value="all">ทุกภูมิภาค (All Regions)</option>
            {regions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
