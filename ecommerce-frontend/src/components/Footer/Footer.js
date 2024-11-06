
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3" style={{backgroundColor:"#f9f9f7"}}>
        <Container fluid>
          <nav>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <Link to="/">Shop Express</Link>, made with
              love
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
