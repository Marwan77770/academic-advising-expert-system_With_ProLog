import mustLogo from '../assets/images/must-logo.png';
import heroFaculty from '../assets/images/must-campus-hero.jpg';
import aiRoboticsLab from '../assets/images/must-new-campus.jpeg';
import studentsHub from '../assets/images/must-library.jpeg';
import csFlowchart from '../assets/images/image_73bf9944.png';
import aiFlowchart from '../assets/images/image_1db5b6f9.png';
import isFlowchart from '../assets/images/image_d8331bf2.png';
import catalogSheet from '../assets/images/image_d8e96ada.png';

// BASE_URL makes public/ files work both locally and under a GitHub Pages sub-path.
const BASE = import.meta.env.BASE_URL;

export const ASSETS = {
  // Bundled photos & diagrams (hashed by Vite during build)
  mustLogo,
  heroFaculty,
  aiRoboticsLab,
  studentsHub,
  csStudyPlanFlowchart: csFlowchart,
  aiStudyPlanFlowchart: aiFlowchart,
  generalStudyPlanTable: isFlowchart,
  courseCatalogSheet: catalogSheet,

  // Fallback URLs for the same images, served from public/
  publicLogo: `${BASE}assets/must-logo.png`,
  publicHeroFaculty: `${BASE}assets/must-campus-hero.jpg`,
  publicAiRoboticsLab: `${BASE}assets/must-new-campus.jpeg`,
  publicStudentsHub: `${BASE}assets/must-library.jpeg`,

  // Official documents in public/assets/
  regulationsPdf: `${BASE}assets/MUST_Faculty_IT_Regulations.pdf`,
  gpaRulesJson: `${BASE}assets/gpa_rules.json`,

  // Study-plan flowcharts in public/ (used by program detail page)
  publicAiFlowchart: `${BASE}assets/image_1db5b6f9.png`,
  publicCsFlowchart: `${BASE}assets/image_73bf9944.png`,
  publicIsFlowchart: `${BASE}assets/image_d8331bf2.png`,
};
