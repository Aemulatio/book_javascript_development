// index.js
// This is the main entry point of our application
const express = require('express')
const app = express();
const port = process.env.PORT || 4000

app.get("/", (req, res)=> res.send("Hello"))
app.listen(port, ()=>console.log(`http://localhost:${port}`));
