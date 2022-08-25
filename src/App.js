import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./asset/css/login.css";
import "./asset/css/header.css";
import "./asset/css/products.css";
//import "./App.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditProduct from "./components/product/edit.component";
import ProductList from "./components/product/list.component";
import CreateProduct from "./components/product/create.component";
import Login from "./page/Login";
import Customers from "./page/customers";
// import DashboardApp from "./page/statistical";

function App() {
  return (
    <>
      <Router>
        {/* <Navbar bg="primary">
          <Container>
            <Link to={"/"} className="navbar-brand text-white">
              TechvBlogs
            </Link>
          </Container>
        </Navbar> */}
        {/* <Header/> */}
        <Container className="mt-5">
          <Row>
            <Col md={12}>
              <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/product/create" element={<CreateProduct />} />
                <Route path="/product/edit/:id" element={<EditProduct />} />
                <Route exact path='/products' element={<ProductList />} />
                <Route path="/customers" element={<Customers/>} />
                {/* <Route path="/statistical" element={<DashboardApp/>} /> */}
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </>
  );
}

export default App;