import React from 'react';
import { X, Heart, Droplet, Activity, Flame, ShieldAlert, User, Calendar, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { HealthRecord } from '../types';

interface PatientModalProps {
  patient: HealthRecord | null;
  onClose: () => void;
}

export const PatientModal: React.FC<PatientModalProps> = ({ patient, onClose }) => {
  if (!patient) return null;

  const isHighRisk = patient.riskLevel === 'สูง' || patient.riskLevel === 'สูงมาก';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-pink-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header with Pink Gradient */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 text-2xl font-bold">
              {patient.gender === 'หญิง' ? '👩' : '👨'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 border border-white/30">
                  {patient.id}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-xs ${
                  patient.riskLevel === 'สูงมาก'
                    ? 'bg-red-600 text-white border-red-300'
                    : patient.riskLevel === 'สูง'
                    ? 'bg-orange-500 text-white border-orange-200'
                    : patient.riskLevel === 'ปานกลาง'
                    ? 'bg-yellow-400 text-yellow-950 border-yellow-200'
                    : 'bg-emerald-500 text-white border-emerald-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    patient.riskLevel === 'สูงมาก'
                      ? 'bg-white'
                      : patient.riskLevel === 'สูง'
                      ? 'bg-white'
                      : patient.riskLevel === 'ปานกลาง'
                      ? 'bg-yellow-900'
                      : 'bg-white'
                  }`} />
                  ระดับความเสี่ยง: {
                    patient.riskLevel === 'สูงมาก'
                      ? 'เสี่ยงสูงมากสีแดง'
                      : patient.riskLevel === 'สูง'
                      ? 'เสี่ยงสูงสีส้ม'
                      : patient.riskLevel === 'ปานกลาง'
                      ? 'เสี่ยงปานกลางสีเหลือง'
                      : 'เสี่ยงต่ำสีเขียว'
                  }
                </span>
              </div>
              <h3 className="text-2xl font-bold mt-1 text-white">{patient.name}</h3>
              <p className="text-xs text-pink-100 mt-0.5 flex items-center gap-2">
                <span>เพศ {patient.gender}</span> • <span>อายุ {patient.age} ปี</span> • <span>{patient.province} ({patient.region})</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Clinical Alert if high risk */}
          {isHighRisk && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-900">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-rose-800">แจ้งเตือนภาวะเสี่ยงสูง (Priority Alert)</h4>
                <p className="text-xs text-rose-700 mt-1">
                  ผู้รับการตรวจมีปัจจัยเสี่ยงโรคไม่ติดต่อเรื้อรัง (NCDs) เกินเกณฑ์มาตรฐาน ควรได้รับการส่งต่อให้แพทย์หรือพยาบาลเวชปฏิบัติครอบครัวเพื่อประเมินซ้ำ
                </p>
              </div>
            </div>
          )}

          {/* Key Vitals Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-3 flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              <span>ผลการตรวจวัดสัญญาณชีพและค่าชีวเคมี (Vital Signs & Lab)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* BMI */}
              <div className="p-3.5 rounded-2xl bg-pink-50/50 border border-pink-100">
                <span className="text-[11px] text-gray-500">ดัชนีมวลกาย (BMI)</span>
                <div className="text-xl font-bold text-gray-800 mt-1">
                  {patient.bmi} <span className="text-xs font-normal text-gray-400">kg/m²</span>
                </div>
                <div className="mt-1 text-[11px] font-semibold text-rose-700">
                  {patient.bmiCategory}
                </div>
              </div>

              {/* Blood Sugar */}
              <div className="p-3.5 rounded-2xl bg-pink-50/50 border border-pink-100">
                <span className="text-[11px] text-gray-500">น้ำตาลในเลือด (FBS)</span>
                <div className="text-xl font-bold text-gray-800 mt-1">
                  {patient.fastingBloodSugar} <span className="text-xs font-normal text-gray-400">mg/dL</span>
                </div>
                <div className={`mt-1 text-[11px] font-semibold ${patient.fastingBloodSugar >= 126 ? 'text-red-700' : 'text-pink-700'}`}>
                  {patient.bloodSugarCategory}
                </div>
              </div>

              {/* Blood Pressure */}
              <div className="p-3.5 rounded-2xl bg-pink-50/50 border border-pink-100">
                <span className="text-[11px] text-gray-500">ความดันโลหิต (BP)</span>
                <div className="text-xl font-bold text-gray-800 mt-1">
                  {patient.systolicBP}/{patient.diastolicBP} <span className="text-xs font-normal text-gray-400">mmHg</span>
                </div>
                <div className="mt-1 text-[11px] font-semibold text-rose-700 truncate">
                  {patient.bloodPressureCategory}
                </div>
              </div>

              {/* Cholesterol */}
              <div className="p-3.5 rounded-2xl bg-pink-50/50 border border-pink-100">
                <span className="text-[11px] text-gray-500">คอเลสเตอรอล (Total)</span>
                <div className="text-xl font-bold text-gray-800 mt-1">
                  {patient.cholesterol} <span className="text-xs font-normal text-gray-400">mg/dL</span>
                </div>
                <div className="mt-1 text-[11px] font-semibold text-rose-700">
                  {patient.cholesterolCategory}
                </div>
              </div>
            </div>
          </div>

          {/* Behavior & Lifestyle */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>พฤติกรรมสุขภาพและวิถีชีวิต (Lifestyle Habits)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-500">การสูบบุหรี่:</span>
                <strong className={`font-semibold ${patient.smoking === 'สูบเป็นประจำ' ? 'text-rose-600' : 'text-gray-800'}`}>
                  {patient.smoking}
                </strong>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-500">การดื่มแอลกอฮอล์:</span>
                <strong className={`font-semibold ${patient.alcohol === 'ดื่มเป็นประจำ' ? 'text-rose-600' : 'text-gray-800'}`}>
                  {patient.alcohol}
                </strong>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-500">การออกกำลังกาย:</span>
                <strong className="font-semibold text-gray-800">
                  {patient.exerciseMinutesPerWeek} นาที/สัปดาห์
                </strong>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-500">การนอนหลับเฉลี่ย:</span>
                <strong className="font-semibold text-gray-800">
                  {patient.sleepHoursPerDay} ชม./วัน
                </strong>
              </div>
            </div>
          </div>

          {/* Personalized Health Recommendations */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100">
            <h4 className="text-xs font-bold text-pink-800 mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-pink-600" />
              <span>คำแนะนำการปรับพฤติกรรมสุขภาพรายบุคคล</span>
            </h4>
            <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
              {patient.fastingBloodSugar >= 100 && (
                <li>ลดการบริโภคเครื่องดื่มรสหวาน ของหวาน และแป้งขัดสี</li>
              )}
              {patient.systolicBP >= 130 && (
                <li>ลดการบริโภคโซเดียม เค็มจัด อาหารแปรรูป และผงชูรส</li>
              )}
              {patient.bmi >= 23 && (
                <li>ควบคุมปริมาณแคลอรีต่อวัน และเพิ่มการขยับร่างกายให้ได้อย่างน้อย 150 นาทีต่อสัปดาห์</li>
              )}
              {patient.smoking === 'สูบเป็นประจำ' && (
                <li>รับคำปรึกษาคลินิกเลิกบุหรี่ เพื่อลดความเสี่ยงต่อโรคหลอดเลือดหัวใจและสมอง</li>
              )}
              {patient.sleepHoursPerDay < 6 && (
                <li>จัดสุขอนามัยการนอนหลับ พักผ่อนให้ได้อย่างน้อย 7-8 ชั่วโมงต่อวัน</li>
              )}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            ตรวจเมื่อ: {patient.checkupDate} ({patient.quarter})
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-medium text-xs transition-colors shadow-sm"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
