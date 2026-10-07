# Workshop Timer Overlay

PowerPointのスライドショー上に重ねて使える、背景透明のワークショップタイマーです。

## 2つの使い方

### Windows透明オーバーレイ版（推奨）

PowerPointの背面を透かして表示するには、Electron版を使用します。通常のブラウザはウインドウ自体を透明にできないため、`index.html` をブラウザで開くだけではPowerPointまでは透けません。

GitHubへpushすると、`.github/workflows/build-windows.yml` がポータブルEXEを自動生成します。

1. GitHubのリポジトリを開く
2. `Actions` → `Build Windows App` → 最新の実行結果を開く
3. `Artifacts` の `workshop-timer-windows` をダウンロード
4. ZIPを展開し、`Workshop-Timer-Overlay-1.0.0-x64.exe` を起動

署名していない個人配布用アプリのため、Windows SmartScreenが警告を表示する場合があります。配布元とファイルを確認したうえで使用してください。

### ブラウザ版

`index.html` を開くだけで通常のタイマーとして使用できます。GitHub Pages用のワークフローも同梱しています。初回のみリポジトリの `Settings` → `Pages` → `Source` を `GitHub Actions` に設定してください。

## ローカルでElectron版を起動

Node.jsをインストールした環境で次を実行します。

```powershell
corepack enable
pnpm install
pnpm start
```

Windows用ポータブルEXEを手元で作る場合：

```powershell
pnpm run dist:win
```

## グローバルショートカット

Electron版では、PowerPointを操作中でも以下のキーが使えます。

| キー | 動作 |
| --- | --- |
| `Ctrl + Shift + Space` | タイマー開始／一時停止 |
| `Ctrl + Shift + T` | クリック透過／操作可能を切り替え |
| `Ctrl + Shift + H` | 操作パネルを表示／非表示 |
| `Ctrl + Shift + R` | 最後にセットした時間へリセット |
| `Ctrl + Shift + F` | 全画面表示を切り替え |
| `Ctrl + Shift + Q` | アプリを終了 |

クリック透過を有効にすると、マウス操作は背面のPowerPointへ届きます。アプリを再び操作するには `Ctrl + Shift + T` を押してください。

## 主な機能

- 背景が完全に透明な最前面ウインドウ
- 1・3・5・10・15分のプリセット
- 時・分・秒の手動設定
- 時間追加、開始、一時停止、リセット、クリア
- 終了チャイムと赤色点滅
- 現在時刻を示すアナログ時計
- 操作パネル、時計、テーマ、背景時計濃度の切り替え
- ブラウザ版とWindowsアプリ版の両対応

## GitHubへ配置するとき

このフォルダーの中身をリポジトリのルートへ置いてください。`timer` フォルダーごと別リポジトリへアップロードする場合は、そのまま全ファイルをpushすれば動きます。
