import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Home from "../../components/Home/Home";

const NavbarComp = () => {
  const [searchValue, setSearchValue] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  //   setUserId(localStorage.getItem("userId"));
  // }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("addressId");
    localStorage.removeItem("productId");
    // localStorage.removeItem("email");
    window.location.replace("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Here is the search.", searchValue);
    <Home productName={searchValue} />;
    console.log("After calling Home");
  };
  return (
    <div>
      <Navbar bg="dark" variant={"dark"} expand={"lg"}>
        <Container>
          <Navbar.Brand href="/">E_Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {!token ? (
                <>
                  {/* <Nav.Link as={Link} to="/Registration">
                    Registration
                  </Nav.Link> */}
                  <Nav.Link as={Link} to="/SignIn">
                    SignIn
                  </Nav.Link>
                </>
              ) : (
                <></>
              )}
              {token && userId ? (
                <>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="" onClick={logOut}>
                    logout
                  </Nav.Link>
                  <Nav.Link as={Link} to="/wishList">
                    Wishlist
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cart">
                    Cart
                  </Nav.Link>
                  <Nav.Link as={Link} to="/orderHistory">
                    orderHistory
                  </Nav.Link>
                </>
              ) : (
                <></>
              )}
              {/* <form class="form-inline" onSubmit={handleSearch}>
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  id="product"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  class="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
