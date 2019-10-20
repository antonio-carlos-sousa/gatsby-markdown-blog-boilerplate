import React from 'react'

import Layout from '../../../components/layout'
import styles from './index.module.scss'

const BlogPost = () => {

  return (
    <Layout>
      <div className={styles.header}>
        <h1 className={styles.title}>Will be the title for each Post</h1>
      </div>

      <div className={styles.content}>
        {/** Content */}
      </div>
    </Layout>
  )
}

export default BlogPost