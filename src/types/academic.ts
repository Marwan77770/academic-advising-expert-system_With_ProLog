export type GradeKey =
  | 'A+'
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D+'
  | 'D'
  | 'F';

export interface GradeScaleEntry {
  qualityPointsPerCredit: number;
  minPercentage2CH: number;
  minPercentage3CH: number;
  descriptionEn: string;
  descriptionAr: string;
}

export interface Course {
  code: string;
  name: string;
  nameAr?: string;
  creditHours: number;
  lectureHours: number;
  tutorialHours: number;
  labHours: number;
  prerequisite: string;
  type: 'University Compulsory' | 'University Elective' | 'Math & Science' | 'College Compulsory' | 'Specialization Compulsory' | 'Specialization Elective' | 'Project' | 'Optional';
  semester?: number;
  department?: 'General' | 'AI' | 'CS' | 'IS';
}

export interface CourseGradeInput {
  id: string;
  courseName: string;
  courseCode: string;
  creditHours: number;
  grade: GradeKey;
}

export interface GpaCalculationResult {
  termGpa: number;
  totalCreditHours: number;
  totalQualityPoints: number;
  academicStanding: string;
  academicStandingAr: string;
  nextSemesterMaxCH: number;
  nextSemesterMinCH: number;
  isProbation: boolean;
  canIncreaseTo23: boolean;
  notes: string[];
  courseDetails: Array<{
    courseName: string;
    courseCode: string;
    creditHours: number;
    grade: GradeKey;
    qualityPoints: number;
    pointsPerCredit: number;
  }>;
}

export interface CumulativeGpaResult extends GpaCalculationResult {
  previousGpa: number;
  previousCreditHours: number;
  combinedTotalCreditHours: number;
  combinedTotalQualityPoints: number;
  cumulativeGpa: number;
}

export interface ProgramInfo {
  id: 'ai' | 'cs' | 'is';
  name: string;
  nameAr: string;
  shortDescription: string;
  tagline: string;
  overview: string;
  vision: string;
  mission: string;
  learningOutcomes: string[];
  skillsAcquired: string[];
  careerOpportunities: string[];
  color: string;
  accentColor: string;
  flowchartImage: string;
  totalCreditHours: number;
  radarScores: {
    programming: number;
    mathematics: number;
    aiContent: number;
    businessContent: number;
    dataScience: number;
    careerDemand: number;
    researchOpportunity: number;
    systemsEngineering: number;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  affiliation: string;
  photoUrl: string;
  bio: string;
  email: string;
  github?: string;
  linkedin?: string;
}

export interface ExpertSystemQuestion {
  id: string;
  questionText: string;
  questionTextAr: string;
  category: 'interest' | 'skills' | 'career' | 'workstyle' | 'courses';
  options: Array<{
    id: string;
    text: string;
    textAr: string;
    impact: {
      ai: number;
      cs: number;
      is: number;
    };
    explanation: string;
  }>;
}

export interface ExpertSystemRecommendation {
  primaryProgram: 'AI' | 'CS' | 'IS';
  scores: {
    ai: number;
    cs: number;
    is: number;
  };
  percentages: {
    ai: number;
    cs: number;
    is: number;
  };
  confidenceScore: number;
  firedRules: Array<{
    id: string;
    title: string;
    rationale: string;
    contributionTo: 'AI' | 'CS' | 'IS';
  }>;
  strengthsSummary: string[];
  careerRoadmap: string[];
  recommendedElectives: string[];
}
