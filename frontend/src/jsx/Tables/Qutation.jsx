// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SearchBar from "../searchBar/SearchBar.jsx";
// import classes from "../../css/table.module.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import addIcon from "../../img/icon/add.png";

// const Qutation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = location.state || {};

//   const [bid, setBid] = useState([]);
//   const [message, setMessage] = useState({});
//   const [search, setSearch] = useState("");
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     idQuotation: "",
//     idCustomer: "",
//     customerName: "",
//     discount: "",
//     totalPrice: "",
//     date: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 7;

//   useEffect(() => {
//   if (id) {
//       fetchCustomerQuotations(id);
//     } else {
//       fetchAllQuotations();
//     }  }, [id]);
//   const fetchCustomerQuotations = async (customerId) => {
//     try {
//       const response = await axios.get(`/quotationsCustomer/${customerId}`);
//       setBid(response.data);
//     } catch (error) {
//       console.error("Error fetching customer quotations:", error);
//     }
//   };
//   const fetchAllQuotations  = async () => {
//     try {
//       const response = await axios.get("/quotations");
//       setBid(response.data);
//     } catch (error) {
//       console.error("Error fetching quotations:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: "" });
//     }
//   };

//   const filteredBid = bid.filter((quote) =>
//     quote.idQuotation.toString().includes(search)
//   );

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredBid.slice(indexOfFirstRow, indexOfLastRow);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleAddBid = () => {
//     setFormData({
//       idQuotation: "",
//       idCustomer: "",
//       customerName: "",
//       discount: "",
//       totalPrice: "",
//       date: "",
//     });
//     navigate("/qutationData");
//   };

//   const copyQuotation = async (idQuotation) => {
//     try {
//       const response = await axios.get(`/quotations/${idQuotation}`);
//       const existingData = response.data;

//       const customerResponse = await axios.get(`/customer/${existingData.idCustomer}`);
//       const itemsResponse = await axios.get(`/quotation/${idQuotation}`);

//       const productPromises = itemsResponse.data.map(async (item) => {
//         const productResponse = await axios.get(`/product1/${item.idProduct}`);
//         const newProductData = {
//           ...productResponse.data,
//           idProduct: null,
//         };

//         const newProductResponse = await axios.post("/createProduct", newProductData);
//         if (!newProductResponse.data.productId) {
//           throw new Error("Failed to create a new product. Product ID is missing.");
//         }

//         return {
//           ...item,
//           idItem: null,
//           idProduct: newProductResponse.data.productId,
//         };
//       });

//       const newItemsWithProducts = await Promise.all(productPromises);
//      const current = await Promise.all(
//       newItemsWithProducts.map(async (item) => {
//         const { idProduct } = item; // Ensure idProduct is properly extracted
//         const productResponse = await axios.get(`/product1/${idProduct}`);
//         return {
//           ...productResponse.data,
//         };
//       })
//     );

//     // Continue with logic that uses the fetched products
//       console.log(current)
//       const formattedDate = new Date(existingData.date).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//       });

//       navigate("/qutationData", {
//         state: {
//           quotation: {
//             notes: existingData.notes,
//             date: formattedDate,
//             discount: existingData.discount,
//             totalPrice: existingData.totalPrice,
//             idQuotation: "",
//             products: newItemsWithProducts,
//             customer: customerResponse.data,
//             vat: existingData.vat || 0,
//             currentProduct:current,
//           },
//         },
//       });
//     } catch (error) {
//       console.error("Error copying quotation:", error);
//       setMessage({ text: "Error copying quotation.", msgClass: "error" });
//     }
//   };

//   const fetchQuotationData = async (idQuotation) => {
//     try {
//       const quotationResponse = await axios.get(`/quotations/${idQuotation}`);
//       const customerResponse = await axios.get(`/customer/${quotationResponse.data.idCustomer}`);
//       const itemsResponse = await axios.get(`/quotation/${idQuotation}`);

//       const productPromises = itemsResponse.data.map((item) =>
//         axios.get(`/product1/${item.idProduct}`)
//       );

//       const productResponses = await Promise.all(productPromises);

//       const itemsWithProducts = itemsResponse.data.map((item) => {
//         const product = productResponses.find((response) => response.data.idProduct === item.idProduct);
//         return {
//           ...item,
//           ...product.data,
//         };
//       });

//       const formattedDate = new Date(quotationResponse.data.date).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//       });

//       navigate("/quotationInfo", {
//         state: {
//           quotation: {
//             notes: quotationResponse.data.notes,
//             date: formattedDate,
//             discount: quotationResponse.data.discount,
//             totalPrice: quotationResponse.data.totalPrice,
//             idQuotation: quotationResponse.data.idQuotation,
//             products: itemsWithProducts,
//             customer: customerResponse.data,
//             vat: quotationResponse.data.vat || 0,
//           },
//         },
//       });
//     } catch (error) {
//       console.error("Error fetching data.", error);
//     }
//   };

//   const handleOrderMaterial = async (idQuotation) => {
//       navigate("/orderinfo", { state: { idQuotation:idQuotation } });
//   };

//   return (
//     <div className={classes.container}>
//       <div className={classes.tablef}>
//         <h2 className="w-100 d-flex justify-content-center p-3">הצעות מחיר</h2>
//         <div className={classes.controls}>
//           <button className="btn btn-primary" onClick={handleAddBid}>
//             <img src={addIcon} alt="Add" className={classes.icon} />   הוספת הצעת מחיר </button>
//           <SearchBar searchVal={search} setSearchVal={setSearch} className="search-bar" />
//         </div>
//         {message.text && (
//           <div
//             className={`alert ${message.msgClass === "success" ? "alert-success" : "alert-danger"}`}
//           >
//             {message.text}
//           </div>
//         )}
//         <table className={`table ${classes.table}`}>
//           <thead>
//             <tr>
//               <th>העתק</th>
//               <th>הזמנת חומר</th>
//               <th>תאריך</th>
//               <th>סכום סופי</th>
//               <th>הנחה</th>
//               <th>שם לקוח</th>
//               <th>ת.ז לקוח</th>
//               <th>מספר הצעה</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentRows.map((quote) => (
//               <tr key={quote.idQuotation}>
//                 <td>
//                   <button onClick={() => copyQuotation(quote.idQuotation)}>העתק</button>
//                 </td>
//                 <td>
//                   <button onClick={() => handleOrderMaterial(quote.idQuotation)}>הזמנת חומר</button>
//                 </td>
//                 <td>{new Date(quote.date).toLocaleDateString()}</td>
//                 <td>{(quote.totalPrice * (1 + quote.vat / 100) - quote.discount).toFixed(2)}</td>
//                 <td>{quote.discount}</td>
//                 <td>{quote.customerName}</td>
//                 <td>{quote.idCustomer}</td>
//                 <td>
//                   <button onClick={() => fetchQuotationData(quote.idQuotation)}>
//                     {quote.idQuotation}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <nav>
//           <ul className="pagination justify-content-center">
//             {Array.from({ length: Math.ceil(filteredBid.length / rowsPerPage) }).map((_, index) => (
//               <li key={index} className="page-item">
//                 <button onClick={() => paginate(index + 1)} className="page-link">
//                   {index + 1}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Qutation;
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../searchBar/SearchBar.jsx";
import classes from "../../css/table.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import addIcon from "../../img/icon/add.png";

const Qutation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id , name, family} = location.state || {};

  const [bid, setBid] = useState([]);
  const [message, setMessage] = useState({});
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    idQuotation: "",
    idCustomer: "",
    customerName: "",
    discount: "",
    totalPrice: "",
    date: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  useEffect(() => {
    if (id) {
      fetchCustomerQuotations(id);
    } else {
      fetchAllQuotations();
    }
  }, [id]);

  const fetchCustomerQuotations = async (customerId) => {
    try {
      const response = await axios.get(`/quotationsCustomer/${customerId}`);
      setBid(response.data);
    } catch (error) {
      console.error("Error fetching customer quotations:", error);
    }
  };

  const fetchAllQuotations = async () => {
    try {
      const response = await axios.get("/quotations");
      setBid(response.data);
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const filteredBid = bid.filter((quote) =>
    quote.idQuotation.toString().includes(search)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBid.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddBid = () => {
    setFormData({
      idQuotation: "",
      idCustomer: "",
      customerName: "",
      discount: "",
      totalPrice: "",
      date: "",
    });
    navigate("/qutationData");
  };

  const copyQuotation = async (idQuotation) => {
    try {
      const response = await axios.get(`/quotations/${idQuotation}`);
      const existingData = response.data;

      const customerResponse = await axios.get(`/customer/${existingData.idCustomer}`);
      const itemsResponse = await axios.get(`/quotation/${idQuotation}`);

      const productPromises = itemsResponse.data.map(async (item) => {
        const productResponse = await axios.get(`/product1/${item.idProduct}`);
        const newProductData = {
          ...productResponse.data,
          idProduct: null,
        };
        const newProductResponse = await axios.post("/createProduct", newProductData);
        if (!newProductResponse.data.productId) {
          throw new Error("Failed to create a new product. Product ID is missing.");
        }

        return {
          ...item,
          idItem: null,
          idProduct: newProductResponse.data.productId,
        };
      });
      const newItemsWithProducts = await Promise.all(productPromises);

      const current = await Promise.all(
        newItemsWithProducts.map(async (item) => {
          const { idProduct } = item; 
          const productResponse = await axios.get(`/product1/${idProduct}`);
          return {
            ...productResponse.data,
          };
        })
      );

      console.log(current);
      const formattedDate = new Date().toISOString().split("T")[0];

      navigate("/qutationData", {
        state: {
          quotation: {
            notes: existingData.notes,
            date: formattedDate,
            discount: existingData.discount,
            totalPrice: existingData.totalPrice,
            idQuotation: "",
            products: current,
            customer: customerResponse.data,
            vat: existingData.vat || 0,
            currentProduct: current,
          },
        },
      });
    } catch (error) {
      console.error("Error copying quotation:", error);
      setMessage({ text: "Error copying quotation.", msgClass: "error" });
    }
  };

  const fetchQuotationData = async (idQuotation) => {
    try {
      const quotationResponse = await axios.get(`/quotations/${idQuotation}`);
      const customerResponse = await axios.get(`/customer/${quotationResponse.data.idCustomer}`);
      const itemsResponse = await axios.get(`/quotation/${idQuotation}`);

      const productPromises = itemsResponse.data.map((item) =>
        axios.get(`/product1/${item.idProduct}`)
      );

      const productResponses = await Promise.all(productPromises);

      const itemsWithProducts = itemsResponse.data.map((item) => {
        const product = productResponses.find((response) => response.data.idProduct === item.idProduct);
        return {
          ...item,
          ...product.data,
        };
      });

      const formattedDate = new Date(quotationResponse.data.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      navigate("/quotationInfo", {
        state: {
          quotation: {
            notes: quotationResponse.data.notes,
            date: formattedDate,
            discount: quotationResponse.data.discount,
            totalPrice: quotationResponse.data.totalPrice,
            idQuotation: quotationResponse.data.idQuotation,
            products: itemsWithProducts,
            customer: customerResponse.data,
            vat: quotationResponse.data.vat || 0,
          },
        },
      });
    } catch (error) {
      console.error("Error fetching data.", error);
    }
  };

  const handleOrderMaterial = async (idQuotation) => {
    navigate("/orderinfo", { state: { idQuotation: idQuotation } });
  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">הצעות מחיר</h2>
        <div className={classes.controls}>
          <button className="btn btn-primary" onClick={handleAddBid}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת הצעת מחיר
          </button>
          {id && <h4 className="text-center"> פרטי לקוח: {name} {family}, {id}</h4>} 
          <SearchBar searchVal={search} setSearchVal={setSearch} className="search-bar" />
        </div>
        {message.text && (
          <div
            className={`alert ${message.msgClass === "success" ? "alert-success" : "alert-danger"}`}
          >
            {message.text}
          </div>
        )}
        <table className={`table ${classes.table}`}>
          <thead>
            <tr>
              <th>העתק</th>
              <th>הזמנת חומר</th>
              <th>תאריך</th>
              <th>סכום סופי</th>
              <th>הנחה</th>
              {!id && <th>שם לקוח</th>} 
              {!id && <th>ת.ז לקוח</th>} 
              <th>מספר הצעה</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((quote) => (
              <tr key={quote.idQuotation}>
                <td>
                  <button onClick={() => copyQuotation(quote.idQuotation)}>העתק</button>
                </td>
                <td>
                  <button onClick={() => handleOrderMaterial(quote.idQuotation)}>הזמנת חומר</button>
                </td>
                <td>{new Date(quote.date).toLocaleDateString()}</td>
                <td>{(quote.totalPrice * (1 + quote.vat / 100) - quote.discount).toFixed(2)}</td>
                <td>{quote.discount? quote.discount : "---"}</td>
                {!id && <td>{quote.customerName}</td>} 
                {!id && <td>{quote.idCustomer}</td>}
                <td>
                  <button onClick={() => fetchQuotationData(quote.idQuotation)}>
                    {quote.idQuotation}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(filteredBid.length / rowsPerPage) }).map((_, index) => (
              <li key={index} className="page-item">
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Qutation;
