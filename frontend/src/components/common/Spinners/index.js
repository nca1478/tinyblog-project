// Dependencies
import { Spinner } from 'react-bootstrap'

export const SpinnerLoading = ({ size, variant }) => {
  return (
    <>
      <Spinner animation="border" role="status" size={size} variant={variant}>
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </>
  )
}
