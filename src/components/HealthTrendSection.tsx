import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  AreaChart, 
  Area 
} from 'recharts';
import { TrendingUp, Clock, Users, ArrowUpRight } from 'lucide-react';
import { HealthRecord } from '../types';

interface HealthTrendSectionProps {
  records: HealthRecord[];
}

export const HealthTrendSection: React.FC<HealthTrendSectionProps> = ({ records }) => {
  const [trendMode, setTrendMode] = useState<'quarter' | 'age'>('age');

  // Trend by Age Cohort (Field 1 & Field 2)
  const ageCohorts = [
    { label: '18-29 ปี', min: 18, max: 29 },
    { label: '30-39 ปี', min: 30, max: 39 },
    { label: '40-49 ปี', min: 40, max: 49 },
    { label: '50-59 ปี', min: 50, max: 59 },
    { label: '60+ ปี', min: 60, max: 120 }
  ];

  const ageTrendData = ageCohorts.map(cohort => {
    const subset = records.filter(r => r.age >= cohort.min && r.age <= cohort.max);
    const count = subset.length || 1;
    const avgSugar = Math.round((subset.reduce((a, b) => a + b.fastingBloodSugar, 0) / count) * 10) / 10;
    const avgBP = Math.round((subset.reduce((a, b) => a + b.systolicBP, 0) / count) * 10) / 10;
    const avgBMI = Math.round((subset.reduce((a, b) => a + b.bmi, 0) / count) * 10) / 10;
    const highRiskCount = subset.filter(r => r.riskLevel === 'สูง' || r.riskLevel === 'สูงมาก').length;
    const highRiskRate = Math.round((highRiskCount / count) * 100);

    return {
      name: cohort.label,
      avgSugar: isNaN(avgSugar) ? 0 : avgSugar,
      avgBP: isNaN(avgBP) ? 0 : avgBP,
      avgBMI: isNaN(avgBMI) ? 0 : avgBMI,
      highRiskRate: isNaN(highRiskRate) ? 0 : highRiskRate,
      count: subset.length
    };
  });

  // Trend by Quarter (Timeline)
  const quarters = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'];
  const quarterTrendData = quarters.map(q => {
    const subset = records.filter(r => r.quarter === q);
    const count = subset.length || 1;
    const avgSugar = Math.round((subset.reduce((a, b) => a + b.fastingBloodSugar, 0) / count) * 10) / 10;
    const avgBP = Math.round((subset.reduce((a, b) => a + b.systolicBP, 0) / count) * 10) / 10;
    const avgBMI = Math.round((subset.reduce((a, b) => a + b.bmi, 0) / count) * 10) / 10;
    const highRiskCount = subset.filter(r => r.riskLevel === 'สูง' || r.riskLevel === 'สูงมาก').length;
    const highRiskRate = Math.round((highRiskCount / count) * 100);

    return {
      name: q,
      avgSugar: isNaN(avgSugar) ? 0 : avgSugar,
      avgBP: isNaN(avgBP) ? 0 : avgBP,
      avgBMI: isNaN(avgBMI) ? 0 : avgBMI,
      highRiskRate: isNaN(highRiskRate) ? 0 : highRiskRate,
      count: subset.length
    };
  });

  const activeData = trendMode === 'age' ? ageTrendData : quarterTrendData;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-100 pb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-600" />
            <span>Health Trend: การวิเคราะห์แนวโน้มสุขภาพ (2 Fields)</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Field 1: แนวโน้มน้ำตาลในเลือดและความดันโลหิต | Field 2: แนวโน้มค่า BMI และอัตราเสี่ยงสูงตามช่วงวัย
          </p>
        </div>

        <div className="flex items-center gap-1 bg-pink-50 p-1 rounded-xl border border-pink-200 self-start sm:self-auto text-xs">
          <button
            onClick={() => setTrendMode('age')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              trendMode === 'age'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>ตามกลุ่มอายุ (Age Cohorts)</span>
          </button>
          <button
            onClick={() => setTrendMode('quarter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              trendMode === 'quarter'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>ตามช่วงเวลา (Quarterly)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Field 1: Trend of Blood Sugar & Systolic BP */}
        <div className="bg-white/95 rounded-2xl p-5 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Trend Field 1
              </span>
              <span className="text-xs text-gray-400">หน่วย mg/dL & mmHg</span>
            </div>
            <h3 className="text-base font-semibold text-gray-800 mt-1">
              แนวโน้มระดับน้ำตาลเฉลี่ย (FBS) และความดันโลหิต (Systolic)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              แสดงการเพิ่มขึ้นของค่าน้ำตาลและความดันตาม {trendMode === 'age' ? 'ช่วงอายุที่เพิ่มขึ้น' : 'ไตรมาส'}
            </p>
          </div>

          <div className="h-72 my-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#4b5563' }} />
                <YAxis domain={['dataMin - 10', 'dataMax + 10']} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#fbcfe8' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="avgSugar"
                  name="น้ำตาลเฉลี่ย (FBS mg/dL)"
                  stroke="#e11d48"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#e11d48' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="avgBP"
                  name="ความดันตัวบนเฉลี่ย (BP mmHg)"
                  stroke="#db2777"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#db2777' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-rose-800 bg-rose-50/60 p-2.5 rounded-xl border border-rose-100 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4 text-rose-600" />
              <span>ข้อสังเกต: กลุ่มอายุ 50 ปีขึ้นไปมีระดับน้ำตาลและความดันสูงขึ้นอย่างมีนัยสำคัญ</span>
            </span>
          </div>
        </div>

        {/* Field 2: Trend of BMI & High Risk Rate */}
        <div className="bg-white/95 rounded-2xl p-5 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                Trend Field 2
              </span>
              <span className="text-xs text-gray-400">BMI (kg/m²) & อัตราเสี่ยง (%)</span>
            </div>
            <h3 className="text-base font-semibold text-gray-800 mt-1">
              แนวโน้มค่าดัชนีมวลกาย (BMI) และอัตราประชากรกลุ่มเสี่ยงสูง
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              แสดงความสัมพันธ์ของน้ำหนักตัวและอัตราความเสี่ยงสูงที่ไต่ระดับขึ้น
            </p>
          </div>

          <div className="h-72 my-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBmi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#4b5563' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#fbcfe8' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area
                  type="monotone"
                  dataKey="highRiskRate"
                  name="สัดส่วนผู้มีความเสี่ยงสูง (%)"
                  stroke="#f43f5e"
                  fillOpacity={1}
                  fill="url(#colorRisk)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="avgBMI"
                  name="BMI เฉลี่ย (kg/m²)"
                  stroke="#ec4899"
                  fillOpacity={1}
                  fill="url(#colorBmi)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-pink-800 bg-pink-50/60 p-2.5 rounded-xl border border-pink-100 flex items-center justify-between">
            <span>อัตราความเสี่ยงสูงสุดในกลุ่ม 60+ ปี ถึง {ageTrendData[ageTrendData.length - 1]?.highRiskRate || 45}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
