import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  FaTrash,
  FaPlus,
  FaEdit,
  FaSave,
  FaTimes,
  FaDatabase,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const API_URL = "https://693df848f55f1be793040fe9.mockapi.io/api/v1/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error de conexión con la base de datos", {
          theme: "dark",
        });
        setLoading(false);
      });
  };

  const handleEditClick = (prod) => {
    setEditingId(prod.id);
    setFormData({
      name: prod.name || prod.title,
      price: prod.price,
      description: prod.description,
      image: prod.image || prod.thumbnail,
      category: prod.category,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.warning("⚠️ El nombre del producto es obligatorio.", {
        theme: "dark",
      });
    }

    const priceValue = Number(formData.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      return toast.warning(
        "⚠️ El precio debe ser un número positivo mayor a cero.",
        { theme: "dark" }
      );
    }

    if (!formData.category) {
      return toast.warning("⚠️ Debe seleccionar una categoría válida.", {
        theme: "dark",
      });
    }

    if (formData.description.trim().length < 10) {
      return toast.warning(
        "⚠️ La descripción debe tener al menos 10 caracteres.",
        { theme: "dark" }
      );
    }

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    const productData = {
      name: formData.name.trim(),
      price: priceValue,
      description: formData.description.trim(),
      image:
        formData.image.trim() ||
        "https://via.placeholder.com/300/111/00f3ff?text=CyberShop",
      category: formData.category,
    };

    setLoading(true);

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en la petición");
        return res.json();
      })
      .then((data) => {
        if (editingId) {
          setProducts(products.map((p) => (p.id === editingId ? data : p)));
          toast.success("✅ Producto actualizado correctamente", {
            theme: "dark",
          });
        } else {
          setProducts([...products, data]);
          toast.success("✅ Producto creado exitosamente", { theme: "dark" });
        }
        handleCancelEdit();
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ No se pudo guardar el producto", { theme: "dark" });
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "⚠️ ¿CONFIRMAR ELIMINACIÓN? Esta acción no se puede deshacer."
      )
    ) {
      setLoading(true);
      fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            setProducts(products.filter((prod) => prod.id !== id));
            toast.success("🗑️ Producto eliminado", { theme: "dark" });
          } else {
            throw new Error("Fallo al eliminar");
          }
        })
        .catch(() =>
          toast.error("Error al eliminar el producto", { theme: "dark" })
        )
        .finally(() => setLoading(false));
    }
  };

  const glassStyle = {
    background: "rgba(15, 15, 15, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0, 243, 255, 0.2)",
    borderRadius: "0px",
    color: "white",
  };

  const neonInputStyle = {
    borderRadius: 0,
    backgroundColor: "#111",
    color: "var(--neon-cyan)",
    border: "1px solid #444",
  };

  return (
    <Container className="my-5">
      <Helmet>
        <title>Panel de Administración | CyberShop</title>
      </Helmet>
      <ToastContainer position="bottom-right" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 text-center"
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--neon-cyan)",
            fontSize: "2.5rem",
            letterSpacing: "2px",
          }}
        >
          <FaDatabase className="me-3" />
          PANEL DE CONTROL
        </h2>
        <div
          style={{
            height: "2px",
            width: "150px",
            background: "var(--neon-purple)",
            margin: "10px auto",
          }}
        ></div>
      </motion.div>

      <Row>
        {/* --- FORMULARIO --- */}
        <Col lg={4} className="mb-4">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg border-0" style={glassStyle}>
              <Card.Header
                style={{
                  background: editingId
                    ? "rgba(188, 19, 254, 0.2)"
                    : "rgba(0, 243, 255, 0.1)",
                  borderBottom: `1px solid ${
                    editingId ? "var(--neon-purple)" : "var(--neon-cyan)"
                  }`,
                  color: "white",
                  fontFamily: "var(--font-display)",
                }}
              >
                <h5 className="mb-0 py-2">
                  {editingId ? (
                    <>
                      <FaEdit className="me-2" /> EDITAR PRODUCTO
                    </>
                  ) : (
                    <>
                      <FaPlus className="me-2" /> NUEVO PRODUCTO
                    </>
                  )}
                </h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{ color: "var(--neon-cyan)", fontSize: "0.8rem" }}
                    >
                      NOMBRE
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: PlayStation 5"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      style={neonInputStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{ color: "var(--neon-cyan)", fontSize: "0.8rem" }}
                    >
                      PRECIO (USD)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Ej: 499"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      style={neonInputStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{ color: "var(--neon-cyan)", fontSize: "0.8rem" }}
                    >
                      IMAGEN URL
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="https://..."
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      style={neonInputStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{ color: "var(--neon-cyan)", fontSize: "0.8rem" }}
                    >
                      CATEGORÍA
                    </Form.Label>

                    <Form.Select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      style={{
                        borderRadius: 0,

                        backgroundColor: "#111", // Fondo oscuro del selector

                        color: "white", // Texto seleccionado en blanco

                        border: "1px solid #444",

                        WebkitAppearance: "none",

                        appearance: "none",
                      }}
                    >
                      {/* El placeholder DEBE tener texto visible (negro) */}

                      <option value="" style={{ color: "black" }}>
                        SELECCIONAR...
                      </option>

                      {/* Las demás opciones también deben tener color de texto explícito */}

                      <option value="consolas" style={{ color: "black" }}>
                        CONSOLAS
                      </option>

                      <option value="videojuegos" style={{ color: "black" }}>
                        VIDEOJUEGOS
                      </option>

                      <option value="perifericos" style={{ color: "black" }}>
                        PERIFÉRICOS
                      </option>

                      <option value="componentes" style={{ color: "black" }}>
                        COMPONENTES
                      </option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label
                      style={{ color: "var(--neon-cyan)", fontSize: "0.8rem" }}
                    >
                      DESCRIPCIÓN
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Detalles del producto..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      style={neonInputStyle}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      style={{
                        background: editingId
                          ? "var(--neon-purple)"
                          : "var(--neon-cyan)",
                        border: "none",
                        color: "black",
                        fontWeight: "bold",
                        borderRadius: "0",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "1px",
                      }}
                      disabled={loading}
                    >
                      {loading
                        ? "PROCESANDO..."
                        : editingId
                        ? "GUARDAR CAMBIOS"
                        : "CREAR PRODUCTO"}
                    </Button>

                    {editingId && (
                      <Button
                        variant="outline-light"
                        onClick={handleCancelEdit}
                        style={{ borderRadius: "0", border: "1px solid #777" }}
                        disabled={loading}
                      >
                        <FaTimes className="me-2" /> CANCELAR
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* --- LISTA --- */}
        <Col lg={8}>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-lg border-0" style={glassStyle}>
              <Card.Header
                style={{
                  background: "rgba(0,0,0,0.5)",
                  borderBottom: "1px solid var(--neon-cyan)",
                  color: "white",
                  fontFamily: "var(--font-display)",
                }}
              >
                <h5 className="mb-0 py-2">INVENTARIO ({products.length})</h5>
              </Card.Header>
              <Card.Body>
                {loading && products.length === 0 ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="info" />
                    <p className="mt-3 text-muted">CARGANDO...</p>
                  </div>
                ) : (
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "600px", overflowY: "auto" }}
                  >
                    <Table
                      hover
                      variant="dark"
                      className="align-middle mb-0"
                      style={{ background: "transparent" }}
                    >
                      <thead>
                        <tr style={{ borderColor: "var(--neon-purple)" }}>
                          <th style={{ color: "var(--neon-cyan)" }}>IMG</th>
                          <th style={{ color: "var(--neon-cyan)" }}>
                            PRODUCTO
                          </th>
                          <th style={{ color: "var(--neon-cyan)" }}>CAT</th>
                          <th style={{ color: "var(--neon-cyan)" }}>PRECIO (en USD)</th>
                          <th
                            className="text-end"
                            style={{
                              color: "var(--neon-cyan)",
                              minWidth: "120px",
                            }}
                          >
                            ACCIONES
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((prod) => (
                          <tr key={prod.id} style={{ borderColor: "#333" }}>
                            <td>
                              <img
                                src={
                                  prod.image || "https://via.placeholder.com/50"
                                }
                                alt="img"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                  backgroundColor: "#444",
                                }}
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/50";
                                }}
                              />
                            </td>
                            <td>
                              <span
                                className="text-white fw-bold d-block text-truncate"
                                style={{ maxWidth: "200px" }}
                              >
                                {prod.name}
                              </span>
                              <small
                                className="text-muted"
                                style={{ fontSize: "0.7rem" }}
                              >
                                ID: {prod.id}
                              </small>
                            </td>
                            <td>
                              <span className="badge border border-secondary text-secondary">
                                {prod.category}
                              </span>
                            </td>
                            <td
                              style={{
                                color: "var(--neon-purple)",
                                fontWeight: "bold",
                              }}
                            >
                              ${prod.price}
                            </td>
                            <td className="text-end text-nowrap">
                              <Button
                                variant="outline-info"
                                size="sm"
                                className="me-2 rounded-0"
                                onClick={() => handleEditClick(prod)}
                                style={{
                                  border: "1px solid var(--neon-cyan)",
                                  color: "var(--neon-cyan)",
                                }}
                                disabled={loading}
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="rounded-0"
                                onClick={() => handleDelete(prod.id)}
                                disabled={loading}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
                {!loading && products.length === 0 && (
                  <Alert
                    variant="info"
                    className="text-center bg-transparent border-info text-info"
                  >
                    No hay productos en el inventario. ¡Crea el primero!
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
