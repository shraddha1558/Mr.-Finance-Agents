# AI Finance Agent - FastAPI Backend (LangChain Version)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# LangChain imports
from langchain.agents import initialize_agent, Tool
from langchain_groq import ChatGroq
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_community.tools.yahoo_finance import (
    YahooFinanceNews,
    YahooFinanceStockPrice,
    YahooFinanceAnalystRecommendations,
    YahooFinanceFundamentals,
)

# -----------------------------
# Load environment variables
# -----------------------------
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found. Please set it in .env file.")

# -----------------------------
# Initialize FastAPI app
# -----------------------------
app = FastAPI(title="AI Finance Agent", version="1.0.0")

# Add CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request/Response models
# -----------------------------
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# -----------------------------
# LangChain LLM and Tools
# -----------------------------
# Groq LLM
llm = ChatGroq(model="llama-3.3-70b-versatile", groq_api_key=GROQ_API_KEY)

# Tools
web_search = DuckDuckGoSearchRun()
stock_price = YahooFinanceStockPrice()
analyst_recs = YahooFinanceAnalystRecommendations()
fundamentals = YahooFinanceFundamentals()
news = YahooFinanceNews()

tools = [
    Tool(
        name="Web Search",
        func=web_search.run,
        description="Search the web for general/financial information. Always include sources."
    ),
    Tool(
        name="Stock Price",
        func=stock_price.run,
        description="Get the latest stock price of a company."
    ),
    Tool(
        name="Analyst Recommendations",
        func=analyst_recs.run,
        description="Get analyst recommendations for a given stock."
    ),
    Tool(
        name="Stock Fundamentals",
        func=fundamentals.run,
        description="Get fundamental data for a stock (e.g., P/E ratio, market cap)."
    ),
    Tool(
        name="Finance News",
        func=news.run,
        description="Fetch recent company or stock-related news articles."
    ),
]

# -----------------------------
# Multi-agent setup with LangChain
# -----------------------------
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent="zero-shot-react-description",  # lets LLM decide tool usage
    verbose=True
)

# -----------------------------
# Routes
# -----------------------------
@app.get("/")
async def root():
    return {"message": "AI Finance Agent API (LangChain) is running"}

@app.post("/chat", response_model=ChatResponse)
async def chat_with_agent(request: ChatRequest):
    try:
        response = agent.run(request.message)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent processing error: {str(e)}")

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "tools": ["Web Search", "Stock Price", "Analyst Recommendations", "Stock Fundamentals", "Finance News"],
        "model": "llama-3.3-70b-versatile"
    }

# -----------------------------
# Run server
# -----------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
