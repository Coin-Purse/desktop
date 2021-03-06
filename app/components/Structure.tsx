import * as React from 'react'
import Schema from './structure/Schema'
import Dataset, { Structure as IStructure, Schema as ISchema } from '../models/dataset'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ExternalLink from './ExternalLink'
import { ApiActionThunk } from '../store/api'
import FormatConfigHistory from './FormatConfigHistory'
import FormatConfigFSI from './FormatConfigFSI'
import LabeledStats from './item/LabeledStats'
import fileSize, { abbreviateNumber } from '../utils/fileSize'
import SpinnerWithIcon from './chrome/SpinnerWithIcon'

export interface StructureProps {
  data: IStructure
  history: boolean
  showConfig?: boolean
  loading: boolean
  write?: (dataset: Dataset) => ApiActionThunk | void
}

export interface FormatConfigOption {
  label: string
  tooltip: string
  type: string
}

export const formatConfigOptions: { [key: string]: FormatConfigOption } = {
  headerRow: {
    label: 'This table contains a header row',
    tooltip: 'If the the first row of the table IS the row containing all the column names, check this input',
    type: 'boolean'
  },
  variadicFields: {
    label: 'This table has rows with different lengths',
    tooltip: 'If your table has rows that have different numbers of entries in each row, check this input',
    type: 'boolean'
  },
  lazyQuotes: {
    label: 'This table uses different quotes to indicate strings',
    tooltip: 'If your table sometime uses double quotes, sometimes uses single quotes, or sometimes doesn\'t use quotes at all, check this input',
    type: 'boolean'
  },
  // TODO (ramfox): the juice isn't worth the squeeze for this one quite yet
  // let's wait until someone yells at us about not being able to use a csv
  // with a separator other then ',' before we impliment
  // separator: {
  //   label: '',
  //   tooltip: '',
  //   type: 'rune'
  // },
  pretty: {
    label: 'Pretty-print JSON',
    tooltip: 'Check this box if you want your JSON to display formatted.',
    type: 'boolean'
  },
  sheetName: {
    label: 'Main sheet name:',
    tooltip: 'The name of the sheet that has the content that you want to be the focus of this dataset',
    type: 'string'
  }
}

const Structure: React.FunctionComponent<StructureProps> = (props) => {
  const { data, history, write, showConfig = true, loading } = props

  if (loading) {
    return <SpinnerWithIcon loading={true} />
  }

  const format = data.format
  const handleWriteFormat = (option: string, value: any) => {
    if (!write) return
    // TODO (ramfox): sending over format since a user can replace the body with a body of a different
    // format. Let's pass in whatever the current format is, so that we have unity between
    // what the desktop is seeing and the backend. This can be removed when we have the fsi
    // backend codepaths settled
    write({ structure: {
      ...data,
      format,
      formatConfig: {
        ...data.formatConfig,
        [option]: value
      }
    } })
  }

  const handleOnChange = (schema: ISchema) => {
    if (write) write({ structure: { ...data, schema } })
  }

  const stats = [
    { 'label': 'format', 'value': data.format ? data.format.toUpperCase() : 'unknown' },
    { 'label': 'body size', 'value': data.length ? fileSize(data.length) : '—' },
    { 'label': 'entries', 'value': abbreviateNumber(data.entries) || '—' },
    { 'label': 'errors', 'value': data.errCount ? abbreviateNumber(data.errCount) : '—' },
    { 'label': 'depth', 'value': data.depth || '—' }
  ]

  return (
    <div className='structure'>
      <div className='stats'><LabeledStats data={stats} size='lg' /></div>
      { showConfig && (history
        ? <FormatConfigHistory structure={data} />
        : <FormatConfigFSI
          structure={data}
          format={format}
          write={handleWriteFormat}
        />)
      }
      <div>
        <h4 className='schema-title'>
          Schema
          &nbsp;
          <ExternalLink id='json-schema' href='https://json-schema.org/'>
            <span
              data-tip={'JSON schema that describes the structure of the dataset. Click here to learn more about JSON schemas'}
              className='text-input-tooltip'
            >
              <FontAwesomeIcon icon={faInfoCircle} size='sm'/>
            </span>
          </ExternalLink>
        </h4>
      </div>
      <Schema
        data={data ? data.schema : undefined}
        onChange={handleOnChange}
        editable={!history}
      />
    </div>
  )
}

export default Structure
