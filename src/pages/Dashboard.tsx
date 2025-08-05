import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  Plus, 
  Mic, 
  Upload, 
  MessageCircle, 
  FileText, 
  Clock,
  Heart,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock recent memories data
  const recentMemories = [
    {
      id: 1,
      preview: "I remembered the way my father used to speak about fear...",
      date: "2 hours ago",
      emotion: "🤔",
      tags: ["family", "wisdom"]
    },
    {
      id: 2,
      preview: "Today I learned something profound about letting go...",
      date: "1 day ago", 
      emotion: "😌",
      tags: ["growth", "mindfulness"]
    },
    {
      id: 3,
      preview: "My thoughts on raising children with courage and kindness...",
      date: "3 days ago",
      emotion: "❤️",
      tags: ["parenting", "values"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-display font-semibold text-primary">MemoryNet</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/timeline">Timeline</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/chat">Chat</Link>
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-memory-warm to-memory-calm rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Message */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            Welcome back, Alex.
          </h1>
          <p className="text-xl text-muted-foreground">
            Your memory net is evolving. <span className="text-accent font-medium">23 thoughts captured</span> so far.
          </p>
        </div>

        {/* Primary Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="shadow-memory border-0 gradient-memory group hover:scale-105 transition-transform cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                <Plus className="h-8 w-8 text-primary-foreground" />
              </div>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardTitle className="text-lg mb-2">Add New Thought</CardTitle>
              <p className="text-sm text-muted-foreground">Write your thoughts, memories, and insights</p>
            </CardContent>
          </Card>

          <Card className="shadow-memory border-0 gradient-memory group hover:scale-105 transition-transform cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-memory-warm rounded-full flex items-center justify-center group-hover:bg-memory-warm/90 transition-colors">
                <Mic className="h-8 w-8 text-white" />
              </div>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardTitle className="text-lg mb-2">Record Voice Memory</CardTitle>
              <p className="text-sm text-muted-foreground">Speak your thoughts naturally</p>
            </CardContent>
          </Card>

          <Card className="shadow-memory border-0 gradient-memory group hover:scale-105 transition-transform cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-memory-calm rounded-full flex items-center justify-center group-hover:bg-memory-calm/90 transition-colors">
                <Upload className="h-8 w-8 text-white" />
              </div>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardTitle className="text-lg mb-2">Upload Journal</CardTitle>
              <p className="text-sm text-muted-foreground">Import existing writings and notes</p>
            </CardContent>
          </Card>

          <Card className="shadow-memory border-0 gradient-memory group hover:scale-105 transition-transform cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-memory-nostalgic rounded-full flex items-center justify-center group-hover:bg-memory-nostalgic/90 transition-colors">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardTitle className="text-lg mb-2">Talk to My Brain</CardTitle>
              <p className="text-sm text-muted-foreground">Ask questions and seek wisdom</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-display font-semibold text-primary mb-6">Recent Memories</h2>
            <div className="space-y-4">
              {recentMemories.map((memory) => (
                <Card key={memory.id} className="shadow-gentle border border-border hover:shadow-memory transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{memory.emotion}</div>
                      <div className="flex-1">
                        <p className="text-foreground mb-2 leading-relaxed">"{memory.preview}"</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {memory.date}
                          </div>
                          <div className="flex gap-2">
                            {memory.tags.map((tag) => (
                              <span key={tag} className="bg-secondary px-2 py-1 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to="/timeline">View All Memories</Link>
              </Button>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div>
            <h2 className="text-2xl font-display font-semibold text-primary mb-6">Your Mind</h2>
            <div className="space-y-4">
              <Card className="shadow-gentle border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-memory-warm" />
                    <span className="font-medium">Total Thoughts</span>
                  </div>
                  <p className="text-3xl font-display font-bold text-primary">23</p>
                </CardContent>
              </Card>

              <Card className="shadow-gentle border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="h-5 w-5 text-memory-calm" />
                    <span className="font-medium">Emotions Captured</span>
                  </div>
                  <p className="text-3xl font-display font-bold text-primary">12</p>
                </CardContent>
              </Card>

              <Card className="shadow-gentle border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Brain className="h-5 w-5 text-memory-nostalgic" />
                    <span className="font-medium">Days Active</span>
                  </div>
                  <p className="text-3xl font-display font-bold text-primary">7</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;