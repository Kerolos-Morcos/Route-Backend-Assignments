// PART 3
// 1- Queries Used:
// CREATE DATABASE retail_store_db;
// USE retail_store_db;

// SELECT * FROM suppliers;

// CREATE TABLE suppliers (
//     SupplierID INT PRIMARY KEY AUTO_INCREMENT,
//     SupplierName VARCHAR(100) NOT NULL,
//     ContactNumber VARCHAR(20) NOT NULL
// );


// CREATE TABLE products (
//     ProductID INT PRIMARY KEY AUTO_INCREMENT,
//     ProductName VARCHAR(100) NOT NULL,
//     Price DECIMAL(10,2) NOT NULL,
//     StockQuantity INT NOT NULL,
//     SupplierID INT,
//     CONSTRAINT fk_products_suppliers
//         FOREIGN KEY (SupplierID)
//         REFERENCES suppliers(SupplierID) 
//         ON UPDATE CASCADE
//         ON DELETE CASCADE
// );

// CREATE TABLE sales (
//     SaleID INT PRIMARY KEY AUTO_INCREMENT,
//     ProductID INT,
//     QuantitySold INT,
//     SaleDate DATE,
//     CONSTRAINT fk_sales_products
//         FOREIGN KEY (ProductID)
//         REFERENCES products(ProductID)
//         ON UPDATE CASCADE
// 		ON DELETE CASCADE
// );

import mysql2 from 'mysql2/promise';
import express from 'express';

const port = 5010;
const app = express();
app.use(express.json());

let connection;
try {
    connection = await mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3407,
        database: 'retail_store_db'
    });
    console.log('Connected to the database', connection.config.database);
} catch (error) {
    console.log('Error connecting to the database:', error);
}

// Routes for suppliers (CRUD operations)
// Add a supplier
app.post('/suppliers/add', async (req, res) => {
    const { SupplierName, ContactNumber } = req.body;
    const insertQuery = 'INSERT INTO suppliers (SupplierName, ContactNumber) VALUES (?, ?)';
    try {
        const [result] = await connection.execute(insertQuery, [SupplierName, ContactNumber]);
        console.log('Supplier created:', result);
        res.status(201).json({ message: 'Supplier created Successfully' }, result);
    } catch (error) {
        console.error('Error creating supplier:', error);
        res.status(500).json({ error: 'Failed to create supplier' });
    }
});

// Get all suppliers
app.get('/suppliers', async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM suppliers');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ error: 'Failed to fetch suppliers' });
    }
});

// Update supplier information.
app.put('/suppliers/:id', async (req, res) => {
    const supplierId = req.params.id;
    const { SupplierName, ContactNumber } = req.body;
    const updateQuery = 'UPDATE suppliers SET SupplierName = ?, ContactNumber = ? WHERE SupplierID = ?';
    try {
        const [result] = await connection.execute(updateQuery, [SupplierName, ContactNumber, supplierId]);
        if (result.affectedRows === 0) {
            console.log('Supplier not found');
            res.status(404).json({ error: 'Supplier not found' });
        } else {
            console.log('Supplier updated Successfully');
            res.json({ message: 'Supplier updated Successfully' });
        }
    } catch (error) {
        console.error('Error updating supplier:', error);
        res.status(500).json({ error: 'Failed to update supplier' });
    }
})

// Delete a supplier
app.delete('/suppliers/:id', async (req, res) => {
    const supplierId = req.params.id;
    const deleteQuery = 'DELETE FROM suppliers WHERE SupplierID = ?';
    try {
        const [result] = await connection.execute(deleteQuery, [supplierId]);
        if (result.affectedRows === 0) {
            console.log('Supplier not found');
            res.status(404).json({ error: 'Supplier not found' });
        } else {
            console.log('Supplier deleted Successfully');
            res.json({ message: 'Supplier deleted Successfully' });
        }
    } catch (error) {
        console.error('Error deleting supplier:', error);
        res.status(500).json({ error: 'Failed to delete supplier' });
    }
})

