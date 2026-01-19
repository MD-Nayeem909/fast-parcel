# 📦 FastParcel - Enterprise Logistics & Dynamic Marketplace 🚀

**FastParcel** is a high-performance, full-stack logistics and e-commerce management system. Built with the latest **Next.js 16** and **React 19**, this platform demonstrates advanced implementation of Role-Based Access Control (RBAC), real-time data visualization, and a seamless user experience designed for a modern logistics ecosystem.

---

## 🌟 Professional Highlights

### 🛡️ Secure Infrastructure & Authentication

- **Role-Based Access Control (RBAC):** Specialized logic for **Admins, Agents, and Customers** secured via Next-Auth and custom Middleware.
- **Form Validation & Schema:** Robust client-side and server-side validation using **React Hook Form** and **Zod**.
- **Secure Auth:** Password hashing using **Bcrypt.js** and secure JWT session management.

### 📊 Advanced Data Management

- **State Management:** Efficient server-state handling with **TanStack Query (React Query)** for caching and synchronized data fetching.
- **Product Ecosystem:** Full CRUD operations for product management with dynamic search, custom filtering, and pagination.
- **Interactive Analytics:** Real-time data visualization for logistics stats using **Recharts**.

### 🎨 High-End User Experience (UX/UI)

- **Modern Design:** Built with **Tailwind CSS 4.0** and **DaisyUI** for a clean, professional aesthetic.
- **Fluid Animations:** Smooth, GPU-accelerated transitions and interactive elements powered by **Framer Motion**.
- **Smart Feedback:** Integrated **SweetAlert2** for destructive actions and **React Hot Toast** for instant notifications.
- **UX Optimization:** Custom **Skeleton Loaders**, dynamic **Error Boundaries**, and a personalized **404 Not Found** experience.

---

## 🛠️ Technical Tech Stack

| Category             | Technology                            |
| :------------------- | :------------------------------------ |
| **Framework**        | Next.js 16 (App Router), React 19     |
| **Styling**          | Tailwind CSS 4, DaisyUI, Lucide React |
| **Database**         | MongoDB with Mongoose ODM             |
| **Auth**             | Next-Auth                             |
| **Data Fetching**    | Axios, TanStack Query v5              |
| **Forms/Validation** | React Hook Form, Zod                  |
| **Visuals**          | Recharts, Framer Motion               |

---

## 🚀 Installation & Setup

Ensure you have **Node.js 18+** installed.

### 1. Clone & Install

```bash
git clone [https://github.com/your-username/fast-parcel.git](https://github.com/your-username/fast-parcel.git)
cd fast-parcel
npm install
```

### 2. Configure Environment

Create a **.env.local** file in the root:

MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000

### 3. Development Mode

```bash
npm run dev


## 📁 Key Architecture

├── src/
│   ├── app/                # App Router: Pages, API Routes, & Server   Actions
│   ├── components/         # Atomic UI Components & Shared Layouts
│   ├── models/             # Mongoose Schemas (User, Product, Parcel)
│   ├── lib/                # Database Logic & Helper Utilities
│   ├── hooks/              # Custom TanStack Query Hooks
│   └── middleware.js       # RBAC & Route Guard Logic
└── public/                 # Optimized Assets & Branding
```

## 📈 Optimization Features

Speed Insights: Integrated @vercel/speed-insights for real-time performance tracking.

Date Handling: Efficient time-stamping and delivery scheduling using date-fns.

Atomic Components: Reusable UI elements for maintainability and scalability.
