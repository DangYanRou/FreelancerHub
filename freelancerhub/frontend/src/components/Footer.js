import { Footer } from "flowbite-react";
import "./styles/Footer.css";

const FooterComponent = () => {
 return (
    <Footer container className="footer-container">
      <Footer.Copyright className="footer-copyright" href="https://github.com/DangYanRou/FreelancerHub" by="FreelancerHub™" year={2024} />
      <Footer.LinkGroup className="footer-link-group">
        <Footer.Link  className="footer-link-contact" href="mailto:22004743@siswa.um.edu.my">Contact Us</Footer.Link>
      </Footer.LinkGroup>
    </Footer>

 )
}

export default FooterComponent;