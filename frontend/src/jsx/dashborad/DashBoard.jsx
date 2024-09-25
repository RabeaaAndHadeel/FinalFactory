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
import styles from "../dashborad/dashBoard.module.css"; // Import the CSS module for styling

// Register chart components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // State to store order data fetched from the API
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Fetch data from API when component mounts
    axios
      .get("/orderCust") // Endpoint to fetch order data; adjust if needed
      .then((response) => {
        console.log("Fetched order data:", response.data); // Log fetched data for debugging
        setOrderData(response.data); // Update state with fetched data
      })
      .catch((error) => console.error("Error fetching order data:", error)); // Log any errors
  }, []); // Empty dependency array means this effect runs once on component mount

  // Function to generate a random color for chart bars
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className={styles.dashboardContainer}> {/* Container for the dashboard */}
      <h1 className={styles.dashboardTitle}>Orders Overview</h1> {/* Title of the dashboard */}

      <div className={styles.chartContainer}> {/* Container for the chart */}
        <h2 className={styles.h2}>הזמנת לקוח</h2> {/* Subtitle for the chart */}
        <div className={styles.chartWrapper}> {/* Wrapper for the Bar chart */}
          <Bar
            className={styles.bar}
            data={{
              labels: orderData.map(
                (order) => `${order.month} - ת.ז של לקוח ${order.idCustomer}`
              ), // Generate labels for each bar
              datasets: [
                {
                  label: "מחיר כולל", // Label for the dataset
                  data: orderData.map((order) => order.totalPrice), // Data for each bar
                  backgroundColor: orderData.map(() => getRandomColor()), // Random colors for each bar
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true, // Start the y-axis at zero
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const order = orderData[tooltipItem.dataIndex]; // Get order data for the hovered bar
                      return `תאריך התחלה: ${new Date(
                        order.fromDate
                      ).toLocaleDateString()} \n
                      תאריך סיום: ${new Date(order.toDate).toLocaleDateString()} \n
                      מחיר כולל: ${order.totalPrice}, מס' הצעת מחיר: ${
                        order.quotationCount
                      }`; // Format the tooltip label
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
