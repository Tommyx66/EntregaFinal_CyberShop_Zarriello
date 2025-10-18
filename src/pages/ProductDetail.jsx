import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Card, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProduct({
          id: data.id,
          title: data.title,
          price: data.price,
          images: data.images || [],
          thumbnail: data.thumbnail || (data.images && data.images[0]),
          description: data.description || "",
          category: data.category
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="d-flex justify-content-center mt-5"><Spinner /></div>;
  if (!product) return <Container className="mt-5">Producto no encontrado</Container>;

  const handleAdd = () => {
    if (!isAuthenticated) return navigate("/login");
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail
    });
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card>
            <div style={{ height: 420, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
              <img src={product.thumbnail || product.images?.[0]} alt={product.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-success">${product.price}</h4>
          <p>{product.description}</p>
          <Button variant="primary" onClick={handleAdd}>Agregar al carrito</Button>
        </Col>
      </Row>
    </Container>
  );
}
