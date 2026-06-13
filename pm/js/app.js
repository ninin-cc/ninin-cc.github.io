const isEmojiSupported = !navigator.userAgent.includes('Windows');

// ==========================================
// カテゴリ定義
// ==========================================
const CATEGORIES = [
  { id: "careerFrequent", title: "キャリア関連頻出", icon: "🎯", type: "quiz", examTag: "careerConsultant", questionLimit: 10, topGroup: "mapStudy", isActive: true },
  { id: "industrialFrequent", title: "産業保健領域頻出", icon: "🏥", type: "quiz", examTag: "industrialCounselor", questionLimit: 10, topGroup: "mapStudy", isActive: true },
  { id: "careerFrequentReview", title: "キャリア関連頻出振返り", icon: "↩", type: "review", reviewForCategoryId: "careerFrequent", topGroup: "mapStudy", isActive: true },
  { id: "industrialFrequentReview", title: "産業保健領域頻出振返り", icon: "↩", type: "review", reviewForCategoryId: "industrialFrequent", topGroup: "mapStudy", isActive: true },
  { id: "directoryAiueo", title: "一覧（あいうえお順）", icon: "🔎", type: "directory", directoryMode: "aiueo", topGroup: "directory", isActive: true },
  { id: "directoryTheoryTimeline", title: "一覧（理論別・年代順）", icon: "🗂️", type: "directory", directoryMode: "theoryTimeline", topGroup: "directory", isActive: true },
  { id: "timeline", title: "タイムライン", icon: "🕰️", type: "timeline", topGroup: "hidden", isActive: true },
  { id: "episodeDirectory", title: "心理学者エピソード一覧", icon: "📚", type: "episodeDirectory", topGroup: "directory", isActive: true },
  { id: "originalAcademic", title: "オリジナル学科問題", icon: "📝", type: "quiz", questionBankId: "originalAcademic", questionLimit: 10, topGroup: "examPrep", isActive: true, reviewable: true, accent: "original" },
  { id: "originalAcademicReview", title: "オリジナル学科問題振返り", icon: "↩", type: "review", reviewForCategoryId: "originalAcademic", topGroup: "examPrep", isActive: true, accent: "original" },
  { id: "socialLegal", title: "社会情勢・法制関連問題", icon: "⚖️", type: "quiz", questionBankId: "socialLegal", questionLimit: 10, topGroup: "socialLegal", isActive: true, reviewable: true, accent: "original" },
  { id: "socialLegalReview", title: "社会情勢・法制関連問題振返り", icon: "↩", type: "review", reviewForCategoryId: "socialLegal", topGroup: "socialLegal", isActive: true, accent: "original" },
  { id: "career", title: "キャリア理論", icon: "🛤️", type: "quiz", questionBankId: "career", questionLimit: 10, topGroup: "accordion", isActive: true },
  { id: "cbt", title: "認知行動療法", icon: "🧠", type: "quiz", questionBankId: "cbt", topGroup: "accordion", isActive: true },
  { id: "counseling", title: "カウンセリング理論", icon: "🗣️", type: "quiz", questionBankId: "counseling", topGroup: "accordion", isActive: true },
  { id: "development", title: "発達心理学", icon: "🌱", type: "quiz", questionBankId: "development", topGroup: "accordion", isActive: true },
  { id: "psychoanalysis", title: "精神分析の祖", icon: "🛋️", type: "quiz", questionBankId: "psychoanalysis", topGroup: "accordion", isActive: true },
  { id: "social", title: "社会活動に活かす心理学の祖", icon: "🤝", type: "quiz", questionBankId: "social", topGroup: "accordion", isActive: true },
  { id: "motivation", title: "動機付け/モチベーション", icon: "🔥", type: "quiz", questionBankId: "motivation", topGroup: "accordion", isActive: true },
  { id: "choice", title: "職業選択", icon: "💼", type: "quiz", questionBankId: "choice", topGroup: "accordion", isActive: true },
  { id: "transition", title: "転機理論", icon: "🔄", type: "quiz", questionBankId: "transition", topGroup: "accordion", isActive: true },
  { id: "decision", title: "意思決定", icon: "⚖️", type: "quiz", questionBankId: "decision", topGroup: "accordion", isActive: true },
  { id: "narrative", title: "ナラティブアプローチ", icon: "📖", type: "quiz", questionBankId: "narrative", topGroup: "accordion", isActive: true },
  { id: "positive", title: "ポジティブ心理学", icon: "✨", type: "quiz", questionBankId: "positive", topGroup: "accordion", isActive: true },
  { id: "trait", title: "特性論/タイプ論", icon: "🧩", type: "quiz", questionBankId: "trait", topGroup: "accordion", isActive: true },
  { id: "other", title: "その他", icon: "📦", type: "quiz", questionBankId: "other", topGroup: "accordion", isActive: true }
];

const EXAM_TAG_LABELS = {
  careerConsultant: "キャリア関連頻出",
  industrialCounselor: "産業保健領域頻出"
};

const ROOT_IMAGE_FILES = new Set([]);

// ==========================================
// パスワードロック設定
// ==========================================
const CURRENT_MONTH_PASSWORD = "ninin"; 

const LOCKED_CATEGORY_IDS = [
  "industrialFrequent",
  "industrialFrequentReview",
  "timeline",
  "episodeDirectory",
  "originalAcademic",
  "originalAcademicReview"
];

const LOCKED_REVIEW_SET_RULES = { careerFrequent: 3 };
const UNLOCKED_THEORY_CATEGORY_IDS = new Set(["transition", "decision"]);

const DIRECTORY_JOKE_TABS = [
  { id: "jokeBurger", label: "🍔", personIds: ["mayo_roethlisberger", "schlossberg", "herzberg", "ginzberg"] },
  { id: "jokeSon", label: "ソン", personIds: ["levinson", "nicholson", "williamson", "erikson"] }
];

const EPISODE_SORT_KANA = {
  atkinson: "あときんそん", seligman: "せりぐまん", taylor: "ていらー", watson: "わとそん", william_james: "じぇーむず"
};

function getCurrentMonthString() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; }
function isUnlocked() { return localStorage.getItem("pm_unlocked_month") === getCurrentMonthString(); }

function requestUnlockThen(action) {
  pendingAction = action;
  els.passwordModal.classList.add("active");
}

const KANA_GROUPS = [
  { id: "all", label: "すべて", chars: [] },
  { id: "a", label: "あ", chars: ["あ", "い", "う", "え", "お"] },
  { id: "ka", label: "か", chars: ["か", "き", "く", "け", "こ"] },
  { id: "sa", label: "さ", chars: ["さ", "し", "す", "せ", "そ"] },
  { id: "ta", label: "た", chars: ["た", "ち", "つ", "て", "と"] },
  { id: "na", label: "な", chars: ["な", "に", "ぬ", "ね", "の"] },
  { id: "ha", label: "は", chars: ["は", "ひ", "ふ", "へ", "ほ"] },
  { id: "ma", label: "ま", chars: ["ま", "み", "む", "め", "も"] },
  { id: "ya", label: "や", chars: ["や", "ゆ", "よ"] },
  { id: "ra", label: "ら", chars: ["ら", "り", "る", "れ", "ろ"] },
  { id: "wa", label: "わ", chars: ["わ", "を", "ん"] }
];

const state = {
  currentQuestionIndex: 0, score: 0, isAnswered: false, deck: [], history: [],
  currentCategory: null, currentSetIndex: null, currentSetStart: null, currentSetEnd: null,
  currentReviewCategoryId: null, currentReviewSetIndex: null, currentReviewLog: null, currentReviewHistory: [],
  directoryMode: "aiueo", directoryKanaGroup: "all", directoryTheoryCategory: "all", episodeKanaGroup: "all",
  timelineExamFilter: "all", timelineSortOrder: "theory", currentPastExamAnswer: null
};

const els = {
  topPage: document.getElementById("topPage"), dummyPage: document.getElementById("dummyPage"),
  setSelectPage: document.getElementById("setSelectPage"), setSelectHeaderTitle: document.getElementById("setSelectHeaderTitle"),
  quizSetList: document.getElementById("quizSetList"), reviewPage: document.getElementById("reviewPage"),
  reviewHeaderTitle: document.getElementById("reviewHeaderTitle"), reviewSetView: document.getElementById("reviewSetView"),
  reviewDetailView: document.getElementById("reviewDetailView"), reviewSetList: document.getElementById("reviewSetList"),
  reviewBackToSetsButton: document.getElementById("reviewBackToSetsButton"), reviewPdfButton: document.getElementById("reviewPdfButton"),
  reviewSummary: document.getElementById("reviewSummary"), reviewList: document.getElementById("reviewList"),
  directoryPage: document.getElementById("directoryPage"), timelinePage: document.getElementById("timelinePage"),
  episodeDirectoryPage: document.getElementById("episodeDirectoryPage"), episodeKanaFilters: document.getElementById("episodeKanaFilters"), episodeDirectoryCount: document.getElementById("episodeDirectoryCount"),
  episodeDirectoryList: document.getElementById("episodeDirectoryList"),
  timelineExamFilter: document.getElementById("timelineExamFilter"), timelineSortOrder: document.getElementById("timelineSortOrder"),
  timelineCount: document.getElementById("timelineCount"), timelineList: document.getElementById("timelineList"),
  quizPage: document.getElementById("quizPage"), socialLegalCategoryGrid: document.getElementById("socialLegalCategoryGrid"), mapStudyCategoryGrid: document.getElementById("mapStudyCategoryGrid"),
  dailyEpisodeBox: document.getElementById("dailyEpisodeBox"), dailyEpisodeImage: document.getElementById("dailyEpisodeImage"),
  dailyEpisodeName: document.getElementById("dailyEpisodeName"), dailyEpisodeTitle: document.getElementById("dailyEpisodeTitle"),
  dailyEpisodeText: document.getElementById("dailyEpisodeText"),
  directoryCategoryGrid: document.getElementById("directoryCategoryGrid"), examPrepCategoryGrid: document.getElementById("examPrepCategoryGrid"),
  categoryAccordionGrid: document.getElementById("categoryAccordionGrid"), dummyHeaderTitle: document.getElementById("dummyHeaderTitle"),
  directoryHeaderTitle: document.getElementById("directoryHeaderTitle"), directorySearch: document.getElementById("directorySearch"),
  directoryFilter: document.getElementById("directoryFilter"), directoryKanaPanel: document.getElementById("directoryKanaPanel"),
  directoryKanaFilters: document.getElementById("directoryKanaFilters"), directoryTheoryPanel: document.getElementById("directoryTheoryPanel"),
  directoryTheoryFilters: document.getElementById("directoryTheoryFilters"), directoryCount: document.getElementById("directoryCount"),
  directoryList: document.getElementById("directoryList"), quizHeaderTitle: document.getElementById("quizHeaderTitle"),
  progressFill: document.getElementById("progressFill"), progressText: document.getElementById("progressText"),
  questionArea: document.getElementById("questionArea"), questionKicker: document.getElementById("questionKicker"),
  questionText: document.getElementById("questionText"), interruptQuizButton: document.getElementById("interruptQuizButton"),
  prevQuestionButton: document.getElementById("prevQuestionButton"), choices: document.getElementById("choices"),
  feedbackArea: document.getElementById("feedbackArea"), feedbackQuestionBlock: document.getElementById("feedbackQuestionBlock"),
  feedbackQuestionText: document.getElementById("feedbackQuestionText"), resultBadge: document.getElementById("resultBadge"),
  feedbackResultIcon: document.getElementById("feedbackResultIcon"), feedbackResultIconImage: document.getElementById("feedbackResultIconImage"),
  userAnswerText: document.getElementById("userAnswerText"), feedbackImage: document.getElementById("feedbackImage"),
  answerText: document.getElementById("answerText"), psychologistName: document.getElementById("psychologistName"),
  psychologistMeta: document.getElementById("psychologistMeta"), explanationText: document.getElementById("explanationText"),
  extendedExplanationBox: document.getElementById("extendedExplanationBox"), extendedExplanationTitle: document.getElementById("extendedExplanationTitle"),
  extendedExplanationText: document.getElementById("extendedExplanationText"), questionMemoBox: document.getElementById("questionMemoBox"),
  questionMemoInput: document.getElementById("questionMemoInput"), questionMemoCount: document.getElementById("questionMemoCount"),
  questionMemoStatus: document.getElementById("questionMemoStatus"), psychologistDetailAction: document.getElementById("psychologistDetailAction"),
  worksBox: document.getElementById("worksBox"), worksList: document.getElementById("worksList"),
  pastExamBox: document.getElementById("pastExamBox"), pastExamRef: document.getElementById("pastExamRef"),
  pastExamQuestion: document.getElementById("pastExamQuestion"), pastExamOptions: document.getElementById("pastExamOptions"),
  nextButton: document.getElementById("nextButton"), nextButtonTop: document.getElementById("nextButtonTop"),
  
  // パスワードモーダル用
  passwordModal: document.getElementById("passwordModal"), closePasswordModalBtn: document.getElementById("closePasswordModalBtn"),
  membershipPassword: document.getElementById("membershipPassword"), verifyPasswordButton: document.getElementById("verifyPasswordButton"), passwordError: document.getElementById("passwordError"),

  // 学習記録・カレンダー・セーブ用
  learningRecordPanel: document.getElementById("learningRecordPanel"), streakCountText: document.getElementById("streakCountText"),
  totalCountText: document.getElementById("totalCountText"),
  examCountdownText: document.getElementById("examCountdownText"),
  welcomeBackModal: document.getElementById("welcomeBackModal"), closeWelcomeBackBtn: document.getElementById("closeWelcomeBackBtn"),
  thisMonthLabel: document.getElementById("thisMonthLabel"), thisMonthGrid: document.getElementById("thisMonthGrid"),
  nextMonthLabel: document.getElementById("nextMonthLabel"), nextMonthGrid: document.getElementById("nextMonthGrid"),
  topExamDateInput: document.getElementById("topExamDateInput"), saveTopExamDateBtn: document.getElementById("saveTopExamDateBtn"),
  saveLoadBtn: document.getElementById("saveLoadBtn"), saveLoadLockIcon: document.getElementById("saveLoadLockIcon")
};

