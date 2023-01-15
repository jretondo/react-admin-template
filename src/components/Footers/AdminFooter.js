import moment from "moment";
import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer" style={{ backgroundColor: "#f8f9fe" }}>
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © {moment(new Date()).format("YYYY")}{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://www.javier-retondo.ar"
                rel="noopener noreferrer"
                target="_blank"
              >
                Javier Retondo
              </a>
            </div>
          </Col>

        </Row>
      </footer>
    );
  }
}

export default Footer;
