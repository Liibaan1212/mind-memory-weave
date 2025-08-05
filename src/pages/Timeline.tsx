import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  ArrowLeft, 
  Search, 
  Calendar,
  Clock,
  Filter,
  Heart,
  Smile,
  Meh,
  Frown
} from "lucide-react";
import { Link } from "react-router-dom";

const Timeline = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Mock memories data
  const memories = [
    {
      id: 1,
      title: "Lessons from Father",
      content: "I remembered the way my father used to speak about fear. He would say that courage isn't the absence of fear, but feeling fear and choosing to act anyway. This wisdom has guided me through many difficult moments in my life.",
      date: "2025-01-15",
      time: "14:30",
      emotion: "thoughtful",
      tags: ["family", "wisdom", "courage"],
      type: "reflection"
    },
    {
      id: 2,
      title: "Learning to Let Go",
      content: "Today I learned something profound about letting go. It's not about forgetting or dismissing what happened, but about choosing not to carry the weight of it anymore. Sometimes the bravest thing you can do is put down what you've been carrying.",
      date: "2025-01-14",
      time: "09:15",
      emotion: "peaceful",
      tags: ["growth", "mindfulness", "healing"],
      type: "insight"
    },
    {
      id: 3,
      title: "Parenting Philosophy",
      content: "My thoughts on raising children with courage and kindness. I want my kids to know that they are loved unconditionally, but also that they have responsibilities to themselves and others. The balance between support and challenge is delicate but crucial.",
      date: "2025-01-12",
      time: "20:45",
      emotion: "loving",
      tags: ["parenting", "values", "love"],
      type: "philosophy"
    },
    {
      id: 4,
      title: "First Day Fears",
      content: "I remembered how scared I was on my first day of school. My mom packed my lunch with a little note that said 'You are braver than you believe.' I kept that note for years. It reminds me that sometimes the smallest gestures have the biggest impact.",
      date: "2025-01-10",
      time: "16:20",
      emotion: "nostalgic",
      tags: ["childhood", "anxiety", "mother", "courage"],
      type: "memory"
    },
    {
      id: 5,
      title: "Work and Purpose",
      content: "Reflecting on what work means to me. It's not just about earning money or achieving status. Real work is about contributing something meaningful to the world, even if it's small. Every day I try to ask myself: did I make something better today?",
      date: "2025-01-08",
      time: "11:30",
      emotion: "motivated",
      tags: ["work", "purpose", "meaning"],
      type: "reflection"
    }
  ];

  const allTags = Array.from(new Set(memories.flatMap(memory => memory.tags)));

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'thoughtful':
      case 'motivated':
        return <Meh className="h-4 w-4 text-memory-calm" />;
      case 'peaceful':
      case 'loving':
        return <Smile className="h-4 w-4 text-memory-warm" />;
      case 'nostalgic':
        return <Frown className="h-4 w-4 text-memory-nostalgic" />;
      default:
        return <Heart className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reflection': return 'bg-memory-calm/20 text-memory-calm border-memory-calm/30';
      case 'insight': return 'bg-memory-warm/20 text-memory-warm border-memory-warm/30';
      case 'philosophy': return 'bg-memory-nostalgic/20 text-memory-nostalgic border-memory-nostalgic/30';
      case 'memory': return 'bg-accent/20 text-accent-foreground border-accent/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = searchQuery === "" || 
      memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => memory.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const groupByDate = (memories: typeof filteredMemories) => {
    const groups = memories.reduce((acc, memory) => {
      const date = new Date(memory.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(memory);
      return acc;
    }, {} as Record<string, typeof memories>);

    return Object.entries(groups).sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime());
  };

  const groupedMemories = groupByDate(filteredMemories);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
                <span className="text-lg font-display font-semibold text-primary">MemoryNet</span>
              </div>
            </div>
            <Button asChild>
              <Link to="/add-thought">Add Memory</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-gentle border border-border mb-6">
              <CardContent className="p-6">
                <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Your Brain
                </h2>
                <Input
                  placeholder="Search memories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4"
                />
                
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter by Tags
                </h3>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer mr-2 mb-2"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTags([])}
                    className="mt-3 w-full"
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-4xl font-display font-bold text-primary mb-2">
                Memory Timeline
              </h1>
              <p className="text-lg text-muted-foreground">
                Your journey of thoughts, feelings, and insights over time.
              </p>
            </div>

            {groupedMemories.length === 0 ? (
              <Card className="shadow-gentle border border-border">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold mb-2">No memories found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters, or add your first memory.
                  </p>
                  <Button asChild>
                    <Link to="/add-thought">Add Your First Memory</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {groupedMemories.map(([date, dayMemories]) => (
                  <div key={date}>
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-display font-semibold text-primary">{date}</h2>
                    </div>
                    <div className="space-y-4 ml-8">
                      {dayMemories.map((memory) => (
                        <Card key={memory.id} className="shadow-memory border-0 gradient-memory hover:scale-[1.02] transition-transform cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                {getEmotionIcon(memory.emotion)}
                                <h3 className="text-lg font-display font-semibold">{memory.title}</h3>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {memory.time}
                              </div>
                            </div>
                            
                            <p className="text-foreground leading-relaxed mb-4">
                              {memory.content}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {memory.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <Badge className={getTypeColor(memory.type)}>
                                {memory.type}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timeline;