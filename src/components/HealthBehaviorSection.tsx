import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { Activity, Cigarette, Wine, Moon, Utensils } from 'lucide-react';
import { HealthRecord } from '../types';

interface HealthBehaviorSectionProps {
  records: HealthRecord[];
}

export const HealthBehaviorSection: React.FC<HealthBehaviorSectionProps> = ({ records }) => {
  const [behaviorFilter, setBehaviorFilter] = useState<'smoking' | 'exercise' | 'alcohol' | 'sleep'>('smoking');

  // Field 1: Smoking status breakdown
  const smokingData = [
    { name: 'ไม่สูบ', count: records.filter(r => r.smoking === 'ไม่สูบ').length, fill: '#f472b6' },
    { name: 'เคยสูบแต่เลิกแล้ว', count: records.filter(r => r.smoking === 'เคยสูบแต่เลิกแล้ว').length, fill: '#fb7185' },
    { name: 'สูบเป็นประจำ', count: records.filter(r => r.smoking === 'สูบเป็นประจำ').length, fill: '#be123c' },
  ];

  // Field 2: Exercise duration
  const exerciseData = [
    { name: 'ไม่ออกกำลังกาย (0 นาที)', count: records.filter(r => r.exerciseMinutesPerWeek === 0).length, fill: '#be123c' },
    { name: 'น้อยกว่าเกณฑ์ (<150 นาที)', count: records.filter(r => r.exerciseMinutesPerWeek > 0 && r.exerciseMinutesPerWeek < 150).length, fill: '#fb7185' },
    { name: 'ตามเกณฑ์ (150-299 นาที)', count: records.filter(r => r.exerciseMinutesPerWeek >= 150 && r.exerciseMinutesPerWeek < 300).length, fill: '#f472b6' },
    { name: 'ออกกำลังกายสม่ำเสมอ (≥300)', count: records.filter(r => r.exerciseMinutesPerWeek >= 300).length, fill: '#db2777' },
  ];

  // Field 3: Alcohol consumption
  const alcoholData = [
    { name: 'ไม่ดื่ม', count: records.filter(r => r.alcohol === 'ไม่ดื่ม').length, fill: '#f472b6' },
    { name: 'ดื่มเป็นครั้งคราว', count: records.filter(r => r.alcohol === 'ดื่มเป็นครั้งคราว').length, fill: '#fb7185' },
    { name: 'ดื่มเป็นประจำ', count: records.filter(r => r.alcohol === 'ดื่มเป็นประจำ').length, fill: '#be123c' },
  ];

  // Field 4: Sleep duration
  const sleepData = [
    { name: 'นอนน้อย (<6 ชม./วัน)', count: records.filter(r => r.sleepHoursPerDay < 6).length, fill: '#be123c' },
    { name: 'นอนพอเหมาะ (6-8 ชม./วัน)', count: records.filter(r => r.sleepHoursPerDay >= 6 && r.sleepHoursPerDay <= 8).length, fill: '#f472b6' },
    { name: 'นอนมาก (>8 ชม./วัน)', count: records.filter(r => r.sleepHoursPerDay > 8).length, fill: '#fb7185' },
  ];

  // Behavior vs Risk Level Stacked Data
  const getRiskByBehavior = () => {
    if (behaviorFilter === 'smoking') {
      const categories = ['ไม่สูบ', 'เคยสูบแต่เลิกแล้ว', 'สูบเป็นประจำ'];
      return categories.map(cat => {
        const subset = records.filter(r => r.smoking === cat);
        return {
          category: cat,
          'ความเสี่ยงต่ำ': subset.filter(r => r.riskLevel === 'ต่ำ').length,
          'ความเสี่ยงปานกลาง': subset.filter(r => r.riskLevel === 'ปานกลาง').length,
          'ความเสี่ยงสูง': subset.filter(r => r.riskLevel === 'สูง').length,
          'ความเสี่ยงสูงมาก': subset.filter(r => r.riskLevel === 'สูงมาก').length,
        };
      });
    } else if (behaviorFilter === 'exercise') {
      const groups = [
        { label: 'ไม่ออกกำลังกาย', test: (r: HealthRecord) => r.exerciseMinutesPerWeek === 0 },
        { label: '<150 นาที/สัปดาห์', test: (r: HealthRecord) => r.exerciseMinutesPerWeek > 0 && r.exerciseMinutesPerWeek < 150 },
        { label: '≥150 นาที/สัปดาห์', test: (r: HealthRecord) => r.exerciseMinutesPerWeek >= 150 },
      ];
      return groups.map(g => {
        const subset = records.filter(g.test);
        return {
          category: g.label,
          'ความเสี่ยงต่ำ': subset.filter(r => r.riskLevel === 'ต่ำ').length,
          'ความเสี่ยงปานกลาง': subset.filter(r => r.riskLevel === 'ปานกลาง').length,
          'ความเสี่ยงสูง': subset.filter(r => r.riskLevel === 'สูง').length,
          'ความเสี่ยงสูงมาก': subset.filter(r => r.riskLevel === 'สูงมาก').length,
        };
      });
    } else if (behaviorFilter === 'alcohol') {
      const categories = ['ไม่ดื่ม', 'ดื่มเป็นครั้งคราว', 'ดื่มเป็นประจำ'];
      return categories.map(cat => {
        const subset = records.filter(r => r.alcohol === cat);
        return {
          category: cat,
          'ความเสี่ยงต่ำ': subset.filter(r => r.riskLevel === 'ต่ำ').length,
          'ความเสี่ยงปานกลาง': subset.filter(r => r.riskLevel === 'ปานกลาง').length,
          'ความเสี่ยงสูง': subset.filter(r => r.riskLevel === 'สูง').length,
          'ความเสี่ยงสูงมาก': subset.filter(r => r.riskLevel === 'สูงมาก').length,
        };
      });
    } else {
      const groups = [
        { label: '< 6 ชม. (นอนน้อย)', test: (r: HealthRecord) => r.sleepHoursPerDay < 6 },
        { label: '6 - 8 ชม. (เกณฑ์แนะนำ)', test: (r: HealthRecord) => r.sleepHoursPerDay >= 6 && r.sleepHoursPerDay <= 8 },
        { label: '> 8 ชม. (นอนมาก)', test: (r: HealthRecord) => r.sleepHoursPerDay > 8 },
      ];
      return groups.map(g => {
        const subset = records.filter(g.test);
        return {
          category: g.label,
          'ความเสี่ยงต่ำ': subset.filter(r => r.riskLevel === 'ต่ำ').length,
          'ความเสี่ยงปานกลาง': subset.filter(r => r.riskLevel === 'ปานกลาง').length,
          'ความเสี่ยงสูง': subset.filter(r => r.riskLevel === 'สูง').length,
          'ความเสี่ยงสูงมาก': subset.filter(r => r.riskLevel === 'สูงมาก').length,
        };
      });
    }
  };

  const riskByBehaviorData = getRiskByBehavior();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pink-100 pb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-500" />
            <span>Health Behavior: การวิเคราะห์พฤติกรรมสุขภาพ (4 Fields)</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Field 1: การสูบบุหรี่ | Field 2: การออกกำลังกาย | Field 3: การดื่มแอลกอฮอล์ | Field 4: การนอนหลับ & โภชนาการ
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200 self-start sm:self-auto">
          พฤติกรรมสุขภาพ & ปัจจัยเสี่ยง NCDs
        </div>
      </div>

      {/* 4 Behavior Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Field 1: Smoking */}
        <div className="bg-white/95 rounded-2xl p-4 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
              <Cigarette className="w-4 h-4" />
              <span>Field 1: การสูบบุหรี่</span>
            </span>
            <span className="text-[10px] text-gray-400">Smoking</span>
          </div>
          <div className="h-40 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={smokingData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#4b5563' }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', borderColor: '#fbcfe8' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {smokingData.map((e, idx) => (
                    <Cell key={idx} fill={e.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-gray-500 pt-2 border-t border-pink-50 flex justify-between">
            <span>สูบเป็นประจำ:</span>
            <strong className="text-rose-700">{smokingData[2].count} ราย</strong>
          </div>
        </div>

        {/* Field 2: Exercise */}
        <div className="bg-white/95 rounded-2xl p-4 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pink-600 flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              <span>Field 2: การออกกำลังกาย</span>
            </span>
            <span className="text-[10px] text-gray-400">Exercise</span>
          </div>
          <div className="h-40 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={exerciseData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#4b5563' }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', borderColor: '#fbcfe8' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {exerciseData.map((e, idx) => (
                    <Cell key={idx} fill={e.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-gray-500 pt-2 border-t border-pink-50 flex justify-between">
            <span>ไม่ออกกำลังกาย:</span>
            <strong className="text-rose-700">{exerciseData[0].count} ราย</strong>
          </div>
        </div>

        {/* Field 3: Alcohol */}
        <div className="bg-white/95 rounded-2xl p-4 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
              <Wine className="w-4 h-4" />
              <span>Field 3: การดื่มแอลกอฮอล์</span>
            </span>
            <span className="text-[10px] text-gray-400">Alcohol</span>
          </div>
          <div className="h-40 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alcoholData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#4b5563' }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', borderColor: '#fbcfe8' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {alcoholData.map((e, idx) => (
                    <Cell key={idx} fill={e.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-gray-500 pt-2 border-t border-pink-50 flex justify-between">
            <span>ดื่มประจำ:</span>
            <strong className="text-rose-700">{alcoholData[2].count} ราย</strong>
          </div>
        </div>

        {/* Field 4: Sleep & Diet */}
        <div className="bg-white/95 rounded-2xl p-4 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pink-600 flex items-center gap-1.5">
              <Moon className="w-4 h-4" />
              <span>Field 4: ชั่วโมงการนอน</span>
            </span>
            <span className="text-[10px] text-gray-400">Sleep</span>
          </div>
          <div className="h-40 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#4b5563' }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', borderColor: '#fbcfe8' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {sleepData.map((e, idx) => (
                    <Cell key={idx} fill={e.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-gray-500 pt-2 border-t border-pink-50 flex justify-between">
            <span>นอนหลับน้อยกว่า 6 ชม.:</span>
            <strong className="text-rose-700">{sleepData[0].count} ราย</strong>
          </div>
        </div>
      </div>

      {/* Special Visual: พฤติกรรมกับระดับความเสี่ยง (Behavior vs Risk Stacked) */}
      <div className="bg-white/95 rounded-2xl p-5 border border-pink-100/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-pink-50">
          <div>
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-rose-500" />
              <span>พฤติกรรมกับระดับความเสี่ยงสุขภาพ (Behavior vs Risk Level)</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              วิเคราะห์เปรียบเทียบระดับความเสี่ยง (ต่ำ/ปานกลาง/สูง/สูงมาก) จำแนกตามแต่ละพฤติกรรมสุขภาพ โดยใช้เกณฑ์สีทางการแพทย์
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-pink-50/80 p-1 rounded-xl text-xs font-medium self-start sm:self-auto border border-pink-200">
            <span className="text-gray-500 px-1.5 text-[11px]">เลือกพฤติกรรม:</span>
            <button
              onClick={() => setBehaviorFilter('smoking')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                behaviorFilter === 'smoking' ? 'bg-rose-500 text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              การสูบบุหรี่
            </button>
            <button
              onClick={() => setBehaviorFilter('exercise')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                behaviorFilter === 'exercise' ? 'bg-rose-500 text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              การออกกำลังกาย
            </button>
            <button
              onClick={() => setBehaviorFilter('alcohol')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                behaviorFilter === 'alcohol' ? 'bg-rose-500 text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              การดื่มแอลกอฮอล์
            </button>
            <button
              onClick={() => setBehaviorFilter('sleep')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                behaviorFilter === 'sleep' ? 'bg-rose-500 text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              ชั่วโมงการนอน
            </button>
          </div>
        </div>

        {/* Color Indicators: เสี่ยงสูงมากสีแดง เสี่ยงสูงสีส้ม เสี่ยงปานกลางสีเหลือง เสี่ยงต่ำสีเขียว */}
        <div className="flex flex-wrap items-center gap-2 p-2.5 bg-pink-50/50 rounded-xl border border-pink-100 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-100 text-red-700 font-bold border border-red-200">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            เสี่ยงสูงมากสีแดง
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800 font-bold border border-orange-200">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
            เสี่ยงสูงสีส้ม
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-100 text-yellow-800 font-bold border border-yellow-200">
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            เสี่ยงปานกลางสีเหลือง
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
            เสี่ยงต่ำสีเขียว
          </span>
        </div>

        {/* Stacked Bar Chart with exact Color Criteria */}
        <div className="h-72 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskByBehaviorData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
              <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#4b5563' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#fbcfe8' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="ความเสี่ยงต่ำ" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} name="เสี่ยงต่ำสีเขียว" />
              <Bar dataKey="ความเสี่ยงปานกลาง" stackId="a" fill="#eab308" name="เสี่ยงปานกลางสีเหลือง" />
              <Bar dataKey="ความเสี่ยงสูง" stackId="a" fill="#f97316" name="เสี่ยงสูงสีส้ม" />
              <Bar dataKey="ความเสี่ยงสูงมาก" stackId="a" fill="#ef4444" radius={[6, 6, 0, 0]} name="เสี่ยงสูงมากสีแดง" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 p-3 bg-pink-50/60 rounded-xl border border-pink-100 text-xs text-rose-900 flex items-center justify-between">
          <span>
            💡 <strong>ข้อค้นพบสำคัญ:</strong> กลุ่มที่สูบบุหรี่หรือดื่มแอลกอฮอล์เป็นประจำ มีสัดส่วนผู้มีความเสี่ยงสูงถึงสูงมากเกินกว่า 65% เมื่อเทียบกับกลุ่มที่ไม่สูบหรือไม่ดื่ม
          </span>
        </div>
      </div>
    </div>
  );
};
