import * as React from 'react'
import { Details, DetailsType, StatsDetails } from '../models/details'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import StatsChart from './StatsChart'
import { Header } from './workbench/Body'
import { TypeLabel } from './TwoDSchemaLayout'

export interface DetailsBarProps {
  details: Details
  setDetailsBar: (details: Details) => void
}
const DetailsBar: React.FunctionComponent<DetailsBarProps> = (props) => {
  const {
    details,
    setDetailsBar
  } = props

  const renderStatsDetails = () => {
    const statsDetails = details as StatsDetails
    return (
      <div>
        {renderHeader(statsDetails.title, statsDetails.stats.type)}
        <div className="details-bar-content">
          <StatsChart data={statsDetails.stats} />
        </div>
      </div>
    )
  }

  const onDismiss = () => {
    setDetailsBar({ type: DetailsType.NoDetails })
  }

  const renderHeader = (header: Header) => {
    return (<div className="details-bar-header">
      <h3>{header.title}</h3>
      <h4><TypeLabel type={header.type} /></h4>
      <a
        className="close"
        onClick={onDismiss}
        aria-label="close"
        role="button"
      >
        <FontAwesomeIcon icon={faTimes} size='lg'/>
      </a>
    </div>)
  }

  return <div className='details-bar padding'>
    {details.type === DetailsType.StatsDetails && renderStatsDetails()}
  </div>
}

export default DetailsBar
