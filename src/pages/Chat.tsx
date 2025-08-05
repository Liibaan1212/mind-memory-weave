import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  ArrowLeft, 
  Send, 
  Lightbulb,
  User,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'brain';
  timestamp: Date;
  sources?: string[];
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your digital brain. I've learned from all your memories, thoughts, and experiences. Ask me anything you've ever felt, known, or written about.",
      sender: 'brain',
      timestamp: new Date(),
    }
  ]);

  const suggestedQuestions = [
    "What do I believe about fear?",
    "What advice would I give to my child?",
    "What was my biggest lesson in 2024?",
    "How have my thoughts on family changed?",
    "What makes me feel most alive?",
    "What wisdom would I share with my younger self?"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    // Simulate AI response
    const brainResponse: Message = {
      id: messages.length + 2,
      content: generateResponse(message),
      sender: 'brain',
      timestamp: new Date(),
      sources: ["Memory: January 2025 - 'Lessons from Father'", "Reflection: January 2025 - 'Learning to Let Go'"]
    };

    setMessages(prev => [...prev, userMessage, brainResponse]);
    setMessage("");
  };

  const generateResponse = (question: string): string => {
    // Simple response generation based on question content
    if (question.toLowerCase().includes('fear')) {
      return "Based on your memories, you believe that courage isn't the absence of fear, but feeling fear and choosing to act anyway. This wisdom came from your father, who taught you that the bravest thing you can do is act despite your fears. You've applied this philosophy throughout your life, especially during difficult moments.";
    } else if (question.toLowerCase().includes('child') || question.toLowerCase().includes('parenting')) {
      return "Your philosophy on parenting centers around raising children with both courage and kindness. You believe in loving unconditionally while also teaching responsibility. You want your children to know they are supported, but also challenged to grow. The balance between support and challenge is something you think about deeply.";
    } else if (question.toLowerCase().includes('lesson') || question.toLowerCase().includes('learn')) {
      return "One of your most profound recent lessons has been about letting go. You've learned that it's not about forgetting or dismissing what happened, but about choosing not to carry the weight of it anymore. Sometimes the bravest thing you can do is put down what you've been carrying.";
    } else {
      return "I've been thinking about your question based on everything you've shared with me. Your thoughts often center around themes of courage, family, growth, and finding meaning in everyday moments. Would you like me to explore any of these areas more deeply?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-primary" />
                <span className="text-lg font-display font-semibold text-primary">Talk to Your Brain</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Your Digital Consciousness
          </h1>
          <p className="text-muted-foreground">
            Ask your brain anything you've ever felt, known, or written about
          </p>
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <Card className="shadow-gentle border border-border mb-6">
            <CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                Try asking about...
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 text-left justify-start whitespace-normal"
                    onClick={() => setMessage(question)}
                  >
                    "{question}"
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Messages */}
        <div className="space-y-6 mb-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'brain' && (
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="h-5 w-5 text-white" />
                </div>
              )}
              
              <Card className={`max-w-[70%] ${
                msg.sender === 'user' 
                  ? 'bg-primary text-primary-foreground shadow-memory' 
                  : 'shadow-gentle border border-border gradient-memory'
              }`}>
                <CardContent className="p-4">
                  <p className="leading-relaxed">{msg.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs opacity-70">
                      {formatTime(msg.timestamp)}
                    </span>
                    {msg.sources && (
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3 opacity-70" />
                        <span className="text-xs opacity-70">
                          {msg.sources.length} source{msg.sources.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                  {msg.sources && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="text-xs opacity-70 mb-1">Sources used:</p>
                      {msg.sources.map((source, index) => (
                        <p key={index} className="text-xs opacity-60">{source}</p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {msg.sender === 'user' && (
                <div className="w-10 h-10 bg-gradient-to-br from-memory-warm to-memory-calm rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-3">
            <Input
              placeholder="Ask your brain anything you've ever felt, known, or written..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-base py-3"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              size="lg"
              className="px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Your brain learns from every memory you save. The more you share, the wiser it becomes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;