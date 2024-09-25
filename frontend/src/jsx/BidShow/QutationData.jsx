import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Client from "./Client/Client";
import Product from "./Product";
import styles from "./bidData.module.css"; // Import CSS Module
import axios from "axios";
import editIcon from "../../img/icon/edit.png";
import trash from "../../img/icon/trash.jpg";
import QutationValidation from "../../js/validations/QutationValidation";
function QutationData() {
  const [idItem, setIdItem] = useState(null);
  const [discountAmount, setDiscountAmount] = useState("");
   const [currentProduct, setCurrentProduct] = useState({
    idProduct: "",
    height: "",
    width: "",
    quantity: 1,
    pricePerUnit: "",
    profileType: "",
    shutterType: "",
    glassType: "",
    description: "",
    idDoor: "",
    idWindow: "",
    discountVlaue: "YES",
    discount:"",
    vat: "",
  });

  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    family: "",
    phone: "",
    email: "",
    address: "",
  });

  // Set the default date to today's date
  const [date, setDate] = useState(() => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  });
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [quotationId, setQuotationId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const editData = state?.quotation;
  // Function to handle date changes
  const handleDateChange = (e) => {
  const selectedDate = e.target.value;
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  if (selectedDate < today) {
    alert("תאריך שנבחר עבר, אנא בחר תאריך עתידי."); // Alert message in Hebrew
    return;
  }
  setDate(selectedDate);
  };

  // Handle quotation edit mode
  // useEffect(() => {
  //   if (editData) {
  //     console.log("Fetched Quotation Data in Edit Mode:", editData);
  //     setIsEditMode(true);
  //     setQuotationId(editData.idQuotation);
  //     setCustomer(editData.customer);
  //     const convertDateToISO = (dateString) => {
  //      const [day, month, year] = dateString.split("/"); // Split the date by "/"
  //       return `${year}-${month}-${day}`; // Return the date in "yyyy-MM-dd" format
  //       };
  //     setDate(editData.date);
  //     setCurrentProduct(editData.currentProduct)
  //     setCurrentProduct({ ...currentProduct, discount:editData.discount })
  //     // const updatedProducts = Array.isArray(editData.products)
  //     // ? editData.products.map((product) => {
  //     //     if (!product.idItem || product.idItem === "") {
  //     //       console.error("Missing idItem for product:", product);
  //     //       return { ...product, idItem: null };
  //     //     }
  //     //     return product;
  //     //   })
  //     // : [];


  //     setProducts(editData.products);
  //     setTotalPrice(editData.totalPrice);
  //     setNotes(editData.notes || "");
  //   }
  // }, [editData]);
const convertDateToISO = (dateString) => {
  const [day, month, year] = dateString.split("/"); // Split the date by "/"
  return `${year}-${month}-${day}`; // Return the date in "yyyy-MM-dd" format
};

useEffect(() => {
  if (editData) {
    console.log("Fetched Quotation Data in Edit Mode:", editData);
    setIsEditMode(true);
    setQuotationId(editData.idQuotation);
    setCustomer(editData.customer);

    // Check if the date is not in "yyyy-MM-dd" format and convert if necessary
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const formattedDate = regex.test(editData.date) 
      ? editData.date 
      : convertDateToISO(editData.date); // Use the conversion function if the format is incorrect

    setDate(formattedDate);

    // Set current product discount
    setCurrentProduct({ ...currentProduct, discount: editData.discount });

    // Set products, total price, and notes
    setProducts(editData.products);
    setTotalPrice(editData.totalPrice);
    setNotes(editData.notes || "");
  }
}, [editData]);

const handleDiscountAmountChange = (e) => {
  const { value } = e.target;
  if (value < 0) return; // Ensure discount is not negative
  setCurrentProduct((prevState) => ({
    ...prevState,
    discount: value,
  }));
};

const handleDiscountValueChange = (e) => {
  setCurrentProduct((prevState) => ({
    ...prevState,
    discountVlaue: e.target.value,
    discount: "", // Reset discount amount when toggling value
  }));
};

  const fetchVAT = async () => {
  try {
    const response = await axios.get('/getVAT'); 
    return response.data.vat;  
  } catch (error) {
    console.error("Error fetching VAT:", error);
    return 0; 
  }
  }

const submitQuotation = async () => {
  if (!customer.id || !date) {
    setErrors({ submit: "Customer ID and Date are required." });
    return;
  }

  currentProduct.vat = await fetchVAT();

  const quotationData = {
    idCustomer: customer.id,
    customerName: `${customer.name} ${customer.family}`,
    date,
    totalPrice,
    discount: currentProduct.discount,
    notes,
    vat: currentProduct.vat,
  };
  try {
    let response;
    let newQuotationId;

    if (isEditMode && quotationId) {
      console.log("updateQuotation",quotationData)
      response = await axios.put(`/updateQuotation/${quotationId}`, quotationData);
      newQuotationId = quotationId;
    } else {
      response = await axios.post("/createQuotation", quotationData);
      newQuotationId = response?.data?.data?.idQuotation || null;
    }

    if (!newQuotationId) {
      throw new Error("Failed to obtain Quotation ID.");
    }

    const productPromises = products.map(async (product) => {
      const quotationItemData = {
        idQuotation: newQuotationId,
        idProduct: product.idProduct || null,
        quantity: Number(product.quantity),
        totalPrice: product.totalPrice || product.quantity* product.pricePerUnit,
      };
      if (product.idItem && isEditMode) {
        await axios.put(`/updateQuotationItem/${product.idItem}`, quotationItemData);
      } else {
        const resItems = await axios.post("/createQuotationItem", quotationItemData);
        const newItemId = resItems?.data?.data?.idItem || null;
        product.idItem = newItemId;
      }

      return product;
    });

    const updatedProducts = await Promise.all(productPromises);
    setProducts(updatedProducts);

    if (response.status === 200) {
      navigate(`/quotationInfo`, {
        state: {
          quotation: {
            customer,
            products: updatedProducts,
            date,
            totalPrice,
            notes,
            discount: currentProduct.discount,
            vat: currentProduct.vat || 0,
            idQuotation: newQuotationId,
          },
        },
      });
    } else {
      setErrors({ submit: "Failed to save quotation." });
    }
  } catch (error) {
    console.error("Error submitting quotation:", error);
    setErrors({
      submit: "An error occurred while submitting the quotation.",
    });
  }
};

  const handleDeleteProduct = async (index) => {
    const productToDelete = products[index];
    console.log(
      "Attempting to delete product with idItem:",
      productToDelete.idItem
    );
    try {
    await axios.delete(`/product/${productToDelete.idProduct}`);
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    const updatedTotalPrice = updatedProducts.reduce(
      (sum, product) => sum + product.totalPrice,
      0
    );
    setTotalPrice(updatedTotalPrice);
  } catch (error) {
    console.error('Failed to delete product:', error);
  }
   if(productToDelete.idItem != null)
    try {
      const response = await axios.delete(
        `/quotationItem/${productToDelete.idItem}`
      );
      if (response.status === 200) {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const addOrUpdateProduct = (newProduct) => {
  setProducts((prevProducts) => {
    const existingProductIndex = prevProducts.findIndex(
      (product) => product.idProduct === newProduct.idProduct
    );

    if (existingProductIndex !== -1) {
      // Update the existing product
      const updatedProducts = [...prevProducts];
      updatedProducts[existingProductIndex] = newProduct;
      return updatedProducts;
    } else {
      // Add a new product
      return [...prevProducts, newProduct];
    }
  });
};
  return (
    <div className={styles.container1}>
      <h1>בניית הצעת מחיר</h1>
      <Client
        formData={customer}
        setFormData={setCustomer}
      />
      <div>
        <label htmlFor="date" style={{ fontWeight: "bolder" }}>
          תאריך 
        </label>
        <br />
        <input type="date" id="date" value={date} min={date} onChange={handleDateChange} />
      </div>
      <label htmlFor="notes" style={{ fontWeight: "bolder" }}>
        הערות כלליות
      </label>
       <br />
      <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}
        style={{
          width: "97%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
          fontSize: "16px",
          color: "#333",
          backgroundColor: "#fff",
          outline: "none",
          textAlign: "right",
        }} />
      <div>
      <label htmlFor="discountVlaue" style={{ fontWeight: "bolder" }}>
        הנחת מזומן
      </label>
      <br />
      <div className={styles.inputField}>
        <select
          id="discountVlaue"
          value={currentProduct.discountVlaue}
          onChange={handleDiscountValueChange}
        >
          <option value="NO">לא</option>
          <option value="YES">כן</option>
        </select>
        {currentProduct.discountVlaue === "YES" && (
          <div>
            <label htmlFor="discount" style={{ fontWeight: "bolder" }}>
              סכום הנחה (ש"ח)
            </label>
            <input
              type="number"
              id="discount"
              value={currentProduct.discount}
              onChange={handleDiscountAmountChange}
              min="0"
              step="0.01"
            />
          </div>
        )}
      </div>
    </div>
      <Product
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
        setProducts={setProducts}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        products={products}
        addOrUpdateProduct={addOrUpdateProduct} // שימוש בפונקציה החדשה
      />
      <button onClick={submitQuotation} className={styles.button}>
        {isEditMode ? "עדכון הצעת מחיר" : "צור הצעת מחיר"}
      </button>
      {errors.submit && <p style={{ color: "red" }}>{errors.submit}</p>}

      <table>
        <thead>
          <tr>
            <th>תאור פריט</th>
            <th>פרופיל</th>
            <th>גובה(מ"מ)</th>
            <th>רוחב(מ"מ)</th>
            <th>ליחידה מחיר(ש"ח)</th>
            <th>כמות</th>
            <th>סה"כ מחיר (ש"ח)</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                {product.description}{" "}
                {product.glassType ? `, זכוכית: ${product.glassType}` : ""}{" "}
                {product.shutterType ? `, תריס: ${product.shutterType}` : ""}
              </td>
              <td>{(product.profileType)}</td>
              <td>{(product.height)}</td>
              <td>{(product.width)}</td>
              <td>{(product.pricePerUnit)}</td>
              <td>{(product.quantity)}</td>
              <td>{(product.totalPrice?product.totalPrice :product.pricePerUnit*product.quantity)}</td>
              <td>
                <img
                  src={editIcon}
                  alt="edit"
                  className={styles.iconAction}
                  onClick={() => setCurrentProduct(product)}
                />
                <img
                  src={trash}
                  alt="remove"
                  className={styles.iconAction}
                  onClick={() => handleDeleteProduct(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QutationData;
