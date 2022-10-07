// Dependencies
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Box = (props) => {
  return (
    <Card className={`${props.bgColor} ${props.textColor}`}>
      <Card.Body className="text-center">
        <h1 className="mb-3">
          <i className={props.icon}></i>
        </h1>
        <h5 className="card-title mb-3">{props.title}</h5>
        <p className="card-text h6">{props.bodyText}</p>

        {/* Ver Post */}
        {props.postId.length === 0 ? null : (
          <Link
            to={`/post/${props.postId}/details`}
            className="btn btn-primary mt-2"
          >
            Ver Post
          </Link>
        )}
      </Card.Body>
    </Card>
  )
}
