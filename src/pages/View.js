import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts'
import Chart from "react-apexcharts";
const View = () => {
    const series = [
        {
          name: "Guests",
          data: [19, 22, 20, 26]
        }
      ];
      const options = {
        xaxis: {
          categories: ["2019-05-01", "2019-05-02", "2019-05-03", "2019-05-04"]
        }
      };
    

    return (
        <div class="p-4 sm:ml-64 relative overflow-x-auto sm:rounded-lg">
            <Chart type="line" series={series} options={options} />
        </div>
    );
  }

  

export default View;