let pendingAction = null;

// ==========================================
// 学習記録＆カレンダーロジック
// ==========================================
function getFormattedDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function checkLoginStatus() {
  const d = new Date();
  const todayStr = getFormattedDateString(d);
  d.setDate(d.getDate() - 1);
  const yesterdayStr = getFormattedDateString(d);
  
  let lastLogin = localStorage.getItem("pm_last_login");
  let history = JSON.parse(localStorage.getItem("pm_login_history") || "[]");
  let streak = parseInt(localStorage.getItem("pm_login_streak") || "0", 10);

  if (lastLogin !== todayStr) {
    if (!history.includes(todayStr)) { history.push(todayStr); localStorage.setItem("pm_login_history", JSON.stringify(history)); }
    if (lastLogin === yesterdayStr) {
      streak++;
    } else {
      streak = 1;
      // 過去にログインしたことがあり、かつ昨日ではない（＝途切れた）場合、ウェルカムバックモーダルを表示
      if (lastLogin !== null && els.welcomeBackModal) { els.welcomeBackModal.classList.add("active"); }
    }
    localStorage.setItem("pm_login_streak", streak.toString());
    localStorage.setItem("pm_last_login", todayStr);
  }
  renderLearningRecord();
}

function renderLearningRecord() {
  let streak = parseInt(localStorage.getItem("pm_login_streak") || "1", 10);
  if(els.streakCountText) els.streakCountText.textContent = streak;

  let history = JSON.parse(localStorage.getItem("pm_login_history") || "[]");
  if(els.totalCountText) els.totalCountText.textContent = Math.max(history.length, 1);

  let examDateStr = localStorage.getItem("pm_exam_date");
  if (els.topExamDateInput) els.topExamDateInput.value = examDateStr || "";
  
  if (examDateStr && els.examCountdownText) {
    const examDate = new Date(examDateStr); examDate.setHours(0,0,0,0);
    const today = new Date(); today.setHours(0,0,0,0);
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) els.examCountdownText.innerHTML = `🎯 あと<b>${diffDays}</b>日`;
    else if (diffDays === 0) els.examCountdownText.innerHTML = `🎯 <b>本日です！</b>`;
    else els.examCountdownText.innerHTML = `🎯 終了しました`;
  } else if (els.examCountdownText) {
    els.examCountdownText.innerHTML = `<span style="font-size:0.7rem; color:var(--muted); font-weight:normal;">設定なし</span>`;
  }
}

function generateCalendarHtml(year, month, history, todayStr, examDateStr) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // 月曜始まり
  
  const weekDays = ["月", "火", "水", "木", "金", "土", "日"];
  let html = weekDays.map(day => `<div class="mini-calendar-day-header">${day}</div>`).join("");
  
  for (let i = 0; i < startDayOfWeek; i++) { html += `<div class="mini-calendar-cell empty"></div>`; }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = getFormattedDateString(dateObj);
    const isLogged = history.includes(dateStr);
    const isToday = dateStr === todayStr;
    const isExam = examDateStr === dateStr;
    
    let classes = ["mini-calendar-cell"];
    if (isToday) classes.push("today");
    if (isLogged) classes.push("logged");
    if (isExam) classes.push("exam-date");
    
    html += `<div class="${classes.join(' ')}">${d}</div>`;
  }
  return html;
}

function renderCalendar() {
  const d = new Date();
  const year1 = d.getFullYear(); const month1 = d.getMonth();
  const d2 = new Date(year1, month1 + 1, 1);
  const year2 = d2.getFullYear(); const month2 = d2.getMonth();
  
  if(els.thisMonthLabel) els.thisMonthLabel.textContent = `${month1 + 1}月`;
  if(els.nextMonthLabel) els.nextMonthLabel.textContent = `${month2 + 1}月`;
  
  let history = JSON.parse(localStorage.getItem("pm_login_history") || "[]");
  const todayStr = getFormattedDateString(new Date());
  const examDateStr = localStorage.getItem("pm_exam_date");
  
  if(els.thisMonthGrid) els.thisMonthGrid.innerHTML = generateCalendarHtml(year1, month1, history, todayStr, examDateStr);
  if(els.nextMonthGrid) els.nextMonthGrid.innerHTML = generateCalendarHtml(year2, month2, history, todayStr, examDateStr);
}

// カレンダー・試験日設定のイベント登録
if (els.closeWelcomeBackBtn) els.closeWelcomeBackBtn.addEventListener("click", () => els.welcomeBackModal.classList.remove("active"));
if (els.saveTopExamDateBtn) {
  els.saveTopExamDateBtn.addEventListener("click", () => {
    if (els.topExamDateInput.value) {
      localStorage.setItem("pm_exam_date", els.topExamDateInput.value);
    } else {
      localStorage.removeItem("pm_exam_date");
    }
    const originalText = els.saveTopExamDateBtn.textContent;
    els.saveTopExamDateBtn.textContent = "保存済！";
    setTimeout(() => { els.saveTopExamDateBtn.textContent = originalText; }, 1500);
    renderLearningRecord();
    renderCalendar();
  });
}

// パスワードモーダルを閉じる
function closePasswordModal() {
  if (els.passwordModal) els.passwordModal.classList.remove("active");
  if (els.membershipPassword) els.membershipPassword.value = "";
  if (els.passwordError) els.passwordError.style.display = "none";
  pendingAction = null;
}
if (els.closePasswordModalBtn) els.closePasswordModalBtn.addEventListener("click", closePasswordModal);
if (els.verifyPasswordButton) {
  els.verifyPasswordButton.addEventListener("click", () => {
    if (els.membershipPassword.value.trim() === CURRENT_MONTH_PASSWORD) {
      localStorage.setItem("pm_unlocked_month", getCurrentMonthString());
      els.passwordModal.classList.remove("active");
      els.membershipPassword.value = "";
      els.passwordError.style.display = "none";
      renderCategoryButtons();
      if (pendingAction) { pendingAction(); pendingAction = null; }
    } else els.passwordError.style.display = "block";
  });
}

// セーブ＆ロードボタンのロック状態表示を更新
function updateSaveLoadBtnState() {
  if (!els.saveLoadBtn || !els.saveLoadLockIcon) return;
  if (!isUnlocked()) {
    els.saveLoadBtn.classList.remove("active-cat");
    els.saveLoadBtn.classList.add("disabled-cat");
    els.saveLoadLockIcon.textContent = "🔒";
    els.saveLoadLockIcon.style.opacity = "1";
  } else {
    els.saveLoadBtn.classList.remove("disabled-cat");
    els.saveLoadBtn.classList.add("active-cat");
    els.saveLoadLockIcon.textContent = "🔓";
    els.saveLoadLockIcon.style.opacity = "0.5";
  }
}

// セーブ＆ロードボタンのイベント登録
if (els.saveLoadBtn) {
  els.saveLoadBtn.addEventListener("click", () => {
    const action = () => { window.location.href = "save.html"; };
    if (!isUnlocked()) { requestUnlockThen(action); } else { action(); }
  });
}

function showTopPage() {
  els.quizPage.classList.add("hidden"); els.dummyPage.classList.add("hidden");
  els.setSelectPage.classList.add("hidden"); els.reviewPage.classList.add("hidden");
  els.directoryPage.classList.add("hidden"); els.timelinePage.classList.add("hidden"); els.episodeDirectoryPage.classList.add("hidden");
  els.topPage.classList.remove("hidden"); window.scrollTo(0, 0);
}

function showDummyPage(title) {
  els.dummyHeaderTitle.textContent = title;
  els.topPage.classList.add("hidden"); els.quizPage.classList.add("hidden");
  els.setSelectPage.classList.add("hidden"); els.reviewPage.classList.add("hidden");
  els.directoryPage.classList.add("hidden"); els.timelinePage.classList.add("hidden"); els.episodeDirectoryPage.classList.add("hidden");
  els.dummyPage.classList.remove("hidden"); window.scrollTo(0, 0);
}

function confirmBackToTop() { if (confirm("テストを中断してTOPに戻りますか？")) showTopPage(); }
function goToPreviousQuestion() { if (state.currentQuestionIndex <= 0 || state.isAnswered) return; const previousIndex = state.currentQuestionIndex - 1; state.history = state.history.slice(0, previousIndex); state.score = state.history.filter(item => item.isCorrect).length; state.currentQuestionIndex = previousIndex; saveCurrentReviewLog(); loadQuestion(); window.scrollTo({ top: 0, behavior: 'instant' }); }
function togglePastExam(targetId) { let box = targetId === 'quizPastExam' ? els.pastExamBox : document.getElementById(targetId); if(box) box.classList.toggle('open'); }
function getPastExamAnswerNumber(answerText) { const match = String(answerText || "").match(/\d/); return match ? match[0] : String(answerText || "").trim(); }
function isPastExamCorrectOption(originalText, answerText) { const answerNumber = getPastExamAnswerNumber(answerText); const normalizedText = String(originalText || "").trim(); return normalizedText.startsWith(answerNumber + ".") || normalizedText.startsWith(answerNumber + " "); }
function getPastExamShortExplanation(q) { const raw = (q && q.pastExam && q.pastExam.explanation) ? q.pastExam.explanation : (q && q.explanation ? q.explanation : ""); const compact = String(raw || "").replace(/\s+/g, " ").trim(); if (!compact) return "人物名・理論名・中心キーワードの結びつきを押さえるのがポイントです。"; if (compact.length <= 105) return compact; const sliced = compact.slice(0, 105); const breakAt = Math.max(sliced.lastIndexOf("。"), sliced.lastIndexOf("、")); return `${breakAt > 45 ? sliced.slice(0, breakAt + 1) : sliced}…`; }
function getPastExamCorrectOptionText(optionsUl, answerText) { const correctLi = Array.from(optionsUl.children).find(li => { const originalText = li.getAttribute('data-original-text') || li.textContent; return isPastExamCorrectOption(originalText, answerText); }); const originalText = correctLi ? (correctLi.getAttribute('data-original-text') || correctLi.textContent) : ""; return originalText.replace(/^\s*\d+\.\s*/, ""); }
function clearPastExamFeedback(optionsUl) { if (!optionsUl) return; const existing = optionsUl.nextElementSibling; if (existing && existing.classList.contains('past-exam-feedback')) existing.remove(); }
function renderPastExamFeedback(optionsUl, clickedIsCorrect, answerText) { clearPastExamFeedback(optionsUl); const answerNumber = getPastExamAnswerNumber(answerText); const correctOptionText = getPastExamCorrectOptionText(optionsUl, answerNumber); const feedback = document.createElement("div"); feedback.className = `past-exam-feedback ${clickedIsCorrect ? 'correct' : 'wrong'}`; const title = document.createElement("p"); title.className = "past-exam-feedback-title"; title.textContent = clickedIsCorrect ? "✅ 正解です" : `✅ 正解は ${answerNumber}. ${correctOptionText} です`; const text = document.createElement("p"); text.className = "past-exam-feedback-text"; text.textContent = optionsUl.dataset.explanation || "人物名・理論名・中心キーワードの結びつきを押さえるのがポイントです。"; feedback.appendChild(title); feedback.appendChild(text); optionsUl.insertAdjacentElement("afterend", feedback); }
function revealAnswer(targetId, answerText, clickedLi) { let optionsUl = targetId === 'quizPastExam' ? els.pastExamOptions : document.getElementById(targetId + 'Options'); if(optionsUl && !optionsUl.classList.contains('revealed')) { optionsUl.classList.add('revealed'); clearPastExamFeedback(optionsUl); let clickedIsCorrect = false; Array.from(optionsUl.children).forEach(li => { const originalText = li.getAttribute('data-original-text') || li.textContent; if (!li.hasAttribute('data-original-text')) li.setAttribute('data-original-text', originalText); const isCorrect = isPastExamCorrectOption(originalText, answerText); if (li === clickedLi) clickedIsCorrect = isCorrect; if(isCorrect) { li.innerHTML = `<span style="flex-shrink:0; margin-right:8px; font-size:1.1rem;">✅</span><span>${originalText}</span>`; li.classList.add('correct-choice'); } else if (li === clickedLi) { li.innerHTML = `<span style="flex-shrink:0; margin-right:8px; font-size:1.1rem;">❌</span><span>${originalText}</span>`; li.classList.add('wrong-choice'); } else { li.innerHTML = `<span style="flex-shrink:0; margin-right:8px; width:1.1rem; display:inline-block;"></span><span>${originalText}</span>`; li.classList.add('unselected-choice'); } }); renderPastExamFeedback(optionsUl, clickedIsCorrect, answerText); } }
function escapeHtml(value) { return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); }
function renderExtendedExplanationHtml(q) { if (!q.extendedExplanation) return ""; const title = q.extendedExplanationTitle ? `詳しい解説：${q.extendedExplanationTitle}` : "詳しい解説を読む"; return `<details class="extended-explanation-box"><summary>${escapeHtml(title)}</summary><div class="extended-explanation-text">${escapeHtml(q.extendedExplanation)}</div></details>`; }
function getQuestionMemoKey(questionId) { return `pmQuestionMemo:v1:${questionId}`; }
function loadQuestionMemo(questionId) { if (!questionId) return ""; try { return localStorage.getItem(getQuestionMemoKey(questionId)) || ""; } catch (error) { return ""; } }
function saveQuestionMemo(questionId, value) { if (!questionId) return false; try { const memo = String(value || "").slice(0, 255); const key = getQuestionMemoKey(questionId); if (memo) localStorage.setItem(key, memo); else localStorage.removeItem(key); return true; } catch (error) { return false; } }
function updateMemoCount(textarea, countEl) { if (!textarea || !countEl) return; countEl.textContent = `${textarea.value.length} / 255`; }
function bindQuestionMemo(textarea, countEl, statusEl, questionId) { if (!textarea || !countEl) return; if (!questionId) { textarea.value = ""; textarea.oninput = null; updateMemoCount(textarea, countEl); if (statusEl) statusEl.textContent = ""; return; } textarea.value = loadQuestionMemo(questionId).slice(0, 255); updateMemoCount(textarea, countEl); if (statusEl) statusEl.textContent = textarea.value ? "保存済み" : ""; textarea.oninput = () => { if (textarea.value.length > 255) textarea.value = textarea.value.slice(0, 255); updateMemoCount(textarea, countEl); const saved = saveQuestionMemo(questionId, textarea.value); if (statusEl) statusEl.textContent = saved ? "保存済み" : "保存できませんでした"; }; }
function renderQuestionMemoHtml(q, idPrefix = "modalQuestionMemo") { const safeId = String(q.id || "question").replace(/[^a-zA-Z0-9_-]/g, "-"); const textareaId = `${idPrefix}_${safeId}`; const countId = `${textareaId}_count`; const statusId = `${textareaId}_status`; return `<div class="question-memo-box" data-question-memo-id="${escapeHtml(q.id)}"><div class="question-memo-header"><label class="question-memo-label" for="${escapeHtml(textareaId)}">この問題のメモ</label><span class="question-memo-count" id="${escapeHtml(countId)}">0 / 255</span></div><textarea class="question-memo-input" id="${escapeHtml(textareaId)}" maxlength="255" rows="3" placeholder="覚えておきたいポイントを短くメモできます"></textarea><div class="question-memo-status" id="${escapeHtml(statusId)}"></div></div>`; }
function bindQuestionMemos(root = document) { root.querySelectorAll(".question-memo-box[data-question-memo-id]").forEach(box => { const textarea = box.querySelector(".question-memo-input"); const countEl = box.querySelector(".question-memo-count"); const statusEl = box.querySelector(".question-memo-status"); bindQuestionMemo(textarea, countEl, statusEl, box.dataset.questionMemoId); }); }
function getPersonById(personId) { if (!personId) return null; return PSYCHOLOGIST_BANK.find(person => person.id === personId) || null; }

let dailyEpisodeTimer = null;
let dailyEpisodeIndex = -1;
let dailyEpisodePaused = false;
let dailyEpisodeIsAnimating = false;
let dailyEpisodeControlsBound = false;

function pickDailyEpisodeIndex() {
  if (typeof EPISODES === "undefined" || !Array.isArray(EPISODES) || !EPISODES.length) return -1;
  if (EPISODES.length === 1) return 0;
  let nextIndex = dailyEpisodeIndex;
  while (nextIndex === dailyEpisodeIndex) nextIndex = Math.floor(Math.random() * EPISODES.length);
  return nextIndex;
}

function setDailyEpisode(index) {
  if (index < 0 || typeof EPISODES === "undefined" || !Array.isArray(EPISODES) || !EPISODES[index]) return;
  dailyEpisodeIndex = index;
  const episode = EPISODES[index];
  const person = getPersonById(episode.id);
  const displayName = episode.name || person?.displayName || person?.name || episode.id;
  const imageFile = person?.images?.[0] || episode.image || "map.jpg";

  setImageWithFallback(els.dailyEpisodeImage, imageFile, `画像: ${displayName}`);
  els.dailyEpisodeName.textContent = displayName;
  els.dailyEpisodeTitle.textContent = episode.title;
  els.dailyEpisodeText.textContent = episode.text;
}

function clearDailyEpisodeTimer() {
  if (!dailyEpisodeTimer) return;
  window.clearTimeout(dailyEpisodeTimer);
  dailyEpisodeTimer = null;
}

function scheduleDailyEpisodeSlide() {
  clearDailyEpisodeTimer();
  if (!els.dailyEpisodeBox || dailyEpisodePaused) return;
  const delay = els.dailyEpisodeBox.open ? 15000 : 5000;
  dailyEpisodeTimer = window.setTimeout(() => {
    slideToNextDailyEpisode();
    scheduleDailyEpisodeSlide();
  }, delay);
}

function slideToNextDailyEpisode() {
  if (!els.dailyEpisodeBox || typeof EPISODES === "undefined" || !Array.isArray(EPISODES) || EPISODES.length < 2) return;
  if (dailyEpisodeIsAnimating) return;
  dailyEpisodeIsAnimating = true;
  const nextIndex = pickDailyEpisodeIndex();
  els.dailyEpisodeBox.classList.remove("is-sliding-in");
  els.dailyEpisodeBox.classList.add("is-sliding-out");
  window.setTimeout(() => {
    setDailyEpisode(nextIndex);
    els.dailyEpisodeBox.classList.remove("is-sliding-out");
    els.dailyEpisodeBox.classList.add("is-sliding-in");
    window.setTimeout(() => {
      els.dailyEpisodeBox.classList.remove("is-sliding-in");
      dailyEpisodeIsAnimating = false;
    }, 380);
  }, 260);
}

function handleDailyEpisodeTextClick(event) {
  if (!els.dailyEpisodeBox || !els.dailyEpisodeBox.open) return;
  event.preventDefault();
  event.stopPropagation();
  if (!dailyEpisodePaused) {
    dailyEpisodePaused = true;
    els.dailyEpisodeBox.classList.add("is-paused");
    clearDailyEpisodeTimer();
    return;
  }
  dailyEpisodePaused = false;
  els.dailyEpisodeBox.classList.remove("is-paused");
  slideToNextDailyEpisode();
  scheduleDailyEpisodeSlide();
}

function bindDailyEpisodeControls() {
  if (dailyEpisodeControlsBound || !els.dailyEpisodeBox) return;
  dailyEpisodeControlsBound = true;
  [els.dailyEpisodeName, els.dailyEpisodeTitle, els.dailyEpisodeText].forEach(el => {
    if (el) el.addEventListener("click", handleDailyEpisodeTextClick);
  });
  els.dailyEpisodeBox.addEventListener("toggle", () => {
    dailyEpisodePaused = false;
    els.dailyEpisodeBox.classList.remove("is-paused");
    scheduleDailyEpisodeSlide();
  });
}

function renderDailyEpisode() {
  if (!els.dailyEpisodeBox || typeof EPISODES === "undefined" || !Array.isArray(EPISODES) || !EPISODES.length) return;
  bindDailyEpisodeControls();
  setDailyEpisode(pickDailyEpisodeIndex());
  scheduleDailyEpisodeSlide();
}

function shouldUseAnswerReviewLayout() {
  return ["careerFrequent", "industrialFrequent", "originalAcademic", "socialLegal"].includes(state.currentCategory?.id);
}

function shouldUseResultCharacterIcon() {
  return ["originalAcademic", "socialLegal"].includes(state.currentCategory?.id);
}

function isSocialLegalQuestion(q) {
  return state.currentCategory?.id === "socialLegal" || (q.categoryIds || []).includes("socialLegal");
}

function clearFeedbackImageFrame(spacerOnly = false) {
  els.feedbackImage.removeAttribute("src");
  els.feedbackImage.alt = "";
  els.feedbackImage.onerror = null;
  const frame = els.feedbackImage.closest(".feedback-image");
  frame?.classList.add("is-empty");
  frame?.classList.toggle("is-spacer-only", spacerOnly);
}

function showFeedbackImage(file, altText) {
  const frame = els.feedbackImage.closest(".feedback-image");
  frame?.classList.remove("is-empty", "is-spacer-only");
  setImageWithFallback(els.feedbackImage, file, altText);
}

function setFeedbackResultIcon(isCorrect) {
  if (!els.feedbackResultIcon || !els.feedbackResultIconImage) return;
  if (!shouldUseResultCharacterIcon()) {
    els.feedbackResultIcon.style.display = "none";
    els.feedbackResultIconImage.removeAttribute("src");
    els.feedbackResultIconImage.alt = "";
    return;
  }
  const src = isCorrect ? "cimg/s1.png" : "cimg/s2.png";
  els.feedbackResultIconImage.src = src;
  els.feedbackResultIconImage.alt = isCorrect ? "正答" : "不正解";
  els.feedbackResultIcon.style.display = "flex";
}

function setPsychologistMetaVisibility(show) {
  const nameWrap = els.psychologistName?.parentElement;
  if (nameWrap) nameWrap.style.display = show ? "" : "none";
  if (els.psychologistMeta) els.psychologistMeta.style.display = show ? "" : "none";
}

function renderUserAnswerText(q, selectedIndex) {
  return `<span class="user-answer-label">あなたの解答</span><span class="user-answer-choice">${escapeHtml(q.options[selectedIndex])}</span>`;
}

function getQuestionCategoryText(q) {
  const labels = (q.categoryIds || []).map(categoryId => CATEGORIES.find(cat => cat.id === categoryId)?.title).filter(Boolean);
  return labels.length ? labels.join(" / ") : "関連問題";
}

function getPersonRelatedQuestions(personId) {
  const seen = new Set();
  return getAllQuestions().filter(q => q.psychologistId === personId && q.explanation).filter(q => {
    if (seen.has(q.id)) return false; seen.add(q.id); return true;
  });
}

function renderWorksHtml(works) {
  if (!works || !works.length) return "";
  const sortedWorks = [...works].sort((a, b) => a.year - b.year);
  return `<div class="works-box" style="display:block; margin-top:10px;"><p class="works-title">関連年表</p><ul class="works-list">${sortedWorks.map(work => `<li><span class="work-year">${escapeHtml(work.year)}年</span><span>${escapeHtml(work.title)}</span></li>`).join("")}</ul></div>`;
}

function renderPersonQuestionDetail(q, isOpen = false) {
  return `<details class="extended-explanation-box" ${isOpen ? "open" : ""}><summary>${escapeHtml(getQuestionCategoryText(q))}<span class="person-detail-question">${escapeHtml(q.text)}</span></summary><div class="extended-explanation-text">${escapeHtml(q.explanation)}${q.extendedExplanation ? `\n\n${escapeHtml(q.extendedExplanation)}` : ""}</div>${renderQuestionMemoHtml(q, "personQuestionMemo")}${renderWorksHtml(q.works)}</details>`;
}

function openPsychologistDetailModal(personOrId, sourceQuestion = null) {
  const person = typeof personOrId === "string" ? getPersonById(personOrId) : personOrId;
  if (!person) return;
  const relatedQuestions = getPersonRelatedQuestions(person.id);
  if (sourceQuestion) {
    relatedQuestions.sort((a, b) => {
      if (a.id === sourceQuestion.id) return -1;
      if (b.id === sourceQuestion.id) return 1;
      return 0;
    });
  }
  const tags = (person.examTags || []).map(tag => EXAM_TAG_LABELS[tag]).filter(Boolean);
  const mainImage = person.images && person.images.length ? person.images[0] : "";
  const html = `<div class="person-detail-profile"><img src="${getImageSrc(mainImage)}" onerror="this.onerror=null;this.src='${getFallbackImageSrc(mainImage)}'" alt="${escapeHtml(person.displayName || person.name)}"><div><p class="person-detail-name">${escapeHtml(person.displayName || person.name)}</p><p class="person-detail-meta">${escapeHtml(person.en || "")}</p><p class="person-detail-topic">${escapeHtml(person.topic || "")}</p><div class="tag-row">${tags.map(label => `<span class="mini-tag">${escapeHtml(label)}</span>`).join("")}</div></div></div><p class="person-detail-count">登録済みの解説 ${relatedQuestions.length}件</p>${relatedQuestions.length ? relatedQuestions.map(q => renderPersonQuestionDetail(q, sourceQuestion && q.id === sourceQuestion.id)).join("") : `<div class="dummy-content"><p>この心理学者の解説は、問題データ追加後に表示されます。</p></div>`}`;
  document.getElementById("modalBody").innerHTML = html;
  bindQuestionMemos(document.getElementById("modalBody"));
  document.getElementById("resultModal").classList.add("active");
}

function renderPsychologistDetailAction(q) {
  const person = getPersonById(q.psychologistId);
  els.psychologistDetailAction.innerHTML = "";
  if (!person) { els.psychologistDetailAction.style.display = "none"; return; }
  const button = document.createElement("button");
  button.type = "button"; button.className = "person-detail-button"; button.textContent = "この心理学者の解説を見る";
  button.addEventListener("click", () => openPsychologistDetailModal(person, q));
  els.psychologistDetailAction.appendChild(button);
  els.psychologistDetailAction.style.display = "block";
}

function openModal(historyItem, index) {
  const q = historyItem.question;
  const bCountry = isEmojiSupported ? q.birthCountry : q.birthCountryText;
  const aCountry = isEmojiSupported ? q.activeCountry : q.activeCountryText;
  let html = `<div style="margin-bottom:12px;"><span class="result-badge ${historyItem.isCorrect ? 'correct' : 'wrong'}" style="margin-bottom:0; font-size:1rem;">${historyItem.isCorrect ? '⭕ 正解' : '❌ 不正解'}</span></div><div class="question-kicker" style="font-size:0.85rem;">第${index + 1}問</div><div class="question-text" style="font-size:1rem; margin-bottom:16px;">${q.text}</div>`;
  if (!historyItem.isCorrect) html += `<div class="user-answer-text" style="display:block; margin-bottom:16px; font-size:0.85rem;">あなたの解答：${q.options[historyItem.selectedIndex]}</div>`;
  html += `<div class="feedback-header" style="margin-bottom:16px; padding:12px;"><div class="feedback-image" style="width:70px; height:70px;"><img src="${getImageSrc(q.image)}" onerror="this.onerror=null;this.src='${getFallbackImageSrc(q.image)}'" alt="${q.name}"></div><div class="feedback-answer"><div class="answer-label" style="font-size:0.75rem;">正答</div><div class="answer-text" style="font-size:1rem;">${q.options[q.answer]}</div><div><span class="psychologist-name" style="font-size:0.85rem;">${q.name}</span></div><div class="psychologist-meta" style="font-size:0.7rem; margin-top:4px;">${q.metaText || `出生：${bCountry} 活躍：${aCountry}<br>生没：${q.lifespan}`}</div></div></div><div class="feedback-body" style="padding:12px; margin-bottom:16px;"><p class="explanation-title" style="font-size:0.85rem;">解説・ポイント</p><p class="explanation-text" style="font-size:0.9rem;">${q.explanation}</p>${renderExtendedExplanationHtml(q)}${renderQuestionMemoHtml(q)}</div>`;
  if (q.pastExam) {
     let refText = q.pastExam.title.includes("オリジナル") ? "オリジナル予想問題" : `実際の過去問ではこう出る！（${q.pastExam.title}）`;
     let modalPastExamId = `modalPastExam_${index}`;
     let optionsHtml = q.pastExam.options.map(opt => `<li onclick="revealAnswer('${modalPastExamId}', '${q.pastExam.answer}', this)" data-original-text="${opt}">${opt}</li>`).join('');
     html += `<div class="past-exam-box" id="${modalPastExamId}" style="margin-bottom:0;"><div class="past-exam-header" style="padding:12px;" onclick="togglePastExam('${modalPastExamId}')"><p class="past-exam-title" style="font-size:0.85rem;">📘 ${refText}</p><span class="past-exam-toggle-icon">▼</span></div><div class="past-exam-content" style="padding:0 12px;"><p class="past-exam-question" style="font-size:0.85rem; margin-top:12px; margin-bottom:8px;">${q.pastExam.question}</p><p style="font-size:0.8rem; color:var(--muted); margin-bottom:8px;">※正解だと思う選択肢をタップ</p><ul class="past-exam-options" id="${modalPastExamId}Options" style="font-size:0.85rem;">${optionsHtml}</ul></div></div>`;
  }
  document.getElementById('modalBody').innerHTML = html;
  bindQuestionMemos(document.getElementById("modalBody"));
  if (q.pastExam) {
    const modalOptions = document.getElementById(`modalPastExam_${index}Options`);
    if (modalOptions) modalOptions.dataset.explanation = getPastExamShortExplanation(q);
  }
  document.getElementById('resultModal').classList.add('active');
}

function closeModal() { document.getElementById('resultModal').classList.remove('active'); }

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getImageSrc(file) { return ROOT_IMAGE_FILES.has(file) || file.includes("/") ? file : `img/${file}`; }
function getFallbackImageSrc(file) { return ROOT_IMAGE_FILES.has(file) && !file.includes("/") ? `img/${file}` : file; }
function setImageWithFallback(img, file, altText) { img.onerror = () => { img.onerror = null; img.src = getFallbackImageSrc(file); }; img.src = getImageSrc(file); img.alt = altText; }

function getAllQuestions() {
  const seen = new Set();
  return Object.values(QUESTION_BANKS).flat().filter(q => { if (!q || seen.has(q.id)) return false; seen.add(q.id); return true; });
}

function getQuestionsForCategory(cat) {
  if (!cat || cat.type !== "quiz") return [];
  let questions = [];
  if (cat.examTag) questions = getAllQuestions().filter(q => (q.examTags || []).includes(cat.examTag));
  else if (cat.questionBankId) questions = QUESTION_BANKS[cat.questionBankId] || [];
  else if (cat.questionBankIds) questions = cat.questionBankIds.flatMap(bankId => QUESTION_BANKS[bankId] || []);
  if (cat.categoryFilter) questions = questions.filter(q => (q.categoryIds || []).includes(cat.categoryFilter));
  return questions;
}

