import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !password) return setErr("Completa todos los campos");
    if (!email.includes("@")) return setErr("Email inválido");
    if (password.length < 4) return setErr("La contraseña debe tener al menos 4 caracteres");

    login();
    navigate("/");
  };

  return (
    <div
      style={{
        height: "68.69vh", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          'url("https://cdn.leonardo.ai/users/24c11573-61c7-46a0-aa41-147dda48cab7/generations/f5611807-6a2c-44d1-8b3b-c6ffd1ed5084/segments/3:4:1/Lucid_Origin_Create_a_vibrant_background_image_for_a_tech_ecom_2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <Card
        className="p-4 shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 15,
          backgroundColor: "rgba(36,36,60,0.85)", // fondo semitransparente
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 className="mb-2 fw-bold" style={{ fontSize: "2.2rem", color: "#c92ca3" }}>
          ¡Bienvenido a TechShop!
        </h2>
        <p style={{ fontSize: "1rem", marginBottom: "1.5rem", color: "#a0a0c0" }}>
          Ingresa tus datos para acceder a los mejores gadgets y productos tecnológicos.
        </p>

        {err && <Alert variant="danger" className="py-2">{err}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!err && (!email || !email.includes("@"))}
              style={{ borderRadius: 8 }}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresa un email válido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Al menos 4 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!err && (password.length < 4)}
              style={{ borderRadius: 8 }}
            />
            <Form.Control.Feedback type="invalid">
              La contraseña debe tener al menos 4 caracteres
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 fw-bold"
            style={{
              backgroundColor: "#176b94",
              border: "none",
              padding: "12px 0",
              borderRadius: 8,
              fontSize: "1rem",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1595d6")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#176b94")}
          >
            Ingresar
          </Button>
        </Form>
      </Card>
    </div>
  );
}
