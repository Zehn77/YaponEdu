import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, protectedRoutes } from "./routes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import NotFoundPage from "./pages/not-found-page";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            {protectedRoutes.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))}
          </Route>

          <Route element={<PublicRoutes />}>
            {publicRoutes.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))}
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
