import express from "express";
import cors from 'cors'
import { route } from "./routes";


const port = process.env.PORT || 3333
const app = express();
app.use(cors())
app.use(express.json());
app.use(route)



app.listen(port, () => {
    console.log('🤖 server start on port ' + port)
})