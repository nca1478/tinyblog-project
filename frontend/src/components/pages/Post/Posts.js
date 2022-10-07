// Dependencies
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { get } from '../../../config/api'

// Custom Dependencies
import { Paginate, PostItem, SpinnerLoading } from '../../common'

export const PostsPage = () => {
  const [posts, setPosts] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const limit = 4

  const preGetPosts = useCallback(async () => {
    await get(`/posts/published?status=true&page=1&limit=${limit}`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          setPageCount(Math.ceil(response.data.count / limit))
          setPosts(response.data.rows)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar obtener posts.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  const getPosts = async (currentPage) => {
    get(`/posts/published?status=true&page=${currentPage}&limit=${limit}`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          setPosts(response.data.rows)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar obtener posts.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1
    getPosts(currentPage)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    preGetPosts().catch(console.error)
  }, [preGetPosts])

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <h3 className="text-center text-white">Todos los Posts</h3>
        <Row className="d-flex justify-content-center g-4 pt-2">
          {!loaded ? (
            <SpinnerLoading size="lg" variant="light" />
          ) : posts.length > 0 ? (
            <>
              {posts.map((post) => {
                return <PostItem key={post.id} {...post} />
              })}

              <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
            </>
          ) : (
            <Alert
              variant="danger"
              className="w-75 animate__animated animate__fadeIn"
            >
              Oh no.... No se han publicado posts. Vuelve pronto...
            </Alert>
          )}
        </Row>
      </Container>
      <ToastContainer />
    </Col>
  )
}
