import { computed, observable, action } from 'mobx'
import getFinishedUploadsApi from '../api/getFinishedUploads'
import uploadFileApi from '../api/uploadFile'
import generateId from '../utils/generateId'
import deleteUploadApi from '../api/deleteUpload'
import Status from '../constants/Status'

export class UploadsStore {
  constructor() {
    this.fetchUploadsFromServer = this.fetchUploadsFromServer.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.removeUpload = this.removeUpload.bind(this)
    this.deleteUpload = this.deleteUpload.bind(this)
  }

  @observable uploads = []

  @computed
  get allUploads() {
    return this.uploads
  }

  @computed
  get finishedUploads() {
    return this.uploads.filter(upload => upload.status === Status.FINISHED)
  }

  @computed
  get uploadsInProgress() {
    return this.uploads.filter(upload => upload.status !== Status.FINISHED)
  }

  @action
  fetchUploadsFromServer() {
    getFinishedUploadsApi(this).then(
      action(uploads => this.uploads.replace(uploads))
    )
  }

  @action
  uploadFile(file) {
    const upload = new Upload({
      filename: file.name,
      file: file,
      store: this
    })
    this.uploads.unshift(upload)
    upload.start()
    return upload
  }

  @action
  removeUpload(upload) {
    this.uploads.replace(this.uploads.filter(u => u !== upload))
  }

  @action
  deleteUpload(upload) {
    deleteUploadApi(upload.id).then(() => this.removeUpload(upload))
  }
}

export class Upload {
  @observable status
  @observable progress
  @observable filename
  @observable url
  @observable expiry
  @observable error
  @observable id

  constructor({ filename, expiry, id, status, url, file, store }) {
    this.status = status || Status.INITIALIZED
    this.progress = 0
    this.filename = filename.substring(filename.lastIndexOf('/') + 1)
    this.id = id || generateId()
    this.expiry = expiry
    this.url = url
    this.file = file
    this.store = store
  }

  @action
  start() {
    this.status = Status.UPLOADING
    uploadFileApi(this.file, this)
  }

  @action
  restart() {
    this.setProgress(0)
    this.start()
  }

  @action
  setProgress(progress) {
    this.progress = progress
  }

  @action
  uploadAborted() {
    this.status = Status.ABORTED
  }

  @action
  abortUpload() {
    this.status = Status.ABORTING
    this.abortFunc && this.abortFunc()
  }

  @action
  finishing() {
    this.status = Status.FINISHING
  }

  @action
  removeUpload() {
    this.store.removeUpload(this)
  }

  @action
  finishUpload({ id, url, filename, expiry }) {
    this.id = id
    this.status = Status.FINISHED
    this.url = url
    this.filename = filename.substring(filename.lastIndexOf('/') + 1)
    this.expiry = expiry
  }

  @action
  uploadFailed(error) {
    this.status = Status.ERROR
    this.error = error
  }

  @action
  deleteUpload() {
    this.store.deleteUpload(this)
  }

  setAbortFunc(abortFunc) {
    this.abortFunc = abortFunc
  }
}

export default new UploadsStore()
