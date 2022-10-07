// Dependencies
import { Form, InputGroup, FormControl } from 'react-bootstrap'

export const InputGroupForm = (props) => {
  return (
    <InputGroup className="mb-3">
      <span className="input-group-text">
        <i className={props.icon}></i>
      </span>
      <FormControl
        type={props.type}
        placeholder={props.label}
        autoComplete="off"
        {...props.register(props.name, { ...props.validationRules })}
      />
      {props.errors && (
        <Form.Text className="text-danger w-100">
          {props.errors.message}
        </Form.Text>
      )}
    </InputGroup>
  )
}
