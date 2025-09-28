# WALCHAND MART

**WALCHAND MART** is a comprehensive campus marketplace platform designed specifically for college students to facilitate secure buying, selling, and lost-and-found item management within the campus community. Built with modern web technologies and featuring AI-powered assistance, the platform creates a trusted environment for student-to-student transactions.

## ✨ Features

### 🛒 **Campus Marketplace**
- **Buy & Sell Items:** Students can list items for sale and browse products from fellow students
- **Category-wise Organization:** Items organized into Books, Electronics, Stationery, Clothing, and Others
- **Advanced Search:** Live search functionality with real-time filtering and category-based discovery
- **Detailed Product Pages:** Comprehensive item details with image galleries and seller information

### 🔍 **Lost & Found Center**
- **Report Found Items:** Students can report items they've found on campus
- **Claim Lost Items:** Easy search and claim process for lost belongings
- **Community Collaboration:** Help fellow students reunite with their lost items
- **Detailed Item Descriptions:** Upload multiple images and detailed descriptions

### 🤖 **AI-Powered Descriptions**
- **Smart Content Generation:** Integrated OpenRouter/OpenAI API for keyword-based item description enhancement

### 🔐 **Secure Authentication System**
- **College-Exclusive Access:** Registration restricted to verified college email addresses
- **OTP Verification:** Email-based OTP verification using Nodemailer for secure account creation
- **JWT Authentication:** Robust token-based authentication system for secure sessions
- **Session Management:** Automatic token refresh and secure logout functionality

### 🎨 **Modern UI/UX**
- **Glassmorphism Design:** Contemporary glass-morphic interface with backdrop blur effects
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices
- **Intuitive Navigation:** User-friendly interface with sidebar navigation and pagination

## 🛠 Technologies Used

### **Frontend**
- **React 18** - Modern UI library with hooks and context
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Elegant notification system

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Secure authentication tokens
- **Nodemailer** - Email service for OTP delivery
- **Multer** - File upload handling
- **bcryptjs** - Password hashing and security


### **Authentication & Security**
- **JWT Token System** - Secure user sessions
- **Email OTP Verification** - Two-factor authentication
- **College Email Validation** - Restricted access control
- **Password Encryption** - Secure credential storage


## 📸 Screenshots
![alt text](<frontend/public/Screenshot from 2025-09-28 19-40-36.png>)
![alt text](<frontend/public/Screenshot from 2025-09-28 19-41-09.png>)
![alt text](<frontend/public/Screenshot from 2025-09-28 19-39-35.png>)
![alt text](<frontend/public/Screenshot from 2025-09-28 19-39-41.png>)
![alt text](<frontend/public/Screenshot from 2025-09-28 19-39-48.png>)

## 📋 Requirements

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **College Email Account** (for registration)
- **OpenAI/OpenRouter API Key** (for AI features)
- **SMTP Email Service** (for OTP delivery)

