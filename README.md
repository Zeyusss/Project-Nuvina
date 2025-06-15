# Nuvina - Modern Blog Management System

A full-stack blog management system with user authentication, role-based access control, and AI-powered content generation.

## 🌟 Features

### Authentication & Authorization
- User registration and login
- Role-based access control (Admin/User)
- JWT-based authentication
- Protected routes and API endpoints

### Blog Management
- Create, read, update, and delete blog posts
- Rich text editor (Quill) for blog content
- Image upload and optimization
- Blog categorization
- Draft and publish functionality
- Pagination for blog listing

### Admin Dashboard
- Overview statistics
- Blog management interface
- Comment moderation system
- User management
- Content approval workflow

### User Features
- Public blog viewing
- Comment system
- Newsletter subscription
- Responsive design for all devices

### AI Integration
- AI-powered content generation
- Smart content suggestions
- Automated content optimization

### Additional Features
- 404 Error page
- Toast notifications
- Image optimization
- Responsive design
- Clean and modern UI

## 🚀 Tech Stack

### Frontend
- React.js
- React Router
- Material-UI
- Tailwind CSS
- Axios
- React Hot Toast
- Quill Editor

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Multer
- ImageKit
- Google Gemini AI

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- ImageKit account
- Google Gemini API key

### Backend Setup
1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   GEMINI_API_KEY=your_gemini_api_key
   ```
5. Start the server:
   ```bash
   npm run server
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```
   VITE_BASE_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔑 Environment Variables

### Backend (.env)
- `PORT`: Server port number
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `ADMIN_EMAIL`: Admin account email
- `ADMIN_PASSWORD`: Admin account password
- `IMAGEKIT_PUBLIC_KEY`: ImageKit public key
- `IMAGEKIT_PRIVATE_KEY`: ImageKit private key
- `IMAGEKIT_URL_ENDPOINT`: ImageKit URL endpoint
- `GEMINI_API_KEY`: Google Gemini API key

### Frontend (.env)
- `VITE_BASE_URL`: Backend API URL

## 📝 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context
│   │   ├── assets/       # Static assets
│   │   └── App.jsx       # Main application component
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── controllers/      # Route controllers
    ├── models/          # Database models
    ├── routes/          # API routes
    ├── middleware/      # Custom middleware
    ├── configs/         # Configuration files
    └── server.js        # Entry point
```

## 💡 Notes & Recommendations

1. **Security**
   - Always use environment variables for sensitive data
   - Implement rate limiting for API endpoints
   - Add input validation for all forms
   - Consider adding CSRF protection

2. **Performance**
   - Implement caching for frequently accessed data
   - Optimize image loading with lazy loading
   - Consider implementing server-side rendering

3. **Development**
   - Add error boundaries in React components
   - Implement proper logging system
   - Add unit and integration tests
   - Set up CI/CD pipeline

4. **User Experience**
   - Add loading states for async operations
   - Implement proper error handling
   - Add form validation feedback
   - Consider adding dark mode

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License. 