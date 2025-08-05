import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  Mic, 
  Square, 
  Play,
  User,
  ArrowLeft
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const navigate = useNavigate();

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setHasRecording(true);
      // Mock transcription
      setTranscription("I just had the most profound realization about fear. It's not something to overcome, but something to understand. My father used to say that courage isn't the absence of fear, but acting despite it...");
    } else {
      // Start recording
      setIsRecording(true);
      setHasRecording(false);
      setTranscription("");
    }
  };

  const saveAsThought = () => {
    // In a real app, this would save to the database
    navigate("/timeline");
  };

  const discard = () => {
    setIsRecording(false);
    setHasRecording(false);
    setTranscription("");
  };

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
                  Back
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary" />
                <span className="text-2xl font-display font-semibold text-primary">MemoryNet</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-memory-warm to-memory-calm rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-primary mb-4">
            Record Voice Memory
          </h1>
          <p className="text-xl text-muted-foreground">
            Speak your thoughts naturally. We'll capture every word.
          </p>
        </div>

        {/* Recording Interface */}
        <Card className="shadow-memory border-0 gradient-memory mb-8">
          <CardContent className="p-12 text-center">
            {!hasRecording ? (
              <>
                {/* Microphone */}
                <div className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-8 transition-all duration-300 ${
                  isRecording 
                    ? "bg-red-500 shadow-lg shadow-red-500/50 animate-pulse" 
                    : "bg-memory-warm hover:bg-memory-warm/90"
                }`}>
                  <Mic className="h-16 w-16 text-white" />
                </div>

                {/* Status Text */}
                <h2 className="text-2xl font-display font-semibold mb-4">
                  {isRecording ? "Recording..." : "Ready to Record"}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {isRecording ? "Tap again to stop" : "Tap the microphone to start recording"}
                </p>

                {/* Record Button */}
                <Button 
                  size="lg" 
                  onClick={toggleRecording}
                  className={isRecording ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  {isRecording ? (
                    <>
                      <Square className="h-5 w-5 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="h-5 w-5 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                {/* Recording Complete */}
                <div className="mx-auto w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-8">
                  <Play className="h-16 w-16 text-white" />
                </div>
                <h2 className="text-2xl font-display font-semibold mb-4">
                  Recording Complete
                </h2>
                <p className="text-muted-foreground mb-8">
                  Here's what we heard. You can edit it before saving.
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Transcription */}
        {hasRecording && (
          <Card className="shadow-gentle border border-border mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Transcription</h3>
              <Textarea 
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                className="min-h-[200px] text-base leading-relaxed"
                placeholder="Your transcribed thoughts will appear here..."
              />
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {hasRecording && (
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={discard}>
              Discard
            </Button>
            <Button onClick={toggleRecording}>
              Record Again
            </Button>
            <Button onClick={saveAsThought} className="bg-primary">
              Save as Thought
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default VoiceRecorder;