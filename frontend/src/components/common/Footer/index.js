// Dependencies
import { Container } from 'react-bootstrap'

export const Footer = () => {
  return (
    <div className="p-3 bg-dark text-white text-center">
      <Container>
        <p className="lead pt-3">
          Copyright &copy; 2022
          <br />
          Desarrollado por:{' '}
          <a
            href="https://nelsoncadenas.netlify.app/index.html"
            rel="noreferrer"
            target="_blank"
            className="text-decoration-none fw-bold"
          >
            Nelson Cadenas
          </a>
        </p>
      </Container>
    </div>
  )
}
