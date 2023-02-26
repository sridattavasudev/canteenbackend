const { User } = require("../models/User");
const { Login } = require("../models/Login");
const { Item } = require("../models/Item");
const express = require("express");
const router = express.Router();

// Sign Up
router.post("/api/signup", async (req, res) => {
  try {
    let signup = new Login({
      userid: req.body.userid,
      password: req.body.password,
      admin: req.body.admin,
    });
    let stored = await signup.save();
    if (stored) {
      return res.status(201).send("signupsuccess");
    } else {
      return res.status(400).send("failed");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

// Login

router.post("/api/login", async (req, res) => {
  try {
    let login = await Login.findOne({
      userid: req.body.userid,
      password: req.body.password,
    });
    if (login) {
      return res.status(200).send(login);
    } else {
      return res.status(400).send("failed");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});
// forgot password
router.post("/api/forgot-password", async (req, res) => {
  try {
    let login = await Login.findOneAndUpdate(
      {
        userid: req.body.userid,
      },
      {
        $set: {
          password: req.body.password,
        },
      }
    );
    if (login) {
      return res.status(200).send("Password updated successfully");
    } else {
      return res.status(400).send("failed");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/api/orders", async (req, res) => {
  try {
    let userid = req.body.userid;
    let orders = req.body.orders;
    let ordered = new User({
      userid: userid,
      orders: orders,
    });

    let stored = await ordered.save();
    for (let i = 0; i < orders.length; i++) {
      let result = await Item.findOneAndUpdate(
        { product_title: orders[i].order },
        { $inc: { quantity: -orders[i].quantity } }
      );
      if (!result) {
        return res.status(404).send("Item not found");
      }
    }

    if (stored) {
      return res.status(201).send("success");
    } else {
      return res.status(400).send("failed");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/api/getorders", async (req, res) => {
  try {
    let orders = await User.find();
    if (orders) {
      return res.status(200).send(orders);
    } else {
      return res.status(400).send("failed");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

// My orders
router.post("/api/my-orders", async (req, res) => {
  try {
    let myOrders = await User.find({ userid: req.body.userid });
    if (myOrders) {
      return res.status(200).send(myOrders);
    } else {
      return res.status(400).send(error);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});
// Delete order
router.post("/api/delete-order", async (req, res) => {
  try {
    let deleted = await User.findByIdAndDelete({ _id: req.body._id });
    if (deleted) {
      return res.status(200).send("Deleted successfully");
    } else {
      return res.status(400).send(error);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

// Add and update item
router.post("/api/add-item", async (req, res) => {
  try {
    if (req.body.admin == "0") {
      return;
    }
    let items = new Item({
      product_title: req.body.product_title,
      list_price: req.body.list_price,
      p_image: req.body.p_image,
      quantity: req.body.quantity,
      type: req.body.type,
    });
    let stored = await items.save();
    if (stored) {
      return res.status(201).send("success");
    } else {
      return res.status(400).send("failed");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});
router.post("/api/add-all-items", async (req, res) => {
  try {
    const data = req.body.data;
    let inserted = await Item.insertMany(data);
    if (inserted) {
      return res.status(201).send("success");
    } else {
      return res.status(400).send("failed");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/api/all-items", async (req, res) => {
  try {
    let allItems = await Item.find();
    if (allItems) {
      return res.status(200).send(allItems);
    } else {
      return res.status(400).send(error);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});
router.put("/api/update-item", async (req, res) => {
  try {
    if (req.body.admin == "0") {
      return;
    }
    let item = await Item.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        $set: {
          product_title: req.body.product_title,
          list_price: req.body.list_price,
          p_image: req.body.p_image,
          quantity: req.body.quantity,
          type: req.body.type,
        },
      }
    );
    if (item) {
      return res.status(201).send("success");
    } else {
      return res.status(400).send("failed");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
