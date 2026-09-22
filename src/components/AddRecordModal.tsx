import React, { useState } from 'react';
import { X, PlusCircle, ExternalLink, HeartPulse, Check, Save } from 'lucide-react';
import { HealthRecord, Gender, SmokingStatus, AlcoholStatus } from '../types';
import { 
  calculateBMICategory, 
  calculateBPCategory, 
  calculateSugarCategory, 
  calculateCholesterolCategory, 
  calculateOverallRisk,
  GOOGLE_SHEET_URL 
} from '../data/healthData';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecord: (newRecord: HealthRecord) => void;
  currentCount: number;
}

export const AddRecordModal: React.FC<AddRecordModalProps> = ({
  isOpen,
  onClose,
  onAddRecord,
  currentCount
}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('หญิง');
  const [age, setAge] = useState<number>(45);
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [region, setRegion] = useState('กรุงเทพฯ และปริมณฑล');
  const [height, setHeight] = useState<number>(160);
  const [weight, setWeight] = useState<number>(62);
  const [systolicBP, setSystolicBP] = useState<number>(125);
  const [diastolicBP, setDiastolicBP] = useState<number>(82);
  const [fbs, setFbs] = useState<number>(105);
  const [cholesterol, setCholesterol] = useState<number>(195);
  const [smoking, setSmoking] = useState<SmokingStatus>('ไม่สูบ');
  const [alcohol, setAlcohol] = useState<AlcoholStatus>('ไม่ดื่ม');
  const [exerciseMinutes, setExerciseMinutes] = useState<number>(120);
  const [sleepHours, setSleepHours] = useState<number>(7);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedBMI = Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10;
    const bmiCat = calculateBMICategory(calculatedBMI);
    const bpCat = calculateBPCategory(systolicBP, diastolicBP);
    const sugarCat = calculateSugarCategory(fbs);
    const cholCat = calculateCholesterolCategory(cholesterol);
    const risk = calculateOverallRisk(fbs, systolicBP, calculatedBMI, cholesterol, smoking);

    const now = new Date();
    const checkupDate = now.toISOString().slice(0, 10);
    const quarter = `Q${Math.ceil((now.getMonth() + 1) / 3)} ${now.getFullYear()}`;

    const newRecord: HealthRecord = {
      id: `HN-${(1001 + currentCount).toString()}`,
      name: name.trim() || `ผู้รับการตรวจรายที่ ${currentCount + 1}`,
      gender,
      age: Number(age),
      region,
      province,
      height: Number(height),
      weight: Number(weight),
      bmi: calculatedBMI,
      bmiCategory: bmiCat,
      systolicBP: Number(systolicBP),
      diastolicBP: Number(diastolicBP),
      bloodPressureCategory: bpCat,
      fastingBloodSugar: Number(fbs),
      bloodSugarCategory: sugarCat,
      cholesterol: Number(cholesterol),
      cholesterolCategory: cholCat,
      smoking,
      alcohol,
      exerciseMinutesPerWeek: Number(exerciseMinutes),
      sleepHoursPerDay: Number(sleepHours),
      diet: 'สมดุลทั่วไป',
      riskLevel: risk,
      checkupDate,
      quarter,
      notes: risk === 'สูงมาก' ? 'แจ้งเตือนภาวะเสี่ยงสูงเร่งด่วน' : undefined
    };

    onAddRecord(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-pink-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white border border-white/30">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">บันทึกข้อมูลสุขภาพเพิ่มเติม (Add Record)</h3>
              <p className="text-xs text-pink-100 mt-0.5">
                ข้อมูลจะถูกประมวลผลเข้าสู่แดชบอร์ดทันที พร้อมอัปเดตวันและเวลาล่าสุด
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Link to Google Sheet Prompt */}
          <div className="p-3.5 rounded-2xl bg-pink-50/70 border border-pink-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-gray-700">
              หรือต้องการกรอกข้อมูลลงในตารางสเปรดชีตโดยตรง:
            </span>
            <a
              href={GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs transition-colors shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>เปิด Google Sheet (ชีตหลัก)</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">ชื่อ - นามสกุลผู้รับการตรวจ</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น สมศรี ใจดี"
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">เพศ</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="หญิง">หญิง</option>
                <option value="ชาย">ชาย</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">อายุ (ปี)</label>
              <input
                type="number"
                min={18}
                max={100}
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Region */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">ภูมิภาค / จังหวัด</label>
              <select
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  if (e.target.value === 'กรุงเทพฯ และปริมณฑล') setProvince('กรุงเทพมหานคร');
                  else if (e.target.value === 'ภาคกลาง') setProvince('พระนครศรีอยุธยา');
                  else if (e.target.value === 'ภาคเหนือ') setProvince('เชียงใหม่');
                  else if (e.target.value === 'ภาคตะวันออกเฉียงเหนือ') setProvince('ขอนแก่น');
                  else if (e.target.value === 'ภาคใต้') setProvince('สงขลา');
                  else setProvince('ชลบุรี');
                }}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="กรุงเทพฯ และปริมณฑล">กรุงเทพฯ และปริมณฑล</option>
                <option value="ภาคกลาง">ภาคกลาง</option>
                <option value="ภาคเหนือ">ภาคเหนือ</option>
                <option value="ภาคตะวันออกเฉียงเหนือ">ภาคตะวันออกเฉียงเหนือ</option>
                <option value="ภาคใต้">ภาคใต้</option>
                <option value="ภาคตะวันออก">ภาคตะวันออก</option>
              </select>
            </div>

            {/* Height & Weight */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">ส่วนสูง (ซม.)</label>
              <input
                type="number"
                min={120}
                max={210}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">น้ำหนัก (กก.)</label>
              <input
                type="number"
                min={30}
                max={160}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Blood Pressure Systolic & Diastolic */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">ความดันตัวบน (Systolic mmHg)</label>
              <input
                type="number"
                min={80}
                max={220}
                value={systolicBP}
                onChange={(e) => setSystolicBP(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">ความดันตัวล่าง (Diastolic mmHg)</label>
              <input
                type="number"
                min={50}
                max={140}
                value={diastolicBP}
                onChange={(e) => setDiastolicBP(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Fasting Blood Sugar */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">ระดับน้ำตาลในเลือด (FBS mg/dL)</label>
              <input
                type="number"
                min={60}
                max={350}
                value={fbs}
                onChange={(e) => setFbs(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Cholesterol */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">คอเลสเตอรอลรวม (mg/dL)</label>
              <input
                type="number"
                min={100}
                max={450}
                value={cholesterol}
                onChange={(e) => setCholesterol(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Smoking */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">พฤติกรรมการสูบบุหรี่</label>
              <select
                value={smoking}
                onChange={(e) => setSmoking(e.target.value as SmokingStatus)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="ไม่สูบ">ไม่สูบ</option>
                <option value="เคยสูบแต่เลิกแล้ว">เคยสูบแต่เลิกแล้ว</option>
                <option value="สูบเป็นประจำ">สูบเป็นประจำ</option>
              </select>
            </div>

            {/* Alcohol */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">การดื่มแอลกอฮอล์</label>
              <select
                value={alcohol}
                onChange={(e) => setAlcohol(e.target.value as AlcoholStatus)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="ไม่ดื่ม">ไม่ดื่ม</option>
                <option value="ดื่มเป็นครั้งคราว">ดื่มเป็นครั้งคราว</option>
                <option value="ดื่มเป็นประจำ">ดื่มเป็นประจำ</option>
              </select>
            </div>

            {/* Exercise Minutes */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">ออกกำลังกาย (นาที/สัปดาห์)</label>
              <input
                type="number"
                min={0}
                max={700}
                value={exerciseMinutes}
                onChange={(e) => setExerciseMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Sleep Hours */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">ชั่วโมงการนอน (ชม./วัน)</label>
              <input
                type="number"
                step={0.5}
                min={3}
                max={14}
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-pink-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-xs transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-semibold text-xs shadow-md shadow-pink-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>บันทึกและอัปเดตแดชบอร์ด</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
