import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import NavigationMenu from "./components/NavigationMenu"
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from "./components/Products";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

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
          <Route path="*"></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
