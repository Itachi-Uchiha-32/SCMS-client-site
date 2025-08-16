# 🏆 Sports Club Management System (SCMS)

A full-featured web application for managing a single sports club's operations, including court bookings, membership, payments, and admin functionalities. Built with **React**, **Node.js**, **Express**, **MongoDB**, and **Firebase Authentication**.

## 🔗 Live Site

👉 [Visit SCMS](https://assignment-12-74ef1.web.app)

## 🔑 Admin Credentials

- **Email:** admin@scms.com
- **Password:** Admin123

> ⚠️ You can change or seed your own admin account if you prefer.

---

## ✨ Features

1. 🔐 User authentication with Firebase (login, register, logout)
2. 🧑‍🤝‍🧑 3 user roles: **User**, **Member**, and **Admin**
3. 📅 Book courts with slot selection and live price calculation
4. ⏳ Admin approves or rejects bookings
5. 💳 Secure Stripe payments with coupon discounts
6. 🏷️ Discount coupon management with expiry and percentage logic
7. 📣 Announcements section for club updates
8. 🗺️ Interactive map with club locations (React Leaflet)
9. 🧑‍💼 Admin dashboard with booking, user, court & coupon management
10. 📄 Dynamic table ↔️ card toggle for payment history
11. 📱 Fully responsive design for mobile, tablet, and desktop
12. 📦 Protected routes using React Router
13. 🌐 Axios Interceptor and TanStack Query for smooth data fetching
14. ✅ Custom toast/SweetAlert for all CRUD and auth events
15. 🔍 Search and pagination in tables and card layouts

---

## 🧑‍💻 Technologies Used

### Frontend:

- React
- React Router DOM
- Tailwind CSS + DaisyUI
- Axios + Axios Interceptor
- React Hook Form
- SweetAlert2
- TanStack React Query
- React Leaflet (for Maps)
- Stripe.js

### Backend:

- Node.js
- Express.js
- MongoDB + MongoDB Atlas
- Firebase Admin SDK (for JWT Verification)
- dotenv

---

## ⚙️ Environment Variables (.env)

```env
VITE_API_BASE_URL=https://scmc-server.vercel.app
STRIPE_SECRET_KEY= YOUR_STRIPE_KEY_HERE
DB_USER=DB_USER
DB_PASS=DB_PASS
```
