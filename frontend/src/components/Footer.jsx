import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} My E-commerce App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
