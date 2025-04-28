USE gator_goods;
-- Insert Users
INSERT INTO user (first_name, last_name, username, password, sfsu_email, is_verified) VALUES
('John', 'Doe', 'johndoe', 'password123', 'johndoe@mail.sfsu.edu', TRUE),
('Jane', 'Smith', 'janesmith', 'securepass', 'janesmith@mail.sfsu.edu', TRUE),
('Alice', 'Johnson', 'alicej', 'mypassword', 'alicej@mail.sfsu.edu', FALSE);

-- Insert Vendors
INSERT INTO vendor (rating, user_id) VALUES
(1, 1),
(2, 2);

-- Insert Buyers
INSERT INTO buyer (user_id) VALUES
(3);

-- Insert Couriers
INSERT INTO courier (user_id, availability_status) VALUES
(3, 'Available');

-- Insert Products
INSERT INTO product (description, category, title, image, thumbnail, vendor_id) VALUES
('Comfortable cotton t-shirt', 'clothing', 'SF State T-Shirt', 	
	LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'),
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'),1),
('Laptop with 16GB RAM', 'electronics', 'Gaming Laptop', 
	LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'),
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'),2),
('Cellphone', 
    'electronics', 
    'iPhone 12', 
	LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'),
    LOAD_FILE('/var/lib/mysql-files/648BLOBsample.png'),
    1
),
('Harry Potter',
    'books',
    'big book',
    LOAD_FILE('/home/student/Downloads/648BLOBsample.png'),
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
INSERT INTO delivery_instruction (vendor_id, courier_id, buyer_id, product_id, pickup, dropoff, quantity, buyer_special_request, delivery_status) VALUES
(1, 1, 2, 1, 'Library Annex', 'SCI Building', 1, 'Leave at front desk.', 'Handle with care.', 'Assigned');