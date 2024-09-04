import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar"
import Home from "./components/pages/Home/Home";
import Ad from "./components/pages/Ad/Ad";
import Addad from "./components/pages/Addad/Addad";
import Editad from "./components/pages/Editad/Editad";
import SearchPharse from "./components/pages/SearchPharse/SearchPharse";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import User from "./components/pages/User/User";
import Logout from "./components/pages/Logout/Logout";
import NotFound from "./components/pages/NotFound/NotFound";
import Footer from "./components/views/Footer/Footer";
import AdRemove from "./components/pages/AdRemove/AdRemove";


function App() {
  return (
    <main>
       <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ads/:id" element={<Ad />} />
          <Route path="/ad/add" element={<Addad />} />
          <Route path="/ad/edit/:id" element={<Editad />} />
          <Route path="/ad/remove/:id" element={<AdRemove />} />
          <Route path="/search/:searchParse" element={<SearchPharse />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
}

export default App;