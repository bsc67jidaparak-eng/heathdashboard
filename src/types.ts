export type RiskLevel = 'ต่ำ' | 'ปานกลาง' | 'สูง' | 'สูงมาก';
export type Gender = 'ชาย' | 'หญิง';
export type SmokingStatus = 'ไม่สูบ' | 'เคยสูบแต่เลิกแล้ว' | 'สูบเป็นประจำ';
export type AlcoholStatus = 'ไม่ดื่ม' | 'ดื่มเป็นครั้งคราว' | 'ดื่มเป็นประจำ';
export type ExerciseFrequency = 'ไม่ออกกำลังกาย' | '1-2 วัน/สัปดาห์' | '3-4 วัน/สัปดาห์' | '5 วันขึ้นไป/สัปดาห์';
export type DietHabit = 'สมดุลทั่วไป' | 'ชอบหวาน/ของทอด' | 'ชอบเค็มจัด' | 'เน้นผักผลไม้';

export interface HealthRecord {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  region: string;
  province: string;
  weight: number; // kg
  height: number; // cm
  bmi: number; // kg/m2
  bmiCategory: 'น้ำหนักน้อย' | 'ปกติ' | 'น้ำหนักเกิน' | 'โรคอ้วน';
  systolicBP: number; // mmHg
  diastolicBP: number; // mmHg
  bloodPressureCategory: 'ปกติ' | 'ความดันค่อนข้างสูง' | 'ความดันโลหิตสูงระดับ 1' | 'ความดันโลหิตสูงระดับ 2';
  fastingBloodSugar: number; // mg/dL
  bloodSugarCategory: 'ปกติ' | 'เสี่ยงเบาหวาน' | 'เบาหวาน';
  cholesterol: number; // mg/dL
  cholesterolCategory: 'ปกติ' | 'เริ่มสูง' | 'สูงอันตราย';
  smoking: SmokingStatus;
  alcohol: AlcoholStatus;
  exerciseMinutesPerWeek: number;
  sleepHoursPerDay: number;
  diet: DietHabit;
  riskLevel: RiskLevel;
  checkupDate: string;
  quarter: string;
  notes?: string;
}

export interface FilterState {
  search: string;
  gender: string;
  ageGroup: string;
  riskLevel: string;
  region: string;
  smoking: string;
  alcohol: string;
}

export interface KPISummary {
  totalCount: number;
  avgBloodSugar: number;
  avgBMI: number;
  avgSystolicBP: number;
  minSystolicBP: number;
  maxSystolicBP: number;
  minBloodSugar: number;
  maxBloodSugar: number;
  femaleRatio: number;
  maleRatio: number;
  highRiskPercentage: number;
  obesePercentage: number;
}

export const RISK_COLORS = {
  'ต่ำ': {
    name: 'เสี่ยงต่ำ',
    color: '#22c55e',      // สีเขียว
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    border: 'border-emerald-300',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    label: 'เสี่ยงต่ำ (สีเขียว)',
    criteria: 'ระดับน้ำตาล < 100 mg/dL, ความดัน < 120/80 mmHg, BMI < 23, ไม่สูบบุหรี่'
  },
  'ปานกลาง': {
    name: 'เสี่ยงปานกลาง',
    color: '#eab308',      // สีเหลือง
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
    dot: 'bg-yellow-400',
    badge: 'bg-yellow-50 text-yellow-800 border-yellow-300',
    label: 'เสี่ยงปานกลาง (สีเหลือง)',
    criteria: 'น้ำตาล 100-125 mg/dL หรือ ความดัน 120-139 mmHg หรือ BMI 23-24.9 kg/m²'
  },
  'สูง': {
    name: 'เสี่ยงสูง',
    color: '#f97316',      // สีส้ม
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300',
    dot: 'bg-orange-500',
    badge: 'bg-orange-50 text-orange-800 border-orange-300',
    label: 'เสี่ยงสูง (สีส้ม)',
    criteria: 'น้ำตาล >= 126 mg/dL หรือ ความดัน >= 140 mmHg หรือ BMI >= 25 ร่วมกับพฤติกรรมเสี่ยง'
  },
  'สูงมาก': {
    name: 'เสี่ยงสูงมาก',
    color: '#ef4444',      // สีแดง
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    dot: 'bg-red-500',
    badge: 'bg-red-50 text-red-800 border-red-300',
    label: 'เสี่ยงสูงมาก (สีแดง)',
    criteria: 'พบโรคร่วม NCDs วิกฤต 3 ด้านขึ้นไป (เบาหวาน + ความดันสูงระดับ 2 + สูบบุหรี่ประจำ)'
  }
} as const;
