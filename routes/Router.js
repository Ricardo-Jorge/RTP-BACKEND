const express = require("express");
const router = express.Router();

router.use("/api/v1/users", require("./UserRoutes"));
router.use("/api/v1/forms", require("./FormRoutes"));

// test route
router.get("/", (req, res) => {
  res.send("API working!");
});

module.exports = router;
