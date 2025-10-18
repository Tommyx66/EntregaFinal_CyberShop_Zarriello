import { Container, Table, Button, Image, Alert } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { formatARS } from "../utils";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  if (cart.length === 0)
    return (
      <Container className="mt-5 text-center">
        <Alert variant="info" className="p-3">
          <h5>Tu carrito está vacío</h5>
          <p>
            <Link to="/" className="text-decoration-none fw-bold">
              Volver a productos
            </Link>
          </p>
        </Alert>
      </Container>
    );

  return (
    <Container className="mt-4 mb-5">
      <h3 className="mb-4">Carrito de Compras</h3>
      <Table responsive bordered hover className="align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td className="d-flex align-items-center gap-3">
                <Image
                  src={item.thumbnail}
                  rounded
                  style={{ width: 60, height: 60, objectFit: "cover" }}
                />
                <span className="text-start">{item.title}</span>
              </td>
              <td>{formatARS(item.price)}</td>
              <td>
                <div className="d-flex gap-2 align-items-center justify-content-center">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity > 1 ? item.quantity - 1 : 1)
                    }
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td>{formatARS((item.price * item.quantity).toFixed(2))}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-4 flex-column flex-md-row gap-3">
        <div>
          <Button variant="danger" onClick={clearCart}>
            Vaciar Carrito
          </Button>
        </div>
        <div className="d-flex gap-4 align-items-center">
          <h5 className="mb-0">Total: {formatARS(totalPrice.toFixed(2))}</h5>
          <Button variant="success">Proceder al pago</Button>
        </div>
      </div>
    </Container>
  );
}
