import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Brain, Link2, Quote, Calendar, ArrowLeft } from "lucide-react";

interface LegacyPortal {
  user_id: string;
  memorial_name: string;
  memorial_quote: string | null;
  is_active: boolean;
}

interface LegacyMemory {
  id: string;
  title: string;
  content: string | null;
  emotion: string | null;
  tags: string[] | null;
  created_at: string;
  type: string;
}

const Legacy = () => {
  const [params, setParams] = useSearchParams();
  const [token, setToken] = useState(params.get("token") || "");
  const [portal, setPortal] = useState<LegacyPortal | null>(null);
  const [memories, setMemories] = useState<LegacyMemory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Legacy Portal | MemoryNet";
  }, []);

  const loadPortal = async (_token: string) => {
    try {
      setLoading(true);
      const { data: portalData, error: portalError } = await (supabase as any)
        .rpc("get_legacy_portal", { _token });
      if (portalError) throw portalError;
      const portalRow = Array.isArray(portalData) ? portalData[0] : portalData;
      if (!portalRow) {
        toast({ title: "Invalid link", description: "Legacy link not found or inactive.", variant: "destructive" as any });
        setPortal(null);
        setMemories([]);
        return;
      }
      setPortal(portalRow as LegacyPortal);
      const { data: mems, error: memErr } = await (supabase as any)
        .rpc("get_legacy_memories", { _token });
      if (memErr) throw memErr;
      setMemories(mems as LegacyMemory[]);
    } catch (e: any) {
      toast({ title: "Failed to load legacy data", description: e.message, variant: "destructive" as any });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = params.get("token");
    if (t) {
      setToken(t);
      loadPortal(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grouped = useMemo(() => {
    const groups: Record<string, LegacyMemory[]> = {};
    for (const m of memories) {
      const dateLabel = new Date(m.created_at).toLocaleDateString(undefined, {
        year: "numeric", month: "long", day: "numeric",
      });
      groups[dateLabel] = groups[dateLabel] || [];
      groups[dateLabel].push(m);
    }
    return Object.entries(groups).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
  }, [memories]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-lg font-display font-semibold text-primary">MemoryNet</span>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Link>
          </Button>
          <h1 className="text-3xl font-display font-bold text-primary">Legacy Portal</h1>
        </div>

        <Card className="shadow-gentle border border-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-end">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground">Legacy Access Token</label>
                <Input placeholder="Enter token" value={token} onChange={(e) => setToken(e.target.value)} />
              </div>
              <Button onClick={() => { setParams({ token }); loadPortal(token); }} disabled={!token || loading}>
                <Link2 className="h-4 w-4 mr-2" /> Load
              </Button>
            </div>
          </CardContent>
        </Card>

        {portal && (
          <div className="space-y-6">
            <div className="gradient-memory p-6 rounded-lg shadow-memory">
              <div className="flex items-start gap-3">
                <Quote className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h2 className="text-2xl font-display font-semibold">In Memory of {portal.memorial_name}</h2>
                  {portal.memorial_quote && (
                    <p className="italic text-muted-foreground mt-2">"{portal.memorial_quote}"</p>
                  )}
                </div>
              </div>
            </div>

            {grouped.length === 0 ? (
              <Card className="shadow-gentle border border-border">
                <CardContent className="p-8 text-center text-muted-foreground">
                  No public legacy memories yet.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {grouped.map(([date, items]) => (
                  <div key={date}>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <h3 className="text-xl font-display font-semibold text-primary">{date}</h3>
                    </div>
                    <div className="space-y-3">
                      {items.map((m) => (
                        <Card key={m.id} className="shadow-gentle border border-border">
                          <CardContent className="p-5">
                            <h4 className="text-lg font-medium mb-2">{m.title}</h4>
                            {m.content && <p className="text-muted-foreground mb-3">{m.content}</p>}
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {(m.tags || []).map((t) => (
                                  <Badge key={t} variant="secondary">{t}</Badge>
                                ))}
                              </div>
                              <Badge variant="outline">{m.type}</Badge>
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
        )}
      </main>
    </div>
  );
};

export default Legacy;
