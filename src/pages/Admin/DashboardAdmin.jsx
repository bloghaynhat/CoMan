import * as LucideIcons from "lucide-react";
import StatCard from "@/components/DashBoard/StatCard";
import RecentCourses from "@/components/DashBoard/RecentCourses";
import RevenueChart from "@/components/DashBoard/RevenueChart";
import { useEffect, useState } from "react";
import {
  fetchDashboardStats,
  fetchTotalStudentCourseByDate,
  fetchRevenueByCourse,
} from "@/api/admin";

export default function Dashboard() {
  // Xử lí 4 ô stat
  const [stats, setStats] = useState([]);
  const [courses, setCourse] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [isLoadingStat, setIsLoadingStat] = useState(true);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [isLoadingRevenue, setIsLoadingRevenue] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then((data) => {
        setStats(data);
        setIsLoadingStat(false);
      })
      .finally(() => setIsLoadingStat(false));
    fetchTotalStudentCourseByDate(5)
      .then((data) => {
        setCourse(data);
        setIsLoadingCourse(false);
      })
      .finally(() => setIsLoadingCourse(false));
    fetchRevenueByCourse(5)
      .then((data) => {
        setRevenue(data);
        setIsLoadingRevenue(false);
      })
      .finally(() => setIsLoadingRevenue(false));
  }, []);
  const statsArray = Object.values(stats); // [{ title, icon, count/amount, change }, ...]

  return (
    <div className="space-y-6 w-10/12 m-auto my-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoadingStat
          ? Array.from({ length: 4 }).map((_, i) => (
              <StatCard key={i} isLoadingStat />
            ))
          : statsArray.map((item, i) => {
              const Icon = LucideIcons[item.icon];
              return (
                <StatCard
                  key={i}
                  title={item.title}
                  value={item.value}
                  icon={Icon}
                  change={item.change}
                />
              );
            })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecentCourses courses={courses} isLoadingCourse={isLoadingCourse} />
        <RevenueChart courses={revenue} isLoadingRevenue={isLoadingRevenue} />
      </div>
    </div>
  );
}
