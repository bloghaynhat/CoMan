import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  isLoadingStat,
}) {
  const variants = {
    BookOpen: {
      background: "bg-gradient-to-br from-indigo-500 to-[#00c9ff]",
      iconBackground: "bg-white/20",
      textColor: "text-white",
    },
    Users: {
      background: "bg-gradient-to-br from-purple-500 to-pink-500",
      iconBackground: "bg-white/20",
      textColor: "text-white",
    },
    DollarSign: {
      background: "bg-gradient-to-br from-emerald-500 to-teal-400",
      iconBackground: "bg-white/20",
      textColor: "text-white",
    },
    CirclePlus: {
      background: "bg-gradient-to-br from-orange-500 to-amber-400",
      iconBackground: "bg-white/20",
      textColor: "text-white",
    },
  };

  const defaultVariant = {
    background: "bg-gray-100",
    iconBackground: "bg-white",
    textColor: "text-gray-800",
  };

  const iconName = Icon?.displayName;
  const currentVariant = variants[iconName] || defaultVariant;

  return (
    <Card
      className={`${currentVariant.background} border-none shadow-lg flex flex-col justify-between`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle
          className={`text-[20px] font-medium ${currentVariant.textColor}`}
        >
          {isLoadingStat ? (
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          ) : (
            title
          )}
        </CardTitle>
        {isLoadingStat ? (
          <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
        ) : (
          <div className={`rounded-full p-2 ${currentVariant.iconBackground}`}>
            <Icon className={`h-6 w-6 ${currentVariant.textColor}`} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${currentVariant.textColor}`}>
          {isLoadingStat ? (
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          ) : (
            value
          )}
        </div>
        <p className={`text-sm ${currentVariant.textColor} opacity-90`}>
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
