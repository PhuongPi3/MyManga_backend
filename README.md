# 📚 MyManga Backend

## 🚀 Tech Stack

- Node.js + Express
- MongoDB Atlas
- Railway deploy
- JWT Auth
- Proxy MangaDex API (tuân thủ policy)
- Cron job update

## 📂 Structure


manga-backend/
├── server.js
├── config/db.js
├── routes/
├── controllers/
├── models/
├── middleware/
├── cron/
├── .env
├── package.json

## 🔑 Env Example
MONGO_URI=mongodb+srv://:@cluster.mongodb.net/dbname
JWT_SECRET=supersecret

## ⚙️ Scripts

- `npm run dev` — Chạy dev mode với nodemon
- `npm start` — Chạy production

## ✅ Main API

| Method | Endpoint | Mô tả |
| ------ | -------- | ----- |
| POST | /api/auth/register | Đăng ký |
| POST | /api/auth/login | Đăng nhập |
| GET | /api/manga | Lấy list manga |
| GET | /api/manga/:id | Chi tiết manga |
| GET | /api/chapter/:mangaId | List chapter |
| GET | /api/chapter/read/:id | Load pages |
| POST | /api/user/follow | Theo dõi truyện |
| GET | /api/user/library | Thư viện đã theo dõi |
| GET | /api/user/history | Lịch sử đọc |
| POST | /api/user/history | Update vị trí đọc |
| POST | /api/comment | Tạo comment |
| GET | /api/comment/:mangaId | Lấy comment |
| DELETE | /api/comment/:id | Xóa comment |
| PUT | /api/comment/:id | Sửa comment |

## 🛡️ Policy

- Không lưu ảnh chapter.
- Chỉ lưu meta (title, desc).
- Lấy dữ liệu qua MangaDex API.

---

**✅ Railway deploy → auto build**
**✅ Vercel deploy frontend**

---

**Made by [Phương 🐸]**