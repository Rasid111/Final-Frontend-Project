import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import NavigationMenu from "./components/NavigationMenu"
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from "./components/Products";

function App() {

  return (
    <>
      <BrowserRouter>
        <NavigationMenu></NavigationMenu>
        <Routes>
          <Route path="/" element={ <Home></Home> }></Route>
          <Route path="/products" element={ <Products></Products>}></Route>
          <Route path="*"></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
