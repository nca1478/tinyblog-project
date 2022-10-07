// Dependencies
import { Link } from 'react-router-dom'
import { Row, Col, Card, Stack, Button } from 'react-bootstrap'

// Assets
import imagePost from '../../../assets/img/post.jpg'

export const DashboardItem = (props) => {
  const { id, title, published, handlePublish, handleDelete } = props

  return (
    <Col lg={9} sm={12}>
      <Card>
        <Card.Body className="animate__animated animate__fadeIn">
          <Row>
            <Col className="d-flex align-items-center justify-content-between text-center">
              <Link to={`/admin/post/${id}/edit`}>
                <img
                  className="img-thumbnail d-none d-md-block"
                  src={imagePost}
                  style={{ width: '10.625rem', height: '6.25rem' }}
                  alt=""
                />
              </Link>
              <p className="card-text fw-bold text-truncate px-2 w-50">
                {title}
              </p>
              <Stack direction="horizontal" gap={1}>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => handlePublish(id, published)}
                >
                  {published === false ? 'Publicar' : 'Despublicar'}
                </Button>
                <Link
                  to={`/admin/post/${id}/edit`}
                  className="btn btn-primary btn-sm"
                >
                  Editar
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(id)}
                >
                  Borrar
                </Button>
              </Stack>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  )
}
