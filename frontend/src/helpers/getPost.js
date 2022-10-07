import { posts } from '../data/posts'

export const getPost = (postId) => {
  return posts.find((post) => post.id === postId)
}
