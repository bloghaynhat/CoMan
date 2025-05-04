import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  isLoadingStat,
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle className="text-[16px] font-medium">
          {isLoadingStat ? (
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          ) : (
            title
          )}
        </CardTitle>
        {isLoadingStat ? (
          <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
        ) : (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoadingStat ? (
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {isLoadingStat ? (
            <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
          ) : (
            change
          )}
        </p>
      </CardContent>
    </Card>
  );
}
