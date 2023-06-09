import { Buffer } from 'node:buffer'

export class Base64 {
  /**
   * 加密
   * @param str
   * @returns
   */
  base64Encrypt(str: string) {
    return Buffer.from(str).toString('base64')
  }

  /**
   * 解密
   * @param str
   * @returns
   */
  base64Decrypt(str: string) {
    return Buffer.from(str, 'base64').toString()
  }
}