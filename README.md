# 服務範圍確認單製作工具 Simple Scope Confirmation Generator

一個給自由工作者與小型工作室使用的服務範圍確認單製作工具。

不用登入、不需安裝、不需要後端。
打開網頁，填寫服務範圍、交付項目、修改規則與不包含項目，即可產生一份乾淨、可列印、可另存 PDF 的服務範圍確認單。

這個工具的目標不是取代合約、法律文件或專案管理系統，而是把大家原本就應該做、但常常懶得整理的服務範圍確認流程，變成更低門檻的小工具。

## 專案特色

- 純前端工具，不需要後端、資料庫或帳號系統
- 使用填格子的方式整理服務範圍
- 即時產生正式文件風格的確認單預覽
- 支援列印與透過瀏覽器另存 PDF
- 支援複製文字版確認內容
- 使用 localStorage 自動暫存資料
- 支援包含項目、不包含項目、交付項目與客戶需提供資料
- UI 文案使用繁體中文

## 適合誰使用

- 自由工作者
- 小型工作室
- 接案者
- 設計師、攝影師、剪輯師
- 顧問、講師與服務型工作者
- 需要在專案開始前整理服務範圍的人

## 功能列表

- 確認單資訊、專案資訊與日期欄位
- 服務提供者與客戶資訊欄位
- 專案背景、專案目標與合作重點
- 包含服務項目清單
- 不包含服務項目清單
- 交付項目清單
- 修改次數與變更規則
- 客戶需提供資料清單
- 時程與付款提醒文字
- 補充備註與確認文字
- 文字版複製
- 列印 / 另存 PDF
- 本機暫存與清空表單

## 服務範圍確認功能說明

本工具協助你在專案開始前整理本次合作包含什麼、不包含什麼、會交付什麼、修改幾次，以及客戶需要提供哪些資料。

它適合用在正式開始工作前的溝通確認，幫助雙方降低後續範圍認知落差。

## 法律邊界說明

本工具產生的內容僅供雙方溝通與專案範圍確認使用，不構成法律合約或法律建議。
若你需要正式合約、法律文件或法律意見，請諮詢合格專業人士。

## 隱私說明

本工具不需要登入，也不會將資料上傳到任何伺服器。
所有輸入內容僅儲存在你的瀏覽器 localStorage 中。
若你按下清空表單，資料會從瀏覽器暫存中移除。

## 本機開發方式

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
```

## GitHub Pages 部署方式

本專案已包含 GitHub Actions workflow：`.github/workflows/deploy.yml`。

使用方式：

1. 建立 GitHub repo：`simple-scope-confirmation-generator`
2. 將本專案推送到 `main`
3. 到 repository 的 Settings → Pages
4. Source 選擇 GitHub Actions
5. push 到 `main` 後會自動 build 並部署 `dist`

部署到 GitHub Pages 時，`vite.config.ts` 使用：

```ts
base: "/simple-scope-confirmation-generator/"
```

## Vercel 部署方式

Vercel 可直接匯入此 repository 並使用預設 Vite 設定部署。

若部署到 Vercel 根路徑，`vite.config.ts` 可視情況改為：

```ts
base: "/"
```

## 開源授權

本專案採用 MIT License。

## 支持專案

如果這個工具幫你省下一點時間，歡迎請我喝一杯珍奶，支持後續維護與更新。

- BobaMe：https://donglinphoto.bobaboba.me

網站底部已提供「分享這個工具」、「複製分享連結」與「Give me a Boba!」贊助按鈕。

分享文案與贊助連結集中放在 `src/utils/projectLinks.ts`，可依專案語氣調整。

## GitHub / GitHub Pages Step by Step

1. 到 [https://github.com/new](https://github.com/new) 建立 repo。
2. Repository name 填 `simple-scope-confirmation-generator`。
3. 不要勾選 README、.gitignore、License，因為本專案已經包含。
4. 建立後複製 repo URL，例如：

```text
https://github.com/dong-sc/simple-scope-confirmation-generator.git
```

5. 在本機專案資料夾初始化並推送：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/dong-sc/simple-scope-confirmation-generator.git
git push -u origin main
```

6. 到 repo 的 `Settings → Pages`。
7. `Source` 選 `GitHub Actions`。
8. 到 `Actions` 頁面確認部署變綠。
9. 網站通常會在：

```text
https://dong-sc.github.io/simple-scope-confirmation-generator/
```
