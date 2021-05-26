const express = require("express");
const app = express();

app.use(express.static(__dirname));

const PORT = 3300;
app.listen(PORT);

console.log(`Server running on Port ${PORT}`);
