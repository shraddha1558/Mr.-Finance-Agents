# AI Finance Agent Backend

## Setup Instructions

### 1. Install Dependencies
```bash
pip install fastapi uvicorn python-multipart
pip install phidata
pip install groq
pip install yfinance duckduckgo-search
```

### 2. Environment Setup
Create a `.env` file in the backend directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Run the FastAPI Server
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **Main API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

### 4. API Endpoints

#### POST /chat
Send a message to the multi-agent system
```json
{
  "message": "Analyze NVDA stock with latest news"
}
```

Response:
```json
{
  "response": "Multi-agent analysis results..."
}
```

#### GET /health
Check if all agents are working
```json
{
  "status": "healthy",
  "agents": ["web_search_agent", "finance_agent", "multi_ai_agent"]
}
```

### 5. Agent Configuration

The backend includes your exact multi-agent setup:

- **Web Search Agent**: Uses DuckDuckGo for real-time market research
- **Finance Agent**: Uses YFinanceTools for stock data, fundamentals, news
- **Multi-Agent Coordinator**: Combines both agents for comprehensive analysis

### 6. Frontend Integration

The React frontend automatically calls the FastAPI backend at `http://localhost:8000/chat`

If the backend is not running, it shows a demo mode with setup instructions.

### 7. Production Deployment

For production, update CORS origins in `main.py` to match your frontend domain.