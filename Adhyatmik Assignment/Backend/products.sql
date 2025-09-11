CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL
);
INSERT INTO products (name, price, category) VALUES
('Kalles Theme', 79.00, 'Fashion'),
('Ecomus Theme', 98.00, 'Shopping'),
('Minimog Theme', 89.00, 'Fashion'),
('Gecko Theme', 99.00, 'Fashion'),
('Ambaz Theme', 29.00, 'Health & Beauty');
