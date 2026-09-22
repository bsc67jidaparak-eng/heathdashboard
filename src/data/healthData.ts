import { HealthRecord, KPISummary } from '../types';

export const GOOGLE_SHEET_ID = '1GDNsxBERUkBgIeEIkVTx1HpuslvaIniSzxBZqbeJlTU';
export const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit`;
export const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv`;

// Helper to determine categories
export function calculateBMICategory(bmi: number): HealthRecord['bmiCategory'] {
  if (bmi < 18.5) return 'น้ำหนักน้อย';
  if (bmi < 23) return 'ปกติ'; // Asian criteria
  if (bmi < 25) return 'น้ำหนักเกิน';
  return 'โรคอ้วน';
}

export function calculateBPCategory(sys: number, dia: number): HealthRecord['bloodPressureCategory'] {
  if (sys < 120 && dia < 80) return 'ปกติ';
  if (sys <= 129 && dia < 80) return 'ความดันค่อนข้างสูง';
  if (sys <= 139 || (dia >= 80 && dia <= 89)) return 'ความดันโลหิตสูงระดับ 1';
  return 'ความดันโลหิตสูงระดับ 2';
}

export function calculateSugarCategory(sugar: number): HealthRecord['bloodSugarCategory'] {
  if (sugar < 100) return 'ปกติ';
  if (sugar <= 125) return 'เสี่ยงเบาหวาน';
  return 'เบาหวาน';
}

export function calculateCholesterolCategory(chol: number): HealthRecord['cholesterolCategory'] {
  if (chol < 200) return 'ปกติ';
  if (chol <= 239) return 'เริ่มสูง';
  return 'สูงอันตราย';
}

export function calculateOverallRisk(
  sugar: number,
  sys: number,
  bmi: number,
  chol: number,
  smoking: string
): HealthRecord['riskLevel'] {
  let score = 0;
  if (sugar >= 126) score += 3;
  else if (sugar >= 100) score += 1;

  if (sys >= 140) score += 3;
  else if (sys >= 130) score += 1;

  if (bmi >= 25) score += 2;
  else if (bmi >= 23) score += 1;

  if (chol >= 240) score += 2;
  else if (chol >= 200) score += 1;

  if (smoking === 'สูบเป็นประจำ') score += 2;

  if (score >= 6) return 'สูงมาก';
  if (score >= 4) return 'สูง';
  if (score >= 2) return 'ปานกลาง';
  return 'ต่ำ';
}

// Generate realistic dataset with rich diversity
const firstNamesM = [
  'สมชาย', 'กิตติศักดิ์', 'ณัฐวุฒิ', 'ธนพล', 'ปิยะ', 'วีระ', 'ชัยวัฒน์', 'ธีรเดช', 'อนันต์', 'สุรชัย',
  'พิชิต', 'เกียรติศักดิ์', 'วรวิทย์', 'ประเสริฐ', 'ศุภกร', 'ธนา', 'ทรงพล', 'คมสันต์', 'กานต์', 'พงศธร'
];
const firstNamesF = [
  'จิดาภา', 'กรรณิการ์', 'นภาพร', 'วิลาวัลย์', 'ศิริพร', 'สุพัตรา', 'อารียา', 'พัชรี', 'ชลธิชา', 'วรรณภา',
  'กัญญารัตน์', 'ธิดารัตน์', 'รพีพร', 'เบญจวรรณ', 'มณีรัตน์', 'อัจฉรา', 'พรพิมล', 'สุดารัตน์', 'ปวีณา', 'กัญญา'
];
const lastNames = [
  'รักไร่', 'สมบูรณ์สุข', 'เจริญผล', 'รัตนพันธ์', 'มีทรัพย์', 'แสงทอง', 'สุขสวัสดิ์', 'วงศ์วิไล', 'ประสิทธิ์ผล', 'คงเจริญ',
  'ศรีสวัสดิ์', 'ชูมณี', 'แก้ววิเชียร', 'สัจธรรม', 'บุญยืน', 'ทองสุข', 'พงษ์สุวรรณ', 'รักษ์ไทย', 'อินทร์แก้ว', 'เลิศวิริยะ'
];

const regions = [
  { region: 'กรุงเทพฯ และปริมณฑล', province: 'กรุงเทพมหานคร' },
  { region: 'กรุงเทพฯ และปริมณฑล', province: 'นนทบุรี' },
  { region: 'ภาคกลาง', province: 'พระนครศรีอยุธยา' },
  { region: 'ภาคกลาง', province: 'สระบุรี' },
  { region: 'ภาคเหนือ', province: 'เชียงใหม่' },
  { region: 'ภาคเหนือ', province: 'พิษณุโลก' },
  { region: 'ภาคตะวันออกเฉียงเหนือ', province: 'ขอนแก่น' },
  { region: 'ภาคตะวันออกเฉียงเหนือ', province: 'นครราชสีมา' },
  { region: 'ภาคใต้', province: 'สงขลา' },
  { region: 'ภาคใต้', province: 'สุราษฎร์ธานี' },
  { region: 'ภาคตะวันออก', province: 'ชลบุรี' },
  { region: 'ภาคตะวันออก', province: 'ระยอง' }
];

export const INITIAL_HEALTH_RECORDS: HealthRecord[] = Array.from({ length: 30 }, (_, i) => {
  const isFemale = i % 2 === 0;
  const gender: HealthRecord['gender'] = isFemale ? 'หญิง' : 'ชาย';
  const firstName = isFemale ? firstNamesF[i % firstNamesF.length] : firstNamesM[i % firstNamesM.length];
  const lastName = lastNames[(i * 3 + 7) % lastNames.length];
  const fullName = `${firstName} ${lastName}`;

  // Age distribution between 21 and 68
  const age = 21 + Math.floor(((i * 19) % 48));
  const regionObj = regions[i % regions.length];

  // Height and weight
  const baseHeight = isFemale ? 158 : 171;
  const height = Math.round(baseHeight + ((i % 11) - 5) * 1.6);
  
  // BMI trend with realistic clinical spread
  const ageFactor = (age - 20) / 50;
  const baseBMI = 20.2 + ageFactor * 4.8 + ((i % 7) * 1.1) - (i % 5 === 0 ? 2 : 0);
  const bmi = Math.round(baseBMI * 10) / 10;
  const weight = Math.round(bmi * Math.pow(height / 100, 2) * 10) / 10;
  const bmiCategory = calculateBMICategory(bmi);

  // Systolic & Diastolic BP
  const sysBP = Math.round(110 + ageFactor * 24 + (bmi > 25 ? 14 : 0) + ((i % 6) * 4) - 6);
  const diaBP = Math.round(70 + ageFactor * 13 + (bmi > 25 ? 8 : 0) + ((i % 4) * 3) - 4);
  const bpCategory = calculateBPCategory(sysBP, diaBP);

  // Fasting Blood Sugar
  const fbs = Math.round(85 + ageFactor * 26 + (bmi > 25 ? 18 : 0) + ((i % 8) * 4.5));
  const sugarCategory = calculateSugarCategory(fbs);

  // Cholesterol
  const chol = Math.round(172 + ageFactor * 36 + (bmi > 24 ? 18 : 0) + ((i % 6) * 8));
  const cholCategory = calculateCholesterolCategory(chol);

  // Behaviors
  const smoking: HealthRecord['smoking'] =
    i % 4 === 0 ? 'สูบเป็นประจำ' : i % 5 === 0 ? 'เคยสูบแต่เลิกแล้ว' : 'ไม่สูบ';
  const alcohol: HealthRecord['alcohol'] =
    i % 3 === 0 ? 'ดื่มเป็นประจำ' : i % 2 === 0 ? 'ดื่มเป็นครั้งคราว' : 'ไม่ดื่ม';

  const exerciseMinutesPerWeek = (i % 5 === 0) ? 0 : (i % 3 === 0) ? 80 : (i % 2 === 0) ? 150 : 220;
  const sleepHoursPerDay = 5.5 + ((i % 4) * 0.8);

  const diets: HealthRecord['diet'][] = ['สมดุลทั่วไป', 'ชอบหวาน/ของทอด', 'ชอบเค็มจัด', 'เน้นผักผลไม้'];
  const diet = diets[i % diets.length];

  const riskLevel = calculateOverallRisk(fbs, sysBP, bmi, chol, smoking);

  // Checkup date in recent year
  const month = (i % 12) + 1;
  const day = (i % 26) + 1;
  const checkupDate = `2026-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const quarter = `Q${Math.ceil(month / 3)} 2026`;

  return {
    id: `HN-${(1001 + i).toString()}`,
    name: fullName,
    gender,
    age,
    region: regionObj.region,
    province: regionObj.province,
    height,
    weight,
    bmi,
    bmiCategory,
    systolicBP: sysBP,
    diastolicBP: diaBP,
    bloodPressureCategory: bpCategory,
    fastingBloodSugar: fbs,
    bloodSugarCategory: sugarCategory,
    cholesterol: chol,
    cholesterolCategory: cholCategory,
    smoking,
    alcohol,
    exerciseMinutesPerWeek,
    sleepHoursPerDay: Math.round(sleepHoursPerDay * 10) / 10,
    diet,
    riskLevel,
    checkupDate,
    quarter,
    notes: riskLevel === 'สูงมาก' ? 'แนะนำพบแพทย์ด่วนเพื่อตรวจเลือดซ้ำ' : undefined
  };
});

// Calculate KPI summary
export function calculateKPISummary(records: HealthRecord[]): KPISummary {
  if (records.length === 0) {
    return {
      totalCount: 0,
      avgBloodSugar: 0,
      avgBMI: 0,
      avgSystolicBP: 0,
      minSystolicBP: 0,
      maxSystolicBP: 0,
      minBloodSugar: 0,
      maxBloodSugar: 0,
      femaleRatio: 0,
      maleRatio: 0,
      highRiskPercentage: 0,
      obesePercentage: 0
    };
  }

  const totalCount = records.length;
  const totalBloodSugar = records.reduce((acc, r) => acc + r.fastingBloodSugar, 0);
  const totalBMI = records.reduce((acc, r) => acc + r.bmi, 0);
  const totalSystolic = records.reduce((acc, r) => acc + r.systolicBP, 0);

  const systolicBPs = records.map(r => r.systolicBP);
  const bloodSugars = records.map(r => r.fastingBloodSugar);

  const minSystolicBP = Math.min(...systolicBPs);
  const maxSystolicBP = Math.max(...systolicBPs);
  const minBloodSugar = Math.min(...bloodSugars);
  const maxBloodSugar = Math.max(...bloodSugars);

  const females = records.filter(r => r.gender === 'หญิง').length;
  const males = records.filter(r => r.gender === 'ชาย').length;

  const highRisks = records.filter(r => r.riskLevel === 'สูง' || r.riskLevel === 'สูงมาก').length;
  const obeseCount = records.filter(r => r.bmiCategory === 'โรคอ้วน').length;

  return {
    totalCount,
    avgBloodSugar: Math.round((totalBloodSugar / totalCount) * 10) / 10,
    avgBMI: Math.round((totalBMI / totalCount) * 10) / 10,
    avgSystolicBP: Math.round((totalSystolic / totalCount) * 10) / 10,
    minSystolicBP,
    maxSystolicBP,
    minBloodSugar,
    maxBloodSugar,
    femaleRatio: Math.round((females / totalCount) * 100),
    maleRatio: Math.round((males / totalCount) * 100),
    highRiskPercentage: Math.round((highRisks / totalCount) * 1000) / 10,
    obesePercentage: Math.round((obeseCount / totalCount) * 1000) / 10
  };
}

// Parse CSV text into records
export function parseCSVToHealthRecords(csvText: string): HealthRecord[] {
  try {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, '').toLowerCase());
    const records: HealthRecord[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;

      // Handle simple CSV parsing
      const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        obj[h] = values[idx] || '';
      });

      const age = parseInt(obj.age || obj['อายุ'] || '35', 10) || 35;
      const height = parseFloat(obj.height || obj['ส่วนสูง'] || '165') || 165;
      const weight = parseFloat(obj.weight || obj['น้ำหนัก'] || '60') || 60;
      const bmi = parseFloat(obj.bmi || obj['ดัชนีมวลกาย'] || (weight / Math.pow(height / 100, 2)).toFixed(1)) || 22;
      const sysBP = parseInt(obj.systolicbp || obj.systolic || obj['ความดันตัวบน'] || '120', 10) || 120;
      const diaBP = parseInt(obj.diastolicbp || obj.diastolic || obj['ความดันตัวล่าง'] || '80', 10) || 80;
      const fbs = parseInt(obj.fastingbloodsugar || obj.bloodsugar || obj['น้ำตาลในเลือด'] || '95', 10) || 95;
      const chol = parseInt(obj.cholesterol || obj['คอเลสเตอรอล'] || '190', 10) || 190;
      const gender: HealthRecord['gender'] = (obj.gender || obj['เพศ'] || '').includes('หญิง') ? 'หญิง' : 'ชาย';
      const smoking: HealthRecord['smoking'] = (obj.smoking || obj['สูบบุหรี่'] || '').includes('ประจำ') ? 'สูบเป็นประจำ' : (obj.smoking || '').includes('เลิก') ? 'เคยสูบแต่เลิกแล้ว' : 'ไม่สูบ';
      const alcohol: HealthRecord['alcohol'] = (obj.alcohol || obj['แอลกอฮอล์'] || '').includes('ประจำ') ? 'ดื่มเป็นประจำ' : (obj.alcohol || '').includes('คราว') ? 'ดื่มเป็นครั้งคราว' : 'ไม่ดื่ม';

      records.push({
        id: obj.id || obj['hn'] || `HN-${1000 + i}`,
        name: obj.name || obj['ชื่อ'] || `ผู้รับการตรวจ ${i}`,
        gender,
        age,
        region: obj.region || obj['ภาค'] || 'ภาคกลาง',
        province: obj.province || obj['จังหวัด'] || 'กรุงเทพมหานคร',
        height,
        weight,
        bmi,
        bmiCategory: calculateBMICategory(bmi),
        systolicBP: sysBP,
        diastolicBP: diaBP,
        bloodPressureCategory: calculateBPCategory(sysBP, diaBP),
        fastingBloodSugar: fbs,
        bloodSugarCategory: calculateSugarCategory(fbs),
        cholesterol: chol,
        cholesterolCategory: calculateCholesterolCategory(chol),
        smoking,
        alcohol,
        exerciseMinutesPerWeek: parseInt(obj.exercise || obj['ออกกำลังกาย'] || '120', 10) || 120,
        sleepHoursPerDay: parseFloat(obj.sleep || obj['การนอน'] || '7') || 7,
        diet: 'สมดุลทั่วไป',
        riskLevel: calculateOverallRisk(fbs, sysBP, bmi, chol, smoking),
        checkupDate: obj.date || obj['วันที่'] || '2026-09-20',
        quarter: 'Q3 2026'
      });
    }
    return records.length > 0 ? records : INITIAL_HEALTH_RECORDS;
  } catch (err) {
    console.warn('Error parsing CSV, using default dataset:', err);
    return INITIAL_HEALTH_RECORDS;
  }
}
