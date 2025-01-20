import { Link, Outlet } from "react-router-dom";
import { Chart } from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const DashHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch publisher stats for the pie chart
  const { data: publisherStats = [], isLoading: loadingStats } = useQuery({
    queryKey: ["publisherStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/publisher-stats");
      return res.data;
    },
  });

  // Process data for pie chart
  const pieChartData = [
    ["Publisher", "Number of Articles"],
    ...publisherStats.map((stat) => [stat._id || "Unknown", stat.count]),
  ];

  
  const barChartData = [
    ["Month", "Articles Published"],
    ["Jan", 10],
    ["Feb", 20],
    ["Mar", 15],
    ["Apr", 25],
    ["May", 30],
  ];

  const lineChartData = [
    ["Year", "Users", "Articles"],
    ["2021", 100, 50],
    ["2022", 200, 150],
    ["2023", 400, 300],
  ];

  return (
    <div>
        <h2 className="text-2xl font-bold mb-10 ">Overview Stats:</h2>
      <div>
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3">Articles by Publisher</h2>
          {loadingStats ? (
            <p>Loading chart...</p>
          ) : (
            <Chart
              chartType="PieChart"
              data={pieChartData}
              options={{
                title: "Publication Percentage by Publisher",
                is3D: true,
              }}
              width="100%"
              height="400px"
            />
          )}
        </div>

        {/* Bar */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3">Monthly Article Publish</h2>
          <Chart
            chartType="BarChart"
            data={barChartData}
            options={{
              title: "Articles Published Per Month",
              hAxis: { title: "Month" },
              vAxis: { title: "Articles" },
            }}
            width="100%"
            height="400px"
          />
        </div>

        {/* Line */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3">Yearly Growth</h2>
          <Chart
            chartType="LineChart"
            data={lineChartData}
            options={{
              title: "Yearly Growth of Users and Articles",
              hAxis: { title: "Year" },
              vAxis: { title: "Count" },
              curveType: "function",
            }}
            width="100%"
            height="400px"
          />
        </div>
      </div>
    </div>
  );
};

export default DashHome;
