// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import classes from "./ordersComp.module.css";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// function OrdersComp() {
//   const [calculateData, setCalculateData] = useState([]);
//   const [foamDoorData, setFoamDoorData] = useState([]);
//   const [foamWindowData, setFoamWindowData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [supplierId, setSupplierId] = useState('');
//   const [supplierEmail, setSupplierEmail] = useState('');
//   const [suppliers, setSuppliers] = useState([]);

//   const invoiceRef = useRef(null); // Define the ref for invoice section

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchPromises = [
//           axios.get("/calculate"),
//           axios.get("/foam-door"),
//           axios.get("/foam-window"),
//           axios.get("/suppliers") // Fetch suppliers list
//         ];
//     const fetchQuotationData = async (idQuotation) => {
//       const itemsResponse = await axios.get(`/quotation/${idQuotation}`);
//       const productPromises = itemsResponse.data.map((item) =>
//         axios.get(`/product1/${item.idProduct}`)
//       );
//       const productResponses = await Promise.all(productPromises);

//   };

//         const [
//           calculateResponse,
//           foamDoorResponse,
//           foamWindowResponse,
//           suppliersResponse
//         ] = await Promise.all(fetchPromises);

//         setCalculateData(calculateResponse.data);
//         setFoamDoorData(foamDoorResponse.data || []);
//         setFoamWindowData(foamWindowResponse.data || []);
//         setSuppliers(suppliersResponse.data || []); // Set suppliers list

//         setLoading(false);
//       } catch (err) {
//         console.error("API call failed:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const selectedSupplier = suppliers.find(supplier => supplier.id === supplierId);
//     if (selectedSupplier) {
//       setSupplierEmail(selectedSupplier.email);
//     }
//   }, [supplierId, suppliers]);

//   const handlePrint = () => {
//     window.print();
//   };

//  const handleDownloadPDF = async () => {
//   try {
//     // Temporarily hide unwanted elements
//     const elementsToHide = document.querySelectorAll(".submit-btn, select, button");
//     elementsToHide.forEach((element) => (element.style.display = "none"));

//     const invoiceElement = invoiceRef.current;
//     if (!invoiceElement) {
//       console.error("Error: No element with ref 'invoiceRef' found.");
//       alert("Invoice element not found!");
//       return;
//     }

//     const canvas = await html2canvas(invoiceElement, { scale: 3 });

//     // Restore hidden elements
//     elementsToHide.forEach((element) => (element.style.display = ""));

//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const imgWidth = 210;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//     const pageHeight = 295;

//     let position = 0;
//     let heightLeft = imgHeight;

//     pdf.addImage(imgData, "PNG", 0, position, imgWidth, Math.min(imgHeight, pageHeight));
//     heightLeft -= pageHeight;

//     while (heightLeft > 0) {
//       position = heightLeft - imgHeight;
//       pdf.addPage();
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, Math.min(imgHeight, pageHeight));
//       heightLeft -= pageHeight;
//     }

//     pdf.save(`פרטי_הזמנה_${1}.pdf`);
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     alert("An error occurred while generating the PDF. Please try again.");
//   }
// };

// const handleSendEmail = async () => {
//   try {
//     if (!supplierEmail) {
//       alert("Please select a supplier.");
//       return;
//     }

//     const invoiceElement = invoiceRef.current;
//     if (!invoiceElement) {
//       alert("Invoice element not found!");
//       return;
//     }

//     // Temporarily hide unwanted elements
//     const elementsToHide = document.querySelectorAll(".submit-btn, select, button");
//     elementsToHide.forEach((element) => (element.style.display = "none"));

//     // Convert the invoice element to HTML string
//     const htmlContent = invoiceElement.innerHTML;

//     // Restore hidden elements
//     elementsToHide.forEach((element) => (element.style.display = ""));

//     // Send the email with the HTML content
//     const response = await axios.post('/send-email', {
//       email: supplierEmail,
//       subject: 'Order Details',
//       html: htmlContent
//     });

//     console.log("Response from server:", response.data);
//     alert("Order details sent successfully");
//   } catch (error) {
//     console.error("Error sending order email:", error.message);
//     alert("Error sending order details");
//   }
// };


