import React from 'react';
import FinishedUpload from './FinishedUpload';
import times from '../utils/times';
import MediaQuery from 'react-responsive';
import { observer } from 'mobx-react';
import { Upload } from '../store/UploadsStore';

type Props = {
  finishedUploads: Upload[];
};

const FinishedUploads: React.SFC<Props> = ({ finishedUploads }) =>
  <div className="finished-uploads">
    <table className="ui celled table">
      <MediaQuery minWidth={768}>
        <thead>
          <tr>
            <th>File</th>
            <th>Expiry</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
      </MediaQuery>
      <MediaQuery minWidth={768}>
        {getTbody(finishedUploads, 5)}
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        {getTbody(finishedUploads, 3)}
      </MediaQuery>
    </table>
  </div>;

const getTbody = (finishedUploads: Upload[], placeholderCount: number) =>
  <tbody>
    {finishedUploads.map(finishedUpload => <FinishedUpload key={finishedUpload.id} finishedUpload={finishedUpload} />)}
    {times(placeholderCount - finishedUploads.length, (index: number) =>
      <tr key={index}>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    )}
  </tbody>;

export default observer(FinishedUploads);
