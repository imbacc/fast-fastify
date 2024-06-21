import type { MultipartFile } from '@fastify/multipart'

import { aliOssConfig } from '@/config/index'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import util from 'node:util'
import OSS from 'ali-oss'

const pump = util.promisify(pipeline)

// const headers = {
//   // 指定Object的存储类型。
//   'x-oss-storage-class': 'Standard',
//   // 指定Object的访问权限。
//   'x-oss-object-acl': 'private',
//   // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.jpg。
//   // 'Content-Disposition': 'attachment; filename="example.jpg"'
//   // 设置Object的标签，可同时设置多个标签。
//   'x-oss-tagging': 'Tag1=1&Tag2=2',
//   // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
//   'x-oss-forbid-overwrite': 'true',
// }

export class AliOss {
  private client = new OSS(aliOssConfig)

  constructor() {
    // this.listBuckets()
  }

  async fileUpload(data: MultipartFile) {
    await pump(data.file, createWriteStream(data.filename))
  }

  async listBuckets() {
    try {
      const result = await this.client?.listBuckets(null, { timeout: 5000 })
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  // async filePutMultipart(name: string, file) {
  //   console.log('%c [ file ]-45', 'font-size:14px; background:#41b883; color:#ffffff;', file)
  //   try {
  //     const result = await this.client.multipartUpload(name, file, { parallel: 10 })
  //     console.log('%c [ result ]-49', 'font-size:14px; background:#41b883; color:#ffffff;', result)
  //     return result
  //   } catch (err) {
  //     console.log('%c [ err ]-51', 'font-size:14px; background:#41b883; color:#ffffff;', err)
  //     return err
  //   }
  // }

  async list() {
    // 不带任何参数，默认最多返回100个文件。
    const result = await this.client.list({ 'max-keys': 1 }, {})
    console.log(result)
  }

  async filePut(filePath: string, file) {
    try {
      const result = await this.client.put(filePath, file)
      return result
    } catch (err) {
      return err
    }
  }
}
