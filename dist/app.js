"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
const properties = [];
let exclusiveListings = [];
// Route to add a new property
app.post('/add', (req, res) => {
    const newProperty = Object.assign({ id: properties.length + 1 }, req.body);
    // Add the property to the list
    properties.push(newProperty);
    // Check if it's an exclusive listing and add it to the exclusive listings
    if (req.body.listingType === 'For sale' && req.body.exclusiveListing) {
        exclusiveListings.push(newProperty);
    }
    res.redirect('/');
});
// Route to display all properties
app.get('/', (req, res) => {
    res.send(`
    <h1>Property Listings</h1>
    <ul>
      ${properties.map((property) => `<li>${property.name}</li>`).join('')}
    </ul>
  `);
});
// Route to mark a property as an exclusive listing
app.post('/exclusive/:id', (req, res) => {
    const propertyId = parseInt(req.params.id, 10);
    const property = properties.find((p) => p.id === propertyId);
    if (property) {
        property.isExclusive = true; // Mark the property as exclusive
        exclusiveListings.push(property);
    }
    res.redirect('/');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
