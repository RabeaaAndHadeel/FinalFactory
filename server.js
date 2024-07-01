//Hadeel and Rabeaa
const express = require("express");

const cors = require("cors");
const login = require("./routes/login"); //the login route path
const glass = require("./routes/glass"); //the glass route  path
const profile = require("./routes/Data/profileData"); //the  profile route path
const foam = require("./routes/foam"); //the  profile route path
const supplier = require("./routes/supplier"); //the  supplier route path
const order = require("./routes/order"); //the  order route path
const customer = require("./routes/customer"); //the  customer route path
const product = require("./routes/product"); //the  customer route path
const factory = require("./routes/Data/factoryData"); //the  factory route path
const search = require("./routes/search/search"); //the search route path
const searchFoam = require("./routes/search/searchFoam"); //the  foam search route path
const searchGlass = require("./routes/search/searchGlass"); //the glass search route path
const searchOrder = require("./routes/search/searchOrder"); //the glass search route path
const searchProduct = require("./routes/search/searchProduct"); //the glass search route path
const searchCustomers = require("./routes/search/searchCustomers"); //the glass search route path
const searchSuppliers=require("./routes/search/searchSupplier")
const bid = require("./routes/bid");
const port = process.env.PORT || 3000;
// Creating an Express application
const app = express();

// Applying middleware for CORS support
app.use(cors());

// Applying middleware to parse incoming JSON requests
app.use(express.json());

app.use(login); //using  the login router
app.use(glass); //using  the glass router
app.use(profile); //using  the profile router
app.use(foam); //using  the foam router
app.use(supplier); //using  the supplier router
app.use(order); //using  the order router
app.use(customer); //using  the customer router
app.use(search); //using  the search router
app.use(product); //using  the product router
app.use(searchFoam); //using  the foam search router
app.use(searchGlass); //using  the glass search router
app.use(searchOrder); //using  the glass search router
app.use(searchProduct); //using the product search router
app.use(searchCustomers); //using the customer search route
app.use(searchSuppliers); //using the supplier search route
app.use(factory); //using  the factory router
app.use(bid); //using  the bid router

// if url is not found:
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not Found</h1>");
});

// Starting the server and listening on port 3000
app.listen(port, () => console.log(`Server is running on port ${port}`));
