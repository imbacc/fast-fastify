import { checkAuthConfig } from '@/config/index'

export class SkipRouter {
  private skipAuth: Array<string> = []
  private blurSkipAuth: Array<string> = []

  constructor() {
    // 初始化执行
    this.addSkip(checkAuthConfig)
  }

  // 精确检查 路由不检测jwt权限
  addSkip(skip: string | Array<string>) {
    if (typeof skip === 'string') {
      this.skipAuth.push(skip)
    } else {
      this.skipAuth.push(...skip)
    }
  }

  // 模糊检查 路由不检测jwt权限
  addBlurSkip(skip: string | Array<string>) {
    if (typeof skip === 'string') {
      this.blurSkipAuth.push(skip)
    } else {
      this.blurSkipAuth.push(...skip)
    }
  }

  /**
   * 精确检查权限
   * @param skip 路由地址
   * @returns boolean
   */
  checkSkip(skip: string) {
    return this.skipAuth.includes(skip)
  }

  /**
   * 模糊检查权限
   * @param skip 路由地址
   * @returns boolean
   */
  checkBlurSkip(skip: string) {
    return skip?.indexOf(this.blurSkipAuth.join('')) !== -1
  }
}