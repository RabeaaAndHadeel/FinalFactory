import React, { useState } from "react";
import axios from "axios";
import ProfileComponent from "./Profile/ProfileComponent";
import GlassComponent from "./GlassComponent";
import ShutterComponent from "./ShutterComponent";
import Validation from "../../js/validations/ProductValidation";
import styles from "./bidData.module.css"; 
import Door from "./DoorComponent";
import Window from "./WindowComponent";

function Product({
  currentProduct,
  setCurrentProduct,
  setProducts,
  totalPrice,
  setTotalPrice,
  products,
}) {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [profile, setProfile] = useState({
    id:  currentProduct.profileType |"",
    perimeter: "",
    weight: "",
    price: "",
    priceShutters:"",
  });

  const validateProduct = () => {
    const validationErrors = Validation(currentProduct);
    console.log("Validation Errors:", validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };
  const calculateTotalPrice = () => {
    const basePrice = profile.price ? parseFloat(profile.price) : 0;
    const shutterPrice = profile.priceShutters ? parseFloat(profile.priceShutters) : 0;
    const height = currentProduct.height || 0;
    const width = currentProduct.width || 0;

    const productTotalPrice = (basePrice + (currentProduct.shutterType ? shutterPrice : 0)) * (height / 100) * (width / 100) ;

    return productTotalPrice.toFixed(2);
  };
  const addProduct = () => {
    // if (!validateProduct()) {
    //   return;
    // }

    const productTotalPrice = currentProduct.quantity * currentProduct.pricePerUnit;
     // Instead of calling setCurrentProduct, set profileType directly in the post request
    const productToAdd = {
    ...currentProduct,
    profileType: profile.id, // Ensure profile.id is used directly here
    };
    console.log(productToAdd);
    axios
      .post("/createProduct", productToAdd)
      .then((response) => {
        const newProduct = {
          ...productToAdd,
          idProduct: response.data.productId,
          totalPrice: productTotalPrice,
        };

        setProducts([...products, newProduct]);
        setTotalPrice(totalPrice + productTotalPrice);
        setSuccessMessage("Product added successfully");
        setErrors({}); // Reset errors after successful addition

        // Reset the currentProduct state to clear form fields and refresh components
        setCurrentProduct({
          height: "",
          width: "",
          quantity: 1, 
          pricePerUnit: "",
          profileType: "",
          shutterType: "",
          glassType: "",
          description: "",
          idDoor: "",
          idWindow: ""
        });
        setProfile({
          id: "",
          perimeter: "",
          weight: "",
          price: "",
          priceShutters:"",
        })
      })
      .catch((error) => {
        setErrors({ addProduct: "Failed to add product. Please try again." });
      });
  };

  const updateProduct = () => {
    const productTotalPrice = currentProduct.quantity * currentProduct.pricePerUnit;
    console.log("Updating Product:", currentProduct);

    axios
      .put(`/updateProduct/${currentProduct.idProduct}`, currentProduct)
      .then((response) => {
        console.log("Update Response:", response.data);

        const updatedProducts = products.map((product) =>
          product.idProduct === currentProduct.idProduct
            ? { ...currentProduct, totalPrice: productTotalPrice }
            : product
        );

        setProducts(updatedProducts);
        setTotalPrice(
          totalPrice - products.find((p) => p.idProduct === currentProduct.idProduct).totalPrice
            + productTotalPrice
        );

        setSuccessMessage("Product updated successfully");
        setErrors({});
        setCurrentProduct({
          height: "",
          width: "",
          quantity: 1, 
          pricePerUnit: "",
          profileType: "",
          shutterType: "",
          glassType: "",
          description: "",
          idDoor: "",
          idWindow: ""
        });
      })
      .catch((error) => {
        console.error("Error updating product:", error.response?.data || error.message);
        setErrors({
          updateProduct: "Failed to update product. Please try again.",
        });
      });
  };

  return (
    <div>
      <h2>הוספת/עדכון מוצר</h2>

      <label htmlFor="description" style={{ fontWeight: "bolder" }}>
        תיאור פריט
      </label>
      <br />
      <div className={styles.inputField}>
        <select
          id="description"
          value={currentProduct.description}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, description: e.target.value })
          }
        >
          <option value="">בחר תיאור פריט</option>
          <option value="דלת">דלת</option>
          <option value="חלון">חלון</option>
        </select>
        {currentProduct.description === "חלון" && (
          <Window
            idWindow={currentProduct.idWindow}
            setIdWindow={(newIdWindow) =>
              setCurrentProduct((prevState) => ({
                ...prevState,
                idWindow: newIdWindow
              }))
            }
          />
        )}
        {currentProduct.description === "דלת" && (
          <Door
            idDoor={currentProduct.idDoor}
            setIdDoor={(newIdDoor) =>
              setCurrentProduct((prevState) => ({
                ...prevState,
                idDoor: newIdDoor
              }))
            }
          />
        )}
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description}</p>
        )}
      </div>

      <ProfileComponent
        profile={profile}
        setProfile={setProfile}
      />

      <GlassComponent
        glassType={currentProduct.glassType}
        setGlassType={(newGlassType) =>
          setCurrentProduct((prevState) => ({
            ...prevState,
            glassType: newGlassType
          }))
        }
      />
      {errors.glassType && <p style={{ color: "red" }}>{errors.glassType}</p>}
      <ShutterComponent
        shutterType={currentProduct.shutterType}
        setShutterType={(newShutterType) =>
          setCurrentProduct((prevState) => ({
            ...prevState,
            shutterType: newShutterType
          }))
        }
      />
    <label htmlFor="height" style={{ fontWeight: "bolder" }}>
  גובה
</label>
<input
  type="number"
  id="height"
  placeholder="גובה"
  value={currentProduct.height}
  onChange={(e) => {
    const value =  Number(e.target.value);
    setCurrentProduct({ ...currentProduct, height: value });
  }}
  min={100}
  max={750}
/>
{errors.height && <p style={{ color: "red" }}>{errors.height}</p>}

<label htmlFor="width" style={{ fontWeight: "bolder" }}>
  רוחב
</label>
<input
  type="number"
  id="width"
  placeholder="רוחב"
  value={currentProduct.width}
  onChange={(e) => {
    const value =  Number(e.target.value);
    setCurrentProduct({ ...currentProduct, width: value });
  }}
  min={100}
  max={750}
/>
{errors.width && <p style={{ color: "red" }}>{errors.width}</p>}


      <label htmlFor="quantity" style={{ fontWeight: "bolder" }}>
        כמות
      </label>
      <input
        type="number"
        id="quantity"
        placeholder="כמות"
        value={currentProduct.quantity}
        onChange={(e) =>
          setCurrentProduct({ ...currentProduct, quantity: e.target.value })
        }
      />
      {errors.quantity && <p style={{ color: "red" }}>{errors.quantity}</p>}

      <label htmlFor="pricePerUnit" style={{ fontWeight: "bolder" }}>
  מחיר ליחידה
</label>
<input
  type="number"
  id="pricePerUnit"
  placeholder="מחיר ליחידה"
  value={  currentProduct.pricePerUnit|| calculateTotalPrice() } 
  onChange={(e) => {
    setCurrentProduct({
      ...currentProduct,
      pricePerUnit: e.target.value,
    });
  }}
/>

      {errors.pricePerUnit && (
        <p style={{ color: "red" }}>{errors.pricePerUnit}</p>
      )}

      <button
        className={styles.button}
        onClick={currentProduct.idProduct ? updateProduct : addProduct}
      >
        {currentProduct.idProduct ? "עדכון מוצר" : "הוספת מוצר"}
      </button>

      {errors.addProduct && <p style={{ color: "red" }}>{errors.addProduct}</p>}
      {errors.updateProduct && (
        <p style={{ color: "red" }}>{errors.updateProduct}</p>
      )}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <h2>סכום כולל: {totalPrice}</h2>
    </div>
  );
}

export default Product;