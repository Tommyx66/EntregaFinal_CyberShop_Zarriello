import { Container } from "react-bootstrap";

export default function ProtectedPage() {
  return (
    <Container className="mt-5">
      <h1 className="mb-3">Área Protegida 🔒</h1>
      <p>Solo accesible para usuarios logueados.</p>
    </Container>
  );
}
