

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from "react-apexcharts";
import { getBills } from '../features/bills/billSlice';

const View = () => {
  const dispatch = useDispatch();
  const { bills, isLoading, isError, message } = useSelector((state) => state.bills);
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    
    dispatch(getBills());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (bills.length > 0) {
      
      const monthlySpending = bills.reduce((acc, bill) => {
        const date = new Date(bill.date);
        const month = date.getMonth(); 
        acc[month] = (acc[month] || 0) + parseFloat(bill.amount);
        return acc;
      }, {});

      const categories = Array.from({ length: 12 }, (_, i) => {
        return new Date(0, i).toLocaleString("default", { month: "short" }); 
      });
      const data = Array(12).fill(0).map((_, i) => monthlySpending[i] || 0); 

      
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

