const express = require("express");
const mongoose = require("mongoose");
const passportSetup = require("./config/passport-setup");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const port = process.env.PORT || 8888;

mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("connected to mongodb");
});

const app = express();

app.set("view engine", "ejs");

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
    res.render("home", { user: req.user });
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});