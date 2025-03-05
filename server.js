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

/******************************************
 * View Engine and Templates
 ******************************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/******************************************
 * Middleware y Rutas
 ******************************************/
app.use(staticRoutes)

// Index route
app.get("/", function(req, res) {
  res.render("index", { title: "Home" })
})

/******************************************
 * Local Server Information
 ******************************************/
const port = process.env.PORT || 5500
const host = process.env.HOST || "localhost"

/******************************************
 * Log statement to confirm server operation
 ******************************************/
app.listen(port, () => {
  console.log(`App listening on http://${host}:${port}`)
})