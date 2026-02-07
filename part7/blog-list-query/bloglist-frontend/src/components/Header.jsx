import { Navbar, Nav, Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Header = ({ user, handleLogout }) => {
  if (!user) return null

  return (
    <Navbar expand="lg" bg="dark" className="border-bottom mb-4 navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold" >
          <div className="brand">
            BlogList
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="px-3">
              <i className="bi bi-newspaper me-2"></i>
              Blogs
            </Nav.Link>

            <Nav.Link as={Link} to="/users" className="px-3">
              <i className="bi bi-person me-1"></i>
              Users
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3 ms-4">
            <span>
              {user.name}
            </span>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1"></i>  Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