function isCategoryActive(cat) {
  if (cat.isActive === false) return false;
  if (cat.type === "timeline") return true;
  if (cat.type === "directory") return true;
  if (cat.type === "episodeDirectory") return typeof EPISODES !== "undefined" && Array.isArray(EPISODES) && EPISODES.length > 0;
  if (cat.type === "review") { const targetCat = CATEGORIES.find(c => c.id === cat.reviewForCategoryId); return getQuestionSetsForCategory(targetCat).length > 0; }
  return getQuestionsForCategory(cat).length > 0;
}

function getQuestionSetsForCategory(cat) {
  const questions = getQuestionsForCategory(cat);
  const setSize = cat && cat.questionLimit ? cat.questionLimit : questions.length;
  if (!questions.length || !setSize) return [];
  const sets = [];
  for (let start = 0; start < questions.length; start += setSize) {
    sets.push({ index: sets.length, start, end: Math.min(start + setSize, questions.length), questions: questions.slice(start, start + setSize) });
  }
  return sets;
}

function showQuizSetPage(categoryId) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  const sets = getQuestionSetsForCategory(cat);
  if (!sets.length) { showDummyPage(cat ? cat.title : "問題"); return; }
  els.setSelectHeaderTitle.textContent = cat.title; els.quizSetList.innerHTML = "";
  sets.forEach(set => {
    const btn = document.createElement("button"); btn.className = "set-button";
    btn.innerHTML = `<span class="set-title">第${set.index + 1}セット</span><span class="set-meta">${set.questions.length}問 / ${set.start + 1}-${set.end}</span>`;
    btn.addEventListener("click", () => startQuiz(categoryId, set.index));
    els.quizSetList.appendChild(btn);
  });
  els.topPage.classList.add("hidden"); els.quizPage.classList.add("hidden");
  els.dummyPage.classList.add("hidden"); els.reviewPage.classList.add("hidden");
  els.directoryPage.classList.add("hidden"); els.timelinePage.classList.add("hidden"); els.episodeDirectoryPage.classList.add("hidden");
  els.setSelectPage.classList.remove("hidden"); window.scrollTo(0, 0);
}

function getReviewStorageKey(categoryId, setIndex) { return `pmQuizReview:v1:${categoryId}:set${setIndex}`; }
function getQuestionById(questionId) { return getAllQuestions().find(q => q.id === questionId) || null; }

function saveCurrentReviewLog() {
  if (!state.currentCategory || (!state.currentCategory.examTag && !state.currentCategory.reviewable) || state.currentSetIndex === null) return;
  const payload = {
    categoryId: state.currentCategory.id, categoryTitle: state.currentCategory.title,
    setIndex: state.currentSetIndex, setStart: state.currentSetStart, setEnd: state.currentSetEnd,
    score: state.score, total: state.deck.length, completed: state.history.length === state.deck.length,
    updatedAt: new Date().toISOString(),
    items: state.history.map(item => ({ questionId: item.question.id, selectedIndex: item.selectedIndex, isCorrect: item.isCorrect }))
  };
  try { localStorage.setItem(getReviewStorageKey(payload.categoryId, payload.setIndex), JSON.stringify(payload)); } catch (error) {}
}

function loadReviewLog(categoryId, setIndex) {
  try { const raw = localStorage.getItem(getReviewStorageKey(categoryId, setIndex)); return raw ? JSON.parse(raw) : null; } catch (error) { return null; }
}

function getReviewHistoryFromLog(log) {
  if (!log || !Array.isArray(log.items)) return [];
  return log.items.map(item => { const question = getQuestionById(item.questionId); if (!question) return null; return { question, selectedIndex: item.selectedIndex, isCorrect: item.isCorrect }; }).filter(Boolean);
}

function formatReviewDate(isoText) {
  if (!isoText) return ""; const date = new Date(isoText); if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function getReviewSetProgress(log, set) {
  const total = set && Array.isArray(set.questions) ? set.questions.length : (log?.total || 0);
  const items = log && Array.isArray(log.items) ? log.items : [];
  const answered = Math.min(items.length, total);
  const correct = items.filter(item => item.isCorrect).length;
  let label = `${correct}/${answered}/${total}問`;
  let statusClass = "";

  if (total > 0 && answered === total && correct === total) {
    label = `クリア🎉${label}`;
    statusClass = "clear";
  } else if (correct >= 8) {
    label = `すごい✨${label}`;
    statusClass = "great";
  }

  return { label, statusClass };
}

function showReviewPage(categoryId) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  const sets = getQuestionSetsForCategory(cat);
  if (!cat || !sets.length) { showDummyPage(cat ? `${cat.title}振返り` : "振返り"); return; }
  els.reviewHeaderTitle.textContent = `${cat.title}振返り`; state.currentReviewCategoryId = categoryId;
  state.currentReviewSetIndex = null; state.currentReviewLog = null; state.currentReviewHistory = [];
  els.reviewSetView.classList.remove("hidden"); els.reviewDetailView.classList.add("hidden");
  els.reviewSetList.innerHTML = ""; els.reviewSummary.textContent = ""; els.reviewList.innerHTML = "";
  sets.forEach(set => {
    const log = loadReviewLog(categoryId, set.index);
    const progress = getReviewSetProgress(log, set);
    const lockFromSetIndex = LOCKED_REVIEW_SET_RULES[categoryId];
    const needsUnlock = Number.isInteger(lockFromSetIndex) && set.index >= lockFromSetIndex && !isUnlocked();
    const btn = document.createElement("button"); btn.className = "set-button";
    if (needsUnlock) btn.classList.add("locked-set");
    btn.innerHTML = `<span class="set-title">第${set.index + 1}セット${needsUnlock ? `<span class="inline-lock">🔒</span>` : ""}</span><span class="set-meta ${progress.statusClass}">${progress.label}</span>`;
    btn.addEventListener("click", () => {
      const action = () => renderReviewLog(categoryId, set.index);
      if (needsUnlock) requestUnlockThen(action); else action();
    });
    els.reviewSetList.appendChild(btn);
  });
  els.topPage.classList.add("hidden"); els.quizPage.classList.add("hidden");
  els.dummyPage.classList.add("hidden"); els.setSelectPage.classList.add("hidden");
  els.directoryPage.classList.add("hidden"); els.timelinePage.classList.add("hidden"); els.episodeDirectoryPage.classList.add("hidden");
  els.reviewPage.classList.remove("hidden"); window.scrollTo(0, 0);
}

function showReviewSetList() {
  if (state.currentReviewCategoryId) { showReviewPage(state.currentReviewCategoryId); return; }
  state.currentReviewSetIndex = null; state.currentReviewLog = null; state.currentReviewHistory = [];
  els.reviewDetailView.classList.add("hidden"); els.reviewSetView.classList.remove("hidden");
  els.reviewSummary.textContent = ""; els.reviewList.innerHTML = ""; window.scrollTo(0, 0);
}

function renderReviewLog(categoryId, setIndex) {
  const log = loadReviewLog(categoryId, setIndex); const history = getReviewHistoryFromLog(log);
  state.currentReviewCategoryId = categoryId; state.currentReviewSetIndex = setIndex;
  state.currentReviewLog = log; state.currentReviewHistory = history;
  els.reviewSetView.classList.add("hidden"); els.reviewDetailView.classList.remove("hidden"); els.reviewList.innerHTML = "";
  if (!log || !history.length) {
    els.reviewSummary.textContent = `第${setIndex + 1}セットの履歴はまだありません。`;
    const empty = document.createElement("li"); empty.className = "review-empty"; empty.textContent = "このセットを一度解くと、ここに正誤つきで表示されます。";
    els.reviewList.appendChild(empty); els.reviewPdfButton.disabled = true; return;
  }
  els.reviewPdfButton.disabled = false;
  const answeredCount = history.length; const correctCount = history.filter(item => item.isCorrect).length;
  const dateText = formatReviewDate(log.updatedAt);
  els.reviewSummary.textContent = `第${setIndex + 1}セット / ${correctCount}/${answeredCount}問正解${dateText ? ` / ${dateText}` : ""}`;
  history.forEach((item, index) => {
    const li = document.createElement("li"); li.className = `review-item ${item.isCorrect ? "correct" : "wrong"}`;
    li.innerHTML = `<span><span class="review-question-text">第${index + 1}問 ${item.question.text}</span><span class="review-question-meta">${item.question.name}</span></span><span class="review-mark">${item.isCorrect ? "✅" : "×"}</span>`;
    li.addEventListener("click", () => openModal(item, index)); els.reviewList.appendChild(li);
  });
}

function getPersonSortYear(person) {
  const years = getAllQuestions().filter(q => q.psychologistId === person.id).flatMap(q => (q.works || []).map(work => work.year)).filter(year => Number.isFinite(year));
  return years.length ? Math.min(...years) : 9999;
}

function getDirectoryModeLabel(mode) { return mode === "theoryTimeline" ? "心理学者一覧（理論別、年代順）" : "心理学者一覧（aiueo）"; }
function getNormalizedKanaFirstChar(sortKana) { return String(sortKana || "").trim().normalize("NFD").replace(/[\u3099\u309A]/g, "").charAt(0); }
function getKanaGroupId(sortKana) { const firstChar = getNormalizedKanaFirstChar(sortKana); const group = KANA_GROUPS.find(item => item.chars.includes(firstChar)); return group ? group.id : "all"; }

function getUsedTheoryCategories() {
  const usedCategoryIds = new Set(getAllQuestions().flatMap(q => q.categoryIds || []));
  return CATEGORIES.filter(cat => cat.type === "quiz" && usedCategoryIds.has(cat.id)).map(cat => ({ id: cat.id, label: cat.title }));
}

function getDirectoryJokeTab(categoryId) {
  return DIRECTORY_JOKE_TABS.find(tab => tab.id === categoryId) || null;
}

function isDirectoryTheoryCategoryLocked(categoryId) {
  if (getDirectoryJokeTab(categoryId)) return false;
  if (categoryId === "all") return true;
  return !UNLOCKED_THEORY_CATEGORY_IDS.has(categoryId);
}

function renderFilterChips(container, options, activeValue, onSelect) {
  container.innerHTML = "";
  options.forEach(option => {
    const btn = document.createElement("button"); btn.type = "button"; btn.className = `filter-chip ${option.id === activeValue ? "active" : ""}`;
    const needsUnlock = option.locked && !isUnlocked();
    if (needsUnlock) btn.classList.add("locked-filter");
    btn.innerHTML = `${option.label}${needsUnlock ? `<span class="inline-lock">🔒</span>` : ""}`;
    btn.addEventListener("click", () => {
      const action = () => onSelect(option.id);
      if (needsUnlock) requestUnlockThen(action); else action();
    });
    container.appendChild(btn);
  });
}

// 🍔とソンを一番後ろにし、転機と意思決定を先頭にする処理
function renderDirectoryModeFilters() {
  const isAiueo = state.directoryMode === "aiueo";
  els.directoryKanaPanel.style.display = isAiueo ? "grid" : "none"; els.directoryTheoryPanel.style.display = isAiueo ? "none" : "grid";
  renderFilterChips(els.directoryKanaFilters, KANA_GROUPS, state.directoryKanaGroup, value => { state.directoryKanaGroup = value; renderDirectory(); });
  
  let theoryCats = getUsedTheoryCategories();
  const topIds = ["transition", "decision"];
  const topCats = topIds.map(id => theoryCats.find(c => c.id === id)).filter(Boolean);
  const otherCats = theoryCats.filter(c => !topIds.includes(c.id) && c.id !== "originalAcademic");
  
  const theoryOptions = [
    { id: "all", label: "すべて" }, 
    ...topCats, 
    ...otherCats, 
    ...DIRECTORY_JOKE_TABS
  ].map(option => ({ ...option, locked: isDirectoryTheoryCategoryLocked(option.id) }));
  
  renderFilterChips(els.directoryTheoryFilters, theoryOptions, state.directoryTheoryCategory, value => { state.directoryTheoryCategory = value; renderDirectory(); });
}

