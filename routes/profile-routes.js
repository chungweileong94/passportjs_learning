const router = require("express").Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        //if user is not logged 
        res.redirect("/auth/login");
    } else {
        //if logged
        next();
    }
};

router.get("/", authCheck, (req, res) => {
    res.render("profile", { user: req.user });
});

module.exports = router;