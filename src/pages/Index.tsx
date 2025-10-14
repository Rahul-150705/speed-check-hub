import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SpeedTestCard from "@/components/SpeedTestCard";

interface SpeedTestResult {
  download_mbps: number;
  upload_mbps: number;
  ping_ms: number;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const { toast } = useToast();

  const runSpeedTest = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/speedtest");
      
      if (!response.ok) {
        throw new Error("Speed test failed");
      }

      const data: SpeedTestResult = await response.json();
      setResult(data);
      
      toast({
        title: "Speed test complete!",
        description: `Download: ${data.download_mbps.toFixed(2)} Mbps`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to run speed test. Make sure the backend is running on http://localhost:8000",
      });
      console.error("Speed test error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10 shadow-glow">
              <Wifi className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Internet Speed Test
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your internet connection speed with accurate measurements of download, upload, and ping
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {!result && !isLoading && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Button
                variant="speedtest"
                size="xl"
                onClick={runSpeedTest}
                disabled={isLoading}
              >
                Start Speed Test
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="text-lg text-muted-foreground">Testing your connection speed...</p>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {result && !isLoading && (
            <>
              <SpeedTestCard result={result} />
              <Button
                variant="speedtest"
                size="lg"
                onClick={runSpeedTest}
                className="mt-4"
              >
                Test Again
              </Button>
            </>
          )}
        </div>

        <div className="mt-16 text-center text-sm text-muted-foreground animate-in fade-in duration-1000 delay-500">
          <p>Backend should be running on <code className="px-2 py-1 rounded bg-secondary text-secondary-foreground">http://localhost:8000</code></p>
        </div>
      </div>
    </div>
  );
};

export default Index;
