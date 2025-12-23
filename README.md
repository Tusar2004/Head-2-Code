# 🚀 HEAD-2-CODE

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green.svg)
![Vite](https://img.shields.io/badge/Vite-Rapid-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Design-blue)

> **Level up your coding skills!**  
> An immersive, gamified coding platform built for developers to practice, compete, and grow.

---

## 📖 About The Project

**HEAD-2-CODE** is a modern coding platform designed to make learning algorithms and data structures engaging. By combining a powerful code editor with gamification elements like streaks, badges, and contests, it keeps users motivated to code daily.

Whether you're a beginner looking to solve your first problem or a seasoned pro competing in contests, HEAD-2-CODE provides the environment you need.

---

## ✨ Key Features

*   **💻 Powerful Code Editor**: Integrated Monaco Editor for a VS Code-like experience right in the browser.
*   **⚡ Real-time Code Execution**: Run code instantly in multiple languages (supported by Judge0 API).
*   **🏆 Gamification System**:
    *   **Badges**: Earn unique badges for milestones (e.g., specific algorithms, daily streaks).
    *   **Streaks**: Track your daily coding habits.
*   **🤖 AI Assistance**: Integrated Google Generative AI (Gemini) to help with code explanations and improvements.
*   **🔐 Secure Authentication**: Robust implementation using JWT, with support for Social Login (Google & GitHub).
*   **📡 Real-time Updates**: Live notifications and updates using Socket.io.
*   **🎨 Modern UI/UX**: Built with React, Tailwind CSS v4, and DaisyUI for a sleek, responsive dark-mode aesthetic.

---

## 🛠️ Tech Stack

### **Frontend**
*   **Framework**: [React](https://reactjs.org/) (Vite)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
*   **Routing**: [React Router v7](https://reactrouter.com/)
*   **Validation**: Zod & React Hook Form
*   **Editor**: Monaco Editor React
*   **Real-time**: Socket.io Client

### **Backend**
*   **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB Atlas](https://www.mongodb.com/) (Mongoose)
*   **Caching**: Redis
*   **Authentication**: Passport.js (Google/GitHub OAuth), JWT, BCrypt
*   **AI**: Google Generative AI SDK
*   **Image Storage**: Cloudinary

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
*   Node.js (v18+ recommended)
*   npm or yarn
*   MongoDB instance (Local or Atlas)
*   Redis (Optional, for advanced caching features)

### Installation

#### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/head-2-code.git](https://github.com/yourusername/head-2-code.git)
cd head-2-code
