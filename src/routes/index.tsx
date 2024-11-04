import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import Layout from "../components/MainLayout";

export const publicRoutes = [
  {
    id: 1,
    path: "/login",
    element: <LoginPage />,
  },
];

export const protectedRoutes = [
  {
    id: 1,
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
];
