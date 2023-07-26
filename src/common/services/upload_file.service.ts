import { env } from '@env'
import { Service } from 'typedi'
import AWS from 'aws-sdk'
import { HttpException } from '@exceptions/http.exception'
import { File, UploadedFile } from '@interfaces/file.interface'

@Service()
export class UploadToFilebaseService {
  private s3Client: AWS.S3
  private baseUrl: string

  constructor(baseUrl = env.app.ipfsUrl) {
    this.baseUrl = baseUrl
    this.s3Client = new AWS.S3({
      endpoint: env.filebaseS3.s3Endpoint,
      region: env.filebaseS3.defaultRegion,
      accessKeyId: env.filebaseS3.accessKeyId,
      secretAccessKey: env.filebaseS3.secretAccessKey,
    })
  }

  private generateFileKey(file: File, timestamp: number): string {
    return `${timestamp + file.originalname}`
  }

  //   nhieu file
  async upload(files: File | File[]): Promise<UploadedFile | UploadedFile[] | undefined> {
    try {
      if (Array.isArray(files)) {
        const paths = await Promise.all(files.map(async (file) => this.uploadFile(file)))

        return paths.map((path) => ({ path }))
      }

      const path = await this.uploadFile(files)

      return {
        path,
      }
    } catch {
      return undefined
    }
  }

  async uploadFile(file: File): Promise<string> {
    const timestamp = Date.now()
    const fileKey = this.generateFileKey(file, timestamp)

    return new Promise((resolve) => {
      this.s3Client
        .putObject({
          Bucket: env.filebaseS3.bucketName,
          Key: fileKey,
          ContentType: file.mimetype,
          Body: file.buffer,
          ACL: 'public-read',
        })
        .on('success', async (response) => {
          resolve(
            encodeURI(`${env.app.ipfsUrl}/ipfs/${response.httpResponse.headers['x-amz-meta-cid']}`),
          )
        })
        .on('error', () => {
          throw new HttpException(500, "Can't upload file")
        })
        .send()
    })
  }
}
