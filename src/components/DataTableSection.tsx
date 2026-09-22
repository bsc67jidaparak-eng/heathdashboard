import React, { useState, useMemo } from 'react';
import { 
  TableProperties, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  Eye, 
  AlertOctagon, 
  CheckCircle2, 
  Info,
  HeartPulse
} from 'lucide-react';
import { HealthRecord } from '../types';
import { PatientModal } from './PatientModal';

interface DataTableSectionProps {
  records: HealthRecord[];
}

type SortField = 'id' | 'name' | 'age' | 'bmi' | 'fastingBloodSugar' | 'systolicBP' | 'cholesterol' | 'riskLevel';
type SortOrder = 'asc' | 'desc';
type CohortView = 'all' | 'high-risk' | 'diabetes' | 'hypertension' | 'obese';

export const DataTableSection: React.FC<DataTableSectionProps> = ({ records }) => {
  const [cohortView, setCohortView] = useState<CohortView>('all');
  const [sortField, setSortField] = useState<SortField>('riskLevel');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState<HealthRecord | null>(null);
  const pageSize = 10;

  // Filter based on cohort view
  const cohortFilteredRecords = useMemo(() => {
    switch (cohortView) {
      case 'high-risk':
        return records.filter(r => r.riskLevel === 'สูง' || r.riskLevel === 'สูงมาก');
      case 'diabetes':
        return records.filter(r => r.fastingBloodSugar >= 100);
      case 'hypertension':
        return records.filter(r => r.systolicBP >= 130);
      case 'obese':
        return records.filter(r => r.bmi >= 25);
      default:
        return records;
    }
  }, [records, cohortView]);

  // Sorting
  const sortedRecords = useMemo(() => {
    const riskWeight = { 'สูงมาก': 4, 'สูง': 3, 'ปานกลาง': 2, 'ต่ำ': 1 };

    return [...cohortFilteredRecords].sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'riskLevel') {
        valA = riskWeight[a.riskLevel] || 0;
        valB = riskWeight[b.riskLevel] || 0;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [cohortFilteredRecords, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, currentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'HN', 'ชื่อ-นามสกุล', 'เพศ', 'อายุ', 'จังหวัด', 'ภูมิภาค',
      'ส่วนสูง(cm)', 'น้ำหนัก(kg)', 'BMI', 'ผลBMI',
      'ความดันSystolic', 'ความดันDiastolic', 'ผลความดัน',
      'น้ำตาลในเลือด(FBS)', 'ผลน้ำตาล', 'คอเลสเตอรอล',
      'การสูบบุหรี่', 'การดื่มแอลกอฮอล์', 'ออกกำลังกาย(นาที/สัปดาห์)',
      'ชั่วโมงนอน', 'ระดับความเสี่ยง', 'วันที่ตรวจ'
    ];

    const rows = sortedRecords.map(r => [
      r.id, `"${r.name}"`, r.gender, r.age, `"${r.province}"`, `"${r.region}"`,
      r.height, r.weight, r.bmi, `"${r.bmiCategory}"`,
      r.systolicBP, r.diastolicBP, `"${r.bloodPressureCategory}"`,
      r.fastingBloodSugar, `"${r.bloodSugarCategory}"`, r.cholesterol,
      `"${r.smoking}"`, `"${r.alcohol}"`, r.exerciseMinutesPerWeek,
      r.sleepHoursPerDay, `"${r.riskLevel}"`, r.checkupDate
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `health_overview_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Section Header & Deep-Dive Topic */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-100 pb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <TableProperties className="w-5 h-5 text-rose-500" />
            <span>ส่วนรายละเอียดเชิงลึก: ตารางข้อมูลสุขภาพรายบุคคล (Detail View)</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            <strong>ประเด็นเชิงลึก:</strong> การคัดกรองกลุ่มเสี่ยงสูงเร่งด่วน (Urgent High-Risk Cohort) และภาวะโรคร่วม (Co-morbidities)
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white text-xs font-medium transition-all shadow-sm self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>ส่งออกไฟล์ CSV</span>
        </button>
      </div>

      {/* Cohort Insight Banner */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-2xl border border-pink-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800">
              ข้อค้นพบเชิงลึก (Clinical Deep-Dive Insight)
            </h4>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
              ผู้รับการตรวจที่มีค่า BMI ≥ 25 kg/m² ร่วมกับระดับน้ำตาล FBS ≥ 126 mg/dL และความดันโลหิต Systolic ≥ 140 mmHg จัดเป็น 
              <span className="text-rose-700 font-semibold ml-1">"กลุ่มเสี่ยงสูงเร่งด่วนที่มีโรคร่วมซ้ำซ้อน"</span> ซึ่งจำเป็นต้องได้รับการติดตามอย่างใกล้ชิด
            </p>
          </div>
        </div>

        {/* Cohort filter pills */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <button
            onClick={() => { setCohortView('all'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              cohortView === 'all'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-pink-100/60 border border-pink-100'
            }`}
          >
            ทั้งหมด ({records.length})
          </button>
          <button
            onClick={() => { setCohortView('high-risk'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              cohortView === 'high-risk'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-rose-700 hover:bg-rose-100/60 border border-rose-200'
            }`}
          >
            🚨 เสี่ยงสูงเร่งด่วน ({records.filter(r => r.riskLevel === 'สูง' || r.riskLevel === 'สูงมาก').length})
          </button>
          <button
            onClick={() => { setCohortView('diabetes'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              cohortView === 'diabetes'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-pink-100/60 border border-pink-100'
            }`}
          >
            เสี่ยงเบาหวาน ({records.filter(r => r.fastingBloodSugar >= 100).length})
          </button>
          <button
            onClick={() => { setCohortView('hypertension'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              cohortView === 'hypertension'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-pink-100/60 border border-pink-100'
            }`}
          >
            ความดันสูง ({records.filter(r => r.systolicBP >= 130).length})
          </button>
          <button
            onClick={() => { setCohortView('obese'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              cohortView === 'obese'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-pink-100/60 border border-pink-100'
            }`}
          >
            ภาวะอ้วน ({records.filter(r => r.bmi >= 25).length})
          </button>
        </div>
      </div>

      {/* Color Indicators: เสี่ยงสูงมากสีแดง เสี่ยงสูงสีส้ม เสี่ยงปานกลางสีเหลือง และเสี่ยงต่ำสีเขียว */}
      <div className="flex flex-wrap items-center gap-2.5 p-3 bg-pink-50/50 rounded-xl border border-pink-100 text-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-300 font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
          เสี่ยงสูงมากสีแดง
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-300 font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
          เสี่ยงสูงสีส้ม
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300 font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
          เสี่ยงปานกลางสีเหลือง
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          เสี่ยงต่ำสีเขียว
        </span>
      </div>

      {/* Main Table with Conditional Formatting */}
      <div className="bg-white/95 rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-pink-50/70 border-b border-pink-100 text-gray-600 font-semibold">
                <th 
                  onClick={() => handleSort('id')} 
                  className="py-3 px-4 cursor-pointer hover:text-pink-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>รหัส HN</span>
                    <ArrowUpDown className="w-3 h-3 text-pink-400" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('name')} 
                  className="py-3 px-4 cursor-pointer hover:text-pink-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>ชื่อ - นามสกุล</span>
                    <ArrowUpDown className="w-3 h-3 text-pink-400" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('age')} 
                  className="py-3 px-3 cursor-pointer hover:text-pink-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>เพศ / อายุ</span>
                    <ArrowUpDown className="w-3 h-3 text-pink-400" />
                  </div>
                </th>
                <th className="py-3 px-3">พื้นที่</th>
                <th 
                  onClick={() => handleSort('bmi')} 
                  className="py-3 px-3 cursor-pointer hover:text-pink-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>BMI (kg/m²)</span>
                    <ArrowUpDown className="w-3 h-3 text-pink-400" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('fastingBloodSugar')} 
                  className="py-3 px-3 cursor-pointer hover:text-pink-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>น้ำตาล (FBS)</span>
                    <ArrowUpDown className="w-3 h-3 text-pink-400" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('systolicBP')} 
                  className="py-3 px-3 cursor-pointer hover:text-pink-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>ความดัน (BP)</span>
                    <ArrowUpDown className="w-3 h-3 text-pink-400" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('cholesterol')} 
                  className="py-3 px-3 cursor-pointer hover:text-pink-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>คอเลสเตอรอล</span>
                    <ArrowUpDown className="w-3 h-3 text-pink-400" />
                  </div>
                </th>
                <th className="py-3 px-3">พฤติกรรมเสี่ยง</th>
                <th 
                  onClick={() => handleSort('riskLevel')} 
                  className="py-3 px-4 cursor-pointer hover:text-pink-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>ระดับความเสี่ยง</span>
                    <ArrowUpDown className="w-3 h-3 text-pink-400" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center">ดูรายละเอียด</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-gray-500">
                    ไม่พบข้อมูลสุขภาพที่ตรงตามเงื่อนไข
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((r) => {
                  // Conditional formatting logic
                  const isVeryHigh = r.riskLevel === 'สูงมาก';
                  const isHigh = r.riskLevel === 'สูง';
                  const isModerate = r.riskLevel === 'ปานกลาง';

                  // Row background styling based on risk (Red, Orange, Yellow, Green)
                  let rowBg = 'hover:bg-pink-50/40 transition-colors';
                  if (isVeryHigh) {
                    rowBg = 'bg-red-50/50 hover:bg-red-100/60 transition-colors';
                  } else if (isHigh) {
                    rowBg = 'bg-orange-50/40 hover:bg-orange-100/50 transition-colors';
                  } else if (isModerate) {
                    rowBg = 'bg-yellow-50/30 hover:bg-yellow-100/40 transition-colors';
                  }

                  return (
                    <tr key={r.id} className={rowBg}>
                      {/* HN */}
                      <td className="py-3 px-4 font-mono font-medium text-gray-700">
                        {r.id}
                      </td>

                      {/* Name */}
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {r.name}
                      </td>

                      {/* Gender & Age */}
                      <td className="py-3 px-3 text-gray-600">
                        {r.gender} • {r.age} ปี
                      </td>

                      {/* Location */}
                      <td className="py-3 px-3 text-gray-600">
                        <span className="font-medium text-gray-800">{r.province}</span>
                        <div className="text-[10px] text-gray-400">{r.region}</div>
                      </td>

                      {/* BMI with Conditional Formatting */}
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium text-xs ${
                          r.bmi >= 25
                            ? 'bg-rose-100 text-rose-800 font-bold border border-rose-200'
                            : r.bmi >= 23
                            ? 'bg-pink-100 text-pink-700 border border-pink-200'
                            : 'text-gray-700'
                        }`}>
                          {r.bmi}
                        </span>
                      </td>

                      {/* FBS with Conditional Formatting */}
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium text-xs ${
                          r.fastingBloodSugar >= 126
                            ? 'bg-red-100 text-red-800 font-bold border border-red-200'
                            : r.fastingBloodSugar >= 100
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'text-gray-700'
                        }`}>
                          {r.fastingBloodSugar} mg/dL
                        </span>
                      </td>

                      {/* BP with Conditional Formatting */}
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium text-xs ${
                          r.systolicBP >= 140
                            ? 'bg-red-100 text-red-800 font-bold border border-red-200'
                            : r.systolicBP >= 130
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'text-gray-700'
                        }`}>
                          {r.systolicBP}/{r.diastolicBP}
                        </span>
                      </td>

                      {/* Cholesterol with Conditional Formatting */}
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium text-xs ${
                          r.cholesterol >= 240
                            ? 'bg-red-100 text-red-800 font-bold border border-red-200'
                            : r.cholesterol >= 200
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'text-gray-700'
                        }`}>
                          {r.cholesterol}
                        </span>
                      </td>

                      {/* Risk Behaviors */}
                      <td className="py-3 px-3 text-[11px] text-gray-500">
                        {r.smoking === 'สูบเป็นประจำ' && (
                          <span className="inline-block bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded mr-1">
                            สูบบุหรี่
                          </span>
                        )}
                        {r.alcohol === 'ดื่มเป็นประจำ' && (
                          <span className="inline-block bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded mr-1">
                            ดื่มเหล้า
                          </span>
                        )}
                        {r.exerciseMinutesPerWeek === 0 && (
                          <span className="inline-block bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                            ไม่ออกกำลัง
                          </span>
                        )}
                        {r.smoking === 'ไม่สูบ' && r.alcohol === 'ไม่ดื่ม' && r.exerciseMinutesPerWeek > 0 && (
                          <span className="text-emerald-600">พฤติกรรมดี</span>
                        )}
                      </td>

                      {/* Overall Risk Badge (Enforcing Red, Orange, Yellow, Green) */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border shadow-2xs ${
                          isVeryHigh
                            ? 'bg-red-100 text-red-700 border-red-300'
                            : isHigh
                            ? 'bg-orange-100 text-orange-800 border-orange-300'
                            : isModerate
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            isVeryHigh
                              ? 'bg-[#ef4444]'
                              : isHigh
                              ? 'bg-[#f97316]'
                              : isModerate
                              ? 'bg-[#eab308]'
                              : 'bg-[#22c55e]'
                          }`} />
                          {isVeryHigh && <AlertOctagon className="w-3 h-3 text-red-700" />}
                          {!isVeryHigh && isHigh && <AlertOctagon className="w-3 h-3 text-orange-600" />}
                          {!isHigh && !isVeryHigh && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          <span>
                            {isVeryHigh ? 'เสี่ยงสูงมากสีแดง' : isHigh ? 'เสี่ยงสูงสีส้ม' : isModerate ? 'เสี่ยงปานกลางสีเหลือง' : 'เสี่ยงต่ำสีเขียว'}
                          </span>
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setSelectedPatient(r)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 font-medium text-xs border border-pink-200 transition-colors"
                          title="ดูผลตรวจสุขภาพรายบุคคล"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>ดูข้อมูล</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Summary footer */}
        <div className="p-4 bg-white border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div>
            แสดงผลรายการที่ {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, sortedRecords.length)} จากทั้งหมด {sortedRecords.length} รายการ
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-pink-200 text-gray-600 hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium text-gray-800 px-2">
              หน้า {currentPage} จาก {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-pink-200 text-gray-600 hover:bg-pink-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Patient Detail Modal */}
      <PatientModal
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />
    </div>
  );
};
