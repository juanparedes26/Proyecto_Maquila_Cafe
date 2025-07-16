const footerStyle = {
  background: "#6f4e37", 
  color: "#fffbe7",      
  borderTop: "3px solid #c0a16b", 
  padding: "10px 0",
  textAlign: "center",
  marginTop: "0px"
};

const Footer = () => (
 <footer style={footerStyle}>
  © {new Date().getFullYear()} Maquilas Don Andres. Hecho con <span style={{color: "#c0392b"}}>❤️</span> por Juan Manuel Paredes Lopez. Todos los derechos reservados.
</footer>
);

export default Footer;