//   if (loading) {
//     return <div className={classes.loading}>טוען...</div>;
//   }

//   if (error) {
//     return <div className={classes.error}>שגיאה: {error}</div>;
//   }

//   return (
//     <div className={classes.ordersContainer} ref={invoiceRef}>
//       <h2>הזמנות</h2>
//       <div className={classes.buttonContainer}>
//         <button onClick={handlePrint}>הדפסה</button>
//         <button onClick={handleDownloadPDF}>הורדה כ-PDF</button>
//         <select onChange={(e) => setSupplierId(e.target.value)} value={supplierId}>
//           <option value="">בחר ספק</option>
//           {suppliers.map((supplier) => (
//             <option key={supplier.id} value={supplier.id}>
//               {supplier.name}
//             </option>
//           ))}
//         </select>
//         <button onClick={handleSendEmail}>שליחה בדוא"ל</button>
//       </div>

//       <div className={classes.tableSection}>
//         <h3>נתוני חישוב</h3>
//         <table className={classes.ordersTable}>
//           <thead>
//             <tr>
//               <th>מקט</th>
//               <th>כמות פרופילים נצרכת ביחידות</th>
//             </tr>
//           </thead>
//           <tbody>
//             {calculateData.map((item, index) => (
//               <tr key={`calculate-${index}`}>
//                 <td>{item.ProfileId}</td>
//                 <td>{item.RequiredProfiles}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className={classes.tableSection}>
//         <h3>פרזול של דלת</h3>
//         <table className={classes.ordersTable}>
//           <thead>
//             <tr>
//               <th>מקט</th>
//               <th>כמות</th>
//             </tr>
//           </thead>
//           <tbody>
//             {foamDoorData.map((item, index) => (
//               <tr key={`foamDoor-${index}`}>
//                 <td>{item.foamId}</td>
//                 <td>{item.quantity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className={classes.tableSection}>
//         <h3>פרזול של חלון</h3>
//         <table className={classes.ordersTable}>
//           <thead>
//             <tr>
//               <th>מקט</th>
//               <th>כמות</th>
//             </tr>
//           </thead>
//           <tbody>
//             {foamWindowData.map((item, index) => (
//               <tr key={`foamWindow-${index}`}>
//                 <td>{item.foamId}</td>
//                 <td>{item.quantity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrdersComp;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import classes from "./ordersComp.module.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";

