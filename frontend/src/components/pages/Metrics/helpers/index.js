export const parsePosts = (response) => {
  return response.data.rows.map((post) => {
    return {
      id: post.id,
      numVisits: post.numVisits,
      published: post.published,
    }
  })
}

export const sumVisitsPosts = (allPosts, key) => {
  return allPosts.reduce((a, b) => a + (b[key] || 0), 0)
}

export const numMaxVisits = (allPosts) => {
  const maxVisits = Math.max.apply(
    Math,
    allPosts.map(function (o) {
      return o.numVisits
    })
  )

  const maxPostId = allPosts.find(
    (value) => Number(value.numVisits) === maxVisits
  ).id

  return { maxVisits, maxPostId }
}

export const numMinVisits = (allPosts) => {
  const minVisits = Math.min.apply(
    Math,
    allPosts.map(function (o) {
      return o.numVisits
    })
  )

  const minPostId = allPosts.find(
    (value) => Number(value.numVisits) === minVisits
  ).id

  return { minVisits, minPostId }
}
