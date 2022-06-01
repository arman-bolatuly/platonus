const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// find all products, but we aren't need it.
router.get("/products", async (req, res, next) => {
  try {
    const products = await prisma.products.findMany({
      where: { published: true },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// delete product by id, but we aren't need it.
router.delete("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await prisma.products.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

// add product
router.post("/products", async (req, res, next) => {
  try {
    const { name, amount, price, totalPrice } = req.body;
    const products = await prisma.products.create({
      data: {
        name: name,
        amount: amount,
        price: price,
        totalPrice: totalPrice,
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// update product by id
router.patch("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.products.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price,
        totalPrice: req.body.totalPrice,
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// update product published
router.patch("/products/published/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.products.update({
      where: {
        id: Number(id),
      },
      data: {
        published: true,
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// find product by id
router.get("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await prisma.products.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// find unpublish product
router.get("/productsf", async (req, res, next) => {
  try {
    const products = await prisma.products.findMany({
      where: { published: false },
      select: {
        id: true,
      },
    });
    const newID = products.map((ids) => ids.id)
    console.log(newID);
    res.send(newID);
  } catch (error) {
    next(error);
  }
});

module.exports = router;