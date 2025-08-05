import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  User, 
  Download, 
  Users, 
  Shield,
  ChevronRight,
  Mail,
  Calendar,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
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
                <Link to="/dashboard">Dashboard</Link>
              </Button>
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
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-display font-bold text-primary mb-8">Profile / Settings</h1>

        {/* Profile Section */}
        <Card className="shadow-gentle border border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Alex Thompson" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="alex@memorynet.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthday">Birthday (Optional)</Label>
              <Input id="birthday" type="date" />
            </div>
          </CardContent>
        </Card>

        {/* Voice Preferences */}
        <Card className="shadow-gentle border border-border mb-8">
          <CardHeader>
            <CardTitle>Voice Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>AI Response Tone</Label>
                <p className="text-sm text-muted-foreground mb-2">How should your digital brain sound when responding?</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Thoughtful</Button>
                  <Button variant="outline" size="sm">Warm</Button>
                  <Button variant="outline" size="sm">Direct</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legacy Settings */}
        <Card className="shadow-gentle border border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Legacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Who can access your brain?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Add family members or loved ones who can interact with your digital brain if you're no longer able to.
              </p>
              <div className="space-y-2">
                <Input placeholder="Add heir email address" />
                <Button size="sm">Add Heir</Button>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Access Instructions</h4>
              <p className="text-sm text-muted-foreground">
                Write instructions for your heirs about how to use your digital brain.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="shadow-gentle border border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Export All Memories</h4>
                <p className="text-sm text-muted-foreground">Download all your thoughts as JSON or text files</p>
              </div>
              <Button variant="outline">Download</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Audio Backup</h4>
                <p className="text-sm text-muted-foreground">Download all voice recordings</p>
              </div>
              <Button variant="outline">Download Audio</Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="shadow-gentle border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all memories</p>
              </div>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;