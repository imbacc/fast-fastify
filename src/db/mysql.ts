import mysqlDrive from 'mysql'

import { mysqlConfig } from '@/config' // 数据库配置

// 创建连接池
export const mysqlPool = mysqlDrive.createPool(mysqlConfig)
