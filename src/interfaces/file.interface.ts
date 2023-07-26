export interface File {
  originalname: string
  size: number
  mimetype: string
  extension: string
  buffer: ArrayBuffer
}

export interface UploadedFile {
  path: string
}
