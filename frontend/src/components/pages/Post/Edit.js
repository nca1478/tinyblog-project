// Dependencies
import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'

// Custom Dependencies
import { InputForm, TextareaForm } from './components'
import { AuthContext } from '../../../context/authContext'
import { get, put } from '../../../config/api'

export const EditPostPage = () => {
  const { user } = useContext(AuthContext)
  const { postId } = useParams()
  const [post, setPost] = useState({})
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const getPost = useCallback(async () => {
    await get(`/posts/${postId}`)
      .then((response) => {
        setPost(response.data)
      })
      .catch((error) => {
        toast.error('Error al intentar obtener detalles del post.')
        console.log(error)
      })
  }, [postId])

  const onSubmit = async (data) => {
    await put(`/posts/${postId}/update`, data, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar actualizar el post.')
        console.log(error)
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getPost().catch(console.error)
  }, [getPost])

  useEffect(() => {
    reset(post) // Cargando datos en el formulario
  }, [post, reset])

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <Row className="py-2">
          <Col md={{ span: 8, offset: 2 }}>
            <Card>
              <Card.Header as="h5" className="text-center">
                <span>Editar Post </span>
              </Card.Header>
              <Card.Body>
                <div className="animate__animated animate__fadeIn">
                  <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                    <InputForm
                      type="text"
                      name="title"
                      label="Título"
                      placeholder="Ingresar Título"
                      controlId="formBasicTitle"
                      register={register}
                      errors={errors.title}
                    />

                    <TextareaForm
                      name="summary"
                      label="Resumen"
                      placeholder="Ingresa Resumen"
                      controlId="formBasicSummary"
                      register={register}
                      rows={2}
                      errors={errors.summary}
                    />

                    <TextareaForm
                      name="body"
                      label="Cuerpo"
                      placeholder="Ingresa Cuerpo"
                      controlId="formBasicBody"
                      register={register}
                      rows={5}
                      errors={errors.body}
                    />

                    <div className="d-grid gap-1">
                      <Button type="submit" variant="dark">
                        Guardar
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Col>
  )
}
