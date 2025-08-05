import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  ArrowLeft, 
  Plus, 
  X, 
  Mic, 
  Save,
  Smile,
  Meh,
  Frown
} from "lucide-react";
import { Link } from "react-router-dom";

const AddThought = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [emotion, setEmotion] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const getEmotionColor = (emotionType: 'happy' | 'neutral' | 'sad') => {
    switch (emotionType) {
      case 'happy': return 'text-memory-warm';
      case 'neutral': return 'text-memory-calm';
      case 'sad': return 'text-memory-nostalgic';
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
                <span className="text-lg font-display font-semibold text-primary">MemoryNet</span>
              </div>
            </div>
            <Button className="px-6">
              <Save className="h-4 w-4 mr-2" />
              Save to Brain
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-primary mb-2">
            Capture Your Thought
          </h1>
          <p className="text-lg text-muted-foreground">
            Write freely. You can always organize later.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Writing Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-memory border-0 gradient-memory">
              <CardContent className="p-6">
                <Input
                  placeholder="Give this memory a name... (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-4 text-lg font-medium border-0 bg-transparent placeholder:text-muted-foreground/60"
                />
                <Textarea
                  placeholder="Write freely. What's on your mind? What did you learn? How do you feel? Let your thoughts flow..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[400px] text-base leading-relaxed border-0 bg-transparent resize-none placeholder:text-muted-foreground/60"
                />
              </CardContent>
            </Card>

            {/* Voice Recording Option */}
            <Card className="shadow-gentle border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mic className={`h-5 w-5 ${isRecording ? 'text-red-500' : 'text-muted-foreground'}`} />
                    <span className="font-medium">
                      {isRecording ? 'Recording...' : 'Prefer to speak?'}
                    </span>
                  </div>
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </Button>
                </div>
                {isRecording && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Tap again to stop. Your voice will be transcribed automatically.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emotion Selector */}
            <Card className="shadow-gentle border border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smile className="h-5 w-5" />
                  How are you feeling?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={emotion === 'happy' ? 'default' : 'outline'}
                    className="h-16 flex-col gap-2"
                    onClick={() => setEmotion(emotion === 'happy' ? null : 'happy')}
                  >
                    <Smile className={`h-6 w-6 ${emotion === 'happy' ? 'text-primary-foreground' : 'text-memory-warm'}`} />
                    <span className="text-xs">Happy</span>
                  </Button>
                  <Button
                    variant={emotion === 'neutral' ? 'default' : 'outline'}
                    className="h-16 flex-col gap-2"
                    onClick={() => setEmotion(emotion === 'neutral' ? null : 'neutral')}
                  >
                    <Meh className={`h-6 w-6 ${emotion === 'neutral' ? 'text-primary-foreground' : 'text-memory-calm'}`} />
                    <span className="text-xs">Calm</span>
                  </Button>
                  <Button
                    variant={emotion === 'sad' ? 'default' : 'outline'}
                    className="h-16 flex-col gap-2"
                    onClick={() => setEmotion(emotion === 'sad' ? null : 'sad')}
                  >
                    <Frown className={`h-6 w-6 ${emotion === 'sad' ? 'text-primary-foreground' : 'text-memory-nostalgic'}`} />
                    <span className="text-xs">Reflective</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="shadow-gentle border border-border">
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="flex items-center gap-1 px-3 py-1"
                      >
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Suggested tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {['wisdom', 'family', 'growth', 'fear', 'love', 'work'].map((suggestedTag) => (
                      <Badge 
                        key={suggestedTag}
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => {
                          if (!tags.includes(suggestedTag)) {
                            setTags([...tags, suggestedTag]);
                          }
                        }}
                      >
                        {suggestedTag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Card className="shadow-gentle border border-border bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6">
                <Button className="w-full py-4 text-lg" size="lg">
                  <Save className="h-5 w-5 mr-2" />
                  Save to Brain
                </Button>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Your thoughts will be safely stored and ready for reflection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddThought;