import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Login/Login";
import AboutUs from "../Pages/About/About";
import ErrorPage from "../Pages/ErrorPage";
import Registration from "../Pages/Login/Registration/Registration";
import Contact from "../Pages/Contact/Contact";
import CarDetails from "../Pages/CarDetails/CarDetails";
import Cars from "../Components/Cars";
import PaymentPage from "../Components/PaymentSystem/PaymentPage";
import Dashboard from "../Layouts/Dashboard";
// import HostCarListingForm from "../Pages/HostingCarForm/HostingCarForm";
import OnboardCheckout from "../Pages/OnboardCheckout/OnboardCheckout";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
// import PaymetHistory from "../Components/PaymentSystem/paymetHistory";
import PaymentHistory from "../Pages/Dashboard/Admin/PaymentHistory";


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
      // {
      //   path: "/services",
      //   element: <HostCarListingForm></HostCarListingForm>,
      // },
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
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/services",
        element: <Cars></Cars>,
      },
      {
        path: "/cars/:id",
        element: <CarDetails></CarDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/cars/${params.id}`),
      },
      {
        path: "/checkout/:bookingId",
        element: <OnboardCheckout></OnboardCheckout>,
      },
      {
        path: "/cars",
        element: <Cars></Cars>,
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
        path: "paymentHistory",
        element: <PaymentHistory/>
      },
    ],
  },
]);
export default router