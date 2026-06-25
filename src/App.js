import { Route,Routes,BrowserRouter as Router } from "react-router-dom";
import CategoyInterface from "./admin/category/CategoryInterface";
import DisplayAll from "./admin/category/DisplayAll";
import Category from "./admin/category/Category";
import BranchLogin from "./admin/branch/BranchLogin";
import BranchDashboard from "./admin/branch/BranchDashboard";
import BranchInterface from "./admin/branch/BranchInterface";
import BranchDisplay from "./admin/branch/BranchDisplay";
import Branch from "./admin/branch/Branch";
import FoodItemInterface from "./admin/fooditem/FoodItemInterface";
import FoodItemDisplay from "./admin/fooditem/FoodItemDisplay";
import FoodItem from "./admin/fooditem/FoodItem";
import AdminDashboard from "./admin/adminlogin/AdminDashboard";
import AdminLogin from "./admin/adminlogin/AdminLogin";
import BatchInterface from "./admin/batch/BatchInterface";
import Batch from "./admin/batch/Batch";
import Section from "./admin/section/Section";
import Student from "./admin/student/Student";
import Employees from "./admin/employees/Employees";
import Picture from "./admin/morePicture/Picture";

function App() {
  return (
    <div style={{fontFamily:'Quicksand'}}>
      <Router>
        <Routes>
          <Route element={<BranchLogin />} path="/branchlogin"></Route>
          <Route element={<BranchDashboard />} path="/branchdashboard/*"></Route>
          {/* <Route element={<Branch/>} path="/branch"></Route> */}
          {/* <Route element={<FoodItem/>} path="/fooditem"></Route> */}
          <Route element={<AdminDashboard/>} path="/admindashboard/*"></Route>
          <Route element={<AdminLogin/>} path="/admin"></Route>
          {/* <Route element={<BatchInterface/>} path="/batchinterface"></Route> */}
          {/* <Route element={<Batch/>} path="/batch"></Route> */}
          {/* <Route element={<Section/>} path="/section"></Route> */}
          {/* <Route element={<Student/>} path="/student"></Route> */}
          {/* <Route element={<Employees/>} path="/employees"></Route> */}
          {/* <Route element={<Picture/>} path="/pictures"></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
