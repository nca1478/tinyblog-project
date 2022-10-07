// Dependencies
import { Form } from 'react-bootstrap'

export const InputForm = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.controlId}>
      <Form.Label className="fw-bold">{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        min={props.type === 'number' ? 1 : null}
        max={props.type === 'number' ? 100000000 : null}
        {...props.register(props.name, { required: true })}
        autoComplete="off"
      />
      {props.errors && (
        <Form.Text className="text-danger w-100">Requerido</Form.Text>
      )}
    </Form.Group>
  )
}
