"use client"

import { Link } from "react-router-dom";
import { Container, Row, Col, Table, Button, Alert, Image } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="cart py-5">
        <Container>
          <Alert variant="info" className="text-center">
            <h2>Tu carrito está vacío</h2>
            <p>Agrega productos para comenzar a comprar</p>
            <Link to="/" className="btn btn-primary">
              Continuar Comprando
            </Link>
          </Alert>
        </Container>
      </main>
    );
  }

  return (
    <main className="cart py-5">
      <Container>
        <h1 className="mb-4">Mi Carrito</h1>
        <Row className="g-4">
          <Col lg={8}>
            <Table responsive hover>
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="d-flex align-items-center gap-2">
                      <Image
                        src={item.image}
                        alt={item.title}
                        rounded
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                      <span>{item.title}</span>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col lg={4}>
            <div className="card p-4 shadow-sm">
              <h4 className="mb-4">Resumen del Pedido</h4>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      src={item.image}
                      alt={item.title}
                      rounded
                      style={{ width: "30px", height: "30px", objectFit: "cover" }}
                    />
                    <span>{item.title} x {item.quantity}</span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-2 fw-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button variant="success" size="lg" className="w-100 mb-2">
                Proceder al Pago
              </Button>
              <Link to="/" className="btn btn-outline-primary w-100">
                Continuar Comprando
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Cart;
