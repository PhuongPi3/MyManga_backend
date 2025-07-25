# 📚 Manga Reader — Proxy MangaDex

> Website truyện tranh online — sử dụng API MangaDex, **không lưu ảnh gốc**, tuân thủ Terms of Use.

---

## 📌 Mục tiêu

- Xây dựng **web app đọc truyện tranh** miễn phí.
- **Proxy API** từ MangaDex, hiển thị ảnh trực tiếp qua CDN.
- Cho phép user **đăng ký, đăng nhập**, **theo dõi**, **xem lịch sử**.
- Lưu **metadata** (thông tin cơ bản) vào MongoDB Atlas.
- Deploy **100% miễn phí** với Railway.

---

## 🚀 Công nghệ

| Thành phần | Công nghệ |
|------------|------------|
| **Backend** | Node.js + Express |
| **Database** | MongoDB Atlas (free tier) |
| **Auth** | JWT + bcrypt |
| **API Client** | axios |
| **Deploy Backend** | Railway |
| **Quản lý code** | GitHub |

---

## 🔑 Chức năng chính

✅ Xem danh sách truyện  
✅ Tìm kiếm, lọc, chi tiết truyện  
✅ Đọc chapter (ảnh load trực tiếp MangaDex)  
✅ Đăng ký, đăng nhập JWT  
✅ Theo dõi truyện  
✅ Lịch sử đọc  
✅ Giao diện responsive  
✅ Proxy API tuân thủ Terms of Use  
✅ Không lưu ảnh gốc

---

## 🗂️ Cấu trúc thư mục

```plaintext
mymanga/
 ├── backend/
 │   ├── server.js
 │   ├── routes/
 │   ├── controllers/
 │   ├── models/
 │   ├── config/
 │   ├── .env.example
 
```

---

## ⚙️ Cài đặt

### 1️⃣ Clone

```bash
git clone https://github.com/PhuongPi3/MyManga_backend.git
cd my-manga-reader
```

### 2️⃣ Backend

```bash
cd backend
npm install
#tao .env
npm run dev
```

---

## 🌐 Deploy Free

- **Database:** MongoDB Atlas Free Cluster.
- **Backend:** Railway (kết nối GitHub repo).
- **Tên miền:** Railway subdomain hoặc Freenom.

---

## ✅ Tuân thủ MangaDex Policy

- **Không crawl & lưu ảnh chapter**.
- Ảnh chapter **load trực tiếp từ CDN MangaDex**.
- Chỉ lưu **metadata** (tên, mô tả, ID).
- Ghi rõ credit **MangaDex** & nhóm dịch.
- Tôn trọng **API rate limit**.
- Không kinh doanh nội dung scan.

---

## ✨ Ghi chú

- Dự án **Open Source** — bạn có thể fork, cải tiến, tự host.
- Code gốc hoàn toàn miễn phí.
- Mọi vấn đề pháp lý bạn cần tự chịu trách nhiệm khi deploy.

---

## ❤️ Đóng góp

Pull request, issue & feedback luôn hoan nghênh!

---

**Happy reading!** 🚀📚✨
```
