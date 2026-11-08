# Academic Advising Expert System

نظام خبير للإرشاد الأكاديمي لكلية الحاسبات وتكنولوجيا المعلومات (MUST): توصية بالتخصص (AI / CS / IS)، حاسبة GPA، مقارنة البرامج، واللوائح.

## التشغيل محليًا
```bash
npm install
npm run dev      # http://localhost:3000
npm test         # اختبارات الـ expert system وقواعد الـ GPA
npm run build    # ناتج البناء في dist/
```

## النشر على GitHub Pages
1. ارفع المشروع على repo جديد (branch اسمه `main`).
2. من **Settings → Pages** اختر **Source: GitHub Actions**.
3. أي `push` على `main` بيشغّل `.github/workflows/deploy.yml` (اختبارات ← build ← نشر).
4. الرابط: `https://<username>.github.io/<repo-name>/`

## إزاي الـ Expert System شغال
- **النوع:** Rule-Based Expert System بـ forward chaining، مكتوب بـ TypeScript بدون أي AI/LLM API.
- **Knowledge Base:** أسئلة بأوزان في `src/utils/expertSystemEngine.ts` وبيانات المناهج في `src/data/academicData.ts`.
- **Inference Engine:** `runExpertSystemInference()` بتجمع نقاط AI/CS/IS، وتنفّذ قواعد IF-THEN (`ADVISING_RULES`)، وتحسب النسب ودرجة الثقة.
- **قواعد الـ GPA:** `src/utils/academicRules.ts` (مبنية على قرار رئيس الجامعة رقم 25).

## الداتا
كلها static داخل الكود وملفات `public/assets/` (لا يوجد backend ولا database).

## الصور
- صور خطط الدراسة (`image_*.png`) مأخوذة من وثائق الكلية نفسها.
- صور الواجهة (`must-campus-hero.jpg`, `must-new-campus.jpeg`, `must-library.jpeg`) واللوجو (`must-logo.png`) صور حقيقية لجامعة MUST.
- لاستبدالها بصور حقيقية للجامعة: حط صورك في `src/assets/images/` و `public/assets/` بنفس الأسماء، أو عدّل المسارات في `src/data/assets.ts`.

## الـ Expert System بـ Prolog

المنطق (الحقائق + القواعد + محرك الاستدلال) مكتوب بـ **Prolog** في مجلد `prolog/`:
- **الموقع** بيشغّله جوه المتصفح بـ Tau Prolog (صفحة Expert System)، ومعاه fallback تلقائي لـ TypeScript.
- **الـ terminal:** `swipl prolog/main.pl` (مع شرح How).

التفاصيل والاختبارات في `prolog/README.md`.
