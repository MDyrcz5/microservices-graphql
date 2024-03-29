import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import accessEnv from "#root/helpers/accessEnv";
import setupRoutes from "./routes";

const PORT = accessEnv("PORT", 7101);
const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: (orgin, cb) => cb(null, true),
    credentials: true
}));

setupRoutes(app);

app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`User server listen on ${PORT}`);
});