import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import NavigationMenu from "./components/NavigationMenu"
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from "./components/Products";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Footer from "./components/Footer";
import './scss/style.scss'
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationMenu></NavigationMenu>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/products" element={<Products></Products>}></Route>
          <Route path='/product/:id' element={<ProductPage></ProductPage>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="*" element={404}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
