import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatARS } from "../utils";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!isAuthenticated) return navigate("/login");
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || product.images?.[0] || "",
    });
  };

  return (
    <Card className="h-100 shadow-sm">
      <div
        style={{
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
        }}
      >
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: "1rem" }}>{product.title}</Card.Title>
        <Card.Text className="text-success fw-bold">
          {formatARS(product.price)}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-between">
          <Button variant="primary" onClick={handleAdd}>
            Agregar
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            Ver
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
