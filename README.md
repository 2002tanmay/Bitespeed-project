# 🧩 Bitespeed Backend Task – Identity Reconciliation

This project is a **Node.js + TypeScript** implementation of the Bitespeed Backend Task for **Identity Reconciliation**.

It exposes a single API endpoint that consolidates customer identities across multiple purchases based on email and phone number matching rules.

---



## 🛠 Tech Stack

* **Node.js**
* **TypeScript**
* **Express**
* **SQLite** (better-sqlite3)
* **Render** (Cloud Deployment)

---

## 📡 API Usage

### 🔹 Request

`POST /identify`

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "email": "lorraine@hillvalley.edu",
  "phoneNumber": "123456"
}
```

---

### 🔹 Response

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": [
      "lorraine@hillvalley.edu",
      "mcfly@hillvalley.edu"
    ],
    "phoneNumbers": [
      "123456"
    ],
    "secondaryContactIds": [2]
  }
}
```

---

## 🧠 Business Logic Overview

The service:

* ✅ Creates a **primary contact** if no match exists
* ✅ Creates a **secondary contact** when new information matches an existing identity
* ✅ Maintains the **oldest contact as the canonical primary**
* ✅ Merges multiple identities when overlap is detected
* ✅ Ensures unique email and phone number aggregation

The response always returns:

* Primary Contact ID
* All unique emails
* All unique phone numbers
* All secondary contact IDs

---

## 🧪 Example Test Cases

### 1️⃣ First Order

```json
{
  "email": "lorraine@hillvalley.edu",
  "phoneNumber": "123456"
}
```

### 2️⃣ Same Phone, New Email

```json
{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}
```

### 3️⃣ Lookup Using Only Phone

```json
{
  "phoneNumber": "123456"
}
```

All of the above return the same consolidated contact object.

---

## ▶ Running Locally

```bash
npm install
npm run dev
```

Server runs at:

```
http://localhost:3000/identify
```

---

## ☁ Deployment (Render)

**Environment:** Node

**Build Command**

```bash
npm install && npm run build
```

**Start Command**

```bash
npm start
```

Render automatically sets the `PORT` using:

```ts
process.env.PORT
```

---




## 📌 Submission Links



## 👨‍💻 Author

Tanmay Shivhare

---

⭐ If this project was helpful or interesting, feel free to give it a star!
