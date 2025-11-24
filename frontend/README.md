#  BiteBloom — Restaurant Discovery App  
A Zomato/Swiggy-style restaurant listing application built using **React (TypeScript)**, **Node.js**, and **MongoDB**.

This project was developed as part of a technical assessment. It demonstrates clean code, modular components, server-side filtering, good UI practices, and a production-style workflow.

---

##  Overview  
**BiteBloom** is a simple and aesthetically designed restaurant discovery application where users can:

-  Search restaurants by name, cuisine, or address (live search)
-  Filter restaurants by cuisine
-  Filter by minimum rating
-  View restaurant details with images
-  Open a "View Menu" modal for each restaurant
-  Click “Order Now” 
-  Enjoy a clean UI inspired by Zomato/Swiggy

All restaurant data comes from a **Node.js + MongoDB backend** with real-time filtering via query parameters.

---

##  Tech Stack  
### **Frontend**
- React  
- TypeScript  
- Axios  

### **Backend**
- Node.js  
- Express  
- Mongoose (MongoDB ORM)

### **Database**
- MongoDB (local connection)

---

#  How to Run This Project (Beginner-Friendly)

This section is written so **even someone with zero technical knowledge** can run app.

---

## 1️⃣ **Prerequisites (Install These Once Only)**  
You must have the following installed:

1. **Node.js** (Download from https://nodejs.org)
2. **MongoDB Community Server** (Download from https://www.mongodb.com/try/download/community)
3. Any Code Editor (VS Code recommended)

---

## 2️⃣ **Start MongoDB Server**

### **Windows Users**
Open this command in a terminal:

mongod

### **Mac/Linux**

sudo mongod

Keep this terminal open.

---

## 3️⃣ **Backend Setup**
Open a new terminal in the `backend` folder and run:

### Install backend dependencies


npm install


### Insert sample restaurant data (one-time operation)


node seed.js

You should see:

Data inserted


### Start the backend server


node server.js


Backend will start on:


http://localhost:5000


---

## 4️⃣ **Frontend Setup**

Open a **new terminal** inside the `frontend` folder and run:

### Install frontend dependencies


npm install


### Start the React app


npm start


Frontend will start automatically at:


http://localhost:3000


#  Project Architecture 

### **1. Component-based UI**
- `SearchBar.tsx`
- `Filter.tsx`
- `RestaurantCard.tsx`
- `App.tsx` (main logic)

### **2. Backend Architecture**
- Express server
- Mongoose for MongoDB queries
- Restaurant model + schema
- Single endpoint:


GET /restaurants?search=&cuisine=&minRating=

- Server-side filtering improves performance and reduces network usage.

### **3. Why this architecture?**
- Clean separation between frontend & backend  
- Backend does the heavy work → scalable  
- Frontend stays responsive  
- Easy to extend for real menus, orders, payments, etc.  

---

#  Features Implemented (Clear & Professional)

| Feature | Status |
|--------|--------|
| Live search | ✔ |
| Cuisine filter | ✔ |
| Rating filter | ✔ |
| Restaurant images | ✔ |
| Menu modal | ✔ |
| Order simulation | ✔ |
| Clean UI styling | ✔ |
| TypeScript everywhere | ✔ |
| MongoDB seed script | ✔ |
| Server-side filtering | ✔ |

---

#  Notes for Reviewers  
- Menu items are demo-generated on the client to keep the database simple.  
- In a production version, menu items would be stored in MongoDB and fetched through a separate endpoint.  
- The goal of this assignment was to demonstrate clean code, modular design, API architecture, and React + TypeScript fundamentals.

---

#  Contact  
If you need any help running or testing the project, feel free to reach out.

Thank you for reviewing my assignment!  
**— BiteBloom **


