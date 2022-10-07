// Dependencies
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Custom Dependencies
import showcase from '../../../assets/img/showcase.svg'

export const Showcase = () => {
  return (
    <Col className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start animate__animated animate__fadeInRight">
      <Container>
        <Row className="d-sm-flex align-items-center justify-content-between">
          <Col>
            <h1>
              Bienvenido a Tinyblog, información actualizada y{' '}
              <span className="text-warning">mucho más.</span>
            </h1>
            <p className="lead fw-bold my-4">
              Disfruta de nuestros temas donde y cuando quieras.
            </p>

            <Link to="/posts" className="btn btn-primary btn-lg">
              Ver todos Posts
            </Link>
          </Col>
          <img
            className="img-fluid w-50 d-none d-md-block"
            src={showcase}
            alt="showcase"
          />
        </Row>
      </Container>
    </Col>
  )
}
