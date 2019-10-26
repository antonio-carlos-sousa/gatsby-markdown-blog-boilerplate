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
  const result = await graphql(
    `{
      allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
              date(locale: "pt-br", formatString: "DD [de] MMMM[,] YYYY")
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
              date(locale: "pt-br", formatString: "DD [de] MMMM[,] YYYY")
            }
          }
        }
      }
    }`)

  // TODO: validar se a data esta a ser ordernada mesmo sem filtrar a informação dela

  // data posts
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(({ node: post, next, previous }) => {
    createPage({
      path: post.fields.slug,
      component: postTemplate,
      context: {
        slug: post.fields.slug,
        // inverted because order: DESC
        previous: next,
        next: previous
      }
    })
  })
}