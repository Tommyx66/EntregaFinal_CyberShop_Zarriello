import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import TechFeatures from "../components/TechFeatures";
import FeaturedShowcase from "../components/FeaturedShowcase";
import { Helmet } from "react-helmet-async";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [q, setQ] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const API_URL = "https://693df848f55f1be793040fe9.mockapi.io/api/v1/products";

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: No se pudo conectar a la base de datos.`
          );
        }

        const data = await response.json();

        const normalizedData = data.map((p, index) => ({
          ...p,
          id: p.id ? p.id : (index + 1).toString(),
          price: Number(p.price) || 0,
          thumbnail: p.image || "https://via.placeholder.com/300",
          category: p.category || "General",
        }));

        console.log("✅ Productos cargados en Home:", normalizedData);
        setProducts(normalizedData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [q]);

  const filtered = products.filter(
    (p) =>
      (p.title && p.title.toLowerCase().includes(q.toLowerCase())) ||
      (p.name && p.name.toLowerCase().includes(q.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(q.toLowerCase()))
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtered.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <>
      <TechFeatures />
      {products.length > 0 && <FeaturedShowcase />}

      <Container
        className="my-5"
        id="products-section"
        style={{ minHeight: "80vh" }}
      >
        <Helmet>
          <title>Catálogo | CyberShop</title>
        </Helmet>

        <div className="d-flex justify-content-center mb-5">
          <InputGroup
            style={{
              maxWidth: "500px",
              boxShadow: "0 0 20px rgba(188, 19, 254, 0.1)",
            }}
          >
            <InputGroup.Text
              style={{
                background: "rgba(10,10,10,0.8)",
                border: "1px solid var(--neon-purple)",
                color: "var(--neon-purple)",
              }}
            >
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="BUSCAR EQUIPAMIENTO..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{
                background: "rgba(10,10,10,0.8)",
                border: "1px solid var(--neon-purple)",
                borderLeft: "none",
                color: "white",
              }}
            />
          </InputGroup>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="info" />
          </div>
        ) : filtered.length === 0 ? (
          <Alert variant="dark" className="text-center">
            No se encontraron items.
          </Alert>
        ) : (
          <>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {currentProducts.map((p) => (
                <Col key={p.id}>
                  <ProductCard product={p} />
                </Col>
              ))}
            </Row>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
}
