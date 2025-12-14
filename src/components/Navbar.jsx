import { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Badge,
  Modal,
  Button,
  ListGroup,
  Image,
  Offcanvas,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatARS } from "../utils";
import { FaUserCircle, FaGamepad, FaTrash } from "react-icons/fa";

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
  const navigate = useNavigate();

  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handlers
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);
  const closeMenu = () => setShowMenu(false);
  const toggleMenu = () => setShowMenu((s) => !s);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <>
      <style>
        {`
          .cyber-link {
            position: relative;
            color: rgba(255, 255, 255, 0.7) !important;
            font-family: var(--font-display);
            letter-spacing: 2px;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            padding: 5px 0;
            text-transform: uppercase;
          }

          .cyber-link:hover, .cyber-link:focus {
            color: var(--neon-cyan) !important;
            text-shadow: 0 0 8px rgba(0, 243, 255, 0.6);
            transform: translateY(-2px);
          }

          .cyber-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 50%;
            background-color: var(--neon-cyan);
            transition: all 0.3s ease;
            transform: translateX(-50%);
            box-shadow: 0 0 10px var(--neon-cyan);
          }

          .cyber-link:hover::after {
            width: 100%;
          }

          @media (max-width: 991px) {
            .mobile-center-nav {
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100%;
              gap: 2rem !important;
            }
            .cyber-link {
              font-size: 1.2rem;
            }
          }
        `}
      </style>

      {/* NAVBAR PRINCIPAL */}
      <Navbar
        expand="lg"
        fixed="top"
        className="py-3"
        variant="dark"
        style={{
          background: "rgba(5, 5, 5, 0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0, 243, 255, 0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          zIndex: 1040,
          transition: "transform 0.3s ease-in-out",
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={closeMenu}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              color: "var(--neon-cyan)",
              letterSpacing: "2px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textShadow: "0 0 10px rgba(0,243,255,0.5)",
            }}
          >
            <FaGamepad size={26} />
            CYBER<span style={{ color: "white" }}>SHOP</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-lg"
            onClick={toggleMenu}
            style={{
              borderColor: "var(--neon-cyan)",
              color: "var(--neon-cyan)",
            }}
          />

          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
            show={showMenu}
            onHide={closeMenu}
            style={{
              backgroundColor: "rgba(10, 10, 10, 0.98)",
              borderLeft: "1px solid var(--neon-cyan)",
              width: "300px",
            }}
          >
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title
                id="offcanvasNavbarLabel-expand-lg"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--neon-cyan)",
                }}
              >
                NAVEGACIÓN
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center gap-4 mobile-center-nav">
                {isAuthenticated ? (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/admin"
                      onClick={closeMenu}
                      className="cyber-link"
                    >
                      Administrar
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/"
                      onClick={closeMenu}
                      className="cyber-link"
                    >
                      Productos
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        closeMenu();
                        handleShowCart();
                      }}
                      className="cyber-link position-relative"
                    >
                      <span className="me-2 d-lg-none">CARRITO</span>
                      <span style={{ fontSize: "1.3rem" }}>🛒</span>
                      {totalCount > 0 && (
                        <Badge
                          bg="danger"
                          pill
                          className="position-absolute top-0 start-100 translate-middle"
                          style={{
                            fontSize: "0.6rem",
                            border: "1px solid white",
                          }}
                        >
                          {totalCount}
                        </Badge>
                      )}
                    </Nav.Link>
                    <div className="d-flex align-items-center mt-3 mt-lg-0">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={handleLogout}
                        className="d-flex align-items-center gap-2 px-3 py-2"
                        style={{
                          borderRadius: "0",
                          fontFamily: "var(--font-display)",
                          letterSpacing: "1px",
                          border: "1px solid #dc3545",
                          boxShadow: "0 0 10px rgba(220, 53, 69, 0.2)",
                        }}
                      >
                        SALIR <FaUserCircle />
                      </Button>
                    </div>
                  </>
                ) : (
                  <Nav.Link as={Link} to="/login" onClick={closeMenu}>
                    <Button
                      className="fw-bold px-4 py-2"
                      style={{
                        background: "var(--neon-purple)",
                        border: "none",
                        borderRadius: "0",
                        fontFamily: "var(--font-display)",
                        color: "white",
                        boxShadow: "0 0 15px rgba(188, 19, 254, 0.4)",
                      }}
                    >
                      INICIAR SESIÓN
                    </Button>
                  </Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <div style={{ height: "82px", width: "100%", display: "block" }}></div>

      {/* MODAL CARRITO */}
      <Modal
        show={showCart}
        onHide={handleCloseCart}
        centered
        size="lg"
        contentClassName="bg-dark text-white border-secondary"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          style={{ borderBottom: "1px solid #333" }}
        >
          <Modal.Title
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--neon-cyan)",
            }}
          >
            TU ARSENAL ({totalCount})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {cart.length === 0 ? (
            <div className="text-center py-5 text-white-50">
              <h4>INVENTARIO VACÍO</h4>
              <p>Ve al catálogo para equiparte.</p>
            </div>
          ) : (
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="bg-transparent text-white border-secondary d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center gap-3">
                    <Image
                      src={item.thumbnail}
                      rounded
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "contain",
                        background: "#fff",
                      }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/60";
                      }}
                    />
                    <div>
                      <div
                        className="fw-bold text-truncate"
                        style={{ maxWidth: "150px" }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          color: "var(--neon-cyan)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {formatARS(item.price)}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="mx-2 fw-bold">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "1px solid #333" }}>
          <div className="me-auto fs-5">
            <span className="text-muted me-2">TOTAL:</span>
            <span style={{ color: "var(--neon-cyan)", fontWeight: "bold" }}>
              {formatARS(totalPrice)}
            </span>
          </div>
          {cart.length > 0 && (
            <>
              <Button variant="outline-danger" onClick={clearCart}>
                VACIAR
              </Button>
              <Button
                style={{
                  background: "var(--neon-purple)",
                  border: "none",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  handleCloseCart();
                  navigate("/cart");
                }}
              >
                PAGAR
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
