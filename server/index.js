import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nutrisurvey',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
app.get('/api/items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/items', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, nutritionalValues } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      'INSERT INTO items (name, description, category, price, image_url, nutritional_values) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, category, price, imageUrl, JSON.stringify(nutritionalValues)]
    );

    res.status(201).json({ id: result.insertId, message: 'Item created successfully' });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/items/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, nutritionalValues } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    let query = 'UPDATE items SET name = ?, description = ?, category = ?, price = ?, nutritional_values = ?';
    let params = [name, description, category, price, JSON.stringify(nutritionalValues)];

    if (imageUrl) {
      query += ', image_url = ?';
      params.push(imageUrl);
    }

    query += ' WHERE id = ?';
    params.push(req.params.id);

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json({ message: 'Item updated successfully' });
    }
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM items WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json({ message: 'Item deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});