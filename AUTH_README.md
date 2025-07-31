# Authentication System Documentation

This project includes a complete JWT-based authentication system with MongoDB integration.

## Features

- ✅ User Registration (Sign Up)
- ✅ User Login (Sign In)
- ✅ JWT Token Authentication
- ✅ Password Hashing with bcrypt
- ✅ Protected Routes
- ✅ User Profile Management
- ✅ Password Change Functionality
- ✅ MongoDB User Model
- ✅ TypeScript Support
- ✅ Tailwind CSS Styling

## File Structure

```
app/
├── signin/page.tsx          # Registration page
├── login/page.tsx           # Login page
├── dashboard/page.tsx       # Protected dashboard
└── api/auth/
    ├── register/route.ts    # Registration API
    ├── login/route.ts       # Login API
    ├── profile/route.ts     # User profile API
    ├── change-password/route.ts # Change password API
    └── logout/route.ts      # Logout API

lib/
├── auth.ts                  # Authentication service
├── jwt.ts                   # JWT utilities
├── password.ts              # Password hashing utilities
├── middleware.ts            # Auth middleware
└── db.ts                    # Database connection

models/
└── User.ts                  # User model and interfaces

types/
└── index.ts                 # TypeScript type definitions
```

## Environment Variables

Add these to your `.env.local` file:

```env
JWT_SECRET=pezeshki_super_secret_jwt_key_2024_change_in_production
JWT_EXPIRES_IN=7d
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=pezeshki
```

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "isActive": true,
    "role": "user",
    "emailVerified": false
  },
  "token": "jwt_token_here"
}
```

#### POST `/api/auth/login`
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "isActive": true,
    "role": "user",
    "lastLogin": "2024-01-01T12:00:00.000Z",
    "emailVerified": false
  },
  "token": "jwt_token_here"
}
```

### Protected Routes (Require Authorization Header)

#### GET `/api/auth/profile`
Get current user profile.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "isActive": true,
    "role": "user",
    "lastLogin": "2024-01-01T12:00:00.000Z",
    "emailVerified": false
  }
}
```

#### PUT `/api/auth/profile`
Update user profile.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

#### POST `/api/auth/change-password`
Change user password.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword",
  "confirmPassword": "newpassword"
}
```

#### POST `/api/auth/logout`
Logout user (client-side token removal).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

## Frontend Pages

### `/signin` - Registration Page
- User registration form
- Form validation
- Redirects to dashboard on success
- Links to login page

### `/login` - Login Page
- User login form
- Form validation
- Remember me option
- Forgot password link
- Redirects to dashboard on success
- Links to registration page

### `/dashboard` - Protected Dashboard
- Requires authentication
- Displays user profile information
- Quick actions (Edit Profile, Change Password, Settings)
- Account statistics
- Logout functionality

## Usage Examples

### Frontend Authentication

```typescript
// Login
const loginUser = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  
  if (data.success) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    // Redirect to dashboard
  }
};

// Make authenticated requests
const fetchProfile = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('/api/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
```

### Backend Middleware Usage

```typescript
import { requireAuth } from '../../../lib/middleware';

export async function GET(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    // Your protected route logic here
    // user object contains JWT payload
    return NextResponse.json({ message: 'Protected data', user });
  });
}
```

## Security Features

1. **Password Hashing**: Uses bcrypt with salt rounds of 12
2. **JWT Tokens**: Signed with secret key, includes expiration
3. **Input Validation**: Email format, password strength, username format
4. **Protected Routes**: Middleware for authentication verification
5. **Error Handling**: Proper error messages without exposing sensitive info
6. **Token Verification**: Validates JWT tokens and user existence

## Database Schema

The User collection in MongoDB has the following structure:

```typescript
interface IUser {
  _id?: ObjectId;
  username: string;           // Unique, 3-20 chars, alphanumeric + underscore
  email: string;              // Unique, valid email format
  password: string;           // Hashed with bcrypt
  createdAt: Date;           // Account creation timestamp
  updatedAt: Date;           // Last update timestamp
  isActive: boolean;         // Account status
  role: 'user' | 'admin';    // User role
  lastLogin?: Date;          // Last login timestamp
  emailVerified: boolean;    // Email verification status
  resetPasswordToken?: string;     // For password reset (future feature)
  resetPasswordExpires?: Date;     // Token expiration (future feature)
}
```

## Getting Started

1. Make sure MongoDB is running on your system
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Start the development server: `npm run dev`
5. Navigate to `/signin` to create an account
6. Navigate to `/login` to sign in
7. Access `/dashboard` to see the protected page

## Dependencies

- `next`: Next.js framework
- `react`: React library
- `mongodb`: MongoDB driver
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT token handling
- `tailwindcss`: CSS framework
- `typescript`: Type safety

## Notes

- Tokens are stored in localStorage (consider httpOnly cookies for production)
- Change JWT_SECRET in production
- Consider implementing refresh tokens for better security
- Add rate limiting for authentication endpoints
- Implement email verification for complete user registration
- Add password reset functionality
- Consider implementing session management