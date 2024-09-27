import express from "express";

const router = express.Router();

let sumas = [];
let sumasMaxId = sumas.length > 0 ? Math.max(...restas.map((r) => r.id)) : 0;


router.get("/", (req, res) => {
  res.send({ sumas });
});


router.get("/:id", (req, res) => {
  const id = req.params.id;
  const suma = sumas.find((suma) => suma.id == id);
  res.send({ suma });
});


router.post("/", (req, res) => {
  const { a, b } = req.body;
  if (b === 0) { return res.status(400).send({mensaje: "No se divide por 0"})}
  const suma = { id: ++sumasMaxId, a, b, resultado: a / b, fecha: new Date() };
  sumas.push(suma);
  res.status(201).send({ suma });
});


router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { a, b } = req.body;

  const sumaModificada = { id, a, b, resultado: a / b, fecha: new Date() };

  sumas = sumas.map((suma) => (suma.id === id ? sumaModificada : suma));
  res.status(200).send({ suma: sumaModificada });
});


router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  sumas = sumas.filter((suma) => suma.id !== id);
  res.status(200).send({ id });
});

export default router;