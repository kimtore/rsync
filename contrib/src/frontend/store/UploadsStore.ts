import { computed, observable, action } from 'mobx';
import getFinishedUploadsApi from '../api/getFinishedUploads';
import uploadFileApi from '../api/uploadFile';
import generateId from '../utils/generateId';
import deleteUploadApi from '../api/deleteUpload';
import Status from '../constants/Status';

export class UploadsStore {
  constructor() {
    this.fetchUploadsFromServer = this.fetchUploadsFromServer.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.removeUpload = this.removeUpload.bind(this);
    this.deleteUpload = this.deleteUpload.bind(this);
  }

  readonly uploads = observable<Upload>([]);

  @computed
  get allUploads() {
    return this.uploads;
  }

  @computed
  get finishedUploads() {
    return this.uploads.filter(upload => upload.status === Status.FINISHED);
  }

  @computed
  get uploadsInProgress() {
    return this.uploads.filter(upload => upload.status !== Status.FINISHED);
  }

  @action
  fetchUploadsFromServer() {
    getFinishedUploadsApi(this).then(action((uploads: Upload[]) => this.uploads.replace(uploads)));
  }

  @action
  uploadFile(file: File) {
    const upload = new Upload({
      filename: file.name,
      file: file,
      store: this,
    });
    this.uploads.unshift(upload);
    upload.start();
    return upload;
  }

  @action
  removeUpload(upload: Upload) {
    this.uploads.replace(this.uploads.filter(u => u !== upload));
  }

  @action
  deleteUpload(upload: Upload) {
    deleteUploadApi(upload.id).then(() => this.removeUpload(upload));
  }
}

export class Upload {
  file?: File;
  store: UploadsStore;
  abortFunc: Function;
  @observable status: string;
  @observable progress: number;
  @observable filename: string;
  @observable url: string;
  @observable expiry: string;
  @observable error: Error;
  @observable id: string;

  constructor({
    filename,
    expiry,
    id,
    status,
    url,
    file,
    store,
  }: {
    filename: string;
    expiry?: string;
    id?: string;
    status?: string;
    url?: string;
    file?: File;
    store: UploadsStore;
  }) {
    this.status = status || Status.INITIALIZED;
    this.progress = 0;
    this.filename = filename.substring(filename.lastIndexOf('/') + 1);
    this.id = id || generateId();
    this.expiry = expiry || '';
    this.url = url || '';
    this.file = file;
    this.store = store;
  }

  @action
  start() {
    this.status = Status.UPLOADING;
    uploadFileApi(this.file, this);
  }

  @action
  restart() {
    this.setProgress(0);
    this.start();
  }

  @action
  setProgress(progress: number) {
    this.progress = progress;
  }

  @action
  uploadAborted() {
    this.status = Status.ABORTED;
  }

  @action
  abortUpload() {
    this.status = Status.ABORTING;
    this.abortFunc && this.abortFunc();
  }

  @action
  finishing() {
    this.status = Status.FINISHING;
  }

  @action
  removeUpload() {
    this.store.removeUpload(this);
  }

  @action
  finishUpload({ id, url, filename, expiry }: { id: string; url: string; filename: string; expiry: string }) {
    this.id = id;
    this.status = Status.FINISHED;
    this.url = url;
    this.filename = filename.substring(filename.lastIndexOf('/') + 1);
    this.expiry = expiry;
  }

  @action
  uploadFailed(error: Error) {
    this.status = Status.ERROR;
    this.error = error;
  }

  @action
  deleteUpload() {
    this.store.deleteUpload(this);
  }

  setAbortFunc(abortFunc: Function) {
    this.abortFunc = abortFunc;
  }
}

export default new UploadsStore();
