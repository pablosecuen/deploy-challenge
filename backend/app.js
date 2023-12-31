const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./db");
const noteRoutes = require("./routes/Note.routes");

const app = express();
const PORT = process.env.DB_PORT;

// Middleware

app.use((req, res, next) => {
  const allowedOrigins = ["https://deploy-challenge-three.vercel.app"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/notes", noteRoutes);

// Start server
/* sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}); */

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
