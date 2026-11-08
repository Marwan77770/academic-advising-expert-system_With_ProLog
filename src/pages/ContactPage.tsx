import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Building,
  GraduationCap,
  MessageSquare,
} from 'lucide-react';
import { UNIVERSITY_INFO } from '../data/academicData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    email: '',
    academicLevel: 'Level 1 (Freshman)',
    inquiryType: 'Program Selection',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Academic Advising Office</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact Academic Advising
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Have questions regarding credit-hour registration, prerequisite waivers, academic probation, or choosing your major? Reach out to the Faculty of Information Technology Advising Board.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Faculty Advising Office
            </h2>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Campus Location
                  </div>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">
                    Faculty of Information Technology Building, 3rd Floor, Academic Advising Unit. {UNIVERSITY_INFO.campus}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Walk-in Advising Hours
                  </div>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">
                    Sunday to Thursday: 9:00 AM – 3:30 PM (Cairo Time). Closed on Fridays and official university holidays.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Direct Telephone
                  </div>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">
                    +20 (2) 3824-7455 / Extension: 412 or 415
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Official Advising Email
                  </div>
                  <p className="text-slate-500 mt-0.5 leading-relaxed font-mono">
                    it.advising@must.edu.eg
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Supervision:</span> {UNIVERSITY_INFO.dean}
            </div>
          </div>
        </div>

        {/* Contact / Appointment Inquiry Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Inquiry Successfully Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.studentName}</strong>. Your academic inquiry regarding <strong>{formData.inquiryType}</strong> has been logged with the Academic Advising Unit. An academic mentor will respond to <strong>{formData.email}</strong> within 1-2 business days.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    studentName: '',
                    studentId: '',
                    email: '',
                    academicLevel: 'Level 1 (Freshman)',
                    inquiryType: 'Program Selection',
                    message: '',
                  });
                }}
                className="px-4 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Send an Academic Advising Inquiry
                </h2>
                <p className="text-slate-500">
                  Fill in your details below for personalized degree planning assistance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student Full Name: *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Omar Ahmed"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    University Student ID (Optional):
                  </label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="e.g. 20231045"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    University or Personal Email: *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. student@must.edu.eg"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Current Academic Level:
                  </label>
                  <select
                    value={formData.academicLevel}
                    onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option>Level 1 (Freshman · 0-36 CH)</option>
                    <option>Level 2 (Sophomore · 37-72 CH)</option>
                    <option>Level 3 (Junior · 73-108 CH)</option>
                    <option>Level 4 (Senior / Graduating · 109-140 CH)</option>
                    <option>Prospective / New Applicant</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Inquiry Topic:
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option>Program Selection Advice (AI vs CS vs IS)</option>
                  <option>GPA Calculation & Academic Probation Clarification</option>
                  <option>Course Prerequisite Waiver / Conflict Resolution</option>
                  <option>Decree No. 25 Credit Hours Registration Caps</option>
                  <option>Graduation Project Registration Eligibility (98 CH)</option>
                  <option>Summer Training (90 Hours) Inquiries</option>
                  <option>Other Academic Advising Query</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Inquiry Details / Academic Situation: *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your question, current GPA standing, or courses you plan to register..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Academic Advisor</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
