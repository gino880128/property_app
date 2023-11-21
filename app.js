"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const express_1 = require("express");
// Create an Express application
const app = (0, express_1.default)();
const port = 3000;
// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, TypeScript App!');
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