function OrdersComp() {
  const [calculateData, setCalculateData] = useState([]);
  const [foamDoorData, setFoamDoorData] = useState([]);
  const [foamWindowData, setFoamWindowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supplierId, setSupplierId] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [productIds, setProductIds] = useState([]); // State for product IDs

  const invoiceRef = useRef(null); // Define the ref for invoice section
  const location = useLocation();
  const idQuotation = location.state?.idQuotation || ""; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPromises = [
          axios.get(`/foam-door`),
          axios.get(`/foam-window`),
          axios.get(`/suppliers`) // Fetch suppliers list
        ];

        // Fetch initial data
        const [
          foamDoorResponse,
          foamWindowResponse,
          suppliersResponse
        ] = await Promise.all(fetchPromises);

        setFoamDoorData(foamDoorResponse.data || []);
        setFoamWindowData(foamWindowResponse.data || []);
        setSuppliers(suppliersResponse.data || []); // Set suppliers list
       console.log(idQuotation)
        if (idQuotation) {
          // Fetch product IDs based on idQuotation
          const itemsResponse = await axios.get(`/quotation/${idQuotation}`);
          const productPromises = itemsResponse.data.map(item =>
            axios.get(`/product1/${item.idProduct}`)
          );
          const productResponses = await Promise.all(productPromises);

          const ids = productResponses.map(response => response.data.idProduct);
          setProductIds(ids); // Update state with product IDs
        }
        setLoading(false);
      } catch (err) {
        console.error("API call failed:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [idQuotation]); // Add idQuotation to dependency array

 useEffect(() => {
  const fetchCalculateData = async () => {
    try {
      console.log('Fetching calculate data with productIds:', productIds);
      const response = await axios.get(`/calculate`, {
        params: { productIds: productIds.join(',') }
      });
      setCalculateData(response.data);
    } catch (error) {
      console.error("API call failed:", error); // Log detailed error
      setError(error.message);
    }
  };

  fetchCalculateData();
}, [productIds]);

  useEffect(() => {
    const selectedSupplier = suppliers.find(supplier => supplier.id === supplierId);
    if (selectedSupplier) {
      setSupplierEmail(selectedSupplier.email);
    }
  }, [supplierId, suppliers]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      const elementsToHide = document.querySelectorAll(".submit-btn, select, button");
      elementsToHide.forEach((element) => (element.style.display = "none"));

      const invoiceElement = invoiceRef.current;
      if (!invoiceElement) {
        console.error("Error: No element with ref 'invoiceRef' found.");
        alert("Invoice element not found!");
        return;
      }

      const canvas = await html2canvas(invoiceElement, { scale: 3 });
      elementsToHide.forEach((element) => (element.style.display = ""));

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 295;

      let position = 0;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, Math.min(imgHeight, pageHeight));
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, Math.min(imgHeight, pageHeight));
        heightLeft -= pageHeight;
      }

      pdf.save(`פרטי_הזמנה_${1}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    }
  };

  const handleSendEmail = async () => {
    try {
      if (!supplierEmail) {
        alert("Please select a supplier.");
        return;
      }

      const invoiceElement = invoiceRef.current;
      if (!invoiceElement) {
        alert("Invoice element not found!");
        return;
      }

      const elementsToHide = document.querySelectorAll(".submit-btn, select, button");
      elementsToHide.forEach((element) => (element.style.display = ""));

      const htmlContent = invoiceElement.innerHTML;
      elementsToHide.forEach((element) => (element.style.display = ""));

      const response = await axios.post('/send-email', {
        email: supplierEmail,
        subject: 'Order Details',
        html: htmlContent
      });

      console.log("Response from server:", response.data);
      alert("Order details sent successfully");
    } catch (error) {
      console.error("Error sending order email:", error.message);
      alert("Error sending order details");
    }
  };

  if (loading) {
    return <div className={classes.loading}>טוען...</div>;
  }

  if (error) {
    return <div className={classes.error}>שגיאה: {error}</div>;
  }

  return (
    <div className={classes.ordersContainer} ref={invoiceRef}>
      <h2>הזמנות</h2>
      <div className={classes.buttonContainer}>
        <button onClick={handlePrint}>הדפסה</button>
        <button onClick={handleDownloadPDF}>הורדה כ-PDF</button>
        <select onChange={(e) => setSupplierId(e.target.value)} value={supplierId}>
          <option value="">בחר ספק</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
        <button onClick={handleSendEmail}>שליחה בדוא"ל</button>
      </div>

      <div className={classes.tableSection}>
        <h3>נתוני חישוב</h3>
        <table className={classes.ordersTable}>
          <thead>
            <tr>
              <th>מקט</th>
              <th>כמות פרופילים נצרכת ביחידות</th>
            </tr>
          </thead>
          <tbody>
            {calculateData.map((item, index) => (
              <tr key={`calculate-${index}`}>
                <td>{item.ProfileId}</td>
                <td>{item.RequiredProfiles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={classes.tableSection}>
        <h3>פרזול של דלת</h3>
        <table className={classes.ordersTable}>
          <thead>
            <tr>
              <th>מקט</th>
              <th>כמות</th>
            </tr>
          </thead>
          <tbody>
            {foamDoorData.map((item, index) => (
              <tr key={`foamDoor-${index}`}>
                <td>{item.foamId}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={classes.tableSection}>
        <h3>פרזול של חלון</h3>
        <table className={classes.ordersTable}>
          <thead>
            <tr>
              <th>מקט</th>
              <th>כמות</th>
            </tr>
          </thead>
          <tbody>
            {foamWindowData.map((item, index) => (
              <tr key={`foamWindow-${index}`}>
                <td>{item.foamId}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersComp;
