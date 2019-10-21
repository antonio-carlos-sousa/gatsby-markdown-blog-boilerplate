import React from 'react'
import { graphql } from 'gatsby'

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
        <div dangerouslySetInnerHTML={{__html: post.html}} />
        <small>{pageContext.slug}</small>
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
                title
            }
        }
    }`