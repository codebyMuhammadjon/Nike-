# 👟 Nike Shop - Professional E-Commerce Platform

A modern, fully-featured e-commerce platform built with React 19, Redux Toolkit, React Query, and Tailwind CSS. This project demonstrates professional-grade development practices with extensive state management, real-time data synchronization, and an elegant admin dashboard.

## 🚀 Features

### **User Experience**

- ✅ Responsive product grid (3-4 columns with mobile optimization)
- ✅ Real-time search with debouncing
- ✅ Server-side pagination
- ✅ Dynamic product detail page with image gallery
- ✅ Add to cart with quantity management
- ✅ Full shopping cart with price calculations
- ✅ Multi-step checkout with Formik validation
- ✅ Toast notifications for user feedback

### **Admin Panel**

- ✅ Secure JWT-based login
- ✅ Complete product CRUD operations
- ✅ Product management dashboard with modal forms
- ✅ Order management with status tracking
- ✅ Order cancellation and delivery marking
- ✅ Responsive admin sidebar navigation

### **Global Features**

- ✅ Dark mode toggle with persistent storage
- ✅ Multi-language support (UZ/RU/ENG) with i18n
- ✅ Redux global state management
- ✅ React Query for intelligent server state caching
- ✅ Axios JWT interceptors for secure API calls
- ✅ Skeleton loading screens
- ✅ Professional dark mode in Tailwind CSS v4

## 📦 Tech Stack

### **Frontend Framework**

- **React 19** - Latest React with all modern features
- **Vite** - Ultra-fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS with dark mode

### **State Management**

- **Redux Toolkit** - Centralized state (Auth, Cart, Theme)
- **React Query (TanStack)** - Server state caching and synchronization
- **Formik + Yup** - Form management and validation

### **API & HTTP**

- **Axios** - HTTP client with custom interceptors
- **JWT Authentication** - Secure token-based auth

### **Localization**

- **i18next** - Multi-language support (3 languages)

### **UI Components**

- **Lucide React** - Beautiful SVG icons

## 📁 Project Structure

```
nike-shop/
├── src/
│   ├── api/
│   │   ├── axiosConfig.js       # Axios instance with JWT interceptors
│   │   ├── queryClient.js       # React Query configuration
│   │   └── hooks.js             # Custom API hooks
│   │
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js     # Authentication state
│   │   │   ├── cartSlice.js     # Shopping cart state
│   │   │   └── themeSlice.js    # Dark mode state
│   │   └── index.js             # Redux store setup
│   │
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar with search
│   │   ├── Footer.jsx           # Footer with links
│   │   ├── ProductCard.jsx      # Reusable product card
│   │   ├── SkeletonLoader.jsx   # Loading skeleton
│   │   └── AdminSidebar.jsx     # Admin navigation
│   │
│   ├── layout/
│   │   ├── UserLayout.jsx       # User pages wrapper
│   │   └── AdminLayout.jsx      # Admin pages wrapper
│   │
│   ├── pages/
│   │   ├── User/
│   │   │   ├── Home.jsx         # Product listing with search & pagination
│   │   │   ├── ProductDetail.jsx # Product detail page
│   │   │   ├── Cart.jsx         # Shopping cart
│   │   │   └── Checkout.jsx     # Checkout form
│   │   └── Admin/
│   │       ├── AdminLogin.jsx   # Admin authentication
│   │       └── AdminProducts.jsx # Product management
│   │
│   ├── i18n/
│   │   ├── index.js             # i18n configuration
│   │   └── locales/
│   │       ├── uz.json          # Uzbek translations
│   │       ├── ru.json          # Russian translations
│   │       └── en.json          # English translations
│   │
│   ├── App.jsx                  # Main routing
│   ├── main.jsx                 # App entry point with providers
│   └── index.css                # Tailwind directives
│
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── vite.config.js               # Vite configuration
└── eslint.config.js             # ESLint rules
```

## 🔧 Installation & Setup

### **1. Install Dependencies**

```bash
npm install
```

### **2. Start Development Server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or next available port)

### **3. Build for Production**

```bash
npm run build
```

### **4. Preview Production Build**

```bash
npm run preview
```

## 📡 API Integration

The app connects to a backend API at `http://localhost:5000`. Key endpoints:

### **Products**

- `GET /products` - List products (with pagination)
- `GET /products/:id` - Get product details
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### **Authentication**

- `POST /auth/admin-login` - Admin login

### **Orders**

- `GET /orders` - List orders (admin)
- `POST /orders` - Create order (checkout)
- `PATCH /orders/:id` - Update order status

## 🎯 Key Features Explained

### **Redux State Management**

- **auth**: User token, role, user info
- **cart**: Shopping cart items with persistence
- **theme**: Dark mode toggle state

### **React Query**

- Automatic caching with 5-minute stale time
- Automatic invalidation after mutations
- Device tree mutations for optimistic updates

### **Formik Validation**

- Admin login: Username + password
- Checkout: Full shipping address form
- Admin products: Product details with URL validation

### **Axios Interceptors**

- Request: Automatically add JWT token
- Response: Redirect to login on 401 errors

### **i18n Implementation**

- Default language: Uzbek
- Language stored in localStorage
- Switches persist across sessions

## 🎨 Dark Mode

- Toggle via Moon/Sun icon in navbar
- Stored in Redux state and localStorage
- Applied to entire app using Tailwind's `dark:` class
- Automatic initialization on app load

## 🛒 Shopping Flow

1. **Browse** - View products with real-time search and pagination
2. **Compare** - Click product for detailed view with images
3. **Select** - Choose size and color
4. **Checkout** - Fill shipping form with validation
5. **Order** - Complete purchase with total calculation

## 👨‍💼 Admin Workflow

1. **Login** - Access admin panel with credentials
2. **Manage Products** - Create, edit, delete products
3. **View Orders** - Track customer orders
4. **Update Status** - Mark orders as delivered or cancel

## 🔐 Security Features

- JWT token stored in localStorage
- `Authorization` header automatically added
- 401 responses redirect to login
- Protected admin routes
- Form validation on all inputs

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, lg, md
- Touch-friendly buttons and navigation
- Optimized for all screen sizes

## 🌐 Localization

The app supports three languages:

- **UZ** - Uzbek (Default)
- **RU** - Russian
- **EN** - English

Switch via language buttons in header.

## 📊 Performance Optimizations

- Skeleton loading screens
- React Query caching strategy
- Image optimization ready
- Debounced search
- Lazy component loading

## 🚦 Running the App

**Development:**

```bash
npm run dev
```

**Production Build:**

```bash
npm run build && npm run preview
```

**Linting:**

```bash
npm run lint
```

## 📝 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

## 🤝 Contributing

This is a learning project. Feel free to extend:

- Add payment gateway integration
- Implement product reviews
- Add wishlist feature
- Enhance admin analytics
- Add inventory management

## 📄 License

MIT - Open for educational use

---

**Made with ❤️ using React 19 + Vite**

### Quick Start Checklist

- [ ] Run `npm install`
- [ ] Start backend API on port 5000
- [ ] Run `npm run dev`
- [ ] Open http://localhost:5173
- [ ] Test user features on home page
- [ ] Test admin panel at `/admin/login`
- [ ] Switch languages in navbar
- [ ] Toggle dark mode
#   N i k e -  
 