import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  casa: string;
  ospite: string;
  golCasa: number;
  golOspite: number;
  stato: "LIVE" | "FINITA" | "PROGRAMMATA";
}

export default function MatchCard({
  casa,
  ospite,
  golCasa,
  golOspite,
  stato,
}: Props) {
  return (
    <Card>
      <CardContent className="p-5">

        <div className="flex justify-between mb-4">

          <h3 className="font-semibold">
            {casa}
          </h3>

          {stato === "LIVE" && (
            <Badge variant="destructive">
              LIVE
            </Badge>
          )}

          {stato === "FINITA" && (
            <Badge>
              FINITA
            </Badge>
          )}

        </div>

        <div className="text-center text-4xl font-bold">
          {golCasa} - {golOspite}
        </div>

        <p className="text-center mt-3 font-semibold">
          {ospite}
        </p>

      </CardContent>
    </Card>
  );
}