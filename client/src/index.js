import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/views/NavBar"
import Home from "./components/pages/Home/Home";
import Ad from "./components/pages/Ad";
import Addad from "./components/pages/Addad";
import Editad from "./components/pages/Editad";
import SearchPharse from "./components/pages/SearchPharse";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import User from "./components/pages/User";
import Logout from "./components/pages/Logout";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/views/Footer";


function App() {
  return (
    <main>
       <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ads/:id" element={<Ad />} />
          <Route path="/ads" element={<Addad />} />
          <Route path="/ads/:id" element={<Editad />} />
          <Route path="ads/search/:searchParse" element={<SearchPharse />} />
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