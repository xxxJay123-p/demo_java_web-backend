use javadb;
-- CreateTable
CREATE TABLE User (
    id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('guest', 'user', 'admin') NOT NULL DEFAULT 'user',

    CONSTRAINT User_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE Diet (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,

    CONSTRAINT Diet_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE DietsOnProduct (
    id INT AUTO_INCREMENT NOT NULL,
    productId INT NOT NULL,
    dietId INT NOT NULL,

    CONSTRAINT DietsOnProduct_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE Product (
    id INT AUTO_INCREMENT NOT NULL,
    type ENUM ('coffee', 'drink', 'frostino', 'food', 'snack', 'pastries') NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    syrup ENUM('cinnamon', 'maple', 'vanilla', 'chai'),
    milk ENUM('cow', 'oat', 'almond', 'coconut', 'soy') DEFAULT 'cow',

    CONSTRAINT Product_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE ProductsOnOrders (
    id INT AUTO_INCREMENT NOT NULL,
    productId INT NOT NULL,
    orderId INT NOT NULL,

    CONSTRAINT ProductsOnOrders_pkey PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE Orders (
    id INT AUTO_INCREMENT NOT NULL,
    city VARCHAR(255) NOT NULL,
    postCode VARCHAR(255) NOT NULL,
    road VARCHAR(255) NOT NULL,
    userId INT NOT NULL,

    CONSTRAINT Order_pkey PRIMARY KEY (id)
);

-- CreateIndex
CREATE UNIQUE INDEX User_email_key ON User(email);

-- AddForeignKey
ALTER TABLE DietsOnProduct ADD CONSTRAINT DietsOnProduct_productId_fkey FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE DietsOnProduct ADD CONSTRAINT DietsOnProduct_dietId_fkey FOREIGN KEY (dietId) REFERENCES Diet(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE ProductsOnOrders ADD CONSTRAINT ProductsOnOrders_productId_fkey FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE ProductsOnOrders ADD CONSTRAINT ProductsOnOrders_orderId_fkey FOREIGN KEY (orderId) REFERENCES Orders(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE Orders ADD CONSTRAINT Orders_userId_fkey FOREIGN KEY (userId) REFERENCES User(id) ON DELETE RESTRICT ON UPDATE CASCADE;