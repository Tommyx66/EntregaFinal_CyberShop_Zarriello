import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaShieldAlt, FaRocket, FaHeadset, FaLock, FaMicrochip } from "react-icons/fa";

export default function TechFeatures() {
  const features = [
    {
      icon: <FaRocket size={40} color="var(--neon-cyan)" />,
      title: "ENVÍOS HIPERSÓNICOS",
      text: "Nuestra red logística autónoma asegura entregas en tiempo récord. Rastreo satelital en tiempo real y embalaje anti-estático de grado militar para proteger tus componentes."
    },
    {
      icon: <FaShieldAlt size={40} color="var(--neon-purple)" />,
      title: "GARANTÍA BLINDADA",
      text: "Cobertura total contra defectos de fabricación y daños accidentales. Si tu hardware falla, lo reemplazamos instantáneamente sin preguntas burocráticas."
    },
    {
      icon: <FaHeadset size={40} color="var(--neon-cyan)" />,
      title: "SOPORTE DE ÉLITE",
      text: "Acceso directo a ingenieros certificados 24/7. Diagnóstico remoto por IA y asistencia personalizada para overclocking y configuración de setups."
    },
    {
      icon: <FaLock size={40} color="var(--neon-purple)" />,
      title: "PAGOS ENCRIPTADOS",
      text: "Protocolos SSL de última generación y transacciones anónimas. Tus datos financieros están protegidos por cifrado cuántico de extremo a extremo."
    },
    {
      icon: <FaMicrochip size={40} color="var(--neon-cyan)" />,
      title: "HARDWARE CERTIFICADO",
      text: "Todos los productos pasan por un riguroso control de calidad y estrés térmico antes de ser enviados a tu base de operaciones."
    }
  ];

  const infiniteFeatures = [...features, ...features];

  return (
    <div style={{ position: "relative", padding: "80px 0", overflow: "hidden", background: "#050505" }}>
      
      {/*  FONDO DE PARTÍCULAS */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: [0, -100, -200], 
            opacity: [0, 0.5, 0],
            x: Math.random() * 20 - 10 
          }}
          transition={{ 
            duration: Math.random() * 5 + 3, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 2 
          }}
          style={{
            position: "absolute",
            bottom: "-20px",
            left: `${Math.random() * 100}%`,
            width: "3px",
            height: "3px",
            backgroundColor: i % 2 === 0 ? "var(--neon-cyan)" : "var(--neon-purple)",
            boxShadow: "0 0 5px currentColor",
            zIndex: 0
          }}
        />
      ))}

      {/* CONTENEDOR DEL CARRUSEL INFINITO */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center" }}>
        
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "150px", background: "linear-gradient(to right, #050505, transparent)", zIndex: 3, pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "150px", background: "linear-gradient(to left, #050505, transparent)", zIndex: 3, pointerEvents: "none" }}></div>

        {/* PISTA ANIMADA */}
        <motion.div
          className="d-flex"
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 40
          }}
          whileHover={{ animationPlayState: "paused" }} 
          style={{ gap: "2rem", width: "fit-content" }}
          
          onHoverStart={(e) => {}}
        >
          {infiniteFeatures.map((item, index) => (
            <FeatureCard key={index} item={item} />
          ))}
        </motion.div>
      </div>

      {/* LÍNEAS DECORATIVAS  */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, var(--neon-cyan), transparent)", opacity: 0.3 }}></div>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, var(--neon-purple), transparent)", opacity: 0.3 }}></div>
    </div>
  );
}

// TARJETA INDIVIDUAL 
function FeatureCard({ item }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, borderColor: "var(--neon-cyan)", backgroundColor: "rgba(20, 20, 20, 0.9)" }}
      style={{
        flexShrink: 0,
        width: "350px", 
        background: "rgba(15, 15, 15, 0.6)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "0px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        cursor: "default"
      }}
    >
      <div style={{ marginBottom: "20px", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))" }}>
        {item.icon}
      </div>
      
      <h4 style={{ 
        fontFamily: "var(--font-display)", 
        color: "white", 
        letterSpacing: "1px", 
        fontSize: "1.2rem",
        marginBottom: "15px",
        borderBottom: "1px solid var(--neon-purple)",
        paddingBottom: "10px",
        width: "100%"
      }}>
        {item.title}
      </h4>
      
      <p style={{ 
        color: "#aaa", 
        fontSize: "0.95rem", 
        lineHeight: "1.6", 
        margin: 0 
      }}>
        {item.text}
      </p>
    </motion.div>
  );
}