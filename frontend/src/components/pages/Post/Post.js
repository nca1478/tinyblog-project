// Dependencies
import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Container, Row, Image } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'

// Custom Dependencies
import imagePost from '../../../assets/img/post.jpg'
import { get, put } from '../../../config/api'
import { parsePostDetails } from './helpers'
import { Paginate } from './components'

export const PostPage = () => {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [post, setPost] = useState({})
  const [posts, setPosts] = useState([])
  const [prevPage, setPrevPage] = useState(null)
  const [nextPage, setNextPage] = useState(null)

  const getPostById = useCallback(async () => {
    await get(`/posts/${postId}`)
      .then((response) => {
        const postDetails = parsePostDetails(response)
        setPost(postDetails)
      })
      .catch((error) => {
        toast.error('Error al intentar obtener detalles del post.')
        console.log(error)
      })
  }, [postId])

  const getPosts = async () => {
    await get(`/posts/published?status=true`)
      .then((response) => {
        const postsId = response.data.rows.map((post) => post.id)
        setPosts(postsId)
      })
      .catch((error) => {
        toast.error('Error al intentar obtener los posts.')
        console.log(error)
      })
  }

  const getPostsPages = useCallback(() => {
    const prev = posts.indexOf(post.id) - 1
    const next = posts.indexOf(post.id) + 1
    setPrevPage(prev < 0 ? null : prev)
    setNextPage(next <= posts.length - 1 ? next : null)
  }, [post.id, posts])

  const updatePostVisits = useCallback(async () => {
    await put(`/posts/${postId}/visits`, {}, null).catch((error) => {
      toast.error('Error al intentar actualizar número de visitas del post.')
      console.log(error)
    })
  }, [postId])

  const handleClickPrev = () => {
    navigate(`/post/${posts[prevPage]}/details`, { replace: false })
  }

  const handleClickNext = () => {
    navigate(`/post/${posts[nextPage]}/details`, { replace: false })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getPostById().catch(console.error)
    getPosts()
  }, [getPostById])

  useEffect(() => {
    getPostsPages()
  }, [posts, getPostsPages])

  useEffect(() => {
    updatePostVisits()
  }, [updatePostVisits])

  return (
    <div className="bg-white animate__animated animate__fadeIn">
      <Container>
        <Row className="my-4">
          <Col>
            <Row>
              <Col className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="fw-bold display-5">{post.title}</h1>
                <p className="h3">{post.title}</p>
                <p className="text-muted fst-italic">
                  Publicado por <b>{post.author}</b> el {post.createdAt}
                </p>

                {/* Botones de Post Anterior y Siguiente */}
                <Paginate
                  handleClickPrev={handleClickPrev}
                  handleClickNext={handleClickNext}
                  prevPage={prevPage}
                  nextPage={nextPage}
                />
              </Col>
            </Row>

            <hr />

            <Row className="animate__animated animate__fadeIn">
              <Col className="d-flex justify-content-center">
                <Image
                  className="my-3"
                  src={imagePost}
                  style={{ width: '30.5rem', height: 'auto' }}
                  thumbnail
                  fluid
                />
              </Col>
            </Row>

            <hr className="mb-4" />
            <p className="parrafo">{post.body}</p>
            <hr className="mt-4 mb-4" />
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  )
}
