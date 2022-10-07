// Dependencies
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap'

// Custom Dependencies
import { AuthContext } from '../../../context/authContext'
import { types } from '../../../types/types'

export const MainNavbar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const { register, handleSubmit, setValue } = useForm()
  const navigate = useNavigate()

  const handleOnBlur = () => {
    setValue('searchText', null)
  }

  const handleLogout = () => {
    dispatch({ type: types.logout })
    navigate('/', { replace: true })
  }

  const onSubmit = (data) => {
    navigate(`/search?q=${data.searchText}`)
  }

  const styleActive = ({ isActive }) => {
    return 'nav-item nav-link ' + (isActive ? 'active' : '')
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand text-primary">
              TINYBLOG
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavLink to="/" className={styleActive}>
                Inicio
              </NavLink>

              <NavLink to="/posts" className={styleActive}>
                Posts
              </NavLink>

              {user.logged && (
                <>
                  <NavLink to="/admin/dashboard" className={styleActive}>
                    Dashboard
                  </NavLink>

                  <NavLink to="/admin/metrics" className={styleActive}>
                    Métricas
                  </NavLink>

                  <NavLink to="/admin/post/add" className={styleActive}>
                    Agregar Post
                  </NavLink>
                </>
              )}
            </Nav>

            <Form
              className="d-flex justify-content-around"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Form.Control
                type="search"
                placeholder="Buscar por título"
                className="me-2"
                aria-label="Search"
                {...register('searchText', {
                  onBlur: handleOnBlur,
                })}
                autoComplete="off"
              />

              {!user.logged ? (
                <NavLink to="/admin/login" className="btn btn-primary me-2">
                  Admin
                </NavLink>
              ) : (
                <Button
                  to="/logout"
                  className="btn btn-danger me-2"
                  onClick={handleLogout}
                >
                  Salir
                </Button>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
