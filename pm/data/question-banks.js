// 問題バンクの紐づけ
// 分野別の問題ファイルを増やしたら、このオブジェクトへ追加します。
const QUESTION_BANKS = {
  career: QUESTIONS_CAREER,
  originalAcademic: QUESTIONS_ORIGINAL_EXAM,
  socialLegal: QUESTIONS_SYAKAI,
  categoryTarget: QUESTIONS_CATEGORY,
  cbt: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("cbt")),
  counseling: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("counseling")),
  development: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("development")),
  psychoanalysis: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("psychoanalysis")),
  social: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("social")),
  motivation: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("motivation")),
  choice: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("choice")),
  transition: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("transition")),
  decision: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("decision")),
  narrative: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("narrative")),
  positive: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("positive")),
  trait: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("trait")),
  other: QUESTIONS_CAREER.filter(q => (q.categoryIds || []).includes("other")),
};
