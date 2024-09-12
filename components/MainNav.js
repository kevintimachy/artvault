import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { addToHistory } from "@/lib/userData";
import { removeToken, readToken } from "@/lib/authenticate";


export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let token = readToken();

  async function submitSearch(e) {
    e.preventDefault();
    setIsExpanded(false);
    if (searchField != "") {
      let searchQuery = `title=true&q=${searchField}`;
      setSearchHistory(await addToHistory(searchQuery));
      router.push(`/artwork?${searchQuery}`)
    }
  }

  function toggle() {
    setIsExpanded(!isExpanded);
  }

  function closeExpand() {
    setIsExpanded(false);
  }

  function logout() {
    closeExpand();
    removeToken();
    router.push('/login');
  }


  return (
    <>
      <Navbar expanded={isExpanded} className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand>THE MET</Navbar.Brand>
          <Navbar.Toggle onClick={toggle} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={closeExpand}>Home</Nav.Link></Link>
              {token &&
                <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={closeExpand}>Advanced Search</Nav.Link ></Link>
              }
            </Nav>
            &nbsp;
            {token ?
              <>
                <Form onSubmit={submitSearch} className="d-flex">
                  <Form.Control
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button className="btn btn-primary my-2 my-sm-0" type="submit" >Search</Button>
                </Form>
                &nbsp;
                <Nav>
                  <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item onClick={closeExpand} >Favourites</NavDropdown.Item></Link>
                    <Link href="/history" passHref legacyBehavior><NavDropdown.Item onClick={closeExpand} >Search History</NavDropdown.Item></Link>
                    <Link href="/login" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/login"} onClick={logout} >Log out</NavDropdown.Item></Link>
                  </NavDropdown>
                </Nav>
              </>
              :
              <>
                <Nav>
                  <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"} onClick={closeExpand}>Register</Nav.Link ></Link>
                  <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"} onClick={closeExpand}>Log In</Nav.Link></Link>
                </Nav>
              </>}

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  );
} 
