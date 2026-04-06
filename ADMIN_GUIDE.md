# Nike Shop Admin Panel - Complete Guide

## Overview

The admin panel has been completely rebuilt with a comprehensive product management system, order tracking, and dashboard analytics.

## Admin Features

### 1. **Dashboard**

- **Quick Statistics**: Total products, orders, revenue, and low-stock items
- **Recent Orders**: View latest orders with their status
- **Low Stock Alerts**: Products with inventory ≤ 10 units
- **Real-time Updates**: Data refreshes automatically

### 2. **Product Management**

Complete CRUD operations for all products with the following fields:

#### Product Fields:

- **Product Name**: The name of the Nike product
- **Price (USD)**: Product price in US dollars
- **Category**: Choose from predefined categories:
  - Men's Shoes
  - Women's Shoes
  - Kids' Shoes
  - Apparel
  - Accessories
- **Stock Quantity**: Current inventory count
- **Color**: Product color from available options
- **Size**: Shoe size (6 to 13)
- **Description**: Detailed product description (min 10 characters)
- **Image URL**: Product image URL with live preview

#### Actions:

- ✅ **Add Product**: Click "Add Product" button to create new products
- ✏️ **Edit Product**: Click edit icon to modify existing products
- 🗑️ **Delete Product**: Remove products with confirmation
- 📊 **Stock Tracking**: Color-coded stock status:
  - 🟢 Green: Stock > 10
  - 🟡 Yellow: Stock 1-10
  - 🔴 Red: Out of stock

### 3. **Order Management**

Complete order tracking and status updates:

#### Order Status Flow:

```
Pending → Processing → Shipped → Delivered
                    └→ Cancelled
```

#### Features:

- 📋 **View All Orders**: Complete order listing with search
- 🔄 **Update Status**: Change order status using dropdown
- 📊 **Status Filters**: Filter orders by status
- 💰 **Revenue Tracking**: Total revenue calculation
- 📅 **Order Timeline**: Creation date and timestamps

#### Statistics Dashboard:

- Total Orders
- Pending Orders
- Processing Orders
- Shipped Orders
- Delivered Orders

### 4. **Admin Authentication**

- **Login Page**: Secure admin login with validation
- **Session Management**: Token-based authentication
- **Automatic Logout**: Token expiration handling
- **Protected Routes**: Only authenticated admins can access

## How to Use

### Accessing the Admin Panel

1. **Navigate to Login**: Go to `http://localhost:3000/admin/login`
2. **Login Credentials**: Use admin credentials:
   - Username: `admin`
   - Password: `admin123` (or provided credentials)
3. **Access Dashboard**: After login, you're redirected to `/admin`

### Adding a New Product

1. Click **"Add Product"** button
2. Fill in all required fields:
   - Product Name
   - Price
   - Category
   - Stock Quantity
   - Color
   - Size
   - Description
   - Image URL
3. See live image preview
4. Click **"Save"** to create product

### Editing a Product

1. Locate product in the table
2. Click the **Edit (pencil) icon**
3. Update any fields
4. Click **"Save"** to apply changes

### Deleting a Product

1. Locate product in the table
2. Click the **Delete (trash) icon**
3. Confirm deletion in the popup
4. Product is removed from inventory

### Managing Orders

1. Go to **Orders** menu
2. View all orders with details:
   - Order ID
   - Customer name and email
   - Number of items
   - Total amount
   - Current status
3. **Update Status**: Use dropdown to change status
4. **Filter by Status**: Click status tabs to filter

## Admin Panel Navigation

```
┌─────────────────────────┐
│   NIKE Admin Sidebar    │
├─────────────────────────┤
│ 📊 Dashboard            │
│ 📦 Products             │
│ 🛍️  Orders              │
│                         │
│ 🚪 Logout               │
└─────────────────────────┘
```

## API Integration

The admin panel connects to the backend API with these endpoints:

### Products

- `GET /products` - Fetch all products
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Orders

- `GET /orders` - Fetch all orders
- `PATCH /orders/:id` - Update order status

### Authentication

- `POST /auth/admin-login` - Admin login

## Features Included

### ✅ Complete

- [x] Product CRUD operations
- [x] Stock management with status indicators
- [x] Color and size selection
- [x] Image preview while editing
- [x] Order management system
- [x] Order status tracking
- [x] Dashboard with analytics
- [x] Error handling and notifications
- [x] Loading states
- [x] Form validation
- [x] Success/error messages
- [x] Dark mode support
- [x] Responsive design
- [x] Protected admin routes

### 🎨 UI/UX

- Modern, clean interface
- Dark mode support
- Responsive layout
- Real-time validation feedback
- Toast notifications for actions
- Loading spinners
- Color-coded status indicators
- Image previews

## Troubleshooting

### Issues & Solutions

**Problem**: Admin login not working

- Ensure backend API is running on `http://localhost:5000`
- Check credentials are correct
- Review browser console for errors

**Problem**: Products not loading

- Verify API connection
- Check token isn't expired
- Clear localStorage and re-login

**Problem**: Image not showing in preview

- Ensure URL is valid and accessible
- Try alternative image URL
- Check CORS settings on backend

**Problem**: Products not saving

- Verify all required fields are filled
- Check price is a valid number
- Ensure image URL is properly formatted

## Product Fields Validation

| Field       | Type   | Requirements  | Example                     |
| ----------- | ------ | ------------- | --------------------------- |
| Name        | Text   | Required      | Nike Air Max 90             |
| Price       | Number | Min: 0        | 120.00                      |
| Category    | Select | Required      | Men's Shoes                 |
| Stock       | Number | Min: 0        | 15                          |
| Color       | Select | Required      | Black                       |
| Size        | Select | Required      | 10                          |
| Description | Text   | Min: 10 chars | High-quality comfort...     |
| Image       | URL    | Valid URL     | https://example.com/img.jpg |

## Best Practices

1. **Stock Management**
   - Regularly update stock after sales
   - Monitor low-stock alerts
   - Keep inventory accurate

2. **Product Management**
   - Use clear, descriptive product names
   - Provide detailed descriptions
   - Upload high-quality images
   - Set realistic prices

3. **Order Management**
   - Update order status promptly
   - Track shipments regularly
   - Maintain communication with customers
   - Archive completed orders

4. **Security**
   - Logout after admin sessions
   - Don't share admin credentials
   - Keep token secure
   - Use strong passwords

## Performance Tips

- Products are loaded in batches (limit: 100)
- Images are lazy-loaded
- Pagination available for large datasets
- Real-time search functionality
- Optimized re-renders with React Query

## Future Enhancements

Potential features for future updates:

- [ ] Product categories management
- [ ] Bulk operations (import/export)
- [ ] Analytics and reports
- [ ] Customer management
- [ ] Promotional codes
- [ ] Inventory forecasting
- [ ] Advanced search filters
- [ ] Two-factor authentication

## Support

For issues or questions:

1. Check console for detailed error messages
2. Verify API connection
3. Review backend logs
4. Check network tab in DevTools

---

**Last Updated**: April 2026
**Version**: 1.0
