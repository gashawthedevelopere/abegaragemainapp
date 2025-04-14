import { Routes, Route } from "react-router";
import Home from "./markup/pages/Home.jsx";
import Login from "./markup/pages/Login.jsx";
import AddEmployee from "./markup/pages/Admin/AddEmployee.jsx";
import Unauthorized from "./markup/pages/Unauthorized.jsx";
//import the Customers,Employees,Orders pages
import Customers from "./markup/pages/Admin/Customers.jsx";
import Order from "./markup/pages/Admin/Order.jsx";
import Employees from "./markup/pages/Admin/Employees.jsx";
//import the css file
//import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// import custom css
import "./assets/styles/custom.css";
import Header from "./markup/components/Header/Header.jsx";
import Footer from "./markup/components/Footer/Footer.jsx";

// import the PrivateRoute Component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute.jsx";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/*
        Security mechanism using protected route

       customers (/admin/customers)- manager and admin
       Order (/admin/orders)-can  be accessed by all employee
       Add employee (/admin/add-employee) only admin have access
       Admin_role=3
       Manage_role=2
       Employee_role=1
  */}
        {/*The Orders page */}
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Order />
            </PrivateAuthRoute>
          }/>

        {/*The Customers page */}
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />

        {/*The employees pages */}
        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />
        {/*The add-employee page */}
        <Route
          path="/admin/add-employees"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
