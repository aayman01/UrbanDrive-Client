import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Login/Login";
import AboutUs from "../Pages/About/About";
import ErrorPage from "../Pages/ErrorPage";
import Registration from "../Pages/Login/Registration/Registration";
import Contact from "../Pages/Contact/Contact";
import CarDetails from "../Pages/CarDetails/CarDetails";

import PaymentPage from "../Components/PaymentSystem/PaymentPage";
import Dashboard from "../Layouts/Dashboard";
import OnboardCheckout from "../Pages/OnboardCheckout/OnboardCheckout";
import PaymetHistory from "../Components/PaymentSystem/paymetHistory";
import HostingCarForm from "../Pages/HostingCarForm/HostingCarForm";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManagePaymentHistory from "../Pages/Dashboard/Admin/ManagePaymentHistory";
import TotalCarList from "../Pages/Dashboard/Admin/TotalCarList";
import MembershipDuration from "../Components/Membership/MembershipDuration";
import AllBookings from "../Pages/Dashboard/Admin/AllBookings";
import ManageMemberShip from "../Pages/Dashboard/Admin/ManageMemberShip";
import Success from "../Components/PaymentSystem/SSLCommarze/Success";
import Fail from "../Components/PaymentSystem/SSLCommarze/Fail";
import Cancel from "../Components/PaymentSystem/SSLCommarze/Cancel";
import Profile from "../Components/UserDashboard/Profile";
import Favorite from "../Components/UserDashboard/Favorite";
import Booked from "../Components/UserDashboard/Booked";
import Membership from "../Components/Membership/Membership";
import Cars from "../Components/Cars";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },

      {
        path: "/cars/:id",
        element: <CarDetails></CarDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/cars/${params.id}`),
      },
      {
        path: "/cars",
        element: <Cars></Cars>,
      },
      {
        path: "/services",
        element: <Cars ></Cars>,
      },
      {
        path: "/hostingForm",
        element: <HostingCarForm></HostingCarForm>,
      },
      {
        path: "/checkout/:bookingId",
        element: <OnboardCheckout></OnboardCheckout>,
      },
      {
        path: "/membership",
        element: <Membership></Membership>,
      },
      {
        path: "/membership-duration/:planName/:price",
        element: <MembershipDuration></MembershipDuration>,
      },
      {
        path: "/payment/:planName/:totalPrice",
        element: <PaymentPage></PaymentPage>,
      },
      {
        path: "/payment/:totalPrice",
        element: (
          // <PrivetRouts>
          <PaymentPage></PaymentPage>
          // </PrivetRouts>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/register",
    element: <Registration></Registration>,
  },
  // payment success
  {
    path: "/success",
    element: <Success />,
  },
  // payment fail
  {
    path: "/fail",
    element: <Fail />,
  },
  // payment cancel
  {
    path: "/cancel",
    element: <Cancel />,
  },
  {
    path: 'payment-history',
    element: <PaymetHistory/>
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/favorite",
    element: <Favorite />
  },
  {
    path: "/booked",
    element: <Booked />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "adminhome",
        element: <AdminHome />,
      },
      {
        path: "manageUser",
        element: <ManageUsers />,
      },
      {
        path: "cars",
        element: <TotalCarList />,
      },
      {
        path: "paymentHistory",
        element: <ManagePaymentHistory />,
      },
      {
        path: "bookings",
        element: <AllBookings />,
      },
      {
        path: "manageMemberShip",
        element: <ManageMemberShip />,
      },
    ],
  },
]);
export default router