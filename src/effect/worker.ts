// 子线程
export class ChildWorker {
  private workerTarget = new Map<string, Worker>()
  private workerURL = new Map<string, string>()
  runWorker(keyName: string, jsString: string, callback: (res: MessageEvent<any>) => void) {
    const workerCache = this.workerTarget.get(keyName)
    if (workerCache) return workerCache

    const blob = new Blob([jsString], { type: 'application/javascript' })
    const workerURL = URL.createObjectURL(blob)
    const worker = new Worker(workerURL)

    this.workerTarget.set(keyName, worker)
    this.workerURL.set(keyName, workerURL)

    worker.onmessage = (ev) => {
      callback(ev)
    }

    worker.onerror = (ev) => {
      console.error(`${keyName} Worker Error: `, ev)
    }

    return worker
  }

  rmWorker(keyName: string) {
    const workerCache = this.workerTarget.get(keyName)
    const workerURL = this.workerURL.get(keyName)
    if (workerCache && workerURL) {
      workerCache.terminate()
      URL.revokeObjectURL(workerURL)
      this.workerTarget.delete(keyName)
      this.workerURL.delete(keyName)
    }
  }
}
