// Dependencies
import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Footer, MainNavbar } from '../components/common'

// Pages
import {
  AddPostPage,
  DashboardPage,
  EditPostPage,
  HomePage,
  LoginPage,
  MetricsPage,
  PostPage,
  PostsPage,
  SearchPage,
} from '../components/pages'
import { put } from '../config/api'

// Routes
import { PrivateRoute } from './PrivateRoute'

export const AppRoutes = () => {
  const [loading, setLoading] = useState(true)

  const updateBlogVisits = useCallback(async () => {
    await put(`/metrics`, {}, null).catch((error) => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [setLoading])

  useEffect(() => {
    updateBlogVisits().catch(console.error)
  }, [updateBlogVisits])

  if (loading) {
    return (
      <div className="preloader-container">
        <div className="preloader"></div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="bg-dark d-flex flex-column min-vh-100">
        <MainNavbar />
        <Routes>
          {/* PublicRoutes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post/:postId/details" element={<PostPage />} />
          <Route path="/search" element={<SearchPage />} />

          {/* PrivateRoutes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/metrics"
            element={
              <PrivateRoute>
                <MetricsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/post/add"
            element={
              <PrivateRoute>
                <AddPostPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/post/:postId/edit"
            element={
              <PrivateRoute>
                <EditPostPage />
              </PrivateRoute>
            }
          />

          <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
