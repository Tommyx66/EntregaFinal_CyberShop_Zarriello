import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto py-5 shadow-lg">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              TechShop
            </h5>
            <p className="mb-0 small">
              &copy; 2025 TechShop. Todos los derechos reservados.
            </p>
          </Col>

          <Col md={6} className="d-flex justify-content-center justify-content-md-end gap-3">
            <a
              href="#"
              className="text-light d-flex align-items-center justify-content-center rounded-circle p-2 footer-icon"
              style={{ width: 40, height: 40, background: "#3b5998" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-light d-flex align-items-center justify-content-center rounded-circle p-2 footer-icon"
              style={{ width: 40, height: 40, background: "#00acee" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-light d-flex align-items-center justify-content-center rounded-circle p-2 footer-icon"
              style={{ width: 40, height: 40, background: "#e1306c" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </Col>
        </Row>

        <hr className="my-3 border-light opacity-25" />

        <Row className="text-center text-md-start">
          <Col md={4} className="mb-2">
            <h6 className="fw-bold">Soporte</h6>
            <p className="small mb-0">
              <a href="#" className="text-light text-decoration-none footer-link">Ayuda</a><br />
              <a href="#" className="text-light text-decoration-none footer-link">Contacto</a>
            </p>
          </Col>
          <Col md={4} className="mb-2">
            <h6 className="fw-bold">Productos</h6>
            <p className="small mb-0">
              <a href="#" className="text-light text-decoration-none footer-link">Notebooks</a><br />
              <a href="#" className="text-light text-decoration-none footer-link">Accesorios</a>
            </p>
          </Col>
          <Col md={4} className="mb-2">
            <h6 className="fw-bold">Empresa</h6>
            <p className="small mb-0">
              <a href="#" className="text-light text-decoration-none footer-link">Acerca de</a><br />
              <a href="#" className="text-light text-decoration-none footer-link">Política de privacidad</a>
            </p>
          </Col>
        </Row>
      </Container>

      {/* Estilos adicionales */}
      <style jsx="true">{`
        .footer-icon:hover {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }
        .footer-link:hover {
          text-decoration: underline;
          color: #f8f9fa;
        }
      `}</style>
    </footer>
  );
}
