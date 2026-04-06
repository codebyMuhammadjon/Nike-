# Admin Panel Error Fixes

## Error 1: Duplicate Key Warning (keys 4 & 5)

**Status**: ✅ FIXED in Frontend

This error typically means your API is returning products or orders with duplicate IDs.

### Solution:

The frontend has been updated with proper key handling. If the error persists, check your backend:

```javascript
// Issue: Backend returning duplicate IDs
// Example of bad data:
[
  { id: 4, name: "Product A" },
  { id: 4, name: "Product B" }, // ❌ Duplicate ID
  { id: 5, name: "Product C" },
  { id: 5, name: "Product D" }, // ❌ Duplicate ID
][
  // Solution: Ensure each product/order has a UNIQUE ID
  ({ id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 4, name: "Product D" })
];
```

### Check Your API:

1. Go to your backend
2. Verify that products table has unique IDs
3. Verify that orders table has unique IDs
4. Run this in your backend database:

```sql
-- For Products (adjust table name as needed)
SELECT id, COUNT(*) FROM products GROUP BY id HAVING COUNT(*) > 1;

-- For Orders
SELECT id, COUNT(*) FROM orders GROUP BY id HAVING COUNT(*) > 1;
```

If results show duplicates, delete or fix them.

---

## Error 2: "Cannot POST /auth/admin-login" - 404 Error

**Status**: ⚠️ REQUIRES BACKEND IMPLEMENTATION

This is the main issue. Your backend server does NOT have the admin login endpoint implemented.

### Backend Setup Required:

#### Step 1: Check Your Backend Structure

```
backend/
├── routes/
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── authRoutes.js  (← Need to create or update this)
├── controllers/
│   ├── productController.js
│   ├── orderController.js
│   └── authController.js  (← Need to create this)
├── server.js
└── package.json
```

#### Step 2: Create Auth Controller (backend/controllers/authController.js)

```javascript
const jwt = require("jsonwebtoken");

// Admin login endpoint
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    // Simple admin authentication (replace with database lookup)
    const ADMIN_USERNAME = "admin"; // Change this
    const ADMIN_PASSWORD = "admin123"; // Change this

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: 1,
        username: username,
        role: "admin",
      },
      process.env.JWT_SECRET || "admin_secret_key", // Use environment variable!
      { expiresIn: "7d" },
    );

    // Return token
    res.json({
      success: true,
      token: token,
      user: {
        id: 1,
        username: username,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
```

#### Step 3: Create Auth Routes (backend/routes/authRoutes.js)

```javascript
const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/authController");

// Admin login route
router.post("/admin-login", adminLogin);

module.exports = router;
```

#### Step 4: Update Your Server (backend/server.js)

```javascript
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // Add this
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes); // Add this line
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Step 5: Install JWT Package (if not installed)

```bash
npm install jsonwebtoken
```

#### Step 6: (OPTIONAL) Add Middleware for Protected Routes

```javascript
// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

exports.verifyAdminToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "admin_secret_key",
    );
    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Usage in routes:
// router.post('/products', verifyAdminToken, createProduct);
```

---

### Testing Admin Login

After implementing the backend:

#### Option 1: Using Curl

```bash
curl -X POST http://localhost:5000/auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

#### Option 2: Using Frontend

1. Go to `http://localhost:3000/admin/login`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
3. Click Login
4. Should redirect to Dashboard

---

### Expected Response (Success)

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

---

## Environment Variables (Recommended)

Create `.env` file in your backend root:

```env
JWT_SECRET=your-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
PORT=5000
NODE_ENV=development
```

Then use in code:

```javascript
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
```

---

## Checklist

- [ ] Backend `/auth/admin-login` endpoint created
- [ ] JWT token implemented
- [ ] Admin credentials configured
- [ ] Backend server running on port 5000
- [ ] CORS enabled on backend
- [ ] Frontend can successfully login
- [ ] Admin Dashboard accessible after login
- [ ] Products table has unique IDs
- [ ] Orders table has unique IDs

---

## After Fixes - Test the Complete Flow

1. **Start Backend**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start Frontend**

   ```bash
   npm run dev
   ```

3. **Test Admin Panel**
   - Login: http://localhost:3000/admin/login
   - Dashboard: http://localhost:3000/admin
   - Products: http://localhost:3000/admin/products
   - Orders: http://localhost:3000/admin/orders

---

## Common Issues & Solutions

| Issue                 | Solution                         |
| --------------------- | -------------------------------- |
| 404 admin-login       | Implement auth routes in backend |
| Duplicate key warning | Ensure unique IDs in database    |
| CORS error            | Add cors() middleware to backend |
| Token not saving      | Check localStorage in browser    |
| Auto logout           | JWT expired - login again        |
| Images not loading    | Verify image URLs are accessible |

---

If you need more help, check your backend logs:

```bash
# In backend terminal
node server.js
# Look for errors starting with "Error:" or "Cannot POST"
```
