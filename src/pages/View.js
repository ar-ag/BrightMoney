// import React, { useEffect } from 'react';
// import ApexCharts from 'apexcharts'
// import Chart from "react-apexcharts";
// const View = () => {
//     const series = [
//         {
//           name: "Guests",
//           data: [19, 22, 20, 26]
//         }
//       ];
//       const options = {
//         xaxis: {
//           categories: ["2019-05-01", "2019-05-02", "2019-05-03", "2019-05-04"]
//         }
//       };
    

//     return (
//         <div class="p-4 sm:ml-64 relative overflow-x-auto sm:rounded-lg">
//             <Chart type="line" series={series} options={options} />
//         </div>
//     );
//   }

  

// export default View;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getBills } from '../features/bills/billSlice';
// import Chart from 'react-apexcharts';

// const View = () => {
//     const dispatch = useDispatch();
//     const { bills, isLoading, isError, message } = useSelector((state) => state.bills);
//     const [chartData, setChartData] = useState({ series: [], options: {} });

//     useEffect(() => {
//         if (isError) {
//             console.error(message);
//         }

//         // Fetch bills on component mount
//         dispatch(getBills());
//     }, [dispatch, isError, message]);

//     useEffect(() => {
//         if (bills.length > 0) {
//             // Aggregate spending by month
//             const spendingByMonth = {};
//             bills.forEach((bill) => {
//                 const date = new Date(bill.date);
//                 const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // e.g., "2023-01"
//                 spendingByMonth[monthYear] = (spendingByMonth[monthYear] || 0) + parseFloat(bill.amount);
//             });

//             // Sort months and prepare chart data
//             const sortedMonths = Object.keys(spendingByMonth).sort();
//             const spendingData = sortedMonths.map((month) => spendingByMonth[month]);

//             setChartData({
//                 series: [
//                     {
//                         name: 'Spending',
//                         data: spendingData,
//                     },
//                 ],
//                 options: {
//                     chart: {
//                         type: 'line',
//                         height: 350,
//                         toolbar: {
//                             show: false,
//                         },
//                     },
//                     xaxis: {
//                         categories: sortedMonths,
//                         title: {
//                             text: 'Month',
//                         },
//                     },
//                     yaxis: {
//                         title: {
//                             text: 'Spending',
//                         },
//                     },
//                     stroke: {
//                         curve: 'smooth',
//                     },
//                     tooltip: {
//                         x: {
//                             format: 'yyyy-MM',
//                         },
//                     },
//                 },
//             });
//         }
//     }, [bills]);

//     return (
//         <div className="p-4 sm:ml-64 relative overflow-x-auto sm:rounded-lg">
//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <Chart type="line" series={chartData.series} options={chartData.options} />
//             )}
//         </div>
//     );
// };

// export default View;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from "react-apexcharts";
import { getBills } from '../features/bills/billSlice';

const View = () => {
  const dispatch = useDispatch();
  const { bills, isLoading, isError, message } = useSelector((state) => state.bills);
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    // Fetch bills when the component mounts
    dispatch(getBills());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (bills.length > 0) {
      // Process bills to get monthly spending
      const monthlySpending = bills.reduce((acc, bill) => {
        const date = new Date(bill.date);
        const month = date.getMonth(); // Get month as an integer (0-11)
        acc[month] = (acc[month] || 0) + parseFloat(bill.amount);
        return acc;
      }, {});

      const categories = Array.from({ length: 12 }, (_, i) => {
        return new Date(0, i).toLocaleString("default", { month: "short" }); // Get short month name
      });
      const data = Array(12).fill(0).map((_, i) => monthlySpending[i] || 0); // Ensure all months are represented

      // Update chart data
      setChartData({
        series: [
          {
            name: "Spending",
            data: data,
          },
        ],
        options: {
          chart: {
            type: "bar",
            id: 'spending-bar-chart',
          },
          xaxis: {
            categories: categories,
            title: {
              text: "Month",
            },
          },
          yaxis: {
            title: {
              text: "Spending",
            },
          },
          title: {
            text: "Monthly Spending",
            align: 'center',
          },
        },
      });
    }
  }, [bills, isError, message]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 sm:ml-64 relative overflow-x-auto sm:rounded-lg">
      {chartData.series.length > 0 ? (
        <Chart type="bar" series={chartData.series} options={chartData.options} />
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default View;

