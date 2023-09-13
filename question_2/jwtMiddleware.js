const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).json({
      message: "token is not provided",
    });
  }

  try {
    const decoded = jwt.verify(token, "secret_key_mindx");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = jwtMiddleware;
