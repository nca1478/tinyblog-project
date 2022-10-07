// Dependencies
import { useCallback, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Custom Dependencies
import { Box } from '../../common'
import { get } from '../../../config/api'
import {
  sumVisitsPosts,
  parsePosts,
  numMaxVisits,
  numMinVisits,
} from './helpers'

export const MetricsPage = () => {
  const [numVisitsBlog, setNumVisitsBlog] = useState(0)
  const [numVisitsPosts, setNumVisitsPosts] = useState(0)
  const [maxVisitsPost, setMaxVisitsPost] = useState({
    maxVisits: 0,
    maxPostId: '',
  })
  const [minVisitsPost, setMinVisitsPost] = useState({
    minVisits: 0,
    minPostId: '',
  })

  const getMetrics = useCallback(async () => {
    get(`/posts/published?status=true`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          const allPosts = parsePosts(response)
          const visitsPosts = sumVisitsPosts(allPosts, 'numVisits')
          const maxVisits = numMaxVisits(allPosts)
          const minVisits = numMinVisits(allPosts)

          setNumVisitsPosts(visitsPosts)
          setMaxVisitsPost(maxVisits)
          setMinVisitsPost(minVisits)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar obtener posts.')
        console.log(error)
      })
  }, [])

  const getBlogNumVisits = useCallback(async () => {
    await get(`/metrics`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          setNumVisitsBlog(response.data.blogNumVisits)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar obtener métricas (visitas al blog).')
        console.log(error)
      })
  }, [])

  useEffect(() => {
    getBlogNumVisits()
    getMetrics()
  }, [getBlogNumVisits, getMetrics])

  return (
    <Col className="p-4 bg-primary">
      <h3 className="text-center text-white mb-4">Métricas Web</h3>
      <Container className="animate__animated animate__fadeIn">
        <Row className="text-center g-2 justify-content-center">
          <Col sm={12} md={6} lg={3}>
            <Box
              bgColor="bg-dark"
              textColor="text-light"
              title="Total Visitas al Blog"
              icon="bi bi-check2-square"
              bodyText={`${numVisitsBlog} visitas`}
              buttonColor="btn-primary"
              buttonText="Ver Trabajos"
              postId=""
            />
          </Col>

          <Col sm={12} md={6} lg={3}>
            <Box
              bgColor="bg-secondary"
              textColor="text-light"
              title="Total Visitas a Posts"
              icon="bi bi-check2-square"
              bodyText={`${numVisitsPosts} visitas`}
              buttonColor="btn-primary"
              buttonText="Ver Trabajos"
              postId=""
            />
          </Col>
        </Row>

        <Row className="text-center g-2 mt-1 justify-content-center">
          <Col sm={12} md={6} lg={3}>
            <Box
              bgColor="bg-dark"
              textColor="text-light"
              title="Post más Visitado"
              icon="bi bi-check2-square"
              bodyText={`${maxVisitsPost.maxVisits} visitas`}
              buttonColor="btn-dark"
              buttonText="Ver Trabajos"
              postId={maxVisitsPost.maxPostId}
            />
          </Col>

          <Col sm={12} md={6} lg={3}>
            <Box
              bgColor="bg-secondary"
              textColor="text-light"
              title="Post menos Visitado"
              icon="bi bi-check2-square"
              bodyText={`${minVisitsPost.minVisits} visitas`}
              buttonColor="btn-primary"
              buttonText="Ver Trabajos"
              postId={minVisitsPost.minPostId}
            />
          </Col>
        </Row>

        <ToastContainer />
      </Container>
    </Col>
  )
}
