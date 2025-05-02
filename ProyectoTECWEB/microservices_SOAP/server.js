const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3001;

// Conexión a MySQL (ajusta según tu configuración)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "miiga",
    port: 3307,
});

db.connect((err) => {
    if (err) {
        console.error("Error conectando a MySQL:", err);
        return;
    }
    console.log("Conectado a MySQL - API documentos");
});

// Endpoint para obtener todos los documentos
app.get("/documentos", async (req, res) => {
    try {
        const [rows] = await db.promise().query(`
            SELECT d.*, a.tipo AS aplicacion, u.nombres AS creado_por_nombre
            FROM documentos d
            JOIN aplicacion a ON d.aplicacion_id = a.id
            JOIN usuarios u ON d.creado_por = u.id
            WHERE d.vigente = TRUE
            ORDER BY d.anio DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error("Error al obtener documentos:", err);
        res.status(500).send("Error en el servidor");
    }
});

app.listen(port, () => {
    console.log(`API documentos ejecutándose en http://localhost:${port}`);
});