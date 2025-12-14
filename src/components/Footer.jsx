import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaFacebookF, FaTwitter, FaGamepad, FaYoutube, FaDiscord } from "react-icons/fa";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// --- STYLED COMPONENTS ---

const FooterWrapper = styled.footer`
  background-color: #050505;
  color: #a0a0a0;
  padding-top: 4rem;
  padding-bottom: 2rem;
  border-top: 1px solid rgba(0, 243, 255, 0.1);
  font-family: 'Roboto', sans-serif;
  position: relative;
  overflow: hidden;

  /* Efecto de luz de fondo sutil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--neon-purple), transparent);
    opacity: 0.5;
  }
`;

const BrandTitle = styled(Link)`
  font-family: var(--font-display);
  font-size: 2rem;
  color: white;
  text-decoration: none;
  letter-spacing: 3px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    color: white;
    text-shadow: 0 0 20px rgba(0, 243, 255, 0.4);
    
    svg {
        color: var(--neon-cyan) !important;
        filter: drop-shadow(0 0 10px var(--neon-cyan));
    }
  }
`;

const FooterHeading = styled.h5`
  color: white;
  font-family: var(--font-display);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  
  &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 30px;
      height: 2px;
      background-color: var(--neon-cyan);
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: #888;
  text-decoration: none;
  margin-bottom: 0.8rem;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  width: fit-content;

  &:hover {
    color: var(--neon-cyan);
    padding-left: 5px; /* Efecto de desplazamiento */
    text-shadow: 0 0 8px rgba(0, 243, 255, 0.3);
  }
`;

const SocialBtn = styled.a`
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #222;
  color: #aaa;
  margin-right: 12px;
  transition: all 0.3s ease;
  background: rgba(255,255,255,0.03);
  border-radius: 4px; /* Cuadrado con bordes suaves, más tech */

  &:hover {
    background: transparent;
    border-color: var(--neon-purple);
    color: var(--neon-purple);
    box-shadow: 0 0 15px rgba(188, 19, 254, 0.3);
    transform: translateY(-3px);
  }
`;

const CopyrightText = styled.p`
    font-size: 0.8rem;
    color: #555;
    margin-top: 3rem;
    text-align: center;
    border-top: 1px solid #111;
    padding-top: 2rem;
    
    span {
        color: var(--neon-cyan);
    }
`;


export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterWrapper>
      <Container>
        <Row className="gy-5 justify-content-between">
          
          {/* COL 1*/}
          <Col lg={5}>
            <BrandTitle to="/" onClick={scrollToTop}>
              <FaGamepad size={32} style={{ color: 'var(--neon-purple)', transition: '0.3s' }} />
              CYBER<span style={{ color: 'var(--neon-cyan)' }}>SHOP</span>
            </BrandTitle>
            <p className="pe-lg-5 mb-4" style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>
              Equipamiento de élite para la nueva era digital. Desde componentes de alto rendimiento hasta periféricos de precisión quirúrgica. 
              <br/><br/>
              <span style={{ color: '#fff' }}>Actualiza tu realidad.</span>
            </p>
            
            <div className="d-flex">
              <SocialBtn href="#" target="_blank" aria-label="Facebook"><FaFacebookF /></SocialBtn>
              <SocialBtn href="#" target="_blank" aria-label="Twitter"><FaTwitter /></SocialBtn>
              <SocialBtn href="#" target="_blank" aria-label="Instagram"><FaInstagram /></SocialBtn>
              <SocialBtn href="#" target="_blank" aria-label="Discord"><FaDiscord /></SocialBtn>
              <SocialBtn href="#" target="_blank" aria-label="Youtube"><FaYoutube /></SocialBtn>
            </div>
          </Col>

          {/* COL 2 */}
          <Col lg={3} md={6}>
            <FooterHeading>NAVEGACIÓN</FooterHeading>
            <FooterLink to="/" onClick={scrollToTop}>Inicio</FooterLink>
            <FooterLink to="/" onClick={scrollToTop}>Catálogo Completo</FooterLink>
            <FooterLink to="/" onClick={scrollToTop}>Nuevos Lanzamientos</FooterLink>
            <FooterLink to="/admin" onClick={scrollToTop}>Portal de Staff</FooterLink>
          </Col>

          {/* COL 3*/}
          <Col lg={3} md={6}>
            <FooterHeading>SISTEMA</FooterHeading>
            <FooterLink to="#" onClick={(e) => e.preventDefault()}>Centro de Ayuda</FooterLink>
            <FooterLink to="#" onClick={(e) => e.preventDefault()}>Seguimiento de Orden</FooterLink>
            <FooterLink to="#" onClick={(e) => e.preventDefault()}>Garantía y Devoluciones</FooterLink>
            <FooterLink to="#" onClick={(e) => e.preventDefault()}>Términos del Servicio</FooterLink>
            <FooterLink to="#" onClick={(e) => e.preventDefault()}>Política de Privacidad</FooterLink>
          </Col>

        </Row>

        <CopyrightText>
          &copy; {new Date().getFullYear()} <span>CyberShop Industries</span>. Todos los derechos reservados.
        </CopyrightText>

      </Container>
    </FooterWrapper>
  );
}