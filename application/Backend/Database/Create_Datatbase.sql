DROP DATABASE IF EXISTS gator_goods;
CREATE DATABASE gator_goods;
USE gator_goods;

-- 1. User Table
DROP TABLE IF EXISTS user;
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    sfsu_email VARCHAR(100) UNIQUE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
	image BLOB,
    is_courier BOOL DEFAULT FALSE,
    rating DECIMAL DEFAULT 5 CHECK (rating between 1 and 5)
);

-- 5. Product Table
DROP TABLE IF EXISTS product;
CREATE TABLE product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    category ENUM('clothing', 'food', 'furniture', 'electronics', 'stationary', 'books', 'other'),
    title VARCHAR(100),
    image BLOB,
    thumbnail MEDIUMBLOB,
    mimetype VARCHAR(50),
    vendor_id INT,
    FOREIGN KEY (vendor_id) REFERENCES user(user_id)
);

-- 6. Listing Table
DROP TABLE IF EXISTS listing;
CREATE TABLE listing (
    listing_id INT AUTO_INCREMENT PRIMARY KEY,
    listing_status ENUM('Active', 'Sold', 'Delisted') DEFAULT 'Active',
    product_id INT NOT NULL,
    vendor_id INT NOT NULL,
    availability ENUM('In Stock', 'Out of Stock') DEFAULT 'In Stock',
    price DECIMAL(10,2)NOT NULL,
    discount DECIMAL(5,2) DEFAULT 0,
    approval_status ENUM('Pending', 'Approved', 'Denied') DEFAULT 'Pending',
    listing_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    conditions ENUM('New', 'Used - Like New', 'Used - Good', 'Used - Fair') NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (vendor_id) REFERENCES user(user_id)
);

-- 7. Review Table
DROP TABLE IF EXISTS review;
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

-- 8. Direct Message Table
DROP TABLE IF EXISTS direct_message;
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

-- 9. Delivery Request Table
DROP TABLE IF EXISTS delivery_request;
CREATE TABLE delivery_request (
    delivery_request_id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT,
    vendor_id INT,
    status ENUM('Pending', 'Approved', 'Denied'),
    dropoff ENUM('Cesar Chavez', 'Student Services', 'Library', 'Hensill Hall', 'The Village at Centennial Square', 'Annex 1'),
    buyer_special_request TEXT,
    listing_id INT,
    FOREIGN KEY (buyer_id) REFERENCES user(user_id),
    FOREIGN KEY (vendor_id) REFERENCES user(user_id),
    FOREIGN KEY (listing_id) REFERENCES listing(listing_id)
);

-- 10. Delivery Instruction Table
DROP TABLE IF EXISTS delivery_instruction;
CREATE TABLE delivery_instruction (
    delivery_id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT,
    courier_id INT,
    buyer_id INT,
    listing_id INT,
    pickup TEXT,
    dropoff ENUM('Cesar Chavez', 'Student Services', 'Library', 'Hensill Hall', 'The Village at Centennial Square', 'Annex 1'),
    quantity INT,
    buyer_special_request TEXT,
    vendor_special_request TEXT,
    delivery_status ENUM('Assigned', 'Unassigned', 'Picked Up', 'Delivered') DEFAULT 'Unassigned',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES user(user_id),
    FOREIGN KEY (courier_id) REFERENCES user(user_id),
    FOREIGN KEY (buyer_id) REFERENCES user(user_id),
    FOREIGN KEY (listing_id) REFERENCES listing(listing_id)
);
