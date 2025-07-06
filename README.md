# 💸 Personal Finance Visualizer

A full-featured web application to manage and visualize your personal finances. Track your expenses, categorize transactions, set monthly budgets, and gain insights with interactive charts.

## 🚀 Features

###  Transaction Tracker
- Add, view, and delete transactions.
- Store amount, description, date, and category.
- Transaction list with real-time updates.

###  Budget Management
- Set monthly budgets per category.
- Compare your actual expenses against set budgets.
- Automatically calculate how much you’ve spent vs what was allocated.

### Insights & Visualization
- Monthly bar chart of expenses.
- Pie chart showing category-wise spending.
- Budget vs Actual comparison using bar charts.
- Dashboard with summaries and interactive visuals.

---

## 🛠 Tech Stack

| Technology | Usage |
|------------|--------|
| React.js (Vite) | Frontend UI |
| Shadcn/UI + Tailwind CSS | Styling & UI Components |
| Express.js | Backend API |
| MongoDB | Database |
| Axios | API Communication |
| Recharts | Data Visualization |

---

## 📁 Folder Structure

personal-finance-visualizer/
├── Frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # All reusable UI components
│ │ ├── pages/ # Home.jsx main page
│ │ └── App.jsx
├── server/ # Express backend
│ ├── routes/ # API routes
│ ├── models/ # Mongoose models
│ └── index.js # Entry point
├── .env # Environment variables
├── README.md # Project documentation


---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/personal-finance-visualizer.git
cd personal-finance-visualizer

### Backend SetUp
cd server
npm install
node index.js

Create a .env file inside /server
MONGO_URL=mongodb://127.0.0.1:27017/personal-finance


### Frontend SetUp
cd Frontend
npm install
npm run dev
