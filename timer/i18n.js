(() => {
  'use strict';

  const STORAGE_KEY = 'workshopTimer.language';
  const supported = new Set(['ja', 'en']);
  let storedLanguage = null;
  try { storedLanguage = localStorage.getItem(STORAGE_KEY); } catch {}
  let language = supported.has(storedLanguage) ? storedLanguage : 'ja';
  let applying = false;
  const textRecords = new WeakMap();
  const attributeRecords = new WeakMap();
  const valueRecords = new WeakMap();

  const phrases = new Map(Object.entries({
    'ワークショップタイマー': 'Workshop Timer',
    '無料ワークショップタイマー｜Teams・Slack・Microsoft 365で活用': 'Free Workshop Timer | Teams, Slack & Microsoft 365',
    'ワーク進行表': 'Workshop Agenda',
    '無料のワーク進行表｜研修・会議・チームビルディングの時間管理': 'Free Workshop Agenda | Time Management for Training and Meetings',
    'ワークショップ': 'Workshop',
    'ポモドーロテクニック｜Workshop Timer': 'Pomodoro Technique | Workshop Timer',
    'ウインドウ操作': 'Window controls',
    '最前面表示を切り替え': 'Toggle always-on-top',
    '全画面表示を切り替え': 'Toggle fullscreen',
    '最小化': 'Minimize',
    '全体表示の拡大・縮小': 'Page zoom controls',
    '全体を縮小': 'Zoom out',
    '全体を拡大': 'Zoom in',
    'コンパクト別窓で開く': 'Open compact window',
    '通常画面へ戻る': 'Return to regular view',
    '固定': 'Pin',
    '全画面': 'Fullscreen',
    '終了': 'Finish',
    '現在時刻': 'Current time',
    'アナログ時計とデジタル表示の幅を変更': 'Resize the analog clock and timer display',
    'カウントダウンタイマー': 'Countdown timer',
    'タイマーのクイック操作': 'Quick timer controls',
    'タイマーを1分追加': 'Add one minute to the timer',
    'タイマーを1分減らす': 'Subtract one minute from the timer',
    'タイマーを開始・停止': 'Start or pause the timer',
    'タイマーを開始': 'Start the timer',
    'タイマーを停止': 'Pause the timer',
    'タイマーをクリア': 'Clear the timer',
    'タイマーをリセット': 'Reset the timer',
    'ストップウォッチを開始・停止': 'Start or pause the stopwatch',
    'ポモドーロテクニックモードを開く': 'Open Pomodoro Technique mode',
    'タイマー通知音の音量': 'Timer alert volume',
    '通知音と繰り返しを設定': 'Alert and repeat settings',
    '通知設定を閉じる': 'Close alert settings',
    '通知とリピート': 'Alerts & Repeats',
    '終了音': 'End sound',
    'やさしいチャイム': 'Gentle Chime',
    'メタロフォン': 'Metallophone',
    'ザイロフォン': 'Xylophone',
    'オーケストラ': 'Orchestra',
    'セットチャイム': 'Set Chime',
    'クリアチャイム': 'Clear Chime',
    '高いベル': 'High Bell',
    '低いベル': 'Low Bell',
    '目覚まし時計': 'Alarm Clock',
    'アラーム音': 'Alert',
    'バイブレーション': 'Vibration',
    '▶ 試聴': '▶ Preview',
    '鳴らし方': 'Alert pattern',
    '1回': 'Once',
    '2回': '2 runs',
    '3回': '3 runs',
    '5回': '5 runs',
    '停止するまで': 'Until stopped',
    'タイマー繰り返し': 'Repeat timer',
    '無制限': 'Unlimited',
    '開始までの間隔': 'Restart interval',
    'すぐ開始': 'Start immediately',
    '予告音': 'Advance alert',
    '終了1分前': '1 minute before',
    '終了10秒前': '10 seconds before',
    '1分前＋10秒前': '1 minute + 10 seconds before',
    '設定はこのブラウザに自動保存されます。': 'Settings are saved automatically in this browser.',
    'ミュートにする': 'Mute',
    '元の音量に戻す': 'Restore previous volume',
    'ストップウォッチを開始': 'Start the stopwatch',
    'ストップウォッチを停止': 'Pause the stopwatch',
    'ストップウォッチ開始': 'Start Stopwatch',
    'ストップウォッチ停止': 'Pause Stopwatch',
    '＋1分': '+1 minute',
    '−1分': '-1 minute',
    '表示領域の高さを変更': 'Resize display height',
    'タイマー操作': 'Timer controls',
    '時間を延長しますか？': 'Extend the timer?',
    '休憩中': 'On Break',
    '再開': 'Resume',
    'タイマー開始': 'Start Timer',
    'タイマー停止': 'Pause Timer',
    '▶ タイマー開始': '▶ Start Timer',
    'Ⅱ タイマー停止': 'Ⅱ Pause Timer',
    'リセット': 'Reset',
    'クリア': 'Clear',
    'ストップウォッチ\n開始': 'Stopwatch\nStart',
    'ストップウォッチ\n停止': 'Stopwatch\nPause',
    '設定': 'Settings',
    '延長': 'EXTEND',
    'セット': 'Set',
    'タイマー時間': 'Timer duration',
    '時間': 'Hours',
    '秒': 'Seconds',
    '休憩終了時刻': 'Break end time',
    '再開する時': 'Resume hour',
    '再開する分': 'Resume minute',
    '休憩時刻のクイック設定': 'Quick break settings',
    '休憩終了時刻を1分後へ': 'Move break end one minute later',
    '休憩終了時刻を1分前へ': 'Move break end one minute earlier',
    '表示時間を1分減らす': 'Reduce displayed time by one minute',
    '直前の時間調整を戻す': 'Undo the last time adjustment',
    '休憩開始': 'Start Break',
    '休憩解除': 'End Break',
    '左時計': 'Left Clock',
    '右時計': 'Right Clock',
    '背景時計': 'Clock Face',
    '文字盤': 'Numerals',
    'ダーク': 'Dark',
    '背景濃さ': 'Clock Opacity',
    '背景時計の濃さ': 'Clock face opacity',
    'パネルを隠す': 'Hide Panel',
    'クリック透過': 'Click-through',
    'クリック透過中 — Ctrl + Shift + T で操作に戻る': 'Click-through active — Press Ctrl + Shift + T to restore controls',
    'Ctrl＋Shift＋Space: タイマー開始/停止　 T: クリック透過　 H: パネル　 R: リセット　 F: 全画面　 Q: 終了': 'Ctrl+Shift+Space: Start/Pause  T: Click-through  H: Panel  R: Reset  F: Fullscreen  Q: Quit',
    'このタイマーについて': 'About This Timer',
    '時間を「見る」。進行を「共有する」。': 'See the time. Share the pace.',
    'このタイマーは、研修講師・ファシリテーターとして活動している製作者（てつお）が、「自分自身が使いやすいタイマーが欲しい」という思いから開発したものです。': 'This timer was created by Tetsuo, a trainer and facilitator, from a simple wish: to have a timer that was genuinely easy to use.',
    '研修やワークショップで実際に時間管理を行う中で感じた、さまざまな「あったらいいな」を少しずつ形にしてきました。': 'It brings together practical ideas gathered while managing time in real workshops and training sessions.',
    'もともとは自分自身のために作ったツールですが、せっかくなので、同じような場面で役立てていただければと思い、一般公開しています。ご感想や改善要望などいただけますととても励みになります^^': 'It began as a personal tool and is now shared publicly in the hope that it helps others in similar situations. Feedback and improvement ideas are always welcome.',
    'Workshop Timer　／　てつお': 'Workshop Timer / Tetsuo',
    'プロフィールアイコンメーカー': 'Profile Icon Maker',
    '🍅 ポモドーロテクニックモード': '🍅 Pomodoro Mode',
    'チュートリアル': 'Tutorial',
    '時間を自由に組み立てて、別窓で進行': 'Build a schedule and run it in a separate window',
    '時間の長さに制限はありません。流れと分数を自由に組み立て、別ウィンドウに「いま・次・残り時間」を表示します。': 'Create a schedule of any length and show the current item, next item, and remaining time in a separate window.',
    '進行表名': 'Agenda Name',
    '例：チーム研修、90分ワーク': 'Example: Team training, 90-minute workshop',
    '基本テーマ': 'Theme',
    '配色テーマ': 'Color Theme',
    '背景画像': 'Background Image',
    '未設定': 'Not set',
    '画像を選ぶ': 'Choose Image',
    '解除': 'Remove',
    '選んだ画像は保存せず、今回開く別窓だけで使用します': 'The selected image is used only in the window opened this time and is not saved.',
    '進行画面の背景に表示します': 'Shown behind the progress view.',
    '進行表の保存と読み込み': 'Save and load agendas',
    '保存した進行表を選択': 'Select a saved agenda',
    '呼び出す': 'Load',
    '記録する': 'Save',
    '削除': 'Delete',
    'CSV書き出し': 'Export CSV',
    'CSV読み込み': 'Import CSV',
    '内容': 'Item',
    '時間': 'Time',
    '分': 'min',
    'ピンク・黄色・水色のテーマ': 'Pink, yellow, and blue theme',
    'コーラル・オレンジ・クリームのテーマ': 'Coral, orange, and cream theme',
    '青・青緑のテーマ': 'Blue and teal theme',
    '緑・紫・水色のテーマ': 'Green, purple, and blue theme',
    '進行表タイトル': 'Agenda title',
    '保存した進行表': 'Saved agendas',
    '進行項目': 'Agenda item',
    'この項目を削除': 'Remove this item',
    '＋ 項目を追加': '+ Add Item',
    'キャンセル': 'Cancel',
    '別窓で開始': 'Open Agenda',
    '進行画面へ': 'Open Progress View',
    'タイマーへ': 'Timer',
    '← タイマーへ': '← Timer',
    '進行内容': 'Agenda Item',
    '進行': 'Progress',
    '開始前': 'Ready',
    '進行中': 'Running',
    '一時停止中': 'Paused',
    '完了': 'Complete',
    '全体残り': 'Overall Remaining',
    '前へ': 'Previous',
    '次へ': 'Next',
    '最初から': 'Restart',
    'スタート': 'Start',
    '一時停止': 'Pause',
    '透過度': 'Panel Transparency',
    '同じ形式で再読み込みできます': 'You can import the same format again.',
    '進行表名・テーマ・項目・時間を同じ形式で再読み込みできます': 'The agenda name, theme, items, and durations can be imported again in the same format.',
    '各項目の分数を変更すると、合計時間へすぐ反映されます。': 'Changes to item durations are reflected in the total immediately.',
    '流れと分数を自由に組み立てます。「進行画面へ」を押すと、このタブのまま進行表示へ切り替わります。': 'Build your agenda and durations freely. Select “Open Progress View” to switch views in this tab.',
    '今回集中するタスク': 'Task for this session',
    '（任意）': '(optional)',
    '未入力でも開始できます': 'You can start without entering a task',
    '4回後の長い休憩': 'Long break after 4 sessions',
    '🍅 25分集中を始める': '🍅 Start 25-minute Focus',
    '集中と休憩のサイクル': 'Focus and break cycle',
    '🍅 ポモドーロテクニック': '🍅 Pomodoro Technique',
    '短時間の集中と休憩を繰り返し、生産性を高める時間管理術です。1980年代にイタリアのフランチェスコ・シリロが考案しました。「ポモドーロ」はイタリア語でトマト。愛用していたトマト型キッチンタイマーが名前の由来です。': 'A time-management method that improves productivity through short focus sessions and breaks. Francesco Cirillo developed it in Italy in the 1980s. “Pomodoro” means tomato in Italian, inspired by his tomato-shaped kitchen timer.',
    '集中力が切れる前に休憩を挟むことで脳の疲労（バーンアウト）を防ぎ、「あと10分」という適度な時間意識が作業効率を自然に引き上げます。': 'Taking breaks before concentration fades helps prevent burnout, while a clear time limit creates productive urgency.',
    'タスクを決める': 'Choose a task',
    '分間': 'min',
    '集中する': 'Focus',
    '休憩する': 'Break',
    '回後に': 'After 4',
    '長く休む': 'Long break',
    'モード終了': 'End Mode',
    'はじめての使い方': 'Getting Started',
    'チュートリアルを閉じる': 'Close tutorial',
    '基本操作を順番にご案内します。': 'Learn the basic controls step by step.',
    '「次へ」で進みます': 'Select “Next” to continue.',
    '戻る': 'Back',
    '練習モード': 'Practice Mode',
    'まず、画面の役割を知る': 'Understand the Screen',
    '左は現在時刻、右はタイマー表示、下は操作エリアです。実際にボタンを押しながら、基本操作を順番に練習します。': 'The current time is on the left, the timer is on the right, and controls are below. Try the controls as you learn.',
    '練習中の内容は、終了すると元の状態へ戻ります。': 'Your original state will be restored when practice ends.',
    'ADDで1分を設定する': 'Set One Minute',
    'ADDは表示中の時間へ加算します。まずは空の状態から「＋1」を押して、1分を設定してみましょう。': 'The adjustment buttons add time to the display. Start from zero and select “+1”.',
    '「＋1」を押してください': 'Select “+1”.',
    'タイマーを開始する': 'Start the Timer',
    '設定した1分をカウントダウンします。開始すると、アナログ時計に時間の範囲と終了位置も表示されます。': 'Start the one-minute countdown. The analog clock shows its duration and end point.',
    '「タイマー開始」を押してください': 'Select “Start Timer”.',
    '実行中の表示を見る': 'Read the Running Display',
    '数字は残り時間です。左時計の色付き範囲が実行時間、オレンジの太線と横の「終了」が終了位置です。': 'The digits show time remaining. The colored clock sector shows duration and the orange line marks the finish.',
    '表示を確認したら「次へ」を押します': 'Check the display, then select “Next”.',
    'タイマーを一時停止する': 'Pause the Timer',
    '実行中は同じボタンが「タイマー停止」に変わります。リセットは確定した時間へ戻し、クリアは0にします。': 'While running, the same button pauses the timer. Reset restores the set time; Clear returns to zero.',
    '「タイマー停止」を押してください': 'Select “Pause Timer”.',
    '停止中のADDを試す': 'Adjust a Paused Timer',
    '停止中のADDは、表示中の時間へそのまま加算します。＋5で増やしたあと、↶で元に戻してみましょう。': 'While paused, adjustment buttons immediately change the displayed time. Add five minutes, then undo it.',
    'まず「＋5」を押してください': 'First select “+5”.',
    '実行中のADDで延長する': 'Extend a Running Timer',
    '実行中にADDを押すと確認画面が開きます。開始、＋2、YESの順に操作して、残り時間と終了位置が延びる様子を見てみましょう。': 'Adding time while running opens a confirmation. Start, select +2, then YES to see the time and finish point extend.',
    'まず「タイマー開始」を押してください': 'First select “Start Timer”.',
    '時間を細かく設定する': 'Set an Exact Duration',
    'TIMER欄では時・分・秒を選べます。選択内容は大きな数字と左時計の「終了」位置へすぐ反映され、「セット」で基準時間として確定します。': 'Choose hours, minutes, and seconds in TIMER. Changes appear immediately in the large display and finish point; “Set” saves the baseline duration.',
    '休憩終了時刻を表示する': 'Show the Break End Time',
    'BREAKは時刻選択のほか、10分・60分で現在からの時間を設定し、＋1・−1で微調整できます。左時計の「再開」位置へすぐ反映されます。': 'Set a break end time directly, add 10 or 60 minutes from now, or fine-tune it by one minute. The resume point updates immediately.',
    'ストップウォッチを使う': 'Use the Stopwatch',
    'ストップウォッチは0から1/100秒単位で計測します。計測中は見間違いを防ぐため、アナログ時計の秒針が一時的に消えます。': 'The stopwatch measures from zero in hundredths of a second. The analog second hand is hidden while measuring to avoid confusion.',
    '表示を見やすく整える': 'Adjust the Display',
    '左時計、背景時計、文字盤、テーマ、背景濃さを変更できます。全画面ボタンで発表画面いっぱいに表示できます。': 'Adjust the left clock, clock face, numerals, theme, and opacity. Use Fullscreen to fill the presentation display.',
    '左時計、背景時計、文字盤、テーマ、背景濃さを変更できます。パネル非表示やクリック透過で、PowerPointの上へ自然に重ねられます。': 'Adjust the left clock, clock face, numerals, theme, and opacity. Hide the panel or enable click-through to overlay PowerPoint naturally.',
    '表示サイズを調整して完了': 'Resize and Finish',
    '横バーで表示部の高さ、時計の間にある縦バーでアナログ時計の幅を調整できます。「完了」で練習前の状態へ戻ります。': 'Use the horizontal divider for display height and the vertical divider for analog-clock width. Finish restores your pre-practice state.',
    '場所を確認したら「次へ」を押します': 'Review this area, then select “Next”.',
    '設定を確認したら「次へ」を押します': 'Review the settings, then select “Next”.',
    'これで基本操作は完了です': 'You have completed the basics.',
    '練習では「＋1」を押してください': 'For this practice, select “+1”.',
    '練習では「＋5」を押してください': 'For this practice, select “+5”.',
    '「↶」を押してください': 'Select “↶”.',
    '練習では「＋2」を押してください': 'For this practice, select “+2”.',
    '延長の変化を見るため「YES」を押してください': 'Select “YES” to see how the timer extends.',
    'できました。大きな表示とTIMER欄が01:00に変わりました。': 'Done. The large display and TIMER field now show 01:00.',
    '開始しました。数字、時計の色付き範囲、オレンジ線横の「終了」を確認してください。': 'Timer started. Check the digits, the colored clock sector, and the Finish marker beside the orange line.',
    '停止しました。もう一度押せば続きから再開できます。': 'Timer paused. Select the button again to resume where you left off.',
    '01:00から06:00になりました。次に「↶」を押してください': 'The time changed from 01:00 to 06:00. Next, select “↶”.',
    '元の01:00へ戻りました。↶は直前の追加だけを取り消します。': 'The timer is back to 01:00. The ↶ button undoes only the most recent adjustment.',
    'タイマーが動きました。次に「＋2」を押してください': 'The timer is running. Next, select “+2”.',
    '確認画面が出ました。「YES」を押してください': 'The confirmation prompt is open. Select “YES”.',
    '延長できました。残り時間と、時計の「終了」位置が2分ぶん延びています。': 'Timer extended. The remaining time and the Finish marker have both moved forward by two minutes.',
    '集中': 'Focus',
    '短い休憩': 'Short Break',
    '長い休憩': 'Long Break',
    '再開しました。': 'Resumed.',
    'この25分は、選んだタスクだけに集中しましょう。': 'Focus only on your chosen task for these 25 minutes.',
    'この25分は、いま取り組む作業だけに集中しましょう。': 'Focus only on the work in front of you for these 25 minutes.',
    '作業から手を離して、しっかり脳を休ませましょう。': 'Step away from the work and give your mind a proper rest.',
    '一時停止中です。準備ができたら再開してください。': 'Paused. Resume when you are ready.',
    '集中を再開しました。': 'Focus resumed.',
    '休憩を再開しました。': 'Break resumed.',
    '別タブ／別ウィンドウを開けませんでした。ブラウザの新しい画面を開く許可を確認してください。': 'A new tab or window could not be opened. Check your browser pop-up permissions.',
    '画像ファイルを選択してください。': 'Please choose an image file.',
    '背景画像を設定しました。開く別窓に反映されます。': 'Background image set. It will appear in the window you open.',
    '背景画像を設定しました。進行画面に反映されます。': 'Background image set. It is now shown in the progress view.',
    'この環境では進行表を保存できませんでした。CSV書き出しをご利用ください。': 'The agenda could not be saved in this environment. Please export it as CSV.',
    'この環境では保存できませんでした。CSV書き出しをご利用ください。': 'Saving is unavailable in this environment. Please export as CSV.',
    'CSVを書き出しました。同じCSVを「CSV読み込み」から復元できます。': 'CSV exported. You can restore it later with Import CSV.',
    'CSVを書き出しました。': 'CSV exported.',
    'CSVを読み込みました。必要に応じて「記録する」でブラウザにも保存できます。': 'CSV imported. Select Save if you also want to keep it in this browser.',
    'CSVを読み込みました。': 'CSV imported.',
    'CSVを読み込めませんでした。この画面から書き出したCSVと同じ形式か確認してください。': 'The CSV could not be imported. Confirm that it matches the exported format.',
    'CSVを読み込めませんでした。書き出したCSVと同じ形式か確認してください。': 'The CSV could not be imported. Confirm that it matches the exported format.',
    '進行表を別ウィンドウで開始しました。': 'The agenda opened in a separate window.',
    'オープニング・ゴール確認': 'Opening and Goals',
    'テーマと進め方の説明': 'Theme and Process',
    '個人・グループワーク': 'Individual / Group Work',
    '共有・対話': 'Sharing and Discussion',
    'まとめ・次の一歩': 'Wrap-up and Next Step'
  }));

  const attributeNames = ['aria-label', 'title', 'placeholder'];

  function translateDynamic(value) {
    let match;
    if ((match = value.match(/^(\d+)秒$/))) return `${match[1]} sec`;
    if ((match = value.match(/^(\d+)分$/))) return `${match[1]} min`;
    if ((match = value.match(/^次の開始まで\s+(.+)\s+・\s+(\d+)\/(\d+)\s+完了$/))) return `Next start in ${match[1]} · ${match[2]}/${match[3]} complete`;
    if ((match = value.match(/^次の開始まで\s+(.+)\s+・\s+(\d+)回\s+完了$/))) return `Next start in ${match[1]} · ${match[2]} complete`;
    if ((match = value.match(/^合計\s*(\d+)分(?:\s*（(\d+)時間(?:(\d+)分)?）)?$/))) {
      const readable = match[2] ? ` (${match[2]} hr${match[3] ? ` ${match[3]} min` : ''})` : '';
      return `Total ${match[1]} min${readable}`;
    }
    if ((match = value.match(/^(\d+)分[–-](\d+)分\s*・\s*(\d+)分$/))) return `${match[1]}–${match[2]} min · ${match[3]} min`;
    if ((match = value.match(/^経過\s+(.+)$/))) return `Elapsed ${match[1]}`;
    if ((match = value.match(/^残り\s+(.+)$/))) return `Remaining ${match[1]}`;
    if ((match = value.match(/^残り約(\d+)分（全(\d+)ブロック）$/))) return `About ${match[1]} min remaining (${match[2]} blocks total)`;
    if ((match = value.match(/^予定\s+(\d+)分$/))) return `Planned ${match[1]} min`;
    if ((match = value.match(/^(\d+)時間(?:＋(\d+)分)?$/))) return match[2] ? `${match[1]} hr ${match[2]} min` : `${match[1]} hr`;
    if ((match = value.match(/^＋(.+)\s+延長しますか？$/))) return `Extend by +${translateDynamic(match[1])}?`;
    if ((match = value.match(/^(翌日\s+)?(\d{2}:\d{2})\s+再開$/))) return `${match[1] ? 'Next day ' : ''}${match[2]}\nResume`;
    if ((match = value.match(/^集中\s+(\d+)\s*\/\s*4$/))) return `Focus ${match[1]} / 4`;
    if ((match = value.match(/^(\d+)\s*\/\s*4\s+完了$/))) return `${match[1]} / 4 complete`;
    if ((match = value.match(/^🍅 ポモドーロ・集中\s+(\d+)\/4$/))) return `🍅 Pomodoro Focus ${match[1]}/4`;
    if (value === '🍅 ポモドーロ・休憩') return '🍅 Pomodoro Break';
    if ((match = value.match(/^(\d+)回目(?:\s+完了)?$/))) return `Session ${match[1]}${value.includes('完了') ? ' complete' : ''}`;
    if ((match = value.match(/^項目\s+(\d+)$/))) return `Item ${match[1]}`;
    if ((match = value.match(/^(.+)を1分減らす$/))) return `Reduce ${match[1]} by 1 minute`;
    if ((match = value.match(/^(.+)を1分増やす$/))) return `Increase ${match[1]} by 1 minute`;
    if ((match = value.match(/^全(\d+)分、残り約(\d+)分、1ブロック1分$/))) return `${match[1]} minutes total, about ${match[2]} remaining, one minute per block`;
    if ((match = value.match(/^(.+)、全(\d+)分、1ブロック1分$/))) return `${match[1]}, ${match[2]} minutes total, one minute per block`;
    if ((match = value.match(/^4回の集中を達成しました。(\d+)分の長い休憩を取りましょう。$/))) return `Four focus sessions complete. Take a ${match[1]}-minute long break.`;
    if ((match = value.match(/^(\d+)回目の集中が完了しました。キリが悪くても手を止め、5分休みましょう。$/))) return `Focus session ${match[1]} is complete. Stop even if unfinished and take a five-minute break.`;
    if ((match = value.match(/^休憩完了です。(\d+)回目の集中へ進みましょう。$/))) return `Break complete. Begin focus session ${match[1]}.`;
    if (value === '1セット完了です。新しい4回のサイクルを始めましょう。') return 'One set complete. Begin a new four-session cycle.';
    if ((match = value.match(/^保存した「(.+)」を削除しますか？$/))) return `Delete the saved agenda “${match[1]}”?`;
    if ((match = value.match(/^「(.+)」をこのブラウザに記録しました。$/))) return `Saved “${match[1]}” in this browser.`;
    if ((match = value.match(/^「(.+)」を呼び出しました。$/))) return `Loaded “${match[1]}”.`;
    if ((match = value.match(/^「(.+)」を削除しました。$/))) return `Deleted “${match[1]}”.`;
    if ((match = value.match(/^(.+)（(\d+)分）$/))) return `${match[1]} (${match[2]} min)`;
    if ((match = value.match(/^全体を縮小（現在\s*(\d+)%）$/))) return `Zoom out (current: ${match[1]}%)`;
    if ((match = value.match(/^全体を拡大（現在\s*(\d+)%）$/))) return `Zoom in (current: ${match[1]}%)`;
    if ((match = value.match(/^(\d+)分・(.+)$/))) return `${match[1]} min · ${match[2]}`;
    if ((match = value.match(/^(\d+)分の短い休憩$/))) return `${match[1]}-minute short break`;
    if ((match = value.match(/^(\d+)分の長い休憩$/))) return `${match[1]}-minute long break`;
    if ((match = value.match(/^(\d+)分集中を始める$/))) return `Start ${match[1]}-minute Focus`;
    if ((match = value.match(/^(\d+)分休憩を始める$/))) return `Start ${match[1]}-minute Break`;
    if ((match = value.match(/^(.+)の分数$/))) return `Minutes for ${phrases.get(match[1]) ?? match[1]}`;
    if (value === '保存した進行表はありません') return 'No saved agendas';
    if (value === '固定中') return 'Pinned';
    if (value === '操作モードへ戻る') return 'Restore Controls';
    if (value === 'クリック透過を開始') return 'Start Click-through';
    if (value === '最前面・操作可能') return 'Always on top · Interactive';
    if (value === '最前面・クリック透過') return 'Always on top · Click-through';
    if (value === '通常表示・操作可能') return 'Normal window · Interactive';
    if (value === '通常表示・クリック透過') return 'Normal window · Click-through';
    if ((match = value.match(/^(.+)｜タイマー｜ワークショップタイマー$/))) return `${match[1]} | Timer | Workshop Timer`;
    if ((match = value.match(/^(.+)｜ストップウォッチ｜ワークショップタイマー$/))) return `${match[1]} | Stopwatch | Workshop Timer`;
    if ((match = value.match(/^設定｜(.+)$/))) return `Settings | ${match[1]}`;
    if ((match = value.match(/^完了｜(.+)$/))) return `Complete | ${match[1]}`;
    return value;
  }

  function translateValue(value) {
    const match = String(value).match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!match) return value;
    const translated = phrases.get(match[2]) ?? translateDynamic(match[2]);
    return `${match[1]}${translated}${match[3]}`;
  }

  function shouldIgnore(node) {
    const parent = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    return !parent || Boolean(parent.closest('script, style, [data-i18n-ignore]'));
  }

  function applyTextNode(node) {
    if (shouldIgnore(node) || !node.nodeValue.trim()) return;
    const current = node.nodeValue;
    let record = textRecords.get(node);
    if (!record || (current !== record.ja && current !== record.en)) {
      const adjustmentText = node.parentElement?.id === 'adjustment-label'
        ? current.replace('設定', 'SET').replace('延長', 'EXTEND')
        : null;
      record = { ja: current, en: adjustmentText ?? translateValue(current) };
      textRecords.set(node, record);
    }
    const next = language === 'en' ? record.en : record.ja;
    if (current !== next) node.nodeValue = next;
  }

  function applyAttributes(element) {
    if (shouldIgnore(element)) return;
    let records = attributeRecords.get(element);
    if (!records) {
      records = new Map();
      attributeRecords.set(element, records);
    }
    for (const name of attributeNames) {
      if (!element.hasAttribute(name)) continue;
      const current = element.getAttribute(name);
      let record = records.get(name);
      if (!record || (current !== record.ja && current !== record.en)) {
        record = { ja: current, en: translateValue(current) };
        records.set(name, record);
      }
      const next = language === 'en' ? record.en : record.ja;
      if (current !== next) element.setAttribute(name, next);
    }
  }

  function applyInputValue(element) {
    if (!(element instanceof HTMLInputElement) || !['text', 'search'].includes(element.type)) return;
    const current = element.value;
    let record = valueRecords.get(element);
    if (!record || (current !== record.ja && current !== record.en)) {
      const translated = phrases.get(current);
      if (!translated) {
        valueRecords.delete(element);
        return;
      }
      record = { ja: current, en: translated };
      valueRecords.set(element, record);
    }
    const next = language === 'en' ? record.en : record.ja;
    if (current !== next) element.value = next;
  }

  function applyTree(root = document.documentElement) {
    applying = true;
    if (root.nodeType === Node.TEXT_NODE) applyTextNode(root);
    if (root.nodeType === Node.ELEMENT_NODE) {
      applyAttributes(root);
      applyInputValue(root);
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (node.nodeType === Node.TEXT_NODE) applyTextNode(node);
      else {
        applyAttributes(node);
        applyInputValue(node);
      }
      node = walker.nextNode();
    }
    document.documentElement.lang = language;
    updateToggleLabels();
    applying = false;
  }

  function updateToggleLabels() {
    document.querySelectorAll('.language-toggle').forEach((button) => {
      const label = language === 'ja' ? 'EN' : '日本語';
      const accessibleLabel = language === 'ja' ? 'Switch to English' : '日本語に切り替え';
      if (button.textContent !== label) button.textContent = label;
      if (button.getAttribute('aria-label') !== accessibleLabel) button.setAttribute('aria-label', accessibleLabel);
      if (button.getAttribute('title') !== accessibleLabel) button.setAttribute('title', accessibleLabel);
    });
  }

  function setLanguage(nextLanguage) {
    if (!supported.has(nextLanguage) || nextLanguage === language) return;
    language = nextLanguage;
    try { localStorage.setItem(STORAGE_KEY, language); } catch {}
    applyTree();
    window.dispatchEvent(new CustomEvent('timerlanguagechange', { detail: { language } }));
  }

  function bindToggles() {
    document.querySelectorAll('.language-toggle').forEach((button) => {
      if (button.dataset.languageBound === 'true') return;
      button.dataset.languageBound = 'true';
      button.addEventListener('click', () => setLanguage(language === 'ja' ? 'en' : 'ja'));
    });
    updateToggleLabels();
  }

  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY && supported.has(event.newValue)) {
      setLanguage(event.newValue);
    }
  });

  const observer = new MutationObserver((mutations) => {
    if (applying) return;
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') applyTextNode(mutation.target);
      else if (mutation.type === 'attributes') applyAttributes(mutation.target);
      else mutation.addedNodes.forEach((node) => applyTree(node));
    }
    bindToggles();
  });

  window.TimerI18n = {
    get language() { return language; },
    setLanguage,
    translate: (value) => language === 'en' ? translateValue(value) : value,
    apply: applyTree
  };

  bindToggles();
  applyTree();
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: attributeNames
  });
})();
