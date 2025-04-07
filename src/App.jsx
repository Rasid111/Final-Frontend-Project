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
import './scss/style.scss';
import Dashboard from "./components/Dashboard";
import NotFoundPage from "./components/NotFoundPage";
import Profile from "./components/profile";
import AdminPanel from "./components/AdminPanel";
import Wishlist from "./components/Wishlist";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <NavigationMenu></NavigationMenu>
              <Home></Home>
              <Footer></Footer>
            </>
          }>
          </Route>
          <Route path="/products" element={
            <>
              <NavigationMenu></NavigationMenu>
              <Products></Products>
              <Footer></Footer>
            </>
          }>
          </Route>
          <Route path='/product/:id' element={
            <>
              <NavigationMenu></NavigationMenu>
              <ProductPage></ProductPage>
              <Footer></Footer>
            </>
          }>
          </Route>
          <Route path='/cart' element={
            <>
              <NavigationMenu></NavigationMenu>
              <Cart></Cart>
              <Footer></Footer>
            </>
          }>
          </Route>
          <Route path='/wishlist' element={
            <>
              <NavigationMenu></NavigationMenu>
              <Wishlist></Wishlist>
              <Footer></Footer>
            </>
          }>
          </Route>
          <Route path='/checkout' element={
            <>
              <NavigationMenu></NavigationMenu>
              <Checkout></Checkout>
              <Footer></Footer>
            </>
          }>
          </Route>
          <Route path="/register" element={
            <>
              <RegisterPage></RegisterPage>
              <Footer></Footer>
            </>
          }>
          </Route>
          <Route path="/login" element={
            <>
              <LoginPage></LoginPage>
              <Footer></Footer>
            </>
          }>
          </Route>
          <Route path="/dashboard" element={
            <>
              <NavigationMenu></NavigationMenu>
              <Dashboard></Dashboard>
              <Footer></Footer>
            </>
          }>
          </Route>
          <Route path="/admin" element={
            <>
              <NavigationMenu></NavigationMenu>
              <AdminPanel></AdminPanel>
              <Footer></Footer>
            </>
          }>
          </Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
