const utilities = require("../utilities/index")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    })
  }
  
/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/register", {  // Make sure you have a 'register.ejs' view
    title: "Register",
    nav,
    errors: null
  });
}

// Handle user registration - accountController.js
async function handleRegister(req, res, next) {
  try {
    const { name, email, password, confirmPassword } = req.body;  // Extraer campos del formulario

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match.");  // Agregar mensaje flash
      return res.redirect("/account/register");  // Redirigir si hay error
    }

    // Mostrar los datos en consola por ahora (para pruebas)
    console.log(`User: ${name}, Email: ${email}`);

    // Aquí podrías agregar lógica para guardar el usuario en la base de datos.
    req.flash("success", "Registration successful. Please log in.");
    res.redirect("/account/login");  // Redirigir al login si el registro fue exitoso
  } catch (error) {
    next(error);  // Pasar errores al middleware
  }
}

module.exports = { buildLogin, buildRegister, handleRegister };


  
