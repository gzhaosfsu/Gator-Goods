USE gator_goods;
-- Insert Users
INSERT INTO user (first_name, last_name, username, password, sfsu_email, is_verified) VALUES
('John', 'Doe', 'johndoe', 'password123', 'johndoe@mail.sfsu.edu', TRUE),
('Jane', 'Smith', 'janesmith', 'securepass', 'janesmith@mail.sfsu.edu', TRUE),
('Alice', 'Johnson', 'alicej', 'mypassword', 'alicej@mail.sfsu.edu', FALSE);

-- Insert Products
INSERT INTO product (description, category, title, thumbnail, vendor_id) VALUES
('Comfortable cotton t-shirt', 'clothing', 'SF State T-Shirt',
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'),1),
('Laptop with 16GB RAM', 'electronics', 'Gaming Laptop', 
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'),2),
('Cellphone', 
    'electronics', 
    'iPhone 12', 
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'),
    1
),
('Harry Potter',
    'books',
    'big book',
    LOAD_FILE('/home/student/Downloads/648BLOBsample.png'),
    1
);

-- Insert Listings
INSERT INTO listing (listing_status, product_id, vendor_id, availability, price, discount, approval_status, conditions) VALUES
('Active', 1, 1, 'In Stock', 20.00, 2.00, 'Approved', 'New'),
('Active', 2, 2, 'In Stock', 800.00, 50.00, 'Approved', 'New'),
('Delisted', 3, 2, 'In Stock', 2.00, 0.00, 'Denied', 'New'),
('Active', 1, 1, 'In Stock', 250.00, 2.00, 'Approved', 'Used - Like New');

-- Insert Reviews
INSERT INTO review (author_id, vendor_id, rating, comment) VALUES
(3, 1, 5, 'Great seller!'),
(3, 2, 4, 'Fast shipping, but packaging could be better.');

-- Insert Messages
INSERT INTO direct_message (sender_id, receiver_id, listing_id, content) VALUES
(3, 1, 1, 'Is this t-shirt available in size M?'),
(3, 2, 2, 'Can you do a discount on the laptop?');

-- Insert Delivery Requests
INSERT INTO delivery_request (buyer_id, vendor_id, status, dropoff, listing_id) VALUES
(1, 1, 'Pending', 'Library', 1);

-- Insert Delivery Instructions
INSERT INTO delivery_instruction (vendor_id, buyer_id, listing_id, pickup, dropoff, buyer_special_request) VALUES
(1, 1, 1, 'SFSU Bookstore', 'Student Services', 'Leave at front desk.');

-- Insert Users (IDs 4 to 9)
INSERT INTO user (first_name, last_name, username, password, sfsu_email, is_verified) VALUES
('Bob', 'Marley', 'bobm', 'rastapass', 'bobm@mail.sfsu.edu', TRUE),
('Clara', 'Oswald', 'clarao', 'impossible', 'clarao@mail.sfsu.edu', TRUE),
('Dave', 'Grohl', 'dgrohl', 'nirvana123', 'dgrohl@mail.sfsu.edu', FALSE),
('Eve', 'Polastri', 'evep', 'spyhunter', 'evep@mail.sfsu.edu', TRUE),
('Frank', 'Ocean', 'focean', 'blonded', 'focean@mail.sfsu.edu', TRUE),
('Grace', 'Hopper', 'ghopper', 'debug123', 'ghopper@mail.sfsu.edu', TRUE);

-- Insert Products (IDs 5 to 10)
INSERT INTO product (description, category, title, thumbnail, vendor_id) VALUES
('Organic avocado toast', 'food', 'Avocado Toast', 
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'), 3),
('Noise cancelling headphones', 'electronics', 'Bose QC45', 
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'), 3),
('Office Chair', 'furniture', 'Ergonomic Chair', 
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'), 4),
('Bike', 'Other', 'Mountain Bike', 
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'), 4),
('Calculus Textbook', 'books', 'Calculus Early Transcendentals', 
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'), 5),
('Water Bottle', 'Other', 'Hydro Flask', 
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'), 5);

-- Insert Listings (IDs 5 to 10)
INSERT INTO listing (listing_status, product_id, vendor_id, availability, price, discount, approval_status, conditions) VALUES
('Active', 5, 3, 'In Stock', 10.00, 0.00, 'Approved', 'New'),
('Active', 6, 3, 'In Stock', 250.00, 25.00, 'Approved', 'New'),
('Active', 7, 4, 'In Stock', 120.00, 10.00, 'Approved', 'Used - Good'),
('Active', 8, 4, 'Out of Stock', 300.00, 30.00, 'Pending', 'Used - Like New'),
('Delisted', 9, 5, 'In Stock', 80.00, 0.00, 'Denied', 'Used - Fair'),
('Active', 10, 5, 'In Stock', 25.00, 5.00, 'Approved', 'New');

-- Insert Reviews
INSERT INTO review (author_id, vendor_id, rating, comment) VALUES
(4, 3, 5, 'Delicious toast. Would buy again!'),
(5, 3, 4, 'Great headphones, good price.'),
(6, 4, 5, 'Bike was in great condition.'),
(1, 4, 3, 'Chair was okay, minor wear.'),
(4, 5, 5, 'Book came in great condition!'),
(2, 5, 4, 'Hydro flask keeps water cold all day.');

-- Insert Messages
INSERT INTO direct_message (sender_id, receiver_id, listing_id, content) VALUES
(4, 3, 5, 'Is the avocado toast gluten free?'),
(5, 3, 6, 'Can you drop the price a bit?'),
(6, 4, 7, 'Is pickup available tomorrow?'),
(1, 4, 8, 'Do you deliver the bike?'),
(4, 5, 9, 'Is this the 8th edition?'),
(2, 5, 10, 'Any scratches on the bottle?');

-- Insert Delivery Requests
INSERT INTO delivery_request (buyer_id, vendor_id, status, dropoff, buyer_special_request, listing_id) VALUES -- 'Cesar Chavez', 'Student Services', 'Library', 'Hensill Hall', 'The Village at Centennial Square', 'Annex 1'
(4, 3, 'Pending', 'Cesar Chavez',"Nothing here", 5),
(5, 3, 'Approved', 'Library',"NOthing here", 6),
(6, 4, 'Approved', 'Student Services',"NOthing here", 7),
(1, 4, 'Approved', 'Hensill Hall',"NOthing here", 8),
(4, 5, 'Denied', 'The Village at Centennial Square',"NOthing here", 9),
(2, 5, 'Pending', 'Annex 1',"NOthing here", 10);

-- Insert Delivery Instructions
INSERT INTO delivery_instruction (vendor_id, buyer_id, listing_id, pickup, dropoff, buyer_special_request) VALUES
(3, 4, 5, 'Quickly', 'Cesar Chavez', 'No contact delivery.'),
(3, 5, 6, 'Halal Shop', 'Student Services', ''),
(4, 6, 7, 'Cafe 101', 'Library', 'Need it before 5pm.'),
(4, 1, 8, 'Nizario\'s Pizza', 'Hensill Hall', ''),
(5, 4, 9, 'SFSU Bookstore', 'The Village at Centennial Square', 'Deliver after 3pm.'),
(5, 2, 10, 'Quickly', 'Annex 1', 'Careful with scratches.');
