CREATE DATABASE IF NOT EXISTS nutrisurvey;

USE nutrisurvey;

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category ENUM('food', 'beverage') NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255),
  nutritional_values JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_category ON items(category);
CREATE INDEX idx_name ON items(name);