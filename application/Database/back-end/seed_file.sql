USE gator_goods;

-- 1. Users
INSERT INTO user (first_name, last_name, username, password, sfsu_email, is_verified)
VALUES
  ('Alice', 'Nguyen', 'alice123', 'hashed_pw_1', 'alice@sfsu.edu', TRUE),
  ('Bob', 'Smith', 'bob_smith', 'hashed_pw_2', 'bob@sfsu.edu', TRUE),
  ('Charlie', 'Williams', 'charliew', 'hashed_pw_3', 'charlie@sfsu.edu', FALSE);

-- 2. Vendors
INSERT INTO vendor (rating, image, user_id)
VALUES
  (4.8, NULL, 1);

-- 3. Buyers
INSERT INTO buyer (image, user_id)
VALUES
  (NULL, 2),
  (NULL, 3);

-- 4. Couriers
INSERT INTO courier (image, user_id, availability_status)
VALUES
  (NULL, 3, 'Available');

-- 5. Products
INSERT INTO product (description, category, title, image, vendor_id)
VALUES
  ('Wireless earbuds with noise cancellation.', 'electronics', 'SoundPods Pro', NULL, 1),
  ('Ergonomic backpack with laptop compartment.', 'clothing', 'CampusPack 2.0', NULL, 1);

-- 6. Listings
INSERT INTO listing (listing_status, product_id, vendor_id, availability, price, discount, approval_status)
VALUES
  ('Active', 1, 1, 'In Stock', 49.99, 10, 'Approved'),
  ('Active', 2, 1, 'In Stock', 29.99, 0, 'Pending');

-- 7. Reviews
INSERT INTO review (author_id, vendor_id, rating, comment)
VALUES
  (2, 1, 5, 'Great product and fast delivery!'),
  (3, 1, 4, 'Product was as described.');

-- 8. Direct Messages
INSERT INTO direct_message (sender_id, receiver_id, listing_id, content)
VALUES
  (2, 1, 1, 'Hi! Is this still available?'),
  (1, 2, 1, 'Yes, it is!');

-- 9. Delivery Requests
INSERT INTO delivery_request (buyer_id, vendor_id, status, dropoff, listing_id)
VALUES
  (2, 1, 'Pending', 'SCI Building', 1);

-- 10. Delivery Instructions
INSERT INTO delivery_instruction (vendor_id, courier_id, buyer_id, product_id, pickup, dropoff, quantity, buyer_special_request, vendor_special_request, delivery_status)
VALUES
  (1, 1, 2, 1, 'Library Annex', 'SCI Building', 1, 'Leave at front desk.', 'Handle with care.', 'Assigned');
