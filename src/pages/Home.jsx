import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Form, InputGroup, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);
        const categories = ["smartphones", "laptops", "tablets", "accessories"];
        const requests = categories.map(cat =>
          fetch(`https://dummyjson.com/products/category/${cat}`).then(r => r.ok ? r.json() : { products: [] })
        );
        const results = await Promise.all(requests);
        let combined = results.flatMap(r => r.products || []);
        combined = combined.map(p => ({
          id: p.id,
          title: p.title || p.name || p.brand || `Product ${p.id}`,
          price: p.price || p.discountedPrice || 0,
          images: p.images || (p.thumbnail ? [p.thumbnail] : []),
          thumbnail: (p.thumbnail || (p.images && p.images[0])) || "",
          description: p.description || "",
          category: p.category || ""
        }));

        setProducts(combined);
      } catch (err) {
        setError(err.message || "Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const filtered = products.filter(p => p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()));

  if (loading) return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="mt-4">
      <div className="d-flex mb-4 gap-3">
        <InputGroup>
          <Form.Control placeholder="Buscar productos..." value={q} onChange={(e) => setQ(e.target.value)} />
          <Button onClick={() => setQ("")}>Limpiar</Button>
        </InputGroup>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filtered.map(p => (
          <Col key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
