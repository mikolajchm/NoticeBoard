import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar"
import Home from "./components/pages/Home/Home";
import Ad from "./components/pages/Ad/Ad";
import Addad from "./components/pages/Addad/Addad";
import Editad from "./components/pages/Editad/Editad";
import AdSummary from "./components/pages/AdSummary/AdSummary";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import User from "./components/pages/User/User";
import Logout from "./components/pages/Logout/Logout";
import createAds from "./redux/adsRedux";
import NotFound from "./components/pages/NotFound/NotFound";
import Footer from "./components/views/Footer/Footer";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from './redux/userRedux';


function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            dispatch(logIn(JSON.parse(user))); 
        }
    }, [dispatch]);

    
  return (
    <main>
       <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/ad/add" element={<Addad />} />
          <Route path="/ad/edit/:id" element={<Editad />} />
          <Route path="/search/:searchParse" element={<AdSummary />} />
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