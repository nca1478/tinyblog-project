// Dependencies
import { useCallback, useContext, useEffect, useState } from 'react'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'

// Custom Dependencies
import { del, get, put } from '../../../config/api'
import { AuthContext } from '../../../context/authContext'
import { DashboardItem, Paginate, SpinnerLoading } from '../../common'

export const DashboardPage = () => {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 5

  const preGetPosts = useCallback(async () => {
    await get(`/posts?page=1&limit=5`, user.data.token)
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
  }, [user])

  const getPosts = async (page) => {
    await get(`/posts?page=${page}&limit=${limit}`, user.data.token)
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

  const handlePublish = async (id, published) => {
    const isPublished = published === false ? 'true' : 'false'

    await put(`/posts/${id}/publish?status=${isPublished}`, {}, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar publicar post.')
        console.log(error)
      })
      .finally(() => {
        getPosts(currentPage)
      })
  }

  const handleDelete = (postId) => {
    const confirm = window.confirm('¿Estás Seguro?')
    if (confirm) {
      del(`/posts/${postId}`, user.data.token)
        .then((response) => {
          if (response.data === null) {
            toast.error(response.errors.msg)
          } else {
            toast.info('El post ha sido eliminado exitosamente')
          }
        })
        .catch((error) => {
          toast.error('Error al intentar eliminar el post.')
          console.log(error)
        })
        .finally(() => {
          preGetPosts()
        })
    }
  }

  const handlePageClick = async (data) => {
    let page = data.selected + 1
    getPosts(page)
    setCurrentPage(page)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    preGetPosts().catch(console.error)
  }, [preGetPosts])

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <h3 className="text-center text-white">Listado de Posts</h3>
        <Row className="d-flex justify-content-center g-4 pt-2">
          {!loaded ? (
            <SpinnerLoading size="lg" variant="light" />
          ) : posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <DashboardItem
                  {...post}
                  key={post.id}
                  handlePublish={handlePublish}
                  handleDelete={handleDelete}
                />
              ))}

              <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
            </>
          ) : (
            <Alert
              variant="danger"
              className="w-75 animate__animated animate__fadeIn"
            >
              Oh no.... No hay posts para mostrar. Debes agregar posts...
            </Alert>
          )}
        </Row>
      </Container>
      <ToastContainer />
    </Col>
  )
}
