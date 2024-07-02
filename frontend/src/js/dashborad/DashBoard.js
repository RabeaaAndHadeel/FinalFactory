import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "../dashborad/dashBoard.module.css"; // Import the CSS module

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axios
      .get("/order")
      .then((response) => {
        console.log(response.data); // Log the fetched data
        setOrderData(response.data);
      })
      .catch((error) => console.error("Error fetching order data:", error));
  }, []);

  // Generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Create an array of colors for each bar
  const colors = orderData.map(() => getRandomColor());
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>מספר הזמנות</h1>
      <div className={styles.chartContainer}>
        <h2 className={styles.h2}>כמות הזמנות</h2>
        <div className={styles.chartWrapper}>
          <Bar
            className={styles.bar}
            data={{
              labels: orderData.map(
                (order) =>
                  ` Order ${order.orderNumber} - Material ${order.count}`
              ),
              datasets: [
                {
                  label: "Quantity",
                  data: orderData.map((order) => order.count),
                  backgroundColor: colors,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
