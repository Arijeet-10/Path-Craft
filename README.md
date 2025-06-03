# Path Craft

A full-stack web application that provides personalized recommendations for courses, videos, and job openings based on user preferences and inputs. Path Craft helps users discover relevant learning opportunities and career paths tailored to their goals and interests.

## Overview

Path Craft is designed to streamline the process of finding educational content and career opportunities. By analyzing user inputs such as skills, interests, and career goals, the application delivers curated recommendations to help users advance their professional development journey.

## Features

- **Personalized Course Recommendations**: Get tailored course suggestions based on your skills and learning objectives
- **Video Content Discovery**: Find relevant educational videos aligned with your interests
- **Job Opening Alerts**: Receive job recommendations that match your profile and career aspirations
- **User Profile Management**: Create and manage your personal profile with skills, interests, and preferences
- **Interactive Dashboard**: View all recommendations in a clean, organized interface
- **Search and Filter**: Advanced filtering options to refine recommendations
- **Responsive Design**: Optimized for desktop and mobile devices

## Technologies Used

### Frontend
- **React**: Modern JavaScript library for building user interfaces
- **HTML5 & CSS3**: Markup and styling
- **JavaScript (ES6+)**: Core programming language
- **Responsive Design**: Mobile-first approach

### Backend
- **Flask**: Lightweight Python web framework
- **Python**: Server-side programming language
- **MongoDB**: NoSQL database for flexible data storage
- **RESTful APIs**: Clean API architecture for frontend-backend communication

### Development Tools
- **Node.js & npm**: Frontend package management
- **pip**: Python package management
- **Git**: Version control

## Project Structure

```
path-craft/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend/
│   ├── app.py
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── requirements.txt
│   └── README.md
├── README.md
└── .gitignore
```

## Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Clone the Repository
```bash
git clone https://github.com/yourusername/path-craft.git
cd path-craft
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

4. Install Python dependencies:
```bash
pip install -r requirements.txt
```

5. Set up environment variables:
Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/pathcraft
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Create environment variables:
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application Locally

### Start MongoDB
Ensure MongoDB is running on your local machine:
```bash
# If using local MongoDB installation
mongod
```

### Start the Backend Server
1. Navigate to backend directory and activate virtual environment:
```bash
cd backend
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate     # On Windows
```

2. Run the Flask application:
```bash
python app.py
```
The backend server will start on `http://localhost:5000`

### Start the Frontend Server
1. In a new terminal, navigate to frontend directory:
```bash
cd frontend
```

2. Start the React development server:
```bash
npm start
```
The frontend application will start on `http://localhost:3000`

### Access the Application
Open your web browser and navigate to `http://localhost:3000` to use Path Craft.

## API Endpoints

### Base URL: `http://localhost:5000`

- `GET /api/recommendations/courses` - Get course recommendations
- `GET /api/recommendations/videos` - Get video recommendations  
- `GET /api/recommendations/jobs` - Get job recommendations
- `POST /api/user/profile` - Create/update user profile
- `GET /api/user/profile/:id` - Get user profile
- `POST /api/user/preferences` - Update user preferences

## Deployment

### Deploying to Render

#### Backend Deployment
1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure the service:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Environment**: Python 3
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `FLASK_ENV`: `production`
   - `SECRET_KEY`: A secure secret key
6. Deploy the service

#### Frontend Deployment
1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Configure the build:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
4. Add environment variables:
   - `REACT_APP_API_URL`: Your deployed backend URL
5. Deploy the site

#### Database Setup
1. Create a MongoDB Atlas cluster
2. Configure network access and database user
3. Update the `MONGODB_URI` environment variable in your backend deployment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository or contact the development team.

---

**Path Craft** - Crafting your learning and career path, one recommendation at a time.
