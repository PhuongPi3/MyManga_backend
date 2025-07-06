📚 MyManga Backend

Welcome to the backend service of MyManga – a modern manga reader web application built with Node.js, Express, and MongoDB. Deployed effortlessly using Railway.

✅ Key Features

🔒 Authentication – Secure registration, login, and JWT-based authentication.

📚 Manga Management – Automatically crawl and store manga from MangaDex.

📖 Chapters – Fetch chapters by manga and read seamlessly using the MangaDex At-Home server.

🔍 Search & Filter – Find manga by title, filter by status, tags, or genres.

📌 Genre Handling – Manage and organize manga genres.

⭐ Follow System – Users can follow or unfollow their favorite manga titles.

🕒 Reading History – Keep track of what users have read.

📢 Notifications – Get notified about new chapters of followed manga (web-only).

🧩 Recommendations – Suggest similar manga based on user interests and follows.

🔑 Admin Panel – Full CRUD for managing manga, chapters, genres, and users.

⚡ Performance Optimizations – Integrate caching with Redis and schedule regular crawls using cron jobs.

🚀 Getting Started

1️⃣ Clone this repository:

git clone https://github.com/PhuongPi3/MyManga_backend.git

2️⃣ Install dependencies:

npm install

3️⃣ Configure environment variables:Create a .env file with the following content:

MONGO_URI=<Your MongoDB URI>
PORT=5000
MANGADEX_API=https://api.mangadex.org

4️⃣ Run the server:

npm start

The backend will start at: http://localhost:5000/

📂 Project Structure

backend/
 ├── config/         # Database and app configuration
 ├── controllers/    # Business logic
 ├── models/         # Database schemas
 ├── routes/         # API endpoints
 ├── cron/           # Scheduled jobs
 ├── middleware/     # Middleware functions
 ├── server.js       # Entry point
 ├── .env            # Environment variables
 └── package.json

📝 Special Thanks

This project utilizes the MangaDex API to crawl and deliver manga data.We fully respect and follow the MangaDex Terms of Service and Fair Use Policy.All manga content belongs to their original creators and scanlation teams.Please consider supporting the official releases to help the creators!

Visit MangaDex.org to learn more.

🔗 License

This project is intended for educational purposes only and is not for commercial use.

✨ Happy reading! 📖
