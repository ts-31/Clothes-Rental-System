import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Account from "./pages/Account";
import Lend from "./pages/Lend";
import Rent from "./pages/Rent";
import NavbarComponent from "./components/NavbarComponent";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="page-container">
        <NavbarComponent />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="chat" element={<Chat />} />
            <Route path="login" element={<Login />} />
            <Route path="account" element={<Account />} />
            <Route path="lend" element={<Lend />} />
            <Route path="rent" element={<Rent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
