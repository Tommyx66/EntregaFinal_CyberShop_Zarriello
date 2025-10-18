import {
  Navbar,
  Container,
  Nav,
  Badge,
  Modal,
  Button,
  ListGroup,
  Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { formatARS } from "../utils";

export default function NavbarComp() {
  const {
    cart,
    totalCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            TechShop
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {isAuthenticated ? (
                <>
                  <Nav.Link onClick={handleShow}>
                    🛒 <Badge bg="danger">{totalCount}</Badge>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/">
                    Productos
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Iniciar Sesión
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Carrito ({totalCount})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p className="text-center">Tu carrito está vacío</p>
          ) : (
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center gap-3">
                    <Image
                      src={item.thumbnail || item.images?.[0]}
                      rounded
                      style={{ width: 60, height: 60, objectFit: "cover" }}
                    />
                    <div>
                      <div style={{ maxWidth: 300 }}>{item.title}</div>
                      <small className="text-muted">{formatARS(item.price)}</small>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <div>{item.quantity}</div>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="me-auto">
            
            <strong>Total: </strong>{formatARS(totalPrice.toFixed(2))}
          </div>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              navigate("/cart");
            }}
          >
            Ver carrito completo
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              clearCart();
              handleClose();
            }}
          >
            Vaciar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
