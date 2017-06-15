import React from 'react'
import PropTypes from 'prop-types'
import CopyLink from './CopyLink'
import TimeRemaining from './TimeRemaining'
import MediaQuery from 'react-responsive'
import { observer } from 'mobx-react'

const FinishedUpload = observer(({ finishedUpload }) =>
  <tr>
    <td>
      <MediaQuery maxWidth={767} component="span">
        File:{' '}
      </MediaQuery>
      {finishedUpload.filename}
    </td>
    <td>
      <MediaQuery maxWidth={767} component="span">
        Expiry:{' '}
      </MediaQuery>
      <TimeRemaining expiry={finishedUpload.expiry} />
    </td>
    <td>
      <a href={finishedUpload.url}>
        {finishedUpload.url}
      </a>
    </td>
    <td>
      <CopyLink url={finishedUpload.url} /> |{' '}
      <a onClick={() => finishedUpload.deleteUpload()}>Delete</a>
    </td>
  </tr>
)
FinishedUpload.propTypes = {
  finishedUpload: PropTypes.object.isRequired
}

export default FinishedUpload
