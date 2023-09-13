const express = require("express");
const { connectToDb, db } = require("./db");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("./jwtMiddleware.js");

const app = express();
app.use(express.json());
app.use(cors());

connectToDb();

app.get("/api/v1/products", jwtMiddleware, async (req, res) => {
  // const data = req.query;
  // let conditions = {};

  // if (data && data.query) {
  //   conditions.instock = { $lt: parseInt(data.query) };
  // }

  const conditions = { instock: { $lt: 100 } };
  try {
    const products = await db.inventories.find(conditions).toArray();
    res.json({ products });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.post("/api/v1/login", async (req, res) => {
  const { username, password } = req.body;
  //check account:

  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Can not find username & password" });
  }

  const existAccount = await db.users.findOne({
    username: username,
    password: password,
  });

  if (!existAccount)
    return res.status(401).json({ message: "Invalid email & password" });

  //createtoken:
  const jwtPayload = {
    id: existAccount._id,
    username: existAccount.username,
    type: existAccount.type,
  };

  const token = jwt.sign(jwtPayload, "secret_key_mindx", {
    expiresIn: "120s",
  });

  res.json({
    user: jwtPayload,
    accessToken: token,
  });
});

app.get("/api/v1/orders", jwtMiddleware, async (req, res) => {
  try {
    const orders = await db.orders.find({}).toArray();
    const products = await db.inventories.find({}).toArray();

    const data = orders.map((order) => {
      products.forEach((el) => {
        if (order.item === el.sku) {
          order = { ...order, description: el.description };
        }
      });
      return order;
    });

    res.json({ data });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.listen(8000, () => {
  console.log("App is running at 8000");
});
