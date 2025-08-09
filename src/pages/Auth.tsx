import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Brain, LogIn, UserPlus } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [mode, setMode] = useState<"signin" | "signup">(
    (params.get("mode") as "signin" | "signup") || "signin"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = mode === "signin" ? "Login | MemoryNet" : "Sign Up | MemoryNet";
  }, [mode]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        navigate("/dashboard", { replace: true });
      }
    })();
  }, [navigate]);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: "Welcome back!", description: "Signed in successfully." });
      navigate("/dashboard", { replace: true });
    } catch (e: any) {
      toast({ title: "Sign in failed", description: e.message, variant: "destructive" as any });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      const user = data.user;
      if (user) {
        await (supabase as any).from("profiles").insert({ id: user.id, full_name: fullName, email });
      }
      toast({ title: "Account created", description: "You're all set!" });
      navigate("/dashboard", { replace: true });
    } catch (e: any) {
      toast({ title: "Sign up failed", description: e.message, variant: "destructive" as any });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-lg font-display font-semibold text-primary">MemoryNet</span>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
        </div>
      </nav>

      <main className="max-w-md mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "signin"
              ? "Sign in to access your memories"
              : "Start building your digital brain"}
          </p>
        </div>

        <Card className="shadow-gentle border border-border">
          <CardHeader>
            <CardTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex gap-2">
              {mode === "signin" ? (
                <Button className="flex-1" onClick={handleSignIn} disabled={loading}>
                  <LogIn className="h-4 w-4 mr-2" /> Sign In
                </Button>
              ) : (
                <Button className="flex-1" onClick={handleSignUp} disabled={loading}>
                  <UserPlus className="h-4 w-4 mr-2" /> Create Account
                </Button>
              )}
            </div>
            <div className="text-center text-sm text-muted-foreground">
              {mode === "signin" ? (
                <button className="underline" onClick={() => setMode("signup")}>Need an account? Sign up</button>
              ) : (
                <button className="underline" onClick={() => setMode("signin")}>Have an account? Sign in</button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Auth;
