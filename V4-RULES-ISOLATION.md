# V4 老師資料隔離：Firestore / Storage Rules 更新（2026-09-26）

配合 app.js 的 per-teacher 隔離架構。請在 Firebase Console 更新以下兩處，
**不要刪除 V2、V3 的規則，只改 V4 的部分。**

新架構：
- `v4_sentences`：共版課程（第一～六冊），所有人可讀，只有管理員可寫。
- `v4_teachers/{uid}/sentences`：每位老師的個人句庫＋他自己加的「補充」。本人＋管理員可讀寫。
- `v4_teachers/{uid}/overrides`：老師對共版課程的個人覆寫（編輯／刪除／錄音），doc ID＝共版文件 ID。本人＋管理員可讀寫。

## 一、Firestore Rules

到 Firebase Console → Firestore Database → Rules，
在 `match /databases/{database}/documents {` 裡面修改／新增以下。

### 1. 修改 `v4_sentences`（共版課程改為管理員專用寫入）

原本：
```
    match /v4_sentences/{docId} {
      allow read: if true;
      allow create, update, delete: if isV4ApprovedTeacher();
    }
```
改成：
```
    // V4 共版課程（第一～六冊）：所有人可讀，只有管理員可寫。
    // 老師的編輯／刪除改走 v4_teachers/{uid}/overrides，不影響他人。
    match /v4_sentences/{docId} {
      allow read: if true;
      allow create, update, delete: if isV4Admin();
    }
```

### 2. 新增老師個人命名空間（放在 v4 相關規則旁邊）

```
    // V4 老師個人資料：個人句庫＋課程「補充」（sentences）、共版課程覆寫層（overrides）。
    // 只有本人（須為已核准老師）與管理員可讀寫。
    match /v4_teachers/{teacherId}/sentences/{docId} {
      allow read, create, update, delete: if isV4ApprovedTeacher()
        && (request.auth.uid == teacherId || isV4Admin());
    }
    match /v4_teachers/{teacherId}/overrides/{docId} {
      allow read, create, update, delete: if isV4ApprovedTeacher()
        && (request.auth.uid == teacherId || isV4Admin());
    }
```

`v4_meta`、`v4_accessRequests`、`v4_approvedTeachers` 維持不變。
改完按 **Publish**。

### 3. 新增使用統計集合（2026-10-07，管理員儀表板用）

``` 
    // V4 使用統計：每位老師的登入登出＋頁面停留（v4_analytics_sessions）。
    // 老師只能建立／讀寫自己的 session（uid 須等於本人），看不到別人的；
    // 只有管理員可讀取全部（後台「使用統計」分頁）。
    match /v4_analytics_sessions/{sessionId} {
      allow create: if isV4ApprovedTeacher()
        && request.resource.data.uid == request.auth.uid;
      allow update: if isV4ApprovedTeacher()
        && resource.data.uid == request.auth.uid;
      allow get, list: if isV4Admin()
        || (isV4ApprovedTeacher() && resource.data.uid == request.auth.uid);
    }
```

注意：這條規則上線前，老師登入時寫入 session 會被拒絕（寫入失敗只會記在 console，不影響網站使用）；後台「使用統計」分頁在規則上線前會顯示讀取失敗。請優先更新此規則。

## 二、Storage Rules

到 Firebase Console → Storage → Rules，修改 `v4_audio` 規則：

原本：
```
    match /v4_audio/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email_verified == true;
    }
```
改成：
```
    // 舊錄音檔（v4_audio/xxx.webm）：保留可讀，寫入只限管理員。
    match /v4_audio/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email.lower() == 'f216002@gmail.com';
    }
    // 老師個人錄音（v4_audio/{uid}/xxx.webm）：本人＋管理員可寫，所有人可讀。
    match /v4_audio/{teacherId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email_verified == true
        && (request.auth.uid == teacherId
          || request.auth.token.email.lower() == 'f216002@gmail.com');
    }
```
按 **Publish**。

## 三、套用後請告訴我

Rules 生效後請在對話中說一聲，我會接著：
1. 把現有的個人句子／補充搬到你的個人命名空間（保留原 ID 與錄音）；
2. 推送新版 app.js；
3. 上線驗證（新增／編輯／刪除只影響自己的帳號）。

## 完成後的驗證（你也可以自己測）

1. 用 f216002@gmail.com 登入 → 在「My Sentence Bank」新增一句 → 只出現在這個帳號。
2. 用另一個老師帳號（例如 f21600202@gmail.com）登入 →
   看不到上一步新增的句子；課程第一～六冊內容正常。
3. 用老師帳號編輯第一冊某一句課文 → 只改自己看到的版本；
   切回管理員帳號看，原文沒變。
