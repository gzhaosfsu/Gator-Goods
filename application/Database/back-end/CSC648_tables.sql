-- Create schema and use it
CREATE DATABASE IF NOT EXISTS gator_goods;
USE gator_goods;

-- 1. Buyer Table
CREATE TABLE buyer (
    buyer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- 2. Courier Table
CREATE TABLE courier (
    courier_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    availability_status ENUM('Available', 'Unavailable'),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- 3. Delivery Instruction Table
CREATE TABLE delivery_instruction (
    delivery_id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT,
    courier_id INT,
    buyer_id INT,
    product_id INT,
    pickup TEXT,
    dropoff ENUM('Cesar Chavez', 'Student Services', 'Library', 'Hensill Hall', 'The Village at Centennial Square', 'Annex 1'),
    quantity INT,
    buyer_special_request TEXT,
    vendor_special_request TEXT,
    delivery_status ENUM('Assigned', 'Unassigned', 'Picked Up', 'Delivered'),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES vendor(vendor_id),
    FOREIGN KEY (courier_id) REFERENCES courier(courier_id),
    FOREIGN KEY (buyer_id) REFERENCES buyer(buyer_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- 4. Delivery Request Table
CREATE TABLE delivery_request (
    delivery_request_id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT,
    vendor_id INT,
    status ENUM('Pending', 'Approved', 'Denied'),
    dropoff ENUM('Cesar Chavez', 'Student Services', 'Library', 'Hensill Hall', 'The Village at Centennial Square', 'Annex 1'),
    listing_id INT,
    FOREIGN KEY (buyer_id) REFERENCES buyer(buyer_id),
    FOREIGN KEY (vendor_id) REFERENCES vendor(vendor_id),
    FOREIGN KEY (listing_id) REFERENCES listing(listing_id)
);

-- 5. Direct Message Table
CREATE TABLE direct_message (
                                message_id INT AUTO_INCREMENT PRIMARY KEY,
                                sender_id INT,
                                receiver_id INT,
                                listing_id INT,
                                content TEXT,
                                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                FOREIGN KEY (sender_id) REFERENCES user(user_id),
                                FOREIGN KEY (receiver_id) REFERENCES user(user_id),
                                FOREIGN KEY (listing_id) REFERENCES listing(listing_id)
);

-- 6. Listing Table
CREATE TABLE listing (
    listing_id INT AUTO_INCREMENT PRIMARY KEY,
    listing_status ENUM('Active', 'Sold', 'Delisted'),
    product_id INT,
    vendor_id INT,
    availability ENUM('In Stock', 'Out of Stock'),
    price DECIMAL(10,2),
    discount DECIMAL(5,2),
    approval_status ENUM('Pending', 'Approved', 'Denied'),
    listing_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (vendor_id) REFERENCES vendor(vendor_id)
);
-- 7. Product Table
CREATE TABLE product (
                         product_id INT AUTO_INCREMENT PRIMARY KEY,
                         description TEXT,
                         category ENUM('clothing', 'food', 'furniture', 'electronics', 'stationary', 'books', 'other'),
                         title VARCHAR(100),
                         image BLOB,
                         thumbnail BLOB,
                         vendor_id INT,
                         FOREIGN KEY (vendor_id) REFERENCES vendor(vendor_id)
);


-- 8. Review Table
CREATE TABLE review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT,
    vendor_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES user(user_id),
    FOREIGN KEY (vendor_id) REFERENCES user(user_id)
);

-- 9. User Table
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50) UNIQUE,
    password VARCHAR(50),
    sfsu_email VARCHAR(100) UNIQUE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
	image BLOB
);

-- 10. Vendor Table
CREATE TABLE vendor (
    vendor_id INT AUTO_INCREMENT PRIMARY KEY,
    rating DECIMAL(2,1),
    user_id INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);




