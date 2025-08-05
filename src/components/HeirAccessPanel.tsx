import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Flame,
  MessageCircle,
  Calendar,
  Download,
  X,
  Heart,
  Quote
} from "lucide-react";

interface HeirAccessPanelProps {
  onClose: () => void;
}

const HeirAccessPanel = ({ onClose }: HeirAccessPanelProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-xl shadow-memory">
        {/* Memorial Header */}
        <div className="gradient-hero text-white p-8 rounded-t-xl relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-full">
              <Flame className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">In Memory of Alex Thompson</h1>
              <p className="text-white/80">Forever in our hearts • 1985 - 2024</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-start gap-3">
              <Quote className="h-5 w-5 text-white/60 mt-1 flex-shrink-0" />
              <p className="text-lg font-display italic text-white/90">
                "Remember me not with tears, but with the stories we shared and the love that remains eternal."
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          <Tabs defaultValue="talk" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="talk" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Talk to Their Mind
              </TabsTrigger>
              <TabsTrigger value="memories" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Explore Memories
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Legacy
              </TabsTrigger>
            </TabsList>

            {/* Talk to Their Mind Tab */}
            <TabsContent value="talk" className="space-y-6">
              <Card className="shadow-gentle border border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-display">Conversation with Alex's Digital Mind</CardTitle>
                  <p className="text-muted-foreground">
                    Ask questions and receive responses based on Alex's memories, thoughts, and personality.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {/* Sample conversation */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">You</p>
                        <div className="bg-secondary p-3 rounded-lg">
                          <p>What advice would you give me about raising children?</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-memory-warm to-memory-calm rounded-full flex items-center justify-center">
                        <Flame className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">MemoryNet AI (Alex)</p>
                        <div className="bg-card border border-border p-3 rounded-lg">
                          <p className="mb-2">
                            Listen more than you speak, and love more than you lecture. Children don't need perfect parents; 
                            they need present ones. I learned that the small moments—reading bedtime stories, 
                            answering their endless questions—these are what they'll remember.
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Sources: Memory "Parenting Reflections" (March 2023), "Bedtime Stories" (July 2022)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Input placeholder="Ask Alex anything..." className="flex-1" />
                    <Button>Send</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Explore Memories Tab */}
            <TabsContent value="memories" className="space-y-6">
              <Card className="shadow-gentle border border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-display">Memory Collection</CardTitle>
                  <p className="text-muted-foreground">
                    Browse through Alex's thoughts, stories, and life experiences organized by themes.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {/* Memory Category: Childhood */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-memory-warm/20 text-memory-warm border-memory-warm/30">
                          Childhood
                        </Badge>
                        <span className="text-sm text-muted-foreground">12 memories</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-card border border-border p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Summer at Grandma's House</h4>
                          <p className="text-sm text-muted-foreground mb-2">July 15, 2023</p>
                          <p className="text-sm">
                            I can still smell the lavender in her garden and taste her homemade apple pie. 
                            Those summers taught me that love lives in the smallest gestures...
                          </p>
                        </div>
                        <div className="bg-card border border-border p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Learning to Ride a Bike</h4>
                          <p className="text-sm text-muted-foreground mb-2">March 3, 2023</p>
                          <p className="text-sm">
                            Dad's hands on the back of the seat, his voice saying "I've got you." 
                            The moment I realized he'd let go and I was flying free...
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Memory Category: Philosophy */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-memory-calm/20 text-memory-calm border-memory-calm/30">
                          Philosophy
                        </Badge>
                        <span className="text-sm text-muted-foreground">8 memories</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-card border border-border p-4 rounded-lg">
                          <h4 className="font-medium mb-2">On the Nature of Time</h4>
                          <p className="text-sm text-muted-foreground mb-2">December 1, 2023</p>
                          <p className="text-sm">
                            Time isn't a river flowing forward—it's an ocean where all moments exist simultaneously. 
                            We just choose which waves to ride...
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Memory Category: Parenting */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-memory-nostalgic/20 text-memory-nostalgic border-memory-nostalgic/30">
                          Parenting
                        </Badge>
                        <span className="text-sm text-muted-foreground">15 memories</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-card border border-border p-4 rounded-lg">
                          <h4 className="font-medium mb-2">The Day You Were Born</h4>
                          <p className="text-sm text-muted-foreground mb-2">August 10, 2022</p>
                          <p className="text-sm">
                            Holding you for the first time, I understood what people meant by "love at first sight." 
                            Everything before that moment was just preparation for loving you...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Export Legacy Tab */}
            <TabsContent value="export" className="space-y-6">
              <Card className="shadow-gentle border border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-display">Preserve Alex's Legacy</CardTitle>
                  <p className="text-muted-foreground">
                    Download and preserve Alex's digital memories for future generations.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Complete Memory Archive</h4>
                        <p className="text-sm text-muted-foreground">All thoughts, stories, and reflections in multiple formats</p>
                      </div>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Archive
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Voice Recordings</h4>
                        <p className="text-sm text-muted-foreground">Original audio memories and voice notes</p>
                      </div>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Audio
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Memorial Book (PDF)</h4>
                        <p className="text-sm text-muted-foreground">Beautifully formatted collection of memories</p>
                      </div>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Generate Book
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">AI Training Data</h4>
                        <p className="text-sm text-muted-foreground">Data to recreate Alex's digital mind elsewhere</p>
                      </div>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Sharing Instructions</h4>
                    <p className="text-sm text-muted-foreground">
                      Alex left these instructions for preserving their memory: "Share my stories with those who need them. 
                      Let my thoughts comfort others walking similar paths. My memory is a gift meant to be given."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HeirAccessPanel;