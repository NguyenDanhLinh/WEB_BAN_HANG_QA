import { Service } from 'typedi'
import cron from 'node-cron'
import moment from 'moment-timezone'

@Service()
class CronServices {
  createScheduleLog(time, taskFunction) {
    const cronTime = this.formatDateToCron(time)

    cron.schedule(cronTime, async () => {
      const x = await taskFunction

      console.log(x)
    })
  }

  formatDateToCron(dateTimeString) {
    const dateTime = moment(dateTimeString, 'YYYY-MM-DD HH:mm:ss Z')
    const minute = dateTime.minute()
    const hour = dateTime.hour()
    const dayOfMonth = dateTime.date()
    const month = dateTime.month() + 1 // Tháng trong Moment.js bắt đầu từ 0, trong cron job bắt đầu từ 1
    const year = dateTime.year()
    const cronJobFormat = `0 ${minute} ${hour} ${dayOfMonth} ${month} * ${year}`

    return cronJobFormat
  }
}

export default CronServices
