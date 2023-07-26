import { HttpException } from '@exceptions/http.exception'
import { Options } from 'multer'
import { extname } from 'path'

export function createFileUploadOption(mimetype: any, fileSize: number, maxFileAtTime: number) {
  const imgUploadOptions: Options = {
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(mimetype)) {
        cb(null, true)
      } else {
        cb(new HttpException(400, 'Unsupported file type' + extname(file.originalname)), false)
      }
    },

    limits: {
      fileSize: fileSize, // max file size
      files: maxFileAtTime, // max of five files at a time
    },
  }
  return imgUploadOptions
}
