import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MonthlyChart({ monthlyRevenue }) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Doanh thu theo tháng</CardTitle>
        <CardDescription>Biểu đồ doanh thu 6 tháng gần nhất</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <div className="flex h-full items-end gap-2">
            {monthlyRevenue.map((item, index) => (
              <div
                key={index}
                className="relative flex h-full flex-1 flex-col justify-end"
              >
                <div
                  className="bg-gradient-to-t from-indigo-500 to-[#00c9ff] rounded-t-md w-full"
                  style={{ height: `${(item.revenue / 60000000) * 100}%` }}
                />
                <span className="mt-2 text-center text-xs">{item.month}</span>
                <span className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 text-xs font-medium">
                  {(item.revenue / 1000000).toFixed(1)}M
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
