import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Catalog from "./pages/Catalog";
import TaskDetails from "./pages/TaskDetails";
import Dashboard from ".//pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import EnrolledChallenges from "./components/core/Dashboard/EnrolledChallenges";
import Error from "./pages/Error"
import Settings from "./components/core/Dashboard/Settings";
import { ACCOUNT_TYPE } from "./utils/constants";
import MyProfile from "./components/core/Dashboard/MyProfile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddTaskes from "./components/core/Dashboard/AddTaskes";
import MyTasks from "./components/core/Dashboard/MyTasks";
import EditTask from "./components/core/Dashboard/EditTask"
import ViewTask from "./pages/ViewTask"
import SubsectionDetails from "./components/core/ViewTask/SubsectionDetails";
import Student from "./components/core/Dashboard/Student";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-sky-50 to-fuchsia-200 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="about"
          element={
              <About />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="tasks/:taskId" element={<TaskDetails />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                {/* <Route path="dashboard/cart" element={<Cart />} /> */}
                <Route path="dashboard/overview" element={<Student />} />
                <Route path="dashboard/enrolled-challenges" element={<EnrolledChallenges />} />
                <Route path="dashboard/add-task" element={<AddTaskes/>}/>
                <Route path="dashboard/my-task" element={<MyTasks/>}/>
                <Route path="dashboard/edit-task/:taskId" element={<EditTask/>}/>
              </>
              
            )
          }

        </Route>

        <Route element={
        <PrivateRoute>
          <ViewTask />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-challenge/:taskId/section/:sectionId/sub-section/:subSectionId"
            element={<SubsectionDetails />}
          />
          </>
        )
      }

      </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