function showDirectoryPage(filterTag = "all", mode = "aiueo") {
  state.directoryMode = mode; state.directoryKanaGroup = "all"; state.directoryTheoryCategory = mode === "theoryTimeline" ? "transition" : "all";
  els.directoryHeaderTitle.textContent = getDirectoryModeLabel(mode); els.directoryFilter.value = filterTag;
  els.topPage.classList.add("hidden"); els.quizPage.classList.add("hidden");
  els.setSelectPage.classList.add("hidden"); els.reviewPage.classList.add("hidden");
  els.dummyPage.classList.add("hidden"); els.timelinePage.classList.add("hidden"); els.episodeDirectoryPage.classList.add("hidden");
  els.directoryPage.classList.remove("hidden"); renderDirectory(); window.scrollTo(0, 0);
}

function renderDirectory() {
  const query = els.directorySearch.value.trim().toLowerCase(); const filterTag = els.directoryFilter.value; renderDirectoryModeFilters();
  let people = [...PSYCHOLOGIST_BANK].sort((a, b) => {
    if (state.directoryMode === "theoryTimeline") { const yearDiff = getPersonSortYear(a) - getPersonSortYear(b); if (yearDiff !== 0) return yearDiff; }
    return a.sortKana.localeCompare(b.sortKana, "ja");
  });
  if (filterTag !== "all") people = people.filter(person => (person.examTags || []).includes(filterTag));
  if (state.directoryMode === "aiueo" && state.directoryKanaGroup !== "all") people = people.filter(person => getKanaGroupId(person.sortKana) === state.directoryKanaGroup);
  if (state.directoryMode === "theoryTimeline" && state.directoryTheoryCategory !== "all") {
    const jokeTab = getDirectoryJokeTab(state.directoryTheoryCategory);
    const targetPersonIds = jokeTab ? new Set(jokeTab.personIds) : new Set(getAllQuestions().filter(q => (q.categoryIds || []).includes(state.directoryTheoryCategory)).map(q => q.psychologistId));
    people = people.filter(person => targetPersonIds.has(person.id));
  }
  if (query) { people = people.filter(person => { const haystack = [person.name, person.displayName, person.en, person.topic, ...(person.images || [])].join(" ").toLowerCase(); return haystack.includes(query); }); }
  els.directoryCount.textContent = `${people.length}件表示`; els.directoryList.innerHTML = "";
  if (!people.length) { const empty = document.createElement("div"); empty.className = "dummy-content"; empty.innerHTML = "<p>該当する心理学者はまだ登録されていません。</p>"; els.directoryList.appendChild(empty); return; }
  people.forEach(person => {
    const tags = (person.examTags || []).map(tag => EXAM_TAG_LABELS[tag]).filter(Boolean);
    const sortYear = getPersonSortYear(person); const timelineText = state.directoryMode === "theoryTimeline" && sortYear !== 9999 ? ` / 主な年: ${sortYear}年` : "";
    const card = document.createElement("article"); card.className = "person-card"; card.tabIndex = 0; card.setAttribute("role", "button"); card.setAttribute("aria-label", `${person.displayName || person.name}の解説を開く`);
    card.innerHTML = `<img src="${getImageSrc(person.images[0])}" onerror="this.onerror=null;this.src='${getFallbackImageSrc(person.images[0])}'" alt="${person.displayName || person.name}"><div class="person-info"><p class="person-name">${person.displayName || person.name}</p><p class="person-meta">${person.en || ""}${timelineText}</p><p class="person-topic">${person.topic || ""}</p><div class="tag-row">${tags.map(label => `<span class="mini-tag">${label}</span>`).join("")}</div></div>`;
    card.addEventListener("click", () => openPsychologistDetailModal(person));
    card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openPsychologistDetailModal(person); } });
    els.directoryList.appendChild(card);
  });
}

function getEpisodeDisplayData(episode) {
  const person = getPersonById(episode.id);
  const displayName = episode.name || person?.displayName || person?.name || episode.id;
  const imageFile = person?.images?.[0] || episode.image || "map.jpg";
  const sortText = person?.sortKana || EPISODE_SORT_KANA[episode.id] || displayName;
  return { episode, person, displayName, imageFile, sortText };
}

function getSortedEpisodes() {
  if (typeof EPISODES === "undefined" || !Array.isArray(EPISODES)) return [];
  return EPISODES.map(getEpisodeDisplayData).sort((a, b) => {
    const nameDiff = a.sortText.localeCompare(b.sortText, "ja");
    if (nameDiff !== 0) return nameDiff;
    return a.episode.title.localeCompare(b.episode.title, "ja");
  });
}

function getEpisodePreview(text) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  return clean.length > 92 ? `${clean.slice(0, 92)}...` : clean;
}

function getEpisodeMetaQuestion(item) {
  if (item.person) {
    const related = getPersonRelatedQuestions(item.person.id);
    if (related.length) return related[0];
  }
  return getAllQuestions().find(q => q.psychologistId === item.episode.id || q.name === item.displayName || q.name === item.episode.name) || null;
}

function renderEpisodeDirectoryMeta(item) {
  const q = getEpisodeMetaQuestion(item);
  const lifespan = q?.lifespan || item.person?.lifespan || "";
  const birthCountry = q?.birthCountry || q?.birthCountryText;
  const activeCountry = q?.activeCountry || q?.activeCountryText;
  const parts = [];
  if (lifespan) parts.push(`<span class="episode-directory-meta-pill">${escapeHtml(lifespan)}</span>`);
  if (birthCountry) parts.push(`<span class="episode-directory-meta-pill" title="生まれた国">出生 ${escapeHtml(birthCountry)}</span>`);
  if (activeCountry) parts.push(`<span class="episode-directory-meta-pill" title="活躍した国">活躍 ${escapeHtml(activeCountry)}</span>`);
  return parts.length ? `<div class="episode-directory-meta">${parts.join("")}</div>` : "";
}

function renderRelatedQuestionsHtml(questions, sourceQuestion = null) {
  if (!questions.length) return `<div class="dummy-content"><p>関連問題はまだ登録されていません。</p></div>`;
  return questions.map(q => renderPersonQuestionDetail(q, sourceQuestion && q.id === sourceQuestion.id)).join("");
}

function openEpisodeDetailModal(item) {
  const person = item.person;
  const relatedQuestions = person ? getPersonRelatedQuestions(person.id) : [];
  const tags = person ? (person.examTags || []).map(tag => EXAM_TAG_LABELS[tag]).filter(Boolean) : [];
  const profileTopic = person ? (person.topic || "") : "エピソードから心理学者・理論のつながりを確認できます。";
  const profileMeta = person ? (person.en || "") : "";
  const html = `<div class="person-detail-profile"><img src="${getImageSrc(item.imageFile)}" onerror="this.onerror=null;this.src='${getFallbackImageSrc(item.imageFile)}'" alt="${escapeHtml(item.displayName)}"><div><p class="person-detail-name">${escapeHtml(item.displayName)}</p><p class="person-detail-meta">${escapeHtml(profileMeta)}</p><p class="person-detail-topic">${escapeHtml(profileTopic)}</p><div class="tag-row">${tags.map(label => `<span class="mini-tag">${escapeHtml(label)}</span>`).join("")}</div></div></div><div class="episode-detail-box"><p class="episode-detail-title">${escapeHtml(item.episode.title)}</p><p class="episode-detail-text">${escapeHtml(item.episode.text)}</p></div><p class="person-detail-count">関連問題 ${relatedQuestions.length}件</p>${renderRelatedQuestionsHtml(relatedQuestions)}`;
  document.getElementById("modalBody").innerHTML = html;
  bindQuestionMemos(document.getElementById("modalBody"));
  document.getElementById("resultModal").classList.add("active");
}

function showEpisodeDirectoryPage() {
  state.episodeKanaGroup = "all";
  els.topPage.classList.add("hidden"); els.quizPage.classList.add("hidden");
  els.dummyPage.classList.add("hidden"); els.setSelectPage.classList.add("hidden");
  els.reviewPage.classList.add("hidden"); els.directoryPage.classList.add("hidden"); els.timelinePage.classList.add("hidden");
  els.episodeDirectoryPage.classList.remove("hidden"); renderEpisodeDirectory(); window.scrollTo(0, 0);
}

function renderEpisodeDirectory() {
  const allEpisodes = getSortedEpisodes();
  renderFilterChips(els.episodeKanaFilters, KANA_GROUPS, state.episodeKanaGroup, value => { state.episodeKanaGroup = value; renderEpisodeDirectory(); });
  const episodes = state.episodeKanaGroup === "all" ? allEpisodes : allEpisodes.filter(item => getKanaGroupId(item.sortText) === state.episodeKanaGroup);
  els.episodeDirectoryCount.textContent = `${episodes.length}/${allEpisodes.length}件表示`;
  els.episodeDirectoryList.innerHTML = "";
  if (!episodes.length) {
    const empty = document.createElement("div"); empty.className = "dummy-content";
    empty.innerHTML = "<p>エピソードはまだ登録されていません。</p>"; els.episodeDirectoryList.appendChild(empty); return;
  }
  episodes.forEach(item => {
    const card = document.createElement("article"); card.className = "episode-directory-card"; card.tabIndex = 0;
    card.setAttribute("role", "button"); card.setAttribute("aria-label", `${item.displayName}のエピソードを開く`);
    card.innerHTML = `<img src="${getImageSrc(item.imageFile)}" onerror="this.onerror=null;this.src='${getFallbackImageSrc(item.imageFile)}'" alt="${escapeHtml(item.displayName)}"><div class="episode-directory-copy"><div class="episode-directory-heading"><p class="episode-directory-name">${escapeHtml(item.displayName)}</p>${renderEpisodeDirectoryMeta(item)}</div><p class="episode-directory-title">${escapeHtml(item.episode.title)}</p><p class="episode-directory-preview">${escapeHtml(getEpisodePreview(item.episode.text))}</p></div>`;
    card.addEventListener("click", () => openEpisodeDetailModal(item));
    card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openEpisodeDetailModal(item); } });
    els.episodeDirectoryList.appendChild(card);
  });
}

function getTimelinePeople() {
  const themeOrder = { "発達理論": 1, "転機・トランジション理論": 2, "認知行動・学習理論": 3, "モチベーション・動機づけ": 4, "意思決定・偶発性理論": 5, "特性・因子理論": 6, "精神分析・力動的アプローチ": 7, "人間性・実存アプローチ": 8, "ナラティブ・統合的アプローチ": 9, "組織・グループ・キャリア開発": 10, "カウンセリング技法・その他": 11 };
  return TIMELINE_PEOPLE.map(item => {
    const person = getPersonById(item.id);
    return { ...item, person, displayName: person?.displayName || item.id, name: person?.name || item.id, en: person?.en || "", images: person?.images || [], examTags: person?.examTags || [] };
  }).filter(item => state.timelineExamFilter === "all" || item.examTags.includes(state.timelineExamFilter)).sort((a, b) => {
    if (state.timelineSortOrder === "birth") return a.birth - b.birth;
    if (state.timelineSortOrder === "theme") { const themeDiff = (themeOrder[a.theme] || 99) - (themeOrder[b.theme] || 99); if (themeDiff !== 0) return themeDiff; }
    return (a.theory || a.birth) - (b.theory || b.birth);
  });
}

