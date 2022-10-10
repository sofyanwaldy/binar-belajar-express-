const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { users } = require("../models");

/* Fungsi untuk authentication */
async function authenticate(username, password, done) {
  try {
    // Memanggil method kita yang tadi
    const user = await users.authenticate({ username, password });
    /*
     done adalah callback, parameter pertamanya adalah error,
     jika tidak ada error, maka kita beri null saja.
     Parameter keduanya adalah data yang nantinya dapat
     kita akses di dalam req.user */

    return done(null, user);
  } catch (err) {
    /* Parameter ketiga akan dilempar ke dalam flash */
    return done(null, false, { message: err.message });
  }
}

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    authenticate
  )
);

/* Serialize dan Deserialize
     Cara untuk membuat sesi dan menghapus sesi
   */
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) =>
  done(null, await users.findByPk(id))
);

// Kita exports karena akan kita gunakan sebagai middleware
module.exports = passport;
