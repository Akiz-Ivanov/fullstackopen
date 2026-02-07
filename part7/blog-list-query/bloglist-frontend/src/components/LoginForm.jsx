import PropTypes from "prop-types"
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ maxWidth: "500px", width: "100%" }} className="shadow-lg border-0">
        <Card.Body className="p-4">
          <h2 className="mb-4 text-center fw-bold">
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Login
          </h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Username</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter username"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
                />
              </InputGroup>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 fw-semibold">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm