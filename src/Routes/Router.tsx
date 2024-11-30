import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Login/Login";
import AboutUs from "../Pages/About/About";
import ErrorPage from "../Pages/ErrorPage";
import Registration from "../Pages/Login/Registration/Registration";
import Contact from "../Pages/Contact/Contact";
import CarDetails from "../Pages/CarDetails/CarDetails";
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
import HostOverview from "../Pages/Dashboard/Host/HostOverview";
import HostManageBookings from "../Pages/Dashboard/Host/HostManageBookings";
import HostPayments from "../Pages/Dashboard/Host/HostPayments";
import RequestAdvertisement from "../Pages/Dashboard/Host/RequestAdvertisement";
import HostManageCars from "../Pages/Dashboard/Host/HostManageCars";
import SupportChat from "../Pages/Dashboard/Admin/SupportChat";
import PendingCars from "../Pages/Dashboard/Admin/PendingCars";
import PrivateRoute from "./PrivateRoute";
import SpecificCarDetails from "../Shared/SpecificCarDetails";

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
        element: (
          <PrivateRoute>
            <CarDetails></CarDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://urban-driveserver.vercel.app/cars/${params.id}`),
      },
      {
        path: "/services",
        element: (
          <PrivateRoute>
            <Cars></Cars>
          </PrivateRoute>
        ),
      },
      {
        path: "/hostingForm",
        element: (
          <PrivateRoute>
            <HostingCarForm></HostingCarForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:bookingId",
        element: (
          <PrivateRoute>
            <OnboardCheckout></OnboardCheckout>
          </PrivateRoute>
        ),
      },
      {
        path: "/membership",
        element: <Membership></Membership>,
      },
      {
        path: "/membership-duration/:planName/:price",
        element: (
          <PrivateRoute>
            <MembershipDuration></MembershipDuration>
          </PrivateRoute>
        ),
      },
      {
        path: "/model/:car",
        element: <SpecificCarDetails />,
        loader: ({ params }) =>
          fetch(`https://urban-driveserver.vercel.app/model/${params.car}`),
      },
      {
        path: "/city/:car",
        element: <SpecificCarDetails />,
        loader: ({ params }) =>
          fetch(`https://urban-driveserver.vercel.app/location/${params.car}`),
      },
      {
        path: "/favorite",
        element: (
          <PrivateRoute>
            <Favorite />
          </PrivateRoute>
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
    path: "payment-history",
    element: (
      <PrivateRoute>
        <PaymetHistory />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },

  {
    path: "/booked",
    element: (
      <PrivateRoute>
        <Booked />
      </PrivateRoute>
    ),
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
      {
        path: "support",
        element: <SupportChat />,
      },
      {
        path: "pendingCars",
        element: <PendingCars />,
      },
      {
        path: "hostOverview",
        element: <HostOverview />,
      },
      {
        path: "hostManageBookings",
        element: <HostManageBookings />,
      },
      {
        path: "myCars",
        element: <HostManageCars />,
      },
      {
        path: "hostPayments",
        element: <HostPayments />,
      },
      {
        path: "requestAdvertise",
        element: <RequestAdvertisement />,
      },
    ],
  },
]);
export default router