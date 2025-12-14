import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    if (password.length < 4)
      return setErr("La contraseña debe tener al menos 4 caracteres");

    login();
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(rgba(5, 5, 5, 0.8), rgba(5, 5, 5, 0.9)), url("https://cdn.leonardo.ai/users/24c11573-61c7-46a0-aa41-147dda48cab7/generations/f5611807-6a2c-44d1-8b3b-c6ffd1ed5084/segments/3:4:1/Lucid_Origin_Create_a_vibrant_background_image_for_a_tech_ecom_2.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "var(--font-main)",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 450 }}
      >
        <Card
          className="p-5 border-0"
          style={{
            borderRadius: "0px",
            backgroundColor: "rgba(20, 20, 20, 0.7)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(0, 243, 255, 0.3)",
            boxShadow: "0 0 30px rgba(0, 243, 255, 0.1)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <h2
              className="fw-bold mb-1"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                color: "var(--neon-cyan)",
                letterSpacing: "2px",
              }}
            >
              ACCESO
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.9rem",
                letterSpacing: "1px",
              }}
            >
              SISTEMA DE SEGURIDAD TECHSHOP
            </p>
          </div>

          {err && (
            <Alert
              variant="danger"
              className="bg-transparent text-danger border-danger py-2 mb-4"
              style={{ fontSize: "0.9rem" }}
            >
              ⚠️ {err}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4 text-start">
              <Form.Label
                style={{
                  color: "var(--neon-purple)",
                  fontSize: "0.8rem",
                  letterSpacing: "1px",
                }}
              >
                IDENTIFICACIÓN (EMAIL)
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="usuario@cyber.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!err && (!email || !email.includes("@"))}
                style={{ borderRadius: "0" }}
              />
            </Form.Group>

            <Form.Group className="mb-5 text-start">
              <Form.Label
                style={{
                  color: "var(--neon-purple)",
                  fontSize: "0.8rem",
                  letterSpacing: "1px",
                }}
              >
                CLAVE DE ACCESO
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!err && password.length < 4}
                style={{ borderRadius: "0" }}
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 py-3 fw-bold"
              style={{
                background: "linear-gradient(90deg, var(--neon-cyan), #0099ff)",
                border: "none",
                borderRadius: "0",
                fontSize: "1.1rem",
                letterSpacing: "2px",
                color: "#000",
                fontFamily: "var(--font-display)",
                boxShadow: "0 0 20px rgba(0, 243, 255, 0.4)",
              }}
            >
              INICIAR SESIÓN
            </Button>
          </Form>

          <div className="mt-4 pt-3 border-top border-secondary opacity-50">
            <small>NO TIENES CUENTA? REGISTRO DESHABILITADO</small>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
