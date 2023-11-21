// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import { Property } from './property';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const properties: Property[] = [];
let exclusiveListings: Property[] = [];

// Route to add a new property
app.post('/add', (req, res) => {
  const newProperty: Property = {
    id: properties.length + 1, // Generate a unique ID
    ...req.body,
  };

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