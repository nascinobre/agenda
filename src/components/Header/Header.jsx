import { Link } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

export default function Header() {
    return (
    <>
      <Navbar style={{backgroundColor: "green"}} >
        <Container className="w-100">
          <Navbar.Brand>Agendamento</Navbar.Brand>
          <Nav
            className="me-auto"
            style={{
              width: "50%",
              marginLeft: "auto",
              display: "flex",
              justifyContent: "space-between",
              justifySelf: "flex-end",
            }}
          >
            <Link to="/" className="nav-link">
              Agendar
            </Link>          
                          
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
