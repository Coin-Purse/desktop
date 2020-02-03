import React from 'react'
import moment from 'moment'

import Commit from '../../models/dataset'

export interface CommitPreviewProps {
  data: Commit
}

const CommitPreview: React.FunctionComponent<CommitPreviewProps> = ({ data }) => {
  if (!data) { return null }

  const { timestamp, author, title } = data

  return (
    <div className='commit-preview'>
      <div className='author-time'>by {author} {moment(timestamp).fromNow()}</div>
      <div className='title'>{title}</div>
    </div>
  )
}

export default CommitPreview
