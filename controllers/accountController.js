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
  });
}



module.exports = { buildLogin, buildRegister };
  
