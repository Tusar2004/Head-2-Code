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

git clone [https://github.com/yourusername/head-2-code.git](https://github.com/yourusername/head-2-code.git)
cd head-2-code
2. Backend Setup
Navigate to the backend directory and install dependencies:

bash
cd backend
npm install
Create a .env file in the backend directory (see 
Environment Variables
).

Start the backend server:

bash
npm start
# or for development
npm run dev
3. Frontend Setup
Open a new terminal, navigate to the frontend directory:

bash
cd frontend
npm install
Start the development server:

bash
npm run dev
Visit http://localhost:5173 in your browser.

🔑 Environment Variables
You need to configure the following environment variables.

Backend (.env)
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
# OAuth (Google & GitHub)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# AI
GEMINI_API_KEY=your_gemini_api_key
# Code Execution (RapidAPI Judge0)
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=judge0-ce.p.rapidapi.com
📸 Screenshots
Landing Page	Code Editor
Profile & Badges	Login Screen
🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
Distributed under the ISC License. See LICENSE for more information.

Made with ❤️ by Tusar Goswami
