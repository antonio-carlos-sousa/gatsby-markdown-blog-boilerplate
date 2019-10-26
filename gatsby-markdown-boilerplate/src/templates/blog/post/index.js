import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../../../components/layout'
import styles from './index.module.scss'

const BlogPost = ({ pageContext, data }) => {
  const postInfo = data.markdownRemark.frontmatter
  const post = data.markdownRemark

  return (
    <Layout>
      <div className={styles.header}>
        <h1 className={styles.title}>{postInfo.title}</h1>
      </div>

      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: post.html }}/>

        <p>Frontmatter:</p>

        <ul>
          <li><small><b>Title:</b> {postInfo.title} </small></li>
          <li><small><b>Date:</b> {postInfo.date} </small></li>
          <li><small><b>Description:</b> {postInfo.description} </small></li>
          <li>
            <small>
              <b>Title:</b> {postInfo.tags.map((u, i) => (i + 1) !== postInfo.tags.length ? u + ', ' : u)}
            </small>
          </li>
        </ul>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: '200',
            margin: '0 auto',
          }}
        >
          {pageContext.previous &&
          <Link to={`/${pageContext.previous.fields.slug}`}>
            Prev Page -> {pageContext.previous.frontmatter.title}
          </Link>
          }

          {pageContext.next &&
          <Link to={`/${pageContext.next.fields.slug}`}>
            Next Page -> {pageContext.next.frontmatter.title}
          </Link>
          }

        </div>
      </div>
    </Layout>
  )
}

export default BlogPost

// Query Data
export const query = graphql`
    query Post($slug: String!) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            html,
            frontmatter {
                title,
                date(locale: "pt-br", formatString: "DD [de] MMMM[,] YYYY"),
                description,
                tags
            }
        }
    }`