// ======================================================================================
// Routes for products (CRUD operations)
// Add a product
app.post('/products/add', async (req, res) => {
    const { ProductName, Price, StockQuantity, SupplierID } = req.body;
    const insertQuery = 'INSERT INTO products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await connection.execute(insertQuery, [ProductName, Price, StockQuantity, SupplierID]);
        console.log('Product Created Successfully:', result);
        res.status(201).json({ message: 'Product created Successfully' }, result);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// Get all products
app.get('/products', async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get a specific product by id
app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const [rows] = await connection.execute('SELECT * FROM products WHERE ProductID = ?', [productId]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// UPDATE-PUT a product by id
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { ProductName, Price, StockQuantity, SupplierID } = req.body;
    const updateQuery = 'UPDATE products SET ProductName = ?, Price = ?, StockQuantity = ?, SupplierID = ? WHERE ProductID = ?';
    try {
        const [result] = await connection.execute(updateQuery, [ProductName, Price, StockQuantity, SupplierID, productId]);
        if (result.affectedRows === 0) {
            console.log('Product not found');
            res.status(404).json({ error: 'Product not found' });
        } else {
            console.log('Product updated Successfully');
            res.json({ message: 'Product updated Successfully' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE a product
app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const deleteQuery = 'DELETE FROM products WHERE ProductID = ?';
    try {
        const [result] = await connection.execute(deleteQuery, [productId]);
        if (result.affectedRows === 0) {
            console.log('Product not found');
            res.status(404).json({ error: 'Product not found' });
        } else {
            console.log('Product deleted Successfully');
            res.json({ message: 'Product deleted Successfully' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
})
// ======================================================================================
// Routes for Sales (CRUD operations)  
// record a sale
app.post('/sales/add', async (req, res) => {
    const { ProductID, QuantitySold, SaleDate } = req.body;
    const insertQuery = 'INSERT INTO sales (ProductID, QuantitySold, SaleDate) VALUES (?, ?, ?)';
    try {
        const [result] = await connection.execute(insertQuery, [ProductID, QuantitySold, SaleDate]);
        console.log('Sale created Successfully:', result);
        res.status(201).json({ message: 'Sale created Successfully' }, result);
    } catch (error) {
        console.error('Error creating sale:', error);
        res.status(500).json({ error: 'Failed to create sale' });
    }
});

// retrieve all sales
app.get('/sales', async (req, res) => {
    try {
        const [result] = await connection.execute('SELECT * FROM sales');
        console.log('Sales fetched Successfully:', result);
        res.status(200).json({ message: 'Sales fetched Successfully', result });
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({ error: 'Failed to fetch sales' });
    }
});

// retrieve sales for a specific product
app.get('/sales/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const [result] = await connection.execute('SELECT * FROM sales WHERE ProductID = ?', [productId]);
        console.log('Sales fetched Successfully:', result);
        res.status(200).json({ message: 'Sales fetched Successfully', result });
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({ error: 'Failed to fetch sales' });
    }
});
// ======================================================================================
// DATABASE MODIFICATIONS (DDL)
// ● Add a Category column to the Products table.
app.patch('/products/add-category', async (req, res) => {
    try {
        await connection.execute('ALTER TABLE products ADD COLUMN Category VARCHAR(100) DEFAULT "Test"');
        console.log('Category column added Successfully');
        res.status(200).json({ message: 'Category column added Successfully' });
    } catch (error) {
        console.error('Error adding category column:', error);
        res.status(500).json({ error: 'Failed to add category column' });
    }
})

// ● Remove the Category column.
app.patch('/products/remove-category', async (req, res) => {
    try {
        await connection.execute('ALTER TABLE products DROP COLUMN Category');
        console.log('Category column removed Successfully');
        res.status(200).json({ message: 'Category column removed Successfully' });
    } catch (error) {
        console.error('Error removing category column:', error);
        res.status(500).json({ error: 'Failed to remove category column' });
    }
})

// ● Change ContactNumber to VARCHAR(15).
app.patch('/suppliers/modify-contactNumber', async (req, res) => {
    try {
        await connection.execute('ALTER TABLE suppliers MODIFY COLUMN ContactNumber VARCHAR(15)');
        console.log('ContactNumber modified Successfully');
        res.status(200).json({ message: 'ContactNumber modified Successfully' });
    } catch (error) {
        console.error('Error modifying ContactNumber:', error);
        res.status(500).json({ error: 'Failed to modify ContactNumber' });
    }
});

// ● Add a NOT NULL constraint to ProductName.
app.patch('/products/add-not-null', async (req, res) => {
    try {
        await connection.execute('ALTER TABLE PRODUCTS MODIFY COLUMN ProductName VARCHAR(100) NOT NULL');
        console.log('ProductName Constraint modified Successfully');
        res.status(200).json({ message: 'ProductName constraint modified Successfully' });
    } catch (error) {
        console.error('Error modifying ProductName constraint:', error);
        res.status(500).json({ error: 'Failed to modify ProductName constraint' });
    }
});
// ======================================================================================
// Create an API endpoint or initialization script to insert the following data:
// a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
app.post('/suppliers/add-specific', async (req, res) => {
    try {
        const [result] = await connection.execute(
            "INSERT INTO suppliers (SupplierName, ContactNumber) VALUES ('FreshFoods', '01001234567')"
        );
        console.log('Supplier created:', result);
        res.status(201).json({ message: 'Supplier created Successfully' }, result);
    } catch (error) {
        console.error('Error creating supplier:', error);
        res.status(500).json({ error: 'Failed to create supplier' });
    }
});

// b. Insert the following three products, all provided by 'FreshFoods':
// i. 'Milk' with a price of 15.00 and stock quantity of 50.
// ii. 'Bread' with a price of 10.00 and stock quantity of 30.
// iii. 'Eggs' with a price of 20.00 and stock quantity of 40.
app.post('/products/add-specific', async (req, res) => {
    try {
        const [result] = await connection.execute(
            `INSERT INTO products (ProductName, Price, StockQuantity, SupplierID)
             VALUES
             ('Milk', 15.00, 50, 4),
             ('Bread', 10.00, 30, 4),
             ('Eggs', 20.00, 40, 4)`
        );
        console.log('Products created:', result);
        res.status(201).json({
            message: 'Products created Successfully'
        });
    } catch (error) {
        console.error('Error creating products:', error);
        res.status(500).json({
            error: 'Failed to create products'
        });
    }
});

// c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
app.post('/sales/add-specific', async (req, res) => {
    try {
        const [result] = await connection.execute(
            "INSERT INTO sales (ProductID, QuantitySold, SaleDate) VALUES (15, 2, '2025-08-23')"
        );
        console.log('Sale created:', result);
        res.status(201).json({ message: 'Sale created Successfully' }, result);
    } catch (error) {
        console.error('Error creating sale:', error);
        res.status(500).json({ error: 'Failed to create sale' });
    }
});

// Create an API endpoint to update the price of 'Bread' to 25.00.
app.patch('/products/update-specific', async (req, res) => {
    try {
        const [result] = await connection.execute(
            "UPDATE products SET Price = 25.00 WHERE ProductName = 'Bread'"
        );
        console.log('Product updated:', result);
        res.status(200).json({ message: 'Product updated Successfully' }, result);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
})

// Create an API endpoint to delete the product 'Eggs'.
app.delete('/delete-specific', async (req, res) => {
    try {
        const [result] = await connection.execute(
            "DELETE FROM products WHERE ProductName = 'Eggs'"
        );
        console.log('Product deleted:', result);
        res.status(200).json({ message: 'Product deleted Successfully' }, result);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
})

// Create a reporting endpoint to retrieve the total quantity sold for each product
// using SQL aggregate functions
app.get('/total-quantity', async (req, res) => {
    try {
        const [result] = await connection.execute(
            'SELECT products.ProductName, SUM(sales.QuantitySold) AS TotalQuantity FROM products INNER JOIN sales ON products.ProductID = sales.ProductID GROUP BY products.ProductName'
        );
        console.log('Total quantity sold:', result);
        res.status(200).json({ message: 'Total quantity sold', result });
    } catch (error) {
        console.error('Error retrieving total quantity sold:', error);
        res.status(500).json({ error: 'Failed to retrieve total quantity sold' });
    }
});

// Create a reporting endpoint to retrieve the product with the highest stock quantity
app.get('/highest-stock', async (req, res) => {
    try {
        // const result = await connection.execute('SELECT MAX(StockQuantity) AS highest_stock_quantity FROM products');
        // OR
        const [result] = await connection.execute(
            'SELECT ProductName, StockQuantity FROM products ORDER BY StockQuantity DESC LIMIT 1'
        );
        console.log('Product with highest stock quantity', result);
        res.status(200).json({ message: 'Product with highest stock quantity', result });
    } catch (err) {
        console.error('Error retrieving product with highest stock quantity', err);
        res.status(500).json({ error: 'Failed to retrieve the product' });
    }
})

// Create a reporting endpoint to retrieve suppliers whose names start with 'F'.
app.get('/suppliers-start-with-f', async (req, res) => {
    try {
        const [result] = await connection.execute(
            'SELECT SupplierName FROM suppliers WHERE SupplierName LIKE "F%"'
        );
        console.log('Suppliers with names starting with "F":', result);
        res.status(200).json({ message: 'Suppliers with names starting with "F"', result });
    } catch (error) {
        console.error('Error retrieving suppliers with names starting with "F":', error);
        res.status(500).json({ error: 'Failed to retrieve suppliers' });
    }
})

// Create a reporting endpoint to retrieve all products that have never been sold
app.get('/products-never-sold', async (req, res) => {
    try {
        const [result] = await connection.execute(
            'SELECT ProductName FROM products WHERE ProductID NOT IN (SELECT ProductID FROM sales)'
        );
        console.log('Products that have never been sold:', result);
        res.status(200).json({ message: 'Products that have never been sold', result });
    } catch (error) {
        console.error('Error retrieving products that have never been sold:', error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
})

// Create a reporting endpoint to retrieve all sales including:
// ● Product name
// ● Quantity sold
// ● Sale date using SQL JOIN operations.
app.get('/all-sales-with-conditions', async (req, res) => {
    try {
        const [result] = await connection.execute(
            'SELECT products.ProductName, sales.QuantitySold, sales.SaleDate FROM products INNER JOIN sales ON products.ProductID = sales.ProductID'
        );
        console.log('All sales with conditions:', result);
        res.status(200).json({ message: 'All sales with Sale Date', result });
    } catch (error) {
        console.error('Error retrieving all sales with sale date:', error);
        res.status(500).json({ error: 'Failed to retrieve sales' });
    }
});

// DATABASE (DCL)
// Create a SQL script or secure administrative endpoint to create a MySQL user
// named store_manager and grant the following permissions on all tables:
// ● SELECT
// ● INSERT
// ● UPDATE
app.post('/create-store-manager', async (req, res) => {
    try {
        await connection.execute(
            "CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '123456'"
        );
        await connection.execute(
            "GRANT SELECT, INSERT, UPDATE ON retail_store_db.* TO 'store_manager'@'localhost'"
        );
        console.log('Store manager created successfully');
        res.status(201).json({ message: 'Store manager created Successfully' });
    } catch (error) {
        console.error('Error creating store manager:', error);
        res.status(500).json({ error: 'Failed to create store manager' });
    }
});

// FOR TESTING (NOT IN ASSIGNMENT)
// Get store manager grants
app.get('/store-manager', async (req, res) => {
    try {
        const [result] = await connection.execute("SHOW GRANTS FOR 'store_manager'@'localhost'");
        console.log('Store manager grants:', result);
        res.status(200).json({ message: 'Store manager grants', result });
    } catch (error) {
        console.error('Error retrieving store manager data:', error);
        res.status(500).json({ error: 'Failed to retrieve store manager data' });
    }
});

// Revoke the UPDATE permission from “store_manager”
app.patch('/revoke-store-manager', async (req, res) => {
    try {
        await connection.execute("REVOKE UPDATE ON retail_store_db.* FROM 'store_manager'@'localhost'");
        console.log('Update permission revoked Successfully');
        res.status(200).json({ message: 'Update permission revoked Successfully' });
    } catch (error) {
        console.error('Error revoking update permission:', error);
        res.status(500).json({ error: 'Failed to revoke update permission' });
    }
})

// Grant DELETE permission to “store_manager” only on the Sales table
app.patch('/grant-delete-store-manager', async (req, res) => {
    try {
        await connection.execute("GRANT DELETE ON retail_store_db.sales TO 'store_manager'@'localhost'");
        console.log('Delete permission granted Successfully');
        res.status(200).json({ message: 'Delete permission granted Successfully' });
    } catch (error) {
        console.error('Error granting delete permission:', error);
        res.status(500).json({ error: 'Failed to grant delete permission' });
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});