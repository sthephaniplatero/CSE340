/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/******************************************
 * Require Statements
 ******************************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config() 
const app = express()  
const staticRoutes = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities/index")
const errorRoute = require('./routes/errorRoute'); // Import the error route
/******************************************
 * View Engine aqnd Templates
 ******************************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/******************************************
 * Middleware y Rutas
 ******************************************/
app.use(express.static('public'));
app.use(staticRoutes)


// Index route
app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory routes
app.use("/inv", inventoryRoute)




// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})




/******************************************
 * Local Server Information
 ******************************************/

const port = process.env.PORT || 5500
const host = process.env.HOST || "localhost"

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/******************************************
 * Log statement to confirm server operation
 ******************************************/
app.listen(port, () => {
  console.log(`App listening on http://${host}:${port}`)
})