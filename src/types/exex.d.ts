import type { Pool } from 'mysql'
import type { APIResultful_DTYPE } from '#/resultful'

export interface exec_DTYPE {
  pool: Pool
  call(sql: string, value?: Array<any>, code?: string): Promise<APIResultful_DTYPE>
}
