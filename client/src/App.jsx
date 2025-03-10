import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat/Chat";
import Account from "./pages/Account";
import Lend from "./pages/Lend";
import ViewClothesPage from "./pages/ViewClothesPage";
import Rent from "./pages/Rent/Rent";
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Orders/Orders";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="page-container">
        <NavbarComponent />
        <div className="content pb-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route
              path="chat"
              element={<ProtectedRoute element={<Chat />} />}
            />
            <Route
              path="account"
              element={<ProtectedRoute element={<Account />} />}
            />
            <Route
              path="lend"
              element={<ProtectedRoute element={<Lend />} />}
            />
            <Route path="rent" element={<Rent />} />
            <Route
              path="viewclothes"
              element={<ProtectedRoute element={<ViewClothesPage />} />}
            />
            <Route
              path="orders"
              element={<ProtectedRoute element={<Orders />} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
