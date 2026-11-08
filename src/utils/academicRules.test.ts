import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTermGpa,
  calculateCumulativeGpa,
  getRegistrationLimits,
  getQualityPoints,
  OFFICIAL_GRADE_SCALE,
} from './academicRules';
import { CourseGradeInput } from '../types/academic';

test('Quality points matches decree json mapping', () => {
  // A: 4.0 * 3 = 12
  assert.equal(getQualityPoints('A', 3), 12);
  // B+: 3.3 * 2 = 6.6
  assert.equal(getQualityPoints('B+', 2), 6.6);
  // A-: 3.6 * 3 = 10.8
  assert.equal(getQualityPoints('A-', 3), 10.8);
  // F: 0 * 3 = 0
  assert.equal(getQualityPoints('F', 3), 0);
});

test('Matches the worked example from official gpa_rules JSON', () => {
  // Scenario: Student registered two courses:
  // course 1: 3 credit hours, grade A
  // course 2: 2 credit hours, grade B+
  // quality_points(course 1) = 12
  // quality_points(course 2) = 6.6
  // GPA = (12 + 6.6) / (3 + 2) = 18.6 / 5 = 3.72
  const courses: CourseGradeInput[] = [
    {
      id: '1',
      courseName: 'Course 1',
      courseCode: 'CS101',
      creditHours: 3,
      grade: 'A',
    },
    {
      id: '2',
      courseName: 'Course 2',
      courseCode: 'UE101',
      creditHours: 2,
      grade: 'B+',
    },
  ];

  const result = calculateTermGpa(courses);
  assert.equal(result.totalCreditHours, 5);
  assert.equal(result.totalQualityPoints, 18.6);
  assert.equal(result.termGpa, 3.72);
  assert.equal(result.isProbation, false);
  assert.equal(result.canIncreaseTo23, true); // GPA >= 3.0
  assert.equal(result.nextSemesterMaxCH, 23);
});

test('Academic warning triggers when GPA < 2.0 (Article 2)', () => {
  const lowCourses: CourseGradeInput[] = [
    {
      id: '1',
      courseName: 'Algorithms',
      courseCode: 'CS231',
      creditHours: 3,
      grade: 'D', // 1.0 * 3 = 3
    },
    {
      id: '2',
      courseName: 'Discrete Math',
      courseCode: 'MATH251',
      creditHours: 3,
      grade: 'F', // 0.0 * 3 = 0
    },
  ];

  const result = calculateTermGpa(lowCourses);
  // Total CH: 6, Total points: 3.0, GPA = 3.0 / 6 = 0.50
  assert.equal(result.termGpa, 0.5);
  assert.equal(result.isProbation, true);
  assert.equal(result.nextSemesterMinCH, 12);
  assert.equal(result.nextSemesterMaxCH, 14);
});

test('Standard registration limit for 2.0 <= GPA < 3.0 (Article 3)', () => {
  const limits = getRegistrationLimits(2.65);
  assert.equal(limits.minCH, 12);
  assert.equal(limits.maxCH, 18);
  assert.equal(limits.isProbation, false);
  assert.equal(limits.canIncreaseTo23, false);
});

test('Cumulative GPA calculation correctly balances previous and term record', () => {
  // Previous: 30 credit hours completed with 3.20 GPA -> 96 quality points
  // Current term: 15 credit hours with 3.80 GPA -> 57 quality points
  // Combined: 45 credit hours, 153 quality points -> 153 / 45 = 3.40 GPA
  const termCourses: CourseGradeInput[] = [
    { id: '1', courseName: 'C1', courseCode: 'C1', creditHours: 3, grade: 'A' }, // 12
    { id: '2', courseName: 'C2', courseCode: 'C2', creditHours: 3, grade: 'A' }, // 12
    { id: '3', courseName: 'C3', courseCode: 'C3', creditHours: 3, grade: 'A' }, // 12
    { id: '4', courseName: 'C4', courseCode: 'C4', creditHours: 3, grade: 'A' }, // 12
    { id: '5', courseName: 'C5', courseCode: 'C5', creditHours: 3, grade: 'B' }, // 9
  ]; // Total 15 CH, 57 QP -> term GPA 3.80

  const cumResult = calculateCumulativeGpa(3.20, 30, termCourses);
  assert.equal(cumResult.combinedTotalCreditHours, 45);
  assert.equal(cumResult.combinedTotalQualityPoints, 153);
  assert.equal(cumResult.cumulativeGpa, 3.4);
});
