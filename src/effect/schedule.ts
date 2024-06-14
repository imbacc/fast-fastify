import { fastify, logger } from '@/effect/index'
import { SimpleIntervalJob, AsyncTask } from 'toad-scheduler'

export class Scheduler {
  constructor() {
  }

  start() {
    this.test()
  }

  // days?: number - how many days to wait before executing the job for the next time;
  // hours ?: number - how many hours to wait before executing the job for the next time;
  // minutes ?: number - how many minutes to wait before executing the job for the next time;
  // seconds ?: number - how many seconds to wait before executing the job for the next time;
  // milliseconds ?: number - how many milliseconds to wait before executing the job for the next time;
  // runImmediately ?: boolean - if set to true, in addition to being executed on a given interval, job will also be executed immediately when added or restarted.
  test(seconds = 20) {
    const task = new AsyncTask(
      'simple task',
      () => {
        logger.tag('scheduler', 'test task job ......')
        // db.pollForSomeData().then((result) => { /* continue the promise chain */ })
        return Promise.resolve('db change')
      },
      () => {
        /* handle errors here */
        logger.error('task job error...')
      },
    )
    const job = new SimpleIntervalJob({ seconds }, task)
    fastify.ready().then(() => {
      fastify.scheduler?.addSimpleIntervalJob(job)
    })
  }
}