#  Dental Center Management Dashboard (Frontend Only)

A responsive, role-based dental clinic management dashboard built with **React**, featuring patient management, appointment tracking, and file uploads.  
This is a **frontend-only** assignment for ENTNT using **localStorage** to simulate all data.

##  Live Demo

 https://dental-center-management-6nf9.onrender.com

##  Tech Stack

- **React** (Functional Components)
- **React Router v6**
- **Context API**
- **Tailwind CSS**
- **localStorage** (Simulated backend)
- **React Toastify**
- **File uploads** via base64/Blob URLs

---

## User Roles

### Admin (Dentist)

- Full access to manage patients and appointments
- View calendar, KPIs, and dashboard insights

> **Login Credentials:**
- Email: `admin@entnt.in`
- Password: `admin123`

###  Patient

- Can only view their profile, upcoming appointments, and treatment history

> **Login Credentials:**
- Email: `john@entnt.in`
- Password: `patient123`

---

##  Features

###  Authentication (Simulated)
- Role-based protected routes
- Session stored in `localStorage`

###  Admin Dashboard
- Add, Edit, Delete Patients
- Manage Appointments per Patient
- Upload treatment files (stored as base64)
- View Calendar with scheduled appointments
- KPIs: revenue, pending/completed, top patients

###  Patient Dashboard
- View personal details
- Upcoming appointments
- Treatment history with downloadable files

###  File Uploads
- Invoice, X-Ray files stored as base64/blob
- Openable/downloadable from UI

###  Responsive UI
- Mobile-first and tablet-friendly layout
- Clean Tailwind styling

---

##  Data Persistence

All data is simulated and stored in `localStorage`:
- `users`: Admin and Patient accounts
- `patients`: Full patient records
- `incidents`: Appointment records per patient

Data is seeded automatically on first load via `seedData.js`.

---

##  Getting Started (Local Setup)

1. **Clone the repository**

   git clone https://github.com/programmer2807/Dental-Center-Management.git
   cd Dental-Center-Management

2. **Install dependencies**

   npm install

3. **Run the Project**

    npm start

