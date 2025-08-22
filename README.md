<div align="center">

# 🚀 Path Craft

**Intelligent Career Path Recommendations**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.x-green.svg)](https://flask.palletsprojects.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.x-brightgreen.svg)](https://www.mongodb.com/)

*Discover personalized learning opportunities and career paths tailored to your professional goals*

[Demo](#) · [Documentation](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📖 About The Project

Path Craft is a sophisticated full-stack web application that leverages intelligent algorithms to provide personalized recommendations for courses, educational videos, and job opportunities. By analyzing user preferences, skills, and career aspirations, the platform delivers curated content to accelerate professional development journeys.

### ✨ Key Highlights

- 🎯 **Smart Recommendations** - AI-driven course and job matching
- 👤 **Personalized Profiles** - Comprehensive skill and interest tracking  
- 📊 **Interactive Dashboard** - Clean, intuitive user experience
- 🔍 **Advanced Filtering** - Precision search and discovery tools
- 📱 **Responsive Design** - Seamless mobile and desktop experience
- ⚡ **Real-time Updates** - Live job alerts and content updates

## Check it out here: [Link](https://path-craft-delta.vercel.app/)

## 🛠️ Built With

<div align="center">

| Frontend | Backend | Database | Deployment |
|----------|---------|----------|------------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) | ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) | ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) | | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) |

</div>

## 📁 Project Architecture

```
path-craft/
├── 🎨 frontend/                 # React application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Application pages
│   │   ├── services/           # API integration
│   │   ├── styles/             # CSS modules
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── ⚙️ backend/                  # Flask API server
│   ├── app.py                  # Application entry point
│   ├── models/                 # Database models
│   ├── routes/                 # API endpoints
│   ├── utils/                  # Helper functions
│   ├── requirements.txt
│   └── README.md
├── 📄 README.md
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

- ![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?logo=node.js&logoColor=white) 
- ![Python](https://img.shields.io/badge/Python-v3.8+-3776AB?logo=python&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-v4.x-47A248?logo=mongodb&logoColor=white)

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/path-craft.git
   cd path-craft
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   
   # Activate virtual environment
   source venv/bin/activate  # macOS/Linux
   # OR
   venv\Scripts\activate     # Windows
   
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` files in both directories:
   
   **Backend** (`backend/.env`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/pathcraft
   FLASK_ENV=development
   SECRET_KEY=your-secure-secret-key
   ```
   
   **Frontend** (`frontend/.env`):
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

### 🎯 Running Locally

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Launch Backend** (Terminal 1)
   ```bash
   cd backend
   source venv/bin/activate
   python app.py
   ```
   🌐 Backend runs on `http://localhost:5000`

3. **Launch Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm start
   ```
   🌐 Frontend runs on `http://localhost:3000`

4. **Access Application**
   
   Open your browser and navigate to `http://localhost:3000`

## 🔗 API Reference

<details>
<summary><b>View API Endpoints</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/recommendations/courses` | Retrieve course recommendations |
| `GET` | `/api/recommendations/videos` | Fetch video content suggestions |
| `GET` | `/api/recommendations/jobs` | Get job opportunity matches |
| `POST` | `/api/user/profile` | Create or update user profile |
| `GET` | `/api/user/profile/:id` | Fetch specific user profile |
| `POST` | `/api/user/preferences` | Update user preferences |

**Base URL:** `http://localhost:5000`

</details>

## 🌐 Deployment

### Deploy on Render

<details>
<summary><b>Backend Deployment Steps</b></summary>

1. Push code to GitHub repository
2. Create new **Web Service** on Render
3. Connect GitHub repository
4. Configure build settings:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python app.py`
   - **Environment:** Python 3
5. Set environment variables:
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `FLASK_ENV`: `production`
   - `SECRET_KEY`: Secure production key
6. Deploy service

</details>

<details>
<summary><b>Frontend Deployment Steps</b></summary>

1. Create new **Static Site** on Render
2. Connect GitHub repository  
3. Configure build settings:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/build`
4. Set environment variables:
   - `REACT_APP_API_URL`: Deployed backend URL
5. Deploy site

</details>

<details>
<summary><b>Database Setup (MongoDB Atlas)</b></summary>

1. Create MongoDB Atlas cluster
2. Configure network access whitelist
3. Create database user credentials
4. Update `MONGODB_URI` in deployment environment

</details>

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔄 **Open** a Pull Request

### 📋 Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- 📧 **Issues:** [Report a bug or request a feature](../../issues)
- 💬 **Discussions:** [Join the conversation](../../discussions)
- 📖 **Documentation:** [View full docs](#)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by the Path Craft Team

*Crafting your learning and career path, one recommendation at a time.*

</div>
