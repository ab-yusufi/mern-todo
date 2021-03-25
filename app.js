const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors");

require('dotenv').config();

//Importing My Routes
const todoRoutes = require("./routes/todos")

app.use(cors())
app.use(express.json())

//DB Connection
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
})

//Static Files
app.use(express.static('client/build'));

//My Routes
app.use("/api", todoRoutes)

//Port
const port = process.env.PORT || 5000



//Starting the server
app.listen(port, (req, res) => {
    console.log(`Server is running at ${port}`);
})

