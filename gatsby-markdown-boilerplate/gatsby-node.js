const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

/** Called when a new node is created
 * we use it for create a new field by each markdown file
 * index new markdown files to graphql with createNodeField
 * on this case we are creating this field -> node.fields.slug
 * (will be the uri displayed) */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'blog' })

    createNodeField({
      node,
      name: `slug`,
      value: `blog/${slug.slice(12)}`,
    })
  }
}

/** Tell plugins to add pages.
 * This extension point is called only after the initial sourcing
 * and transformation of nodes plus creation of the GraphQL schema are complete
 * so you can query your data in order to create pages. */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const postTemplate = path.resolve('./src/templates/blog/post/index.js')
  const blogTemplate = path.resolve('./src/templates/blog/index.js')

  // Query each post from markdownFiles
  const result = await graphql
  (`{
          allMarkdownRemark {
              edges {
                  node {
                      fields {
                          slug
                      }
                  }
              }
          }
      }`)

  // data posts
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(({ node: post }) => {
    createPage({
      path: post.fields.slug,
      component: postTemplate
    })
  })

}