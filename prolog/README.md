# Prolog Expert System — Academic Advising (MUST, Faculty of IT)

الـ Expert System بتاع المشروع مكتوب بـ **Prolog**، وبيشتغل في مكانين من **نفس الملفات**:

1. **الموقع (المتصفح):** عن طريق [Tau Prolog](http://tau-prolog.org/) (مفسّر Prolog مكتوب بـ JavaScript).
   صفحة *Expert System* بتحمّل `facts.pl` + `rules.pl` وتشغّل `diagnose/2` لكل إجابة.
2. **الـ terminal:** عن طريق [SWI-Prolog](https://www.swi-prolog.org/Download.html) مع واجهة تفاعلية وشرح (How).

> لو Tau Prolog فشل لأي سبب، الصفحة بترجع تلقائياً لمحرك TypeScript (`src/utils/expertSystemEngine.ts`) ومبيقفش الموقع.

## الملفات

| الملف | الوظيفة |
|---|---|
| `facts.pl` | **الحقائق** (generated): `question/4`, `option/5`, `impact/4` |
| `rules.pl` | **القواعد + محرك الاستدلال**: `fires/3`, `diagnose/2` (forward chaining) + نقاط القوة/الخطة/المواد (`strengths/2`, `roadmap/2`, `electives/2`) |
| `knowledge_base.pl` | وحدة SWI-Prolog بتجمع الملفين + **الشرح** `explain/1` |
| `main.pl` | واجهة تفاعلية في الـ terminal |
| `tests/compare.sh` | يقارن SWI-Prolog بالـ TypeScript على 16,384 حالة |
| `tests/compare_tau.ts` | يقارن **Tau Prolog (محرك الموقع)** بالـ TypeScript على نفس الـ 16,384 حالة |
| `tests/gen_facts.ts` | يولّد `facts.pl` من بيانات الـ TypeScript |

الكود في `src/utils/prologCore.ts` و`src/utils/prologEngine.ts` هو اللي بيحمّل الملفات دي في المتصفح.

## تشغيل الـ terminal

```bash
swipl prolog/main.pl            # الأسئلة بالإنجليزي
swipl prolog/main.pl -- ar      # الأسئلة بالعربي
```

```prolog
?- use_module(prolog/knowledge_base).
?- diagnose(['q1'-'q1-a','q2'-'q2-a','q3'-'q3-a'], R).
?- explain(['q1'-'q1-c','q2'-'q2-c']).
```

## معمارية الـ Expert System

1. **Facts:** الأسئلة والاختيارات وتأثير كل اختيار على AI / CS / IS.
2. **Rules:** 5 قواعد إنتاج (`fires/3`) على بروفايل النقاط، مثل `AI > CS, AI > IS`.
3. **Inference engine (forward chaining):** جمع النقاط ← تحديد التخصص ← النسب والثقة ← إطلاق كل القواعد المنطبقة.
4. **Explanation facility:** `explain/1` بيوضح ليه وصل للتوصية دي (في نسخة الـ terminal).

لإضافة قاعدة جديدة: أضف `rule_info/4` و`fires/3` في `rules.pl` وأضف اسمها في `rule_order/1`.
لو غيّرت الأسئلة أو التأثيرات في TypeScript: `npx tsx prolog/tests/gen_facts.ts > prolog/facts.pl`.

## الاختبار

```bash
npm run test:prolog             # Tau Prolog (محرك الموقع) مقابل TypeScript — بياخد ~دقيقتين
bash prolog/tests/compare.sh    # SWI-Prolog مقابل TypeScript (يحتاج swipl)
```
