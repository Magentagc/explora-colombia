
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let destinos = [
  { id: 1, nombre: "Jardín", departamento: "Antioquia" },
  { id: 2, nombre: "Cartagena", departamento: "Bolívar" },
  { id: 3, nombre: "Salento", departamento: "Quindío" }
];

// Consultar todos los destinos
app.get("/api/destinos", (req, res) => {
  res.json(destinos);
});

// Crear un destino
app.post("/api/destinos", (req, res) => {
  const { nombre, departamento } = req.body;

  if (!nombre || !departamento) {
    return res.status(400).json({
      mensaje: "Debes ingresar nombre y departamento"
    });
  }

  const nuevoDestino = {
    id: Date.now(),
    nombre,
    departamento
  };

  destinos.push(nuevoDestino);

  res.status(201).json(nuevoDestino);
});

// Eliminar un destino
app.delete("/api/destinos/:id", (req, res) => {
  const id = Number(req.params.id);

  const existe = destinos.some(destino => destino.id === id);

  if (!existe) {
    return res.status(404).json({
      mensaje: "Destino no encontrado"
    });
  }

  destinos = destinos.filter(destino => destino.id !== id);

  res.json({ mensaje: "Destino eliminado correctamente" });
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API activa en el puerto ${PORT}`);
});