// Dependencies
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Custom Dependencies
import imagePost from '../../../assets/img/post.jpg'

export const PostItem = (props) => {
  const { id, title } = props

  return (
    <Col xs={10} sm={10} md={6} lg={3}>
      <Link
        to={`/post/${id}/details`}
        className="text-decoration-none text-dark"
      >
        <Card className="animate__animated animate__fadeIn">
          <Card.Img variant="top" src={imagePost} />
          <Card.Body>
            <Card.Text className="text-center" style={{ height: '5rem' }}>
              {title}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}