function getTimelineLifespan(item) { return `${item.birth || "?"} - ${item.death || "存命"}`; }

function showTimelinePage() {
  els.topPage.classList.add("hidden"); els.quizPage.classList.add("hidden");
  els.dummyPage.classList.add("hidden"); els.setSelectPage.classList.add("hidden");
  els.reviewPage.classList.add("hidden"); els.directoryPage.classList.add("hidden"); els.episodeDirectoryPage.classList.add("hidden");
  els.timelinePage.classList.remove("hidden"); renderTimeline(); window.scrollTo(0, 0);
}

function renderTimeline() {
  state.timelineExamFilter = els.timelineExamFilter.value; state.timelineSortOrder = els.timelineSortOrder.value;
  const people = getTimelinePeople(); els.timelineCount.textContent = `${people.length}名表示`; els.timelineList.innerHTML = "";
  if (!people.length) { const empty = document.createElement("div"); empty.className = "review-empty"; empty.textContent = "該当する心理学者はまだ登録されていません。"; els.timelineList.appendChild(empty); return; }
  people.forEach(item => {
    const image = item.images[0] || ""; const tags = (item.examTags || []).map(tag => EXAM_TAG_LABELS[tag]).filter(Boolean);
    const row = document.createElement("article"); row.className = "timeline-item";
    row.innerHTML = `<img class="timeline-icon" src="${getImageSrc(image)}" onerror="this.onerror=null;this.src='${getFallbackImageSrc(image)}'" alt="${item.displayName}"><div class="timeline-card"><div class="timeline-card-header"><p class="timeline-name">${item.displayName}</p><span class="timeline-year">${item.theory || item.birth}年</span></div><p class="timeline-topic">${item.topic || item.person?.topic || ""}</p><p class="timeline-meta">${item.category} / ${item.theme}<br>生没：${getTimelineLifespan(item)}</p><div class="tag-row">${tags.map(label => `<span class="mini-tag">${label}</span>`).join("")}</div></div>`;
    if (item.person) { row.querySelector(".timeline-card").style.cursor = "pointer"; row.querySelector(".timeline-card").addEventListener("click", () => openPsychologistDetailModal(item.person)); }
    els.timelineList.appendChild(row);
  });
}

function startQuiz(categoryId, setIndex = null) {
  const cat = CATEGORIES.find(c => c.id === categoryId); const questions = getQuestionsForCategory(cat);
  const questionSets = setIndex !== null ? getQuestionSetsForCategory(cat) : [];
  const selectedSet = setIndex !== null ? questionSets[setIndex] : null; const questionLimit = cat.questionLimit || questions.length;
  if (!questions.length) { showDummyPage(cat ? cat.title : "問題"); return; }
  const selectedQuestions = selectedSet ? selectedSet.questions : questions;
  const headerTitle = selectedSet ? `${cat.title} 第${selectedSet.index + 1}セット` : cat.title;
  els.quizHeaderTitle.textContent = headerTitle; state.currentCategory = cat; state.score = 0;
  state.currentQuestionIndex = 0; state.history = []; state.currentSetIndex = selectedSet ? selectedSet.index : null;
  state.currentSetStart = selectedSet ? selectedSet.start : null; state.currentSetEnd = selectedSet ? selectedSet.end : null;
  state.deck = selectedSet ? shuffleArray(selectedQuestions) : shuffleArray(selectedQuestions).slice(0, questionLimit);
  els.topPage.classList.add("hidden"); els.dummyPage.classList.add("hidden"); els.setSelectPage.classList.add("hidden");
  els.reviewPage.classList.add("hidden"); els.directoryPage.classList.add("hidden"); els.timelinePage.classList.add("hidden"); els.episodeDirectoryPage.classList.add("hidden");
  els.quizPage.classList.remove("hidden"); loadQuestion(); window.scrollTo(0, 0);
}

function loadQuestion() {
  state.isAnswered = false; const q = state.deck[state.currentQuestionIndex];
  els.feedbackArea.classList.add("hidden"); els.questionArea.classList.remove("hidden");
  if (els.feedbackQuestionBlock) els.feedbackQuestionBlock.style.display = "none";
  if (els.feedbackQuestionText) els.feedbackQuestionText.textContent = "";
  if (els.feedbackResultIcon) els.feedbackResultIcon.style.display = "none";
  if (els.feedbackResultIconImage) { els.feedbackResultIconImage.removeAttribute("src"); els.feedbackResultIconImage.alt = ""; }
  els.userAnswerText.innerHTML = ""; els.userAnswerText.style.display = "none";
  bindQuestionMemo(els.questionMemoInput, els.questionMemoCount, els.questionMemoStatus, "");
  els.psychologistDetailAction.innerHTML = ""; els.psychologistDetailAction.style.display = "none";
  els.questionKicker.textContent = `第 ${state.currentQuestionIndex + 1} 問`; els.questionText.textContent = q.text;
  els.prevQuestionButton.disabled = state.currentQuestionIndex === 0;
  els.progressText.textContent = `${state.currentQuestionIndex + 1} / ${state.deck.length}問`;
  els.progressFill.style.width = `${((state.currentQuestionIndex) / state.deck.length) * 100}%`;
  els.choices.innerHTML = "";
  q.options.forEach((optionText, index) => {
    const btn = document.createElement("button"); btn.className = "choice-button"; btn.textContent = optionText;
    btn.addEventListener("click", () => handleAnswer(index)); els.choices.appendChild(btn);
  });
}

function handleAnswer(selectedIndex) {
  if (state.isAnswered) return; state.isAnswered = true;
  const q = state.deck[state.currentQuestionIndex]; const isCorrect = (selectedIndex === q.answer);
  state.history.push({ question: q, selectedIndex: selectedIndex, isCorrect: isCorrect }); saveCurrentReviewLog();
  const useAnswerReviewLayout = shouldUseAnswerReviewLayout();
  if (els.feedbackQuestionBlock && els.feedbackQuestionText) {
    els.feedbackQuestionText.textContent = q.text;
    els.feedbackQuestionBlock.style.display = useAnswerReviewLayout ? "block" : "none";
  }
  if (isCorrect) {
    state.score++; els.resultBadge.textContent = "⭕ 正解！"; els.resultBadge.className = "result-badge correct";
    if (useAnswerReviewLayout) {
      els.userAnswerText.innerHTML = renderUserAnswerText(q, selectedIndex); els.userAnswerText.style.display = "block";
    } else {
      els.userAnswerText.innerHTML = ""; els.userAnswerText.style.display = "none";
    }
  } else {
    els.resultBadge.textContent = "❌ 不正解..."; els.resultBadge.className = "result-badge wrong";
    if (useAnswerReviewLayout) {
      els.userAnswerText.innerHTML = renderUserAnswerText(q, selectedIndex);
    } else {
      els.userAnswerText.textContent = `あなたの解答：${q.options[selectedIndex]}`;
    }
    els.userAnswerText.style.display = "block";
  }
  setFeedbackResultIcon(isCorrect);
  if (shouldUseResultCharacterIcon()) {
    clearFeedbackImageFrame(isSocialLegalQuestion(q));
  } else {
    showFeedbackImage(q.image, `画像: ${q.name}`);
  }
  els.answerText.textContent = q.options[q.answer]; els.psychologistName.textContent = q.name;
  const bCountry = isEmojiSupported ? q.birthCountry : q.birthCountryText; const aCountry = isEmojiSupported ? q.activeCountry : q.activeCountryText;
  els.psychologistMeta.innerHTML = q.metaText || `出生：${bCountry} 活躍：${aCountry}<br>生没：${q.lifespan}`;
  setPsychologistMetaVisibility(!isSocialLegalQuestion(q));
  els.explanationText.textContent = q.explanation;
  if (q.extendedExplanation) {
    els.extendedExplanationBox.style.display = "block"; els.extendedExplanationBox.open = false;
    els.extendedExplanationTitle.textContent = q.extendedExplanationTitle ? `詳しい解説：${q.extendedExplanationTitle}` : "詳しい解説を読む";
    els.extendedExplanationText.textContent = q.extendedExplanation;
  } else { els.extendedExplanationBox.style.display = "none"; els.extendedExplanationBox.open = false; els.extendedExplanationText.textContent = ""; }
  bindQuestionMemo(els.questionMemoInput, els.questionMemoCount, els.questionMemoStatus, q.id); renderPsychologistDetailAction(q);
  els.worksList.innerHTML = "";
  if (q.works && q.works.length > 0) {
    const sortedWorks = [...q.works].sort((a, b) => a.year - b.year);
    sortedWorks.forEach(work => { const li = document.createElement("li"); li.innerHTML = `<span class="work-year">${work.year}年</span><span>${work.title}</span>`; els.worksList.appendChild(li); });
    els.worksBox.style.display = "block";
  } else { els.worksBox.style.display = "none"; }
  if (q.pastExam) {
    els.pastExamBox.style.display = "block"; els.pastExamBox.classList.remove('open'); els.pastExamOptions.classList.remove('revealed'); clearPastExamFeedback(els.pastExamOptions);
    state.currentPastExamAnswer = q.pastExam.answer;
    let refText = q.pastExam.title.includes("オリジナル") ? `オリジナル予想問題` : `実際の過去問ではこう出る！（${q.pastExam.title}）`;
    els.pastExamRef.textContent = refText; els.pastExamQuestion.textContent = q.pastExam.question;
    els.pastExamOptions.dataset.explanation = getPastExamShortExplanation(q); els.pastExamOptions.innerHTML = "";
    q.pastExam.options.forEach(opt => {
      const li = document.createElement("li"); li.textContent = opt; li.setAttribute('data-original-text', opt);
      li.onclick = function() { revealAnswer('quizPastExam', state.currentPastExamAnswer, this); }; els.pastExamOptions.appendChild(li);
    });
  } else { els.pastExamBox.style.display = "none"; }
  if (state.currentQuestionIndex === state.deck.length - 1) { els.nextButton.textContent = "結果を見る"; els.nextButtonTop.textContent = "結果を見る"; }
  else { els.nextButton.textContent = "次の問題へ"; els.nextButtonTop.textContent = "次の問題へ"; }
  els.questionArea.classList.add("hidden"); els.feedbackArea.classList.remove("hidden"); window.scrollTo({ top: 0, behavior: 'instant' });
}

function getResultCharacterImages() {
  const ratio = state.deck.length ? state.score / state.deck.length : 0;
  const images = [{ src: "cimg/k5.png", alt: "お疲れ様でした" }];
  if (ratio >= 0.7) images.push({ src: "cimg/k1.png", alt: "けー。" }, { src: "cimg/s1.png", alt: "サポさん。" });
  if (ratio === 1) images.push({ src: "cimg/k3.png", alt: "満点おめでとう" });
  return images;
}

