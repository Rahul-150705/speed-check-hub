import { ArrowDown, ArrowUp, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SpeedTestResult {
  download_mbps: number;
  upload_mbps: number;
  ping_ms: number;
}

interface SpeedTestCardProps {
  result: SpeedTestResult;
}

const SpeedTestCard = ({ result }: SpeedTestCardProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="p-6 bg-card border-border shadow-card hover:shadow-glow transition-all duration-300">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <ArrowDown className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-medium">Download</p>
            <p className="text-4xl font-bold text-foreground mt-1">{result.download_mbps.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Mbps</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border shadow-card hover:shadow-glow transition-all duration-300">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-accent/10">
            <ArrowUp className="h-8 w-8 text-accent" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-medium">Upload</p>
            <p className="text-4xl font-bold text-foreground mt-1">{result.upload_mbps.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Mbps</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border shadow-card hover:shadow-glow transition-all duration-300">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-secondary/50">
            <Activity className="h-8 w-8 text-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-medium">Ping</p>
            <p className="text-4xl font-bold text-foreground mt-1">{result.ping_ms.toFixed(0)}</p>
            <p className="text-sm text-muted-foreground">ms</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SpeedTestCard;
