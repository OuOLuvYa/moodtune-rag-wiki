# MoodTune RAG Wiki 與教學 HTML 簡報

這份作業以「RAG 如何做心情歌單推薦」為主題。專案包含一個可瀏覽的 LLM Wiki、一份教學型 HTML 簡報、資料來源清單、實際檢查紀錄與繳交文字。

## 直接開啟

- `wiki/index.html`：LLM Wiki
- `index.html`：教學 HTML 簡報
- `繳交內容.md`：可貼到課程平台的繳交說明
- `檢查紀錄.md`：一次實際執行與修正紀錄

## 本機預覽

在這個資料夾執行：

```powershell
python -m http.server 8000
```

瀏覽器開啟：

- Wiki：`http://localhost:8000/wiki/`
- 簡報：`http://localhost:8000/`

## 操作方式

簡報支援左右方向鍵、Page Up、Page Down、Home、End 和畫面按鈕。按 `F` 可切換全螢幕，按 `O` 可開啟投影片總覽。

## 部署

整個 `rag-mood-wiki-presentation` 資料夾可部署到 GitHub Pages。部署後首頁是簡報，`/wiki/` 是 Wiki。

