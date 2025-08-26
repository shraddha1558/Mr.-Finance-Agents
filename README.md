**Mr Finance Multi Agent** is an end-to-end AI-powered project that integrates a **FastAPI backend** with a **React + Vite frontend**.  
It leverages **Groq API** (LLM inference engine) through the **phi framework** to provide intelligent insights and responses.

The project demonstrates how to:

- Build and expose APIs with **FastAPI**
- Connect to an **LLM provider (Groq)** using `phi` agents
- Create an interactive **frontend** using React, Tailwind, and ShadCN UI components
- Run the backend and frontend together for a smooth developer experience

---

## Tech Stack

### Backend

- **Python 3.11+**.

- **FastAPI** (ASGI framework)
- **Uvicorn** (ASGI server)
- **phi** (agent framework to interact with models & tools)
- **Groq API** (for LLM inference)

### Frontend

- **React 18** (with Vite for blazing-fast dev)
- **TypeScript**
- **TailwindCSS**
- **ShadCN/UI** (for accessible UI components)
- **Framer Motion** (animations)

---

## Project Structure

```
mr-finance-multi-agent/
│
├── backend/
│   ├── main.py                 # FastAPI entrypoint
│   ├── requirements.txt        # Python dependencies
│
├── frontend/
│   ├── src/                    # React source code
│   ├── package.json           # Node dependencies
│   ├── vite.config.ts         # Vite configuration
│
├── README.md                  # Documentation
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mr-finance-multi-agent.git
cd mr-finance-multi-agent
```

### 2. Backend Setup (FastAPI + Groq)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows

# Install dependencies
pip install -r requirements.txt
```

Run the backend:

```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will start at:
http://127.0.0.1:8000

API docs available at:
http://127.0.0.1:8000/docs

### 3. Frontend Setup (React + Vite + ShadCN)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start at:
http://localhost:8080

---

## Connecting Frontend & Backend

- The frontend makes requests to the FastAPI backend at `http://127.0.0.1:8000`
- Backend uses the Groq API (via phi agents) to process and return AI responses
- You can customize prompts, add tools (like search or yfinance), and extend functionality

---

## Features

FastAPI backend with auto-generated OpenAPI docs  
Groq API integration using phi.agent  
React frontend with modern UI (ShadCN + Tailwind)  
Hot reload for both backend and frontend  
Scalable architecture for adding more tools and agents

---

## Example Usage

1. Start backend and frontend
2. Open the React app in the browser (http://localhost:8080)
3. Enter your query → frontend sends request → FastAPI backend processes with Groq → result returned to UI

---

## Future Improvements

- Add authentication layer (JWT or OAuth2)
- Deploy backend on FastAPI + Uvicorn + Nginx
- Deploy frontend on Vercel / Netlify
- Extend Groq agent with custom tools (web search, financial analysis, etc.)

---

## Contributing

Contributions are welcome! Feel free to open an issue or PR.

---

## License

MIT License © 2025 [Your Name]

**Local development:**

```bash
npm install
npm run dev
```
