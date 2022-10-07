// Dependencies
import React, { useEffect, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'

// Custom Dependencies
import { get } from '../../../config/api'
import { PostItem, Showcase, SpinnerLoading } from '../../common'

export const HomePage = () => {
  const [posts, setPosts] = useState([])
  const [loaded, setLoaded] = useState(false)

  const getLastPosts = async () => {
    const lastPosts = 4

    await get(`/posts/lastposts?limit=${lastPosts}`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          setPosts(response.data)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar obtener últimos posts.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  useEffect(() => {
    getLastPosts()
  }, [])

  return (
    <>
      <Showcase />
      <Col className="bg-primary">
        <h2 className="text-center text-white mt-5 mb-4">Últimos Posts</h2>

        <Container className="px-4 mb-5">
          <Row className="d-flex justify-content-center g-4 pt-2 ">
            {!loaded ? (
              <SpinnerLoading size="lg" variant="light" />
            ) : posts.length > 0 ? (
              posts.map((post) => {
                return <PostItem key={post.id} {...post} />
              })
            ) : (
              <Alert variant="danger" className="w-75">
                Oh no.... No se han publicado posts. Vuelve pronto...
              </Alert>
            )}
          </Row>
        </Container>
        <ToastContainer />
      </Col>
    </>
  )
}
