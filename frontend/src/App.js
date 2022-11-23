import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/sign-up/sign-up';
import Login from './components/login/login';
import HomePage from './components/home-page/home-page';
import NavBar from "./components/navbar/navbar";
import MyDrawer from "./components/drawer/drawer";
import Cart from "./components/cart/cart";
import PageNotFound from "./components/page-not-found/page-not-found";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/navbar' element={<NavBar />} />
        <Route path="/home" element={<HomePage />} >
          <Route path='product/:id' element={<MyDrawer />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;