# Chat AI with Django and React

This project is a web application that allows users to interact with an Artificial Intelligence model through a chat interface. The application consists of:

- **Backend** developed with **Django** to handle server logic and the local AI API.
- **Frontend** developed with **React** for a modern and interactive user experience.
- **AI API** running locally to respond to chat queries.

---

## Main Features

- **User-friendly interface** to interact with the AI model.
- **Local connection** to the AI API for enhanced control and privacy.
- **Modular design** separating the backend (Django) from the frontend (React).

---

## Prerequisites

Make sure you have the following installed on your system:

- **Python** (version 3.9 or higher)
- **Node.js** (version 16 or higher)
- **npm** or **yarn** (Node.js package manager)
- **Virtualenv** (optional but recommended for isolated Python environments)
- **Docker** (optional, for AI API containers)

---

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Daneil7353/chat_ia.git
cd chat_ia
```

### 2. Backend Setup (Django)

#### a) Create and activate a virtual environment
```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

#### b) Install dependencies
```bash
pip install -r requirements.txt
```

#### c) Configure environment variables
Create a `.env` file in the Django project root and define the following variables (example):
```env
SECRET_KEY=your_secret_key_here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

#### d) Migrate the database
```bash
python manage.py migrate
```

#### e) Run the server
```bash
python manage.py runserver
```

The backend will be available at `http://127.0.0.1:8000/`.

---

### 3. Frontend Setup (React)

#### a) Navigate to the frontend directory
```bash
cd frontend
```

#### b) Install dependencies
```bash
npm install   # Or use yarn install if you prefer Yarn
```

#### c) Configure environment variables
Create a `.env` file in the `frontend` directory and define the following variables (example):
```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

#### d) Run the React application
```bash
npm start
```

The frontend will be available at `http://localhost:3000/`.

---

### 4. AI API Setup

#### a) Local setup
If running an AI model locally, ensure it is active and listening on a specific port. For example:

- AI API running at `http://127.0.0.1:5000`

#### b) Configure Django to connect to the API
In the Django configuration file, adjust the AI API URL:
```python
AI_API_URL = "http://127.0.0.1:5000"
```

---

## Project Structure
```
.
├── backend               # Backend code with Django
│   ├── manage.py         # Main Django file
│   ├── app/              # Main application
│   └── ...
├── frontend              # Frontend code with React
│   ├── src/              # React source code
│   └── ...
├── ai_api                # Optional folder for the local AI model
└── README.md             # Project documentation
```

---

## Next Steps

- **Implement user authentication** (optional).
- **Optimize the AI model** for faster response times.
- **Make a better looking page** for more enjoyable using.

---

## License

This project is licensed under the [MIT License](LICENSE).