function getResultTitle(category, setIndex) {
  const categoryTitle = category ? category.title : "過去問ドリル";
  const setLabel = setIndex !== null && setIndex !== undefined ? ` 第${setIndex + 1}セット` : "";
  return `${categoryTitle}${setLabel}`;
}

function getSimpleExplanation(q) { return q.explanation || q.pastExam?.explanation || "解説は登録されていません。"; }

function buildPrintReportHtml(history = state.history, title = getResultTitle(state.currentCategory, state.currentSetIndex), updatedAt = null) {
  const total = history.length; const correct = history.filter(item => item.isCorrect).length; const rate = total ? Math.round((correct / total) * 100) : 0;
  const dateSource = updatedAt ? new Date(updatedAt) : new Date();
  const dateText = dateSource.toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  const rows = history.map((item, index) => {
    const q = item.question; const userAnswer = q.options[item.selectedIndex] || "未回答"; const correctAnswer = q.options[q.answer] || ""; const memo = loadQuestionMemo(q.id) || "メモなし";
    return `<article class="print-question-card ${item.isCorrect ? "correct" : "wrong"}"><div class="print-question-heading"><span>第${index + 1}問 ${escapeHtml(q.name || "")}</span><span class="print-question-result">${item.isCorrect ? "正解" : "不正解"}</span></div><p class="print-question-text">${escapeHtml(q.text)}</p><div class="print-answer-grid"><div class="print-answer-box"><span class="print-answer-label">自分の回答</span><span class="print-answer-text">${escapeHtml(userAnswer)}</span></div><div class="print-answer-box"><span class="print-answer-label">正答</span><span class="print-answer-text">${escapeHtml(correctAnswer)}</span></div></div><div class="print-explanation"><span class="print-section-label">シンプルな解説</span>${escapeHtml(getSimpleExplanation(q))}</div><div class="print-memo"><span class="print-section-label">自分のメモ</span>${escapeHtml(memo)}</div></article>`;
  }).join("");
  return `<header class="print-report-header"><h1 class="print-report-title">学習振り返りレポート</h1><p class="print-report-meta">${escapeHtml(title)} / 出力日時：${escapeHtml(dateText)}</p></header><section class="print-report-summary"><div class="print-summary-box"><span class="print-summary-label">正答率</span><span class="print-summary-value">${rate}%</span></div><div class="print-summary-box"><span class="print-summary-label">正解数</span><span class="print-summary-value">${correct} / ${total}</span></div><div class="print-summary-box"><span class="print-summary-label">不正解</span><span class="print-summary-value">${total - correct}</span></div></section><section>${rows}</section>`;
}

function exportCurrentResultPdf() { if (!state.history.length) return; document.getElementById("printReport").innerHTML = buildPrintReportHtml(); window.print(); }

function exportReviewPdf() {
  if (!state.currentReviewHistory.length) return; const category = CATEGORIES.find(cat => cat.id === state.currentReviewCategoryId);
  const title = getResultTitle(category, state.currentReviewSetIndex);
  document.getElementById("printReport").innerHTML = buildPrintReportHtml(state.currentReviewHistory, `${title} 振返り`, state.currentReviewLog?.updatedAt || null); window.print();
}

function showFinalResult() {
  els.feedbackArea.classList.add("hidden"); els.questionArea.classList.remove("hidden"); els.questionKicker.textContent = "テスト完了！";
  const resultCharacters = getResultCharacterImages().map(image => `<img src="${image.src}" alt="${image.alt}">`).join("");
  els.questionText.innerHTML = `<div class="result-character-stage">${resultCharacters}</div>お疲れ様でした！<br>あなたの正答率は <b>${Math.round((state.score / state.deck.length) * 100)}％</b> （${state.score}/${state.deck.length}問正解）です。`;
  els.choices.innerHTML = "";
  const ul = document.createElement("ul"); ul.className = "result-list";
  state.history.forEach((h, index) => {
    const li = document.createElement("li"); li.className = `result-item ${h.isCorrect ? 'correct' : 'wrong'}`;
    li.innerHTML = `<div class="result-item-name"><span>第${index + 1}問</span>${h.question.name}</div><div class="result-item-mark">${h.isCorrect ? '⭕' : '❌'}</div>`;
    li.addEventListener("click", () => openModal(h, index)); ul.appendChild(li);
  });
  els.choices.appendChild(ul); els.progressText.textContent = `完了`; els.progressFill.style.width = `100%`;
  const pdfBtn = document.createElement("button"); pdfBtn.className = "choice-button pdf-export-button"; pdfBtn.textContent = "PDFで振り返り出力"; pdfBtn.style.textAlign = "center"; pdfBtn.addEventListener("click", exportCurrentResultPdf); els.choices.appendChild(pdfBtn);
  const retryBtn = document.createElement("button"); retryBtn.className = "primary-button"; retryBtn.textContent = "もう一度挑戦する"; retryBtn.style.marginBottom = "12px"; retryBtn.addEventListener("click", () => { startQuiz(state.currentCategory.id, state.currentSetIndex); }); els.choices.appendChild(retryBtn);
  const topBtn = document.createElement("button"); topBtn.className = "choice-button"; topBtn.textContent = "TOPに戻る"; topBtn.style.textAlign = "center"; topBtn.addEventListener("click", showTopPage); els.choices.appendChild(topBtn);
}

function goToNextQuestionOrResult() {
  if (state.currentQuestionIndex < state.deck.length - 1) { state.currentQuestionIndex++; loadQuestion(); window.scrollTo({ top: 0, behavior: 'instant' }); }
  else { showFinalResult(); }
}

if(els.nextButton) els.nextButton.addEventListener("click", goToNextQuestionOrResult);
if(els.nextButtonTop) els.nextButtonTop.addEventListener("click", goToNextQuestionOrResult);
if(els.reviewBackToSetsButton) els.reviewBackToSetsButton.addEventListener("click", showReviewSetList);
if(els.reviewPdfButton) els.reviewPdfButton.addEventListener("click", exportReviewPdf);
if(els.directorySearch) els.directorySearch.addEventListener("input", renderDirectory);
if(els.directoryFilter) els.directoryFilter.addEventListener("change", renderDirectory);
if(els.timelineExamFilter) els.timelineExamFilter.addEventListener("change", renderTimeline);
if(els.timelineSortOrder) els.timelineSortOrder.addEventListener("change", renderTimeline);
if(els.interruptQuizButton) els.interruptQuizButton.addEventListener("click", confirmBackToTop);
if(els.prevQuestionButton) els.prevQuestionButton.addEventListener("click", goToPreviousQuestion);

function renderCategoryButtons() {
  els.categoryAccordionGrid.innerHTML = ""; els.socialLegalCategoryGrid.innerHTML = ""; els.mapStudyCategoryGrid.innerHTML = ""; els.directoryCategoryGrid.innerHTML = ""; els.examPrepCategoryGrid.innerHTML = "";
  CATEGORIES.forEach(cat => {
    if (cat.topGroup === "hidden") return;
    const target = cat.topGroup === "accordion" ? els.categoryAccordionGrid : cat.topGroup === "socialLegal" ? els.socialLegalCategoryGrid : cat.topGroup === "mapStudy" ? els.mapStudyCategoryGrid : cat.topGroup === "directory" ? els.directoryCategoryGrid : cat.topGroup === "examPrep" ? els.examPrepCategoryGrid : els.mapStudyCategoryGrid;
    target.appendChild(createCategoryButton(cat));
  });
  updateSaveLoadBtnState();
}

function createCategoryButton(cat) {
  const active = isCategoryActive(cat);
  const isLocked = LOCKED_CATEGORY_IDS.includes(cat.id);
  const needsUnlock = isLocked && !isUnlocked();

  const btn = document.createElement("button");
  btn.className = "category-button";
  
  if (active && !needsUnlock) {
    btn.classList.add("active-cat");
  } else {
    btn.classList.add("disabled-cat");
  }
  
  if (cat.accent) btn.classList.add(`${cat.accent}-cat`);
  
  let lockIcon = "";
  if (isLocked) {
    lockIcon = needsUnlock 
      ? `<span style="font-size: 0.8rem; margin-left: 4px;">🔒</span>` 
      : `<span style="font-size: 0.8rem; margin-left: 4px; opacity: 0.5;">🔓</span>`;
  }
  
  btn.innerHTML = `<span class="cat-icon">${cat.icon}</span><span>${cat.title}${lockIcon}</span>`;

  btn.addEventListener("click", () => {
    const action = () => {
      if (cat.type === "directory" && active) showDirectoryPage("all", cat.directoryMode || "aiueo");
      else if (cat.type === "timeline" && active) showTimelinePage();
      else if (cat.type === "episodeDirectory" && active) showEpisodeDirectoryPage();
      else if (cat.type === "review" && active) showReviewPage(cat.reviewForCategoryId);
      else if (active && cat.questionLimit && (cat.examTag || cat.questionBankId || cat.questionBankIds)) showQuizSetPage(cat.id);
      else if (active) startQuiz(cat.id);
      else showDummyPage(cat.title);
    };

    if (needsUnlock) {
      requestUnlockThen(action);
    } else {
      action();
    }
  });

  return btn;
}

// 開発用の隠しトグルボタン
function createDevToggleButton() {
  const btn = document.createElement("button");
  btn.style.position = "fixed";
  btn.style.bottom = "0";
  btn.style.right = "0";
  btn.style.width = "60px";
  btn.style.height = "60px";
  btn.style.opacity = "0"; 
  btn.style.zIndex = "9999";
  btn.style.border = "none";
  btn.style.background = "transparent";
  btn.style.cursor = "default"; 
  
  btn.addEventListener("click", () => {
    if (isUnlocked()) {
      localStorage.removeItem("pm_unlocked_month");
    } else {
      localStorage.setItem("pm_unlocked_month", getCurrentMonthString());
      if (els.passwordModal) els.passwordModal.classList.remove("active");
      if (els.membershipPassword) els.membershipPassword.value = "";
      if (els.passwordError) els.passwordError.style.display = "none";
      if (pendingAction) {
        const action = pendingAction;
        pendingAction = null;
        action();
      }
    }
    renderCategoryButtons(); 
  });
  
  document.body.appendChild(btn);
}

// セーブ＆ロードボタンの状態を更新する関数
function updateSaveLoadBtnState() {
  if (!els.saveLoadBtn || !els.saveLoadLockIcon) return;
  if (!isUnlocked()) {
    els.saveLoadBtn.classList.remove("active-cat");
    els.saveLoadBtn.classList.add("disabled-cat");
    els.saveLoadLockIcon.textContent = "🔒";
    els.saveLoadLockIcon.style.opacity = "1";
  } else {
    els.saveLoadBtn.classList.remove("disabled-cat");
    els.saveLoadBtn.classList.add("active-cat");
    els.saveLoadLockIcon.textContent = "🔓";
    els.saveLoadLockIcon.style.opacity = "0.5";
  }
}

// セーブ＆ロードボタンのクリックイベント
if (els.saveLoadBtn) {
  els.saveLoadBtn.addEventListener("click", () => {
    const action = () => {
      window.location.href = "save.html";
    };
    if (!isUnlocked()) {
      requestUnlockThen(action);
    } else {
      action();
    }
  });
}

function initApp() {
  renderDailyEpisode();
  renderCategoryButtons();
  createDevToggleButton();
  checkLoginStatus(); // ログイン判定・スタンプ描画
  renderCalendar();   // 極小2ヶ月カレンダー描画
  showTopPage();
}

initApp();


