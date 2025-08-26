import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Activity, TrendingUp, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/finance-hero.jpg";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const FinanceAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your Multi-Agent AI Finance Assistant powered by Groq LLM. I have access to:\n\n🔍 **Web Search Agent** - Real-time market research\n📊 **Finance Agent** - Stock analysis, fundamentals, recommendations\n\nTry asking me: "Analyze NVDA stock" or "What\'s the latest news on Tesla?"',
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call FastAPI backend
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from agent');
      }

      const data = await response.json();
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      // Fallback demo response when FastAPI is not running
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `🤖 **Multi-Agent Analysis** for: "${currentInput}"\n\n📊 **Finance Agent Response:**\nI would analyze this using YFinance tools to get:\n• Real-time stock prices\n• Analyst recommendations  \n• Company fundamentals\n• Financial news\n\n🔍 **Web Search Agent Response:**\nI would search for:\n• Latest market sentiment\n• Recent news and events\n• Industry analysis\n\n*Note: Connect FastAPI backend at http://localhost:8000 to get real agent responses*\n\n**Backend Setup:**\n\`\`\`bash\npip install fastapi uvicorn phi-agent groq\nuvicorn main:app --reload\n\`\`\``,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      
      toast({
        title: "Demo Mode",
        description: "Start FastAPI backend for real agent responses",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative bg-gradient-primary/5 px-6 py-12 border-b">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
              Agentic AI Finance Assistant
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Multi-agent system with LangChain, Groq LLM, and FastAPI backend
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                <Bot className="w-3 h-3 mr-2" />
                Multi-Agent AI
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Activity className="w-3 h-3 mr-2" />
                Real-time Data
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-2" />
                Financial Analysis
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card className="h-[600px] flex flex-col shadow-elegant">
          <CardHeader className="border-b bg-gradient-primary/5">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              AI Finance Agent
              <Badge variant="outline" className="ml-auto">
                Powered by Groq LLM
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[450px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 animate-slide-up ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-gradient-primary text-white shadow-glow'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div className={`max-w-[85%] p-4 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 border'
                  }`}>
                    <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 animate-slide-up">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center shadow-glow">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted/50 border p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">Multi-agent system processing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input */}
            <div className="border-t p-4 bg-gradient-primary/5">
              <div className="flex gap-3">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about stocks, market analysis, company fundamentals, or financial news..."
                  className="flex-1 min-h-[50px] max-h-32 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-6 shadow-glow hover:animate-pulse-glow self-end"
                  size="lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setInputMessage("Analyze NVDA stock with latest news and fundamentals")}
                  disabled={isLoading}
                >
                  Analyze NVDA
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setInputMessage("What are the top market trends this week?")}
                  disabled={isLoading}
                >
                  Market Trends
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setInputMessage("Compare Apple and Microsoft financial performance")}
                  disabled={isLoading}
                >
                  Compare AAPL vs MSFT
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack Info */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>React.js Frontend</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-4 h-4" />
              <span>FastAPI Backend</span>
            </div>
            <div className="flex items-center gap-1">
              <Bot className="w-4 h-4" />
              <span>LangChain + Groq LLM</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>Multi-Agent System</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceAgent;