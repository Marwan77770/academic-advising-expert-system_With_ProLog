import { GradeKey, GradeScaleEntry, CourseGradeInput, GpaCalculationResult, CumulativeGpaResult } from '../types/academic';

/**
 * Grade Scale Mapping from official university decree (No. 25 dated 31/8/2026 - MUST):
 * gpa_rules_DONE_54195c4e.json
 */
export const OFFICIAL_GRADE_SCALE: Record<GradeKey, GradeScaleEntry> = {
  'A+': {
    qualityPointsPerCredit: 4.0,
    minPercentage2CH: 95,
    minPercentage3CH: 142.5,
    descriptionEn: 'Distinction / Excellent High',
    descriptionAr: 'ممتاز مرتفع',
  },
  'A': {
    qualityPointsPerCredit: 4.0,
    minPercentage2CH: 90,
    minPercentage3CH: 135,
    descriptionEn: 'Excellent',
    descriptionAr: 'ممتاز',
  },
  'A-': {
    qualityPointsPerCredit: 3.6,
    minPercentage2CH: 85,
    minPercentage3CH: 127.5,
    descriptionEn: 'Very Good High',
    descriptionAr: 'جيد جداً مرتفع',
  },
  'B+': {
    qualityPointsPerCredit: 3.3,
    minPercentage2CH: 80,
    minPercentage3CH: 120,
    descriptionEn: 'Very Good',
    descriptionAr: 'جيد جداً',
  },
  'B': {
    qualityPointsPerCredit: 3.0,
    minPercentage2CH: 75,
    minPercentage3CH: 112.5,
    descriptionEn: 'Good High',
    descriptionAr: 'جيد مرتفع',
  },
  'B-': {
    qualityPointsPerCredit: 2.7,
    minPercentage2CH: 72,
    minPercentage3CH: 108,
    descriptionEn: 'Good',
    descriptionAr: 'جيد',
  },
  'C+': {
    qualityPointsPerCredit: 2.3,
    minPercentage2CH: 70,
    minPercentage3CH: 105,
    descriptionEn: 'Satisfactory High',
    descriptionAr: 'مقبول مرتفع',
  },
  'C': {
    qualityPointsPerCredit: 2.0,
    minPercentage2CH: 65,
    minPercentage3CH: 97.5,
    descriptionEn: 'Satisfactory',
    descriptionAr: 'مقبول',
  },
  'C-': {
    qualityPointsPerCredit: 1.7,
    minPercentage2CH: 63,
    minPercentage3CH: 94.5,
    descriptionEn: 'Pass Low',
    descriptionAr: 'مقبول منخفض',
  },
  'D+': {
    qualityPointsPerCredit: 1.3,
    minPercentage2CH: 62,
    minPercentage3CH: 93,
    descriptionEn: 'Weak High',
    descriptionAr: 'ضعيف مرتفع',
  },
  'D': {
    qualityPointsPerCredit: 1.0,
    minPercentage2CH: 60,
    minPercentage3CH: 90,
    descriptionEn: 'Weak',
    descriptionAr: 'ضعيف',
  },
  'F': {
    qualityPointsPerCredit: 0.0,
    minPercentage2CH: 0,
    minPercentage3CH: 0,
    descriptionEn: 'Fail',
    descriptionAr: 'راسب',
  },
};

/**
 * Returns Quality Points for a given course grade and credit hours.
 * Form: Quality Points = per_credit_point * course_credit_hours
 */
export function getQualityPoints(grade: GradeKey, creditHours: number): number {
  const entry = OFFICIAL_GRADE_SCALE[grade];
  if (!entry) return 0;
  return Number((entry.qualityPointsPerCredit * creditHours).toFixed(2));
}

/**
 * Computes Academic Standing from GPA
 */
export function getAcademicStanding(gpa: number): { en: string; ar: string } {
  if (gpa >= 3.6) {
    return { en: 'Excellent (Honors candidate)', ar: 'ممتاز (مرشح لمرتبة الشرف)' };
  } else if (gpa >= 3.0) {
    return { en: 'Very Good', ar: 'جيد جداً' };
  } else if (gpa >= 2.5) {
    return { en: 'Good', ar: 'جيد' };
  } else if (gpa >= 2.0) {
    return { en: 'Satisfactory (Pass)', ar: 'مقبول' };
  } else {
    return { en: 'Academic Warning / Probation', ar: 'تحت الملاحظة الأكاديمية (إنذار)' };
  }
}

/**
 * Calculates registration limits according to MUST Decree 25:
 * - Article 1: Min 12 CH, standard Max 18 CH. If GPA >= 3.0 or graduating, max up to 23 CH.
 * - Article 2: If GPA < 2.0, min 12 CH to raise GPA, can increase by 2 to 14 CH, and up to 15 CH with fee.
 * - Article 3: If 2.0 <= GPA < 3.0, standard plan up to 18 CH.
 */
export function getRegistrationLimits(gpa: number, isGraduating = false): {
  minCH: number;
  maxCH: number;
  isProbation: boolean;
  canIncreaseTo23: boolean;
  notes: string[];
} {
  const notes: string[] = [];

  if (gpa < 2.0) {
    notes.push('Article 2: Cumulative GPA is below 2.0. Student is on academic probation. Permitted to register 12 credit hours to improve GPA, with a potential increase of 2 hours (up to 14 CH), or up to 15 CH under specific conditions with additional fee payment.');
    return {
      minCH: 12,
      maxCH: 14,
      isProbation: true,
      canIncreaseTo23: false,
      notes,
    };
  }

  if (gpa >= 3.0 || isGraduating) {
    notes.push('Article 1: Student achieved GPA >= 3.0 or is a graduating senior. Eligible to register up to 23 credit hours (maximum cap under Supreme Council of Universities regulations).');
    return {
      minCH: 12,
      maxCH: 23,
      isProbation: false,
      canIncreaseTo23: true,
      notes,
    };
  }

  // 2.0 <= gpa < 3.0
  notes.push('Article 3: Standard academic standing (GPA 2.0 - 2.99). Permitted to register standard credit hours according to faculty study plan (minimum 12 CH, maximum 18 CH).');
  return {
    minCH: 12,
    maxCH: 18,
    isProbation: false,
    canIncreaseTo23: false,
    notes,
  };
}

/**
 * Calculates Term GPA from an array of course inputs.
 */
export function calculateTermGpa(courses: CourseGradeInput[], isGraduating = false): GpaCalculationResult {
  if (!courses || courses.length === 0) {
    return {
      termGpa: 0,
      totalCreditHours: 0,
      totalQualityPoints: 0,
      academicStanding: 'No courses entered',
      academicStandingAr: 'لم يتم إدخال مقررات',
      nextSemesterMaxCH: 18,
      nextSemesterMinCH: 12,
      isProbation: false,
      canIncreaseTo23: false,
      notes: [],
      courseDetails: [],
    };
  }

  let totalCreditHours = 0;
  let totalQualityPoints = 0;

  const courseDetails = courses.map((c) => {
    const entry = OFFICIAL_GRADE_SCALE[c.grade] || OFFICIAL_GRADE_SCALE['F'];
    const qualityPoints = Number((entry.qualityPointsPerCredit * c.creditHours).toFixed(2));
    totalCreditHours += c.creditHours;
    totalQualityPoints += qualityPoints;

    return {
      courseName: c.courseName || c.courseCode,
      courseCode: c.courseCode,
      creditHours: c.creditHours,
      grade: c.grade,
      qualityPoints,
      pointsPerCredit: entry.qualityPointsPerCredit,
    };
  });

  const termGpa = totalCreditHours > 0 ? Number((totalQualityPoints / totalCreditHours).toFixed(2)) : 0;
  const standing = getAcademicStanding(termGpa);
  const limits = getRegistrationLimits(termGpa, isGraduating);

  return {
    termGpa,
    totalCreditHours,
    totalQualityPoints: Number(totalQualityPoints.toFixed(2)),
    academicStanding: standing.en,
    academicStandingAr: standing.ar,
    nextSemesterMaxCH: limits.maxCH,
    nextSemesterMinCH: limits.minCH,
    isProbation: limits.isProbation,
    canIncreaseTo23: limits.canIncreaseTo23,
    notes: limits.notes,
    courseDetails,
  };
}

/**
 * Calculates Cumulative GPA combining previous record with current term.
 */
export function calculateCumulativeGpa(
  previousGpa: number,
  previousCreditHours: number,
  currentCourses: CourseGradeInput[],
  isGraduating = false
): CumulativeGpaResult {
  const termResult = calculateTermGpa(currentCourses, isGraduating);

  const prevQP = Number((previousGpa * previousCreditHours).toFixed(2));
  const combinedTotalCreditHours = previousCreditHours + termResult.totalCreditHours;
  const combinedTotalQualityPoints = Number((prevQP + termResult.totalQualityPoints).toFixed(2));

  const cumulativeGpa =
    combinedTotalCreditHours > 0
      ? Number((combinedTotalQualityPoints / combinedTotalCreditHours).toFixed(2))
      : 0;

  const cumStanding = getAcademicStanding(cumulativeGpa);
  const cumLimits = getRegistrationLimits(cumulativeGpa, isGraduating);

  return {
    ...termResult,
    previousGpa,
    previousCreditHours,
    combinedTotalCreditHours,
    combinedTotalQualityPoints,
    cumulativeGpa,
    academicStanding: cumStanding.en,
    academicStandingAr: cumStanding.ar,
    nextSemesterMaxCH: cumLimits.maxCH,
    nextSemesterMinCH: cumLimits.minCH,
    isProbation: cumLimits.isProbation,
    canIncreaseTo23: cumLimits.canIncreaseTo23,
    notes: cumLimits.notes,
  };
}
