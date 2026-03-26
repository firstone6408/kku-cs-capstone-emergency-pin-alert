import { Card, CardContent } from "@/components/ui/card";
import { IIncident, IncidentStatusEnum } from "../schemas/incident.schema";

interface IncidentStatProps {
  incidents: IIncident[];
}

export function IncidentStat({ incidents }: IncidentStatProps) {
  const total = incidents.length;

  const pending = incidents.filter(
    (i) => i.status === IncidentStatusEnum.REPORTED,
  ).length;

  const progress = incidents.filter(
    (i) => i.status === IncidentStatusEnum.IN_PROGRESS,
  ).length;

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      <StatCard label="ทั้งหมด" value={total} />
      <StatCard label="รอจัดการ" value={pending} />
      <StatCard label="กำลังทำ" value={progress} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="bg-muted/20 text-primary-foreground border-none">
      <CardContent className="flex flex-col items-center justify-center">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm opacity-90">{label}</p>
      </CardContent>
    </Card>
  );
}
