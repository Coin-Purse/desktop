import React from 'react'
import moment from 'moment'
import filesize from 'filesize'
// TODO (b5) - move these into icon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faClock } from '@fortawesome/free-regular-svg-icons'

import Dataset from '../../models/dataset'
import classNames from 'classnames'

// component for rendering dataset format, timestamp, size, etc
export interface DatasetDetailsSubtextProps {
  data: Dataset

  // if true, omit display of commit timestamp
  noTimestamp?: boolean
  size?: 'sm' | 'md'
  color?: 'light' | 'muted' | 'dark'
}

export const DatasetDetailsSubtext: React.FunctionComponent<DatasetDetailsSubtextProps> = ({ data, size = 'md', color = 'dark', noTimestamp }) => {
  if (!data) { return null }
  const { structure, commit } = data

  return (
    <div className={classNames('dataset-details', { 'small': size === 'sm', 'light': color === 'light', 'muted': color === 'muted' }) }>
      {structure && <span className='dataset-details-item'> {structure.format}</span>}
      {(!noTimestamp && commit && commit.timestamp) && <span className='dataset-details-item'><FontAwesomeIcon icon={faClock} size='sm'/> {moment(commit.timestamp).fromNow()}</span>}
      {commit && commit.count && <span className='dataset-details-item'>{`${commit.count} ${commit.count === 1 ? 'commits' : 'commits'}`}</span>}
      {structure && structure.length && <span className='dataset-details-item'><FontAwesomeIcon icon={faFile} size='sm'/> {filesize(structure.length)}</span>}
    </div>
  )
}

export default DatasetDetailsSubtext
