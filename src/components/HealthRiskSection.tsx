import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { ShieldAlert, Droplet, Heart, Activity, Flame, Info } from 'lucide-react';
import { HealthRecord, RISK_COLORS } from '../types';

interface HealthRiskSectionProps {
  records: HealthRecord[];
}

export const HealthRiskSection: React.FC<HealthRiskSectionProps> = ({ records }) => {
  // Field 1: Blood Sugar Breakdown (เกณฑ์สี: ปกติ=เขียว, เสี่ยง=เหลือง, เบาหวาน=แดง)
  const sugarData = [
    { name: 'ปกติ (<100)', count: records.filter(r => r.bloodSugarCategory === 'ปกติ').length, color: '#22c55e' },
    { name: 'เสี่ยงเบาหวาน (100-125)', count: records.filter(r => r.bloodSugarCategory === 'เสี่ยงเบาหวาน').length, color: '#eab308' },
    { name: 'เบาหวาน (≥126)', count: records.filter(r => r.bloodSugarCategory === 'เบาหวาน').length, color: '#ef4444' },
  ];

  // Field 2: Blood Pressure Breakdown (เกณฑ์สี: ปกติ=เขียว, ค่อนข้างสูง=เหลือง, สูง1=ส้ม, สูง2=แดง)
  const bpData = [
    { name: 'ปกติ (<120)', count: records.filter(r => r.bloodPressureCategory === 'ปกติ').length, color: '#22c55e' },
    { name: 'ค่อนข้างสูง (120-129)', count: records.filter(r => r.bloodPressureCategory === 'ความดันค่อนข้างสูง').length, color: '#eab308' },
    { name: 'ความดันสูงระดับ 1', count: records.filter(r => r.bloodPressureCategory === 'ความดันโลหิตสูงระดับ 1').length, color: '#f97316' },
    { name: 'ความดันสูงระดับ 2', count: records.filter(r => r.bloodPressureCategory === 'ความดันโลหิตสูงระดับ 2').length, color: '#ef4444' },
  ];

  // Field 3: BMI Breakdown (เกณฑ์สี: ปกติ=เขียว, น้ำหนักเกิน=เหลือง, โรคอ้วน=แดง)
  const bmiData = [
    { name: 'น้ำหนักน้อย (<18.5)', count: records.filter(r => r.bmiCategory === 'น้ำหนักน้อย').length, fill: '#60a5fa' },
    { name: 'เกณฑ์ปกติ (18.5-22.9)', count: records.filter(r => r.bmiCategory === 'ปกติ').length, fill: '#22c55e' },
    { name: 'น้ำหนักเกิน (23-24.9)', count: records.filter(r => r.bmiCategory === 'น้ำหนักเกิน').length, fill: '#eab308' },
    { name: 'โรคอ้วน (≥25)', count: records.filter(r => r.bmiCategory === 'โรคอ้วน').length, fill: '#ef4444' },
  ];

  // Field 4: Cholesterol Breakdown (เกณฑ์สี: ปกติ=เขียว, เริ่มสูง=เหลือง, สูงอันตราย=แดง)
  const cholData = [
    { name: 'ปกติ (<200)', count: records.filter(r => r.cholesterolCategory === 'ปกติ').length, color: '#22c55e' },
    { name: 'เริ่มสูง (200-239)', count: records.filter(r => r.cholesterolCategory === 'เริ่มสูง').length, color: '#eab308' },
    { name: 'สูงอันตราย (≥240)', count: records.filter(r => r.cholesterolCategory === 'สูงอันตราย').length, color: '#ef4444' },
  ];

  // Overall Risk Level Breakdown: เสี่ยงสูงมากสีแดง, เสี่ยงสูงสีส้ม, เสี่ยงปานกลางสีเหลือง, เสี่ยงต่ำสีเขียว
  const riskLevels = [
    { name: 'เสี่ยงต่ำสีเขียว', key: 'ต่ำ', count: records.filter(r => r.riskLevel === 'ต่ำ').length, color: '#22c55e', bg: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
    { name: 'เสี่ยงปานกลางสีเหลือง', key: 'ปานกลาง', count: records.filter(r => r.riskLevel === 'ปานกลาง').length, color: '#eab308', bg: 'bg-yellow-50 text-yellow-800 border-yellow-300' },
    { name: 'เสี่ยงสูงสีส้ม', key: 'สูง', count: records.filter(r => r.riskLevel === 'สูง').length, color: '#f97316', bg: 'bg-orange-50 text-orange-800 border-orange-300' },
    { name: 'เสี่ยงสูงมากสีแดง', key: 'สูงมาก', count: records.filter(r => r.riskLevel === 'สูงมาก').length, color: '#ef4444', bg: 'bg-red-50 text-red-800 border-red-300' },
  ];

  const total = records.length || 1;

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pink-100 pb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <span>Health Risk: การวิเคราะห์ความเสี่ยงสุขภาพ (4 Fields)</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            วิเคราะห์ 4 ปัจจัยเสี่ยงหลักทางการแพทย์ ได้แก่ ระดับน้ำตาลในเลือด, ความดันโลหิต, ดัชนีมวลกาย (BMI) และระดับคอเลสเตอรอล
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 self-start sm:self-auto">
          เกณฑ์มาตรฐานกระทรวงสาธารณสุข
        </div>
      </div>

      {/* Color Indicators: เสี่ยงสูงมากสีแดง เสี่ยงสูงสีส้ม เสี่ยงปานกลางสีเหลือง และเสี่ยงต่ำสีเขียว */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-2xl bg-white border border-red-200/90 shadow-2xs flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-[#ef4444] shrink-0 shadow-xs animate-pulse" />
          <div>
            <div className="text-xs font-bold text-red-700">เสี่ยงสูงมากสีแดง</div>
            <div className="text-sm font-extrabold text-gray-800">{riskLevels[3].count} คน ({Math.round(riskLevels[3].count / total * 100)}%)</div>
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-orange-200/90 shadow-2xs flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-[#f97316] shrink-0 shadow-xs" />
          <div>
            <div className="text-xs font-bold text-orange-700">เสี่ยงสูงสีส้ม</div>
            <div className="text-sm font-extrabold text-gray-800">{riskLevels[2].count} คน ({Math.round(riskLevels[2].count / total * 100)}%)</div>
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-yellow-200/90 shadow-2xs flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-[#eab308] shrink-0 shadow-xs" />
          <div>
            <div className="text-xs font-bold text-yellow-800">เสี่ยงปานกลางสีเหลือง</div>
            <div className="text-sm font-extrabold text-gray-800">{riskLevels[1].count} คน ({Math.round(riskLevels[1].count / total * 100)}%)</div>
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-emerald-200/90 shadow-2xs flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-[#22c55e] shrink-0 shadow-xs" />
          <div>
            <div className="text-xs font-bold text-emerald-700">เสี่ยงต่ำสีเขียว</div>
            <div className="text-sm font-extrabold text-gray-800">{riskLevels[0].count} คน ({Math.round(riskLevels[0].count / total * 100)}%)</div>
          </div>
        </div>
      </div>

      {/* Top Row: Overall Risk Pie & Field 1 (Blood Sugar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Overall Risk Donut */}
        <div className="lg:col-span-5 bg-white/95 rounded-2xl p-5 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                Overall Risk Assessment
              </span>
              <span className="text-xs text-gray-400">ประเมิน 4 ระดับสี</span>
            </div>
            <h3 className="text-base font-semibold text-gray-800 mt-1">
              สัดส่วนระดับความเสี่ยงสุขภาพรวม (Risk Level)
            </h3>
          </div>

          <div className="h-64 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskLevels}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {riskLevels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `${value} คน (${Math.round((Number(value) / total) * 100)}%)`,
                    name
                  ]}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#fbcfe8' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-pink-50 text-center">
            {riskLevels.map((r) => (
              <div key={r.name} className={`p-2 rounded-xl border ${r.bg}`}>
                <div className="text-[10px] font-semibold truncate">{r.name}</div>
                <div className="text-sm font-bold mt-0.5">{r.count} คน</div>
                <div className="text-[10px] font-medium">
                  {Math.round((r.count / total) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Field 1: Fasting Blood Sugar */}
        <div className="lg:col-span-7 bg-white/95 rounded-2xl p-5 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5" />
                <span>Field 1: น้ำตาลในเลือด (Fasting Blood Sugar)</span>
              </span>
              <span className="text-xs text-gray-400">mg/dL</span>
            </div>
            <h3 className="text-base font-semibold text-gray-800 mt-1">
              การกระจายตัวภาวะเบาหวานและระดับน้ำตาล
            </h3>
          </div>

          <div className="h-64 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sugarData} margin={{ top: 15, right: 20, left: -10, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#4b5563' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Tooltip
                  formatter={(value: any) => [`${value} ราย (${Math.round((Number(value) / total) * 100)}%)`, 'จำนวน']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#fbcfe8' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {sugarData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-gray-500 bg-pink-50/50 p-2.5 rounded-xl border border-pink-100 flex items-center justify-between">
            <span>เกณฑ์การคัดกรอง: ปกติ &lt;100 mg/dL | เสี่ยงเบาหวาน 100-125 mg/dL | เบาหวาน ≥126 mg/dL</span>
            <span className="font-semibold text-rose-700">
              พบภาวะเสี่ยง/เบาหวาน {sugarData[1].count + sugarData[2].count} คน
            </span>
          </div>
        </div>
      </div>

      {/* Second Row: Field 2 (Blood Pressure), Field 3 (BMI), Field 4 (Cholesterol) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Field 2: Blood Pressure */}
        <div className="bg-white/95 rounded-2xl p-5 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" />
                <span>Field 2: ความดันโลหิต</span>
              </span>
              <span className="text-xs text-gray-400">mmHg</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mt-1">
              จำแนกระดับความดันโลหิต (Systolic)
            </h3>
          </div>

          <div className="h-52 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bpData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#4b5563' }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip
                  formatter={(val: any) => [`${val} ราย`, 'จำนวน']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', borderColor: '#fbcfe8' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {bpData.map((e, idx) => (
                    <Cell key={idx} fill={e.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-gray-500 pt-2 border-t border-pink-50 flex justify-between">
            <span>ความดันสูง (ระดับ 1 & 2):</span>
            <strong className="text-rose-700">{bpData[2].count + bpData[3].count} ราย</strong>
          </div>
        </div>

        {/* Field 3: BMI */}
        <div className="bg-white/95 rounded-2xl p-5 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                <span>Field 3: ดัชนีมวลกาย (BMI)</span>
              </span>
              <span className="text-xs text-gray-400">kg/m²</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mt-1">
              ภาวะโภชนาการตามเกณฑ์เอเชีย
            </h3>
          </div>

          <div className="h-52 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bmiData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#4b5563' }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip
                  formatter={(val: any) => [`${val} ราย`, 'จำนวน']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', borderColor: '#fbcfe8' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {bmiData.map((e, idx) => (
                    <Cell key={idx} fill={e.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-gray-500 pt-2 border-t border-pink-50 flex justify-between">
            <span>กลุ่มน้ำหนักเกินและอ้วน:</span>
            <strong className="text-rose-700">{bmiData[2].count + bmiData[3].count} ราย</strong>
          </div>
        </div>

        {/* Field 4: Cholesterol */}
        <div className="bg-white/95 rounded-2xl p-5 border border-pink-100/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                <span>Field 4: คอเลสเตอรอลรวม</span>
              </span>
              <span className="text-xs text-gray-400">mg/dL</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mt-1">
              ภาวะไขมันในเลือดสูง (Cholesterol)
            </h3>
          </div>

          <div className="h-52 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cholData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#4b5563' }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip
                  formatter={(val: any) => [`${val} ราย`, 'จำนวน']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', borderColor: '#fbcfe8' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {cholData.map((e, idx) => (
                    <Cell key={idx} fill={e.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-gray-500 pt-2 border-t border-pink-50 flex justify-between">
            <span>กลุ่มระดับไขมันสูงเกินเกณฑ์:</span>
            <strong className="text-rose-700">{cholData[1].count + cholData[2].count} ราย</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
