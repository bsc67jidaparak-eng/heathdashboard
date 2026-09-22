import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { GitFork, MapPin, Users, Scale, Droplet, Heart } from 'lucide-react';
import { HealthRecord } from '../types';

interface CorrelationsSectionProps {
  records: HealthRecord[];
}

export const CorrelationsSection: React.FC<CorrelationsSectionProps> = ({ records }) => {
  const [scatterMetric, setScatterMetric] = useState<'sugar' | 'bp'>('sugar');

  // Scatter 1: BMI vs Blood Sugar
  const bmiVsSugarData = records.map(r => ({
    x: r.bmi,
    y: r.fastingBloodSugar,
    name: r.name,
    age: r.age,
    risk: r.riskLevel,
    color: r.riskLevel === 'สูงมาก' ? '#ef4444' : r.riskLevel === 'สูง' ? '#f97316' : r.riskLevel === 'ปานกลาง' ? '#eab308' : '#22c55e'
  }));

  // Scatter 2: BMI vs Systolic BP
  const bmiVsBPData = records.map(r => ({
    x: r.bmi,
    y: r.systolicBP,
    name: r.name,
    age: r.age,
    risk: r.riskLevel,
    color: r.riskLevel === 'สูงมาก' ? '#ef4444' : r.riskLevel === 'สูง' ? '#f97316' : r.riskLevel === 'ปานกลาง' ? '#eab308' : '#22c55e'
  }));

  // High-Risk Age Groups
  const ageGroupLabels = [
    { label: '18-29 ปี (วัยรุ่น/เริ่มทำงาน)', min: 18, max: 29 },
    { label: '30-44 ปี (วัยทำงาน)', min: 30, max: 44 },
    { label: '45-59 ปี (วัยกลางคน)', min: 45, max: 59 },
    { label: '60 ปีขึ้นไป (ผู้สูงอายุ)', min: 60, max: 120 },
  ];

  const highRiskAgeData = ageGroupLabels.map(grp => {
    const subset = records.filter(r => r.age >= grp.min && r.age <= grp.max);
    const totalInGroup = subset.length || 1;
    const highRiskCount = subset.filter(r => r.riskLevel === 'สูง' || r.riskLevel === 'สูงมาก').length;
    const percentage = Math.round((highRiskCount / totalInGroup) * 100);

    return {
      group: grp.label,
      highRiskCount,
      total: subset.length,
      percentage
    };
  });

  // High-Risk Regions / Provinces
  const regionMap = new Map<string, { total: number; highRisk: number }>();
  records.forEach(r => {
    const cur = regionMap.get(r.region) || { total: 0, highRisk: 0 };
    cur.total += 1;
    if (r.riskLevel === 'สูง' || r.riskLevel === 'สูงมาก') {
      cur.highRisk += 1;
    }
    regionMap.set(r.region, cur);
  });

  const highRiskRegionData = Array.from(regionMap.entries())
    .map(([region, stat]) => ({
      region,
      total: stat.total,
      highRisk: stat.highRisk,
      percentage: Math.round((stat.highRisk / (stat.total || 1)) * 100)
    }))
    .sort((a, b) => b.highRisk - a.highRisk);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pink-100 pb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <GitFork className="w-5 h-5 text-pink-600" />
            <span>การวิเคราะห์ความสัมพันธ์เชิงลึกและกลุ่มเป้าหมายเสี่ยงสูง</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            วิเคราะห์สหสัมพันธ์ (BMI vs น้ำตาล, BMI vs ความดัน) และการกระจายตัวในกลุ่มอายุและภูมิภาค
          </p>
        </div>
      </div>

      {/* Top Section: Correlation Scatter Plots (BMI vs Sugar / BP) */}
      <div className="bg-white/95 rounded-2xl p-5 border border-pink-100/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-pink-50">
          <div>
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <Scale className="w-4 h-4 text-pink-500" />
              <span>
                ความสัมพันธ์ระหว่าง BMI กับ {scatterMetric === 'sugar' ? 'ระดับน้ำตาลในเลือด' : 'ความดันโลหิตตัวบน'}
              </span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              แผนภาพการกระจาย (Scatter Plot) แสดงจุดข้อมูลรายบุคคล พร้อมสีตามระดับความเสี่ยง
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-pink-50 p-1 rounded-xl text-xs font-medium self-start sm:self-auto border border-pink-200">
            <button
              onClick={() => setScatterMetric('sugar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                scatterMetric === 'sugar' ? 'bg-rose-500 text-white shadow-xs' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              <Droplet className="w-3.5 h-3.5" />
              <span>BMI vs น้ำตาล (FBS)</span>
            </button>
            <button
              onClick={() => setScatterMetric('bp')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                scatterMetric === 'bp' ? 'bg-rose-500 text-white shadow-xs' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>BMI vs ความดัน (BP)</span>
            </button>
          </div>
        </div>

        <div className="h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
              <XAxis
                type="number"
                dataKey="x"
                name="BMI"
                unit=" kg/m²"
                domain={[16, 36]}
                tick={{ fontSize: 11, fill: '#4b5563' }}
                label={{ value: 'ดัชนีมวลกาย (BMI kg/m²)', position: 'insideBottom', offset: -10, fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name={scatterMetric === 'sugar' ? 'น้ำตาลในเลือด' : 'ความดันตัวบน'}
                unit={scatterMetric === 'sugar' ? ' mg/dL' : ' mmHg'}
                domain={scatterMetric === 'sugar' ? [70, 200] : [90, 200]}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                label={{
                  value: scatterMetric === 'sugar' ? 'น้ำตาลในเลือด (FBS mg/dL)' : 'ความดันตัวบน (Systolic mmHg)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 15,
                  fontSize: 12,
                  fill: '#6b7280'
                }}
              />
              <ZAxis range={[50, 60]} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded-xl shadow-lg border border-pink-200 text-xs space-y-1">
                        <div className="font-bold text-gray-800">{data.name} (อายุ {data.age} ปี)</div>
                        <div className="text-gray-600">BMI: <strong className="text-pink-600">{data.x}</strong> kg/m²</div>
                        <div className="text-gray-600">
                          {scatterMetric === 'sugar' ? 'น้ำตาล (FBS):' : 'ความดัน (Systolic):'}
                          <strong className="text-rose-600 ml-1">{data.y}</strong> {scatterMetric === 'sugar' ? 'mg/dL' : 'mmHg'}
                        </div>
                        <div className="pt-1 border-t border-pink-100 flex items-center justify-between">
                          <span className="text-[10px] text-gray-400">ระดับความเสี่ยง:</span>
                          <span className="font-semibold text-rose-700">{data.risk}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter
                name="ผู้รับการตรวจ"
                data={scatterMetric === 'sugar' ? bmiVsSugarData : bmiVsBPData}
              >
                {(scatterMetric === 'sugar' ? bmiVsSugarData : bmiVsBPData).map((entry, index) => (
                  <Cell key={`scatter-cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 p-3 bg-pink-50/50 rounded-xl border border-pink-100 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-gray-700 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]" /> เสี่ยงสูงมากสีแดง
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#f97316]" /> เสี่ยงสูงสีส้ม
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#eab308]" /> เสี่ยงปานกลางสีเหลือง
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#22c55e]" /> เสี่ยงต่ำสีเขียว
            </span>
          </div>
          <span className="text-rose-700 font-medium text-[11px]">
            สหสัมพันธ์เชิงบวก: เมื่อค่า BMI สูงขึ้น มีแนวโน้มที่น้ำตาลและความดันจะสูงขึ้นตามไปด้วย
          </span>
        </div>
      </div>

      {/* Bottom Row: High Risk Age Groups & High Risk Regions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* กลุ่มอายุที่มีความเสี่ยงสูง */}
        <div className="bg-white/95 rounded-2xl p-5 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>กลุ่มอายุที่มีความเสี่ยงสูง (Age Risk Distribution)</span>
              </span>
              <span className="text-xs text-gray-400">สัดส่วนเสี่ยงสูง</span>
            </div>
            <h3 className="text-base font-semibold text-gray-800 mt-1">
              อัตราผู้มีความเสี่ยงสูง (สูง/สูงมาก) จำแนกตามกลุ่มวัย
            </h3>
          </div>

          <div className="h-64 my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={highRiskAgeData} margin={{ top: 15, right: 15, left: -15, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis dataKey="group" tick={{ fontSize: 10, fill: '#4b5563' }} angle={-10} textAnchor="end" />
                <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip
                  formatter={(val: any) => [`${val}% ของกลุ่มวัย`, 'อัตราเสี่ยงสูง']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#fbcfe8' }}
                />
                <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                  {highRiskAgeData.map((entry, idx) => (
                    <Cell key={idx} fill={idx >= 2 ? '#e11d48' : '#f472b6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-gray-600 bg-pink-50/60 p-2.5 rounded-xl border border-pink-100 flex items-center justify-between">
            <span>กลุ่มอายุ 45 ปีขึ้นไป เป็นกลุ่มเป้าหมายหลักที่ต้องเฝ้าระวังโรค NCDs เร่งด่วน</span>
          </div>
        </div>

        {/* พื้นที่ที่มีผู้เสี่ยงสูง */}
        <div className="bg-white/95 rounded-2xl p-5 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>พื้นที่ที่มีผู้เสี่ยงสูง (Regional Health Risk)</span>
              </span>
              <span className="text-xs text-gray-400">จำนวนราย</span>
            </div>
            <h3 className="text-base font-semibold text-gray-800 mt-1">
              การกระจายตัวของประชากรกลุ่มเสี่ยงสูงตามภูมิภาค
            </h3>
          </div>

          <div className="h-64 my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={highRiskRegionData} margin={{ top: 10, right: 25, left: 35, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#6b7280' }} />
                <YAxis dataKey="region" type="category" tick={{ fontSize: 10, fill: '#4b5563' }} />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => [
                    `${val} ราย (คิดเป็น ${item.payload.percentage}% ของพื้นที่)`,
                    'ผู้เสี่ยงสูง'
                  ]}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#fbcfe8' }}
                />
                <Bar dataKey="highRisk" fill="#fb7185" radius={[0, 6, 6, 0]}>
                  {highRiskRegionData.map((e, idx) => (
                    <Cell key={idx} fill={idx === 0 ? '#be123c' : '#f472b6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-gray-600 bg-pink-50/60 p-2.5 rounded-xl border border-pink-100 flex items-center justify-between">
            <span>พื้นที่พบกลุ่มเสี่ยงสูงสุด: <strong>{highRiskRegionData[0]?.region || 'กรุงเทพฯ'}</strong> ({highRiskRegionData[0]?.highRisk || 0} ราย)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
