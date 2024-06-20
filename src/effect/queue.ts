import EventEmitter from 'node:events'

type promise_DTYPE = <T>() => Promise<T>
interface queue_DTYPE { key: string, promise: promise_DTYPE }
type queueList_DTYPE = Array<queue_DTYPE>

export class Queue {
  private queueList: queueList_DTYPE = []
  private isProcessing = false
  private resultMap = new Map()

  constructor() {
    this.queueList = []
    this.isProcessing = false
  }

  push<T>(queue: queue_DTYPE) {
    this.queueList.push(queue)
    if (!this.isProcessing) {
      this.processQueue()
    }
  }

  getResult(key: string) {
    if (!this.resultMap.has(key)) return { data: null, status: 'null' }
    return this.resultMap.get(key)
  }

  private processQueue() {
    if (this.queueList.length === 0) {
      this.isProcessing = false
      return
    }

    this.isProcessing = true
    const queueTarget = this.queueList.shift()
    const key = queueTarget?.key
    const pro = queueTarget?.promise()

    pro?.then((res) => {
      this.resultMap.set(key, { data: res, status: 'success' })
    }).catch((err) => {
      this.resultMap.set(key, { data: err, status: 'fail' })
    }).finally(() => {
      this.processQueue()
    })
  }
}
