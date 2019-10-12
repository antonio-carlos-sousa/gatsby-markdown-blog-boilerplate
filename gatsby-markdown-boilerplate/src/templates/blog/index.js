import React from 'react'

import Layout from '../../components/layout'
import styles from './index.module.scss'

const Blog = () => {

  return (
    <Layout>
      <div className={styles.title}>
        <h1>Hello this is my first Markdown Blog</h1>
      </div>

      <div className={styles.content}>

      </div>
    </Layout>
  )
}

export default Blog
