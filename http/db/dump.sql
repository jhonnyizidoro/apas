-- CREATE DATABASE
DROP SCHEMA IF EXISTS apas;
CREATE DATABASE apas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE apas;

-- DROP
DROP TABLE IF EXISTS banners;
DROP TABLE IF EXISTS pages;
DROP TABLE IF EXISTS phones;
DROP TABLE IF EXISTS apps;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS users;

-- CREATE TABLES
CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    status BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE news (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    content MEDIUMTEXT NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE apps (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    logo VARCHAR(255) NOT NULL,
    instagram VARCHAR(255) DEFAULT NULL,
    facebook VARCHAR(255) DEFAULT NULL,
    google_maps_iframe MEDIUMTEXT DEFAULT NULL,
    address VARCHAR(255) NOT NULL,
    business_hours VARCHAR(255) NOT NULL
);

CREATE TABLE phones (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL
);

CREATE TABLE pages (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    content MEDIUMTEXT NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE
);


CREATE TABLE banners (
     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     image VARCHAR(255) NOT NULL,
     link VARCHAR(255) DEFAULT NULL
);


-- SEED
INSERT INTO apps (logo, address, business_hours) VALUES ('https://logomaster.ai/static/media/gallery002.936afb9d.png', 'Adão Sobocinski, 161, Cristo Rei', 'De segunda a segunda das 08:00 as 18:00');
INSERT INTO pages (name, content) VALUES ('Quem somos', 'Sed libero. Fusce vulputate eleifend sapien. Donec sodales sagittis magna. Fusce vulputate eleifend sapien. Phasellus nec sem in justo pellentesque facilisis.'),
                                         ('Escola de libras', 'Sed libero. Fusce vulputate eleifend sapien. Donec sodales sagittis magna. Fusce vulputate eleifend sapien. Phasellus nec sem in justo pellentesque facilisis.'),
                                         ('Transparência', 'Sed libero. Fusce vulputate eleifend sapien. Donec sodales sagittis magna. Fusce vulputate eleifend sapien. Phasellus nec sem in justo pellentesque facilisis.');
INSERT INTO phones (type, number) VALUES ('Comercial', '(41) 9 9999-9999'),
                                         ('WhatsApp', '(41) 3333-3333');
INSERT INTO users (email, password, admin) VALUES ('admin@gmail.com', '$2a$08$LUK5lUiF/hxcbK/5jcuarej34D8mGim92IQ3L7dX4I7Y8a8gxAg7W', TRUE);
INSERT INTO users (email, password) VALUES ('user@gmail.com', '$2a$08$LUK5lUiF/hxcbK/5jcuarej34D8mGim92IQ3L7dX4I7Y8a8gxAg7W');
INSERT INTO banners (image, link) VALUES ('https://s3.ecompletocarros.dev/images/lojas/108/banners/177/banner_image_1578265359_9b317d59e1fd0132796bb53541b66dc7.jpeg', 'https://www.afancarmultimarcas.com.br/')