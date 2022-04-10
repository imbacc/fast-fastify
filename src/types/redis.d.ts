export interface redis_DTYPE {
  getRedis(key: string): Promise<any>
  setRedis(key: string, value: any, time: number): void
}
