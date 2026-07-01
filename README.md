# Kiara AddToCart

Simple e-commerce app built with React + Vite (client) and Express + MySQL (server).


## Server

### Tech
- **Express**
- **MySQL**
- **NodeJS** 

### Database (MySQL)

**products** table:
| Column | Type         |
|--------|--------------|
| id     | INT (PK, AI) |
| name   | VARCHAR(100) |
| price  | INT          |

**cart** table:
| Column     | Type           |
|------------|----------------|
| id         | INT (PK, AI)   |
| product_id | INT (FK)       |
| quantity   | INT (default 1) |

### Database Setup

1. **Import the schema** to create the `shop` database, tables, and seed data:

```bash
mysql -u root -p < server/DB/schema.sql
```

2. **Configure credentials** in `server/DB/db.js`:

```js
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",      // your MySQL username
    password: "root",  // your MySQL password
    database: "shop"
});
```

Update the `user` and `password` fields to match your local MySQL setup. The server expects a database named `shop` with `products` and `cart` tables.

### API Endpoints

| Method | Path               | Description                            |
|--------|--------------------|----------------------------------------|
| GET    | `/products`        | List all products                      |
| GET    | `/cart`            | List cart items (joined with products) |
| POST   | `/cart`            | Add item (body: `{ product_id }`)      |
| PUT    | `/cart/:productId` | Update quantity (body: `{ quantity }`) |
| DELETE | `/cart/:productId` | Remove item from cart                  |

### Running

```bash
cd server
node server.js    
```

## Client

### Tech
- **React**

Cart is **global** — no auth or sessions. Every user shares the same cart.

### Running

```bash
cd client
npm run dev     
```

open localhost:5173 to view 
