# 📁 Node.js File & Directory Manager API

This project provides a simple API to create and delete files or directories using **HTTP POST requests**. You can interact with it using **Postman** or any HTTP client.

---

## 📌 API Base URL

### ✅ Use one of the following depending on your setup:

| Environment       | Base URL                            |
|-------------------|-----------------------------------|
| 🔁 Local Machine   | `http://localhost:9000`            |
| 🌐 Public Access   | e.g. `https://clear-lemons-juggle.loca.lt` (via LocalTunnel) |

> ⚠️ If you're running the code locally, always prefer using `localhost`.  
> If you're accessing it remotely or sharing it, use the **public LocalTunnel URL** that appears when you start the server.

---

## 📂 API Endpoints

### 1. Create Directory

- **Endpoint**: `/createDir`
- **Method**: `POST`
- **Request Body** (JSON):

```json
{
  "DirName": "folder1"
}
```

- **Description**: Creates a directory with the name specified in the `DirName` key.

---

### 2. Delete Directory

- **Endpoint**: `/createDir/delete`
- **Method**: `POST`
- **Request Body** (JSON):

```json
{
  "DirName": "folder1"
}
```

- **Description**: Deletes the directory specified by the `DirName` key.

---

### 3. Create File

- **Endpoint**: `/createFile`
- **Method**: `POST`
- **Request Body** (JSON):

```json
{
  "DirName": "folder1",
  "FileName": "file1"
}
```

- **Description**: Creates a file named `FileName` inside the directory `DirName`.

---

### 4. Delete File

- **Endpoint**: `/createFile/delete`
- **Method**: `POST`
- **Request Body** (JSON):

```json
{
  "DirName": "folder1",
  "FileName": "file1"
}
```

- **Description**: Deletes the file named `FileName` inside the directory `DirName`.

---

## 🚀 Using the API with Postman

1. Set the request method to `POST`.
2. Use the appropriate endpoint URL based on your environment (localhost or LocalTunnel URL).
3. In the **Body** tab, select **raw** and choose **JSON** format.
4. Paste the JSON request body as shown above for the desired operation.
5. Send the request and check the response.

---

If you have the source code on your local machine, use `http://localhost:9000` as the base URL. Otherwise, use the LocalTunnel URL generated when you start the server with `npm start`.

This JSON structure is for file-related operations (both `DirName` and `FileName` keys). For directory-related operations, use only the `DirName` key.

---
