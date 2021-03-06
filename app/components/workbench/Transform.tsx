import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import Store from '../../models/store'
import { QriRef } from '../../models/qriRef'
import { fsiWrite } from '../../actions/api'
import Code from '../Code'

export interface TransformProps {
  data: string
  qriRef: QriRef

  // TODO (b5) - work in progress
  dryRun?: () => void
}

export const TransformComponent: React.FC<TransformProps> = ({ data = '' }) => (
  <Code data={data} />
)

const mapStateToProps = (state: Store, ownProps: TransformProps) => {
  return ownProps
}

const mergeProps = (props: any, actions: any): TransformProps => { //eslint-disable-line
  return { ...props, ...actions }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ write: fsiWrite }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TransformComponent)
