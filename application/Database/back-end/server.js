const express = require('express');
const cors = require('cors');

const buyerRoutes = require('./routes/buyer');
const courierRoutes = require('./routes/courier');
const deliveryInstructionsRoutes = require('./routes/delivery_instruction');
const deliveryRequestRoutes = require('./routes/delivery_request');
const messageRoutes = require('./routes/direct_message');
const listingRoutes = require('./routes/listing');
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/user');
const vendorRoutes = require('./routes/vendor');

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/buyers', buyerRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/deliveryInstructions', deliveryInstructionsRoutes);
app.use('/api/deliveryRequests', deliveryRequestRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vendors', vendorRoutes);

app.listen(3001, () => console.log('API running on port 3001'));



db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to MySQL Database.");
});


// Search Listings by Title
app.get('/api/title', (req, res) => {
    const searchTerm = req.query.q; // will come after /api/title?q=...
    if (!searchTerm) {
        return res.status(400).json({ error: "Missing search term" });
    }

    const query = "SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE product.title LIKE ? AND listing.listing_status = 'Active'"
    const searchValue = `%${searchTerm}%`;

    db.query(query, [searchValue], (err, results) => { 
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database query failed" });
        }

        const listingsWithImages = results.map(row => {
            const base64Thumbnail = row.thumbnail ? row.thumbnail.toString('base64') : null;

            return {
                listing_id: row.listing_id,
                price: row.price,
                discount: row.discount,
                listing_date: row.listing_date,
                title: row.title,
                description: row.description,
                product_id: row.product_id,
                category: row.category,
                // image: row.image,
                vendor_id: row.vendor_id,
                thumbnail: base64Thumbnail ? `data:thumbnail/png;base64,${base64Thumbnail}` : null
            };
        });
        res.json(listingsWithImages);
    });
});


// Search Listings by Category
app.get('/api/category', (req, res) => {
    const searchTerm = req.query.category; // will come after /api/category?category=...
    if (!searchTerm) {
        return res.status(400).json({ error: "Missing search term" });
    }

    const query = "SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE product.category LIKE ? AND listing.listing_status = 'Active'"
    const searchValue = `%${searchTerm}%`;
    

    db.query(query, [searchValue], (err, results) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        

        const listingsWithImages = results.map(row => {
            const base64Thumbnail = row.thumbnail ? row.thumbnail.toString('base64') : null;

            return {
                listing_id: row.listing_id,
                price: row.price,
                discount: row.discount,
                listing_date: row.listing_date,
                title: row.title,
                description: row.description,
                product_id: row.product_id,
                category: row.category,
                // image: row.image,
                vendor_id: row.vendor_id,
                thumbnail: base64Thumbnail ? `data:thumbnail/png;base64,${base64Thumbnail}` : null
            };
        });

        res.json(listingsWithImages);
    });
});

// Search for all Listings
app.get('/api/all', (req, res) => {
    const query = " SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE listing.listing_status = 'Active'"
    db.query(query, (err, results) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database query failed" });
        }


        const listingsWithImages = results.map(row => {
            const base64Thumbnail = row.thumbnail ? row.thumbnail.toString('base64') : null;

            return {
                listing_id: row.listing_id,
                price: row.price,
                discount: row.discount,
                listing_date: row.listing_date,
                title: row.title,
                description: row.description,
                product_id: row.product_id,
                category: row.category,
                // image: row.image,
                vendor_id: row.vendor_id,
                thumbnail: base64Thumbnail ? `data:thumbnail/png;base64,${base64Thumbnail}` : null
            };
        });
        res.json(listingsWithImages);
    });
});


