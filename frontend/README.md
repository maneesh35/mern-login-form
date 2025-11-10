# MERN Login System 🔐

A simple and clean **Login + Registration** system built using the **MERN Stack**  
(MongoDB, Express.js, React.js, Node.js) with **password encryption (bcrypt)**  
and **MongoDB Compass** as the database.

---

## 🚀 Features

| Feature | Description |
|--------|-------------|
| User Register | Create new user account |
| User Login | Verify user credentials |
| Password Encryption | Secure passwords using **bcrypt.js** |
| Local Database | MongoDB Compass support |
| Clean UI | Simple & user-friendly interface |

---

## 🛠 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React.js |
| Backend | Node.js + Express.js |
| Database | MongoDB (Compass) |
| Authentication | bcrypt.js |
| Styling | Simple CSS |

---

## 📁 Folder Structure
```
mern-login-form/
├── backend/
│       ├── server.js            
│       ├── .env                 
│       ├── package.json         
│       └── node_modules/        
│
└── frontend/
        ├── src/              
        ├── public/             
        ├── package.json         
        └── node_modules/        
```

---

## 🛡 Environment Setup

### 1️⃣ Install Requirements
Make sure you have:
- Node.js
- MongoDB (Compass)
- npm

---

### 2️⃣ Clone the Project
```
git clone https://github.com/maneesh35/mern-login-form.git
cd mern-login-form
```

### 3️⃣ Setup Backend
```
cd backend
npm install
```
Create .env:
```
MONGO_URI=mongodb://localhost:27017/testDB
PORT=5000
```

Start backend:
```
npm start
```

Backend URL:
```
http://localhost:5000
```

4️⃣ Setup Frontend

Open a new terminal:
```
cd frontend
npm install
npm start
```
Frontend URL:
```
http://localhost:3000
```

