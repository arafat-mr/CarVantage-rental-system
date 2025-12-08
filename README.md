# 🚗 CarVantage Rental System
Live Link: https://carvantage-rental-system.vercel.app/


A backend API for a **vehicle rental management system** that handles users, vehicles, and bookings with **role-based access control**.

---

## 🛠️ Technology Stack

- **Node.js** + **TypeScript**
- **Express.js**
- **PostgreSQL**
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT authentication)

---

## 📁 Project Structure

- **Routes** → Define API endpoints
- **Controllers** → Handle request/response logic
- **Services** → Business logic and DB queries
- **Middleware** → Authentication & authorization


---

## 🔐 Roles & Functionalities

| Role       | Functionalities                                                                 |
|------------|--------------------------------------------------------------------------------|
| **🛠 Admin**  | - View all users<br>- Update any user details or role<br>- Delete user (only if no active bookings)<br>- Add, update, delete vehicles (delete only if no active bookings)<br>- View all bookings<br>- Mark booking as returned |
| **👤 Customer** | - Update own profile<br>- Create booking<br>- Cancel own booking (before start date)<br>- View own bookings |
| **🌐 Public** | - View all vehicles<br>- View specific vehicle details |
| **🤖 System** | - Auto-mark bookings as returned after end date (updates vehicle availability) |

---

## 📊 Database Tables

### Users
- id, name, email, password, phone, role ('admin' / 'customer')

### Vehicles
- id, vehicle_name, type ('car', 'bike', 'van', 'SUV'), registration_number, daily_rent_price, availability_status ('available'/'booked')

### Bookings
- id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status ('active'/'cancelled'/'returned')

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/auth/signup` | Public | Register new user |
| POST | `/api/v1/auth/signin` | Public | Login & receive JWT |

### Vehicles
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/vehicles` | Admin | Add vehicle |
| GET | `/api/v1/vehicles` | Public | List all vehicles |
| GET | `/api/v1/vehicles/:vehicleId` | Public | Vehicle details |
| PUT | `/api/v1/vehicles/:vehicleId` | Admin | Update vehicle |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin | Delete vehicle (if no active bookings) |

### Users
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/users` | Admin | View all users |
| PUT | `/api/v1/users/:userId` | Admin / Own | Admin: Update any user<br>Customer: Update own profile |
| DELETE | `/api/v1/users/:userId` | Admin | Delete user (if no active bookings) |

### Bookings
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/bookings` | Admin / Customer | Create booking, validates vehicle availability, calculates total price, updates vehicle status |
| GET | `/api/v1/bookings` | Role-based | Admin: View all bookings<br>Customer: View own bookings |
| PUT | `/api/v1/bookings/:bookingId` | Role-based | Customer: Cancel booking (before start date)<br>Admin: Mark as returned<br>System: Auto-mark as returned when period ends |

---



