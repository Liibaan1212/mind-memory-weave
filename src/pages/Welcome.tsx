import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, Clock, Users, Shield, Archive } from "lucide-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-2xl font-display font-semibold text-primary">MemoryNet</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/use-cases" className="text-muted-foreground hover:text-primary transition-colors">Use Cases</Link>
          <Link to="/legacy" className="text-muted-foreground hover:text-primary transition-colors">Legacy</Link>
          <Button variant="outline" size="sm">Login</Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero min-h-[90vh] flex items-center justify-center text-center px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-display font-bold text-primary-foreground mb-8 leading-tight">
              Your mind.<br />
              <span className="text-accent">Remembered forever.</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Train your second brain to remember your knowledge, stories, and emotions — even after you're gone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/dashboard">Start Building My Brain</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center mb-16 text-primary">
            Your Digital Soul
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-memory border-0 gradient-memory">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-memory-warm mx-auto mb-6" />
                <h3 className="text-xl font-display font-semibold mb-4">Emotional Memory</h3>
                <p className="text-muted-foreground">Capture not just what you think, but how you feel. Your emotions, preserved forever.</p>
              </CardContent>
            </Card>
            <Card className="shadow-memory border-0 gradient-memory">
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-memory-calm mx-auto mb-6" />
                <h3 className="text-xl font-display font-semibold mb-4">Timeless Wisdom</h3>
                <p className="text-muted-foreground">Your thoughts evolve over time. Track your growth and revisit your past insights.</p>
              </CardContent>
            </Card>
            <Card className="shadow-memory border-0 gradient-memory">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-memory-nostalgic mx-auto mb-6" />
                <h3 className="text-xl font-display font-semibold mb-4">Living Legacy</h3>
                <p className="text-muted-foreground">Share your wisdom with future generations. Your mind lives on through those you love.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center mb-16 text-primary">
            Three Simple Steps
          </h2>
          <div className="space-y-12">
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">1</div>
              <div>
                <h3 className="text-2xl font-display font-semibold mb-2">Capture Your Thoughts</h3>
                <p className="text-muted-foreground text-lg">Write, speak, or upload your memories, insights, and emotions. No structure required — just be yourself.</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">2</div>
              <div>
                <h3 className="text-2xl font-display font-semibold mb-2">Let AI Learn You</h3>
                <p className="text-muted-foreground text-lg">Our AI understands your voice, your values, and your unique perspective. It becomes your digital twin.</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">3</div>
              <div>
                <h3 className="text-2xl font-display font-semibold mb-2">Talk to Your Mind</h3>
                <p className="text-muted-foreground text-lg">Ask questions, seek advice, or just reflect. Your digital brain remembers everything and responds in your voice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold mb-8 text-primary">
            Start Your Digital Legacy Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Your memories matter. Your wisdom deserves to live on. Begin building your second brain now.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/dashboard">Begin Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t bg-secondary/30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-display font-semibold text-primary">MemoryNet</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;