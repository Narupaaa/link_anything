# Organizational Web Portal 🚀

ระบบ Web Portal สำหรับองค์กรที่เชื่อมต่อกับ Google Sheets เป็นฐานข้อมูลและใช้ Google Apps Script เป็น REST API หน้ากาก (Frontend) พัฒนาด้วย Bootstrap 5 และ Vanilla JavaScript รองรับ Dark Mode และ Responsive Design

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, Bootstrap 5, Vanilla JS (ES6+)
- **Hosting:** GitHub Pages
- **Backend/API:** Google Apps Script (GAS)
- **Database:** Google Sheets

---

## 📁 Folder Structure

```text
portal/
│
├── Code.gs             # Backend Google Apps Script
├── index.html          # Main Frontend Page
├── css/
│   └── style.css       # Custom Styling
├── js/
│   └── app.js          # Main Frontend Logic
├── assets/
│   └── logo.png        # Logo (Place your logo here)
└── README.md           # Documentation
```

---

## 📋 Google Sheet Structure

สร้าง Google Sheet ใหม่ และตั้งชื่อ Sheet (Tab) ว่า **"Links"** โดยมีหัวตารางดังนี้:

| id | name | description | url | icon | category | role | color | sort_order | status | created_at |
|----|------|-------------|-----|------|----------|------|-------|------------|--------|------------|
| 1 | CRM | Customer Management | https://crm.example.com | bi-people | Business | admin | primary | 1 | active |
| 2 | ERP | Enterprise Resource Planning | https://erp.example.com | bi-box | Business | user | success | 2 | active |

**รายละเอียด Column:**
- `icon`: ชื่อ Bootstrap Icon (เช่น `bi-people`, `bi-gear`)
- `color`: Bootstrap color class (เช่น `primary`, `success`, `warning`, `danger`, `info`)
- `status`: ต้องเป็น `active` เท่านั้นถึงจะแสดงผล
- `sort_order`: ลำดับการแสดงผล (ตัวเลข)

---

## 🚀 Deployment Guide

### 1. Google Apps Script Setup (Backend)
1. เปิด Google Sheet ของคุณ
2. ไปที่เมนู **Extensions > Apps Script**
3. คัดลอกโค้ดจากไฟล์ `Code.gs` ไปวางใน Editor
4. กด Save (ปุ่มรูปแผ่นดิสก์)
5. กดปุ่ม **Deploy > New Deployment**
6. เลือกประเภทเป็น **Web App**
7. ตั้งค่า:
   - Description: "Portal API"
   - Execute as: **Me**
   - Who has access: **Anyone**
8. กด **Deploy** แล้วคัดลอก **Web App URL** ไว้

### 2. Frontend Configuration
1. เปิดไฟล์ `portal/js/app.js`
2. หาบรรทัด `const API_URL = 'YOUR_GAS_WEB_APP_URL_HERE';`
3. วาง **Web App URL** ที่คัดลอกมาลงในช่องนั้น

### 3. GitHub Pages Setup (Frontend)
1. สร้าง Repository ใหม่บน GitHub
2. Upload ไฟล์ทั้งหมดในโฟลเดอร์ `portal/` ขึ้นไป
3. ไปที่ **Settings > Pages** ใน GitHub Repository ของคุณ
4. ในส่วน **Build and deployment > Branch** เลือก `main` (หรือ branch ที่คุณใช้) และโฟลเดอร์ `/ (root)`
5. กด **Save**
6. รอสักครู่ GitHub จะให้ URL สำหรับเข้าใช้งานระบบของคุณ

---

## ✨ Features
- **Search:** ค้นหาชื่อระบบ, คำอธิบาย หรือหมวดหมู่ได้ทันที
- **Category Filter:** แยกประเภทระบบต่างๆ
- **Sorting:** เรียงตามชื่อ หรือหมวดหมู่
- **Dark Mode:** รองรับการสลับโหมดมืด-สว่าง (บันทึกค่าลง LocalStorage)
- **Stats Dashboard:** สรุปจำนวนระบบและหมวดหมู่ทั้งหมดอัตโนมัติ
- **Responsive:** ใช้งานได้ทั้งบน Desktop และ Mobile

---

## 🛡 License
MIT License

## 👨‍💻 Author
Created by Gemini CLI
