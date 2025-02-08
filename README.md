
# ClapGrow-EM-APP
Employement Registration App
=======
# React + TypeScript + Vite + Clerk + shadcn +AG Grid

This is a React + TypeScript application for managing employees, featuring authentication, form validation, data display, and theming. It utilizes:

Clerk Authentication for secure login/logout

React Hook Form & Zod for form validation

AG Grid for displaying employee data

ShadCN UI & TailwindCSS for modern styling

EmailJS for sending email notifications

LocalStorage for data persistence.

📌 Features

🔐 Authentication: Users must log in via Clerk to access the app.

📊 Employee Data Table: Displays employee records with sorting & filtering using AG Grid.

🎨 Dark Mode: Integrated with ShadCN's theme system.

📩 Email Notifications: Sends emails when a new employee is added.

🚀 Getting Started

1️⃣ Clone the Repository
 ```bash
      git clone https://github.com/AmanKrs/employee-management-app.git
      cd employee-management-app
```
2️⃣ Install Dependencies
 ```bash
     npm install
```
3️⃣ Set Up Environment Variables with your details
 ```bash
     VITE_CLERK_PUBLISHABLE_KEY=
     CLERK_SECRET_KEY=
     EJ_SERVICE_ID=
     EJ_TMEPLATE_ID=
     EJ_PUBLIC_KEY=
```
4️⃣ Start the Application
 ```bash
   npm run dev
```
📌 Upgradation

1️⃣ We can use node.js/express.js for server validation of the form and can store data in the MongoDB atlas.
2️⃣ We will use the node.js email package to send emails to the user.
3️⃣ For data persistence we can use Redux/ useContext in React.js
4️⃣ For feature upgrades we can web by adding new features like:
```
- User validation for Adding Employee, only Specific users have access to the form and others can only have read access.
- We can add/assign tasks to a specific employee.
- We can add periodic sending mail for employees with payslips and other documents and assign course to them.
```
