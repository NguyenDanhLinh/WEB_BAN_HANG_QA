import { Service } from 'typedi'
import cron from 'node-cron'
import moment from 'moment-timezone'
import VoucherRepository from '@repositories/voucher.repository'
import UserVoucherRepository from '@repositories/user_voucher.repository'
import FlashSaleRepository from '@repositories/flash_sale.repository'
import FlashSaleItemRepository from '@repositories/flashSale_item.repository'
import { MailService } from '@common/services/mail.service'
import { env } from '@env'

@Service()
class CronServices {
  constructor(
    protected voucherRepository: VoucherRepository,
    protected userVoucherRepository: UserVoucherRepository,
    protected flashSaleRepository: FlashSaleRepository,
    protected flashSaleItemRepository: FlashSaleItemRepository,
    protected mailService: MailService,
  ) {}

  createScheduleLog(time, taskFunction) {
    const cronTime = this.formatDateToCron(time)

    cron.schedule(cronTime, async () => {
      const x = await taskFunction

      console.log(x)
    })
  }

  createScheduleCloseVoucher(time, voucherId: number) {
    const cronTime = this.formatDateToCron(time)

    cron.schedule(cronTime, async () => {
      this.voucherRepository.update({ inventoryNumber: 0 }, { where: { id: voucherId } })

      this.userVoucherRepository.deleteByCondition({ voucherId })
    })
  }

  createScheduleCloseFlashSale(time, flashSaleId: number) {
    const cronTime = this.formatDateToCron(time)

    cron.schedule(cronTime, async () => {
      this.flashSaleItemRepository.update({ quantity: 0 }, { where: { flashSaleId: flashSaleId } })
    })
  }

  createScheduleStartFlashSale(time, flashSaleId: number, listMail: string[]) {
    const cronTime = this.formatDateToCron(this.subtract15MinutesFromDate(time))

    const subject = `flash sale is about to start, click on https://github.com/ for details`

    cron.schedule(cronTime, async () => {
      listMail.map((email) => {
        this.mailService
          .from(env.mail.email)
          .to(email)
          .html(subject)
          .send()
          .catch((err) => {
            console.log(err)
          })
      })
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

  subtract15MinutesFromDate(dateTimeString) {
    const originalDate = new Date(dateTimeString)
    const newDate = new Date(originalDate.getTime() - 15 * 60 * 1000) // Trừ 15 phút (15 * 60 * 1000 milliseconds)

    const newDateString = newDate.toISOString() // Chuyển đổi về chuỗi ngày thời gian (ISO 8601)

    return newDateString
  }
}

export default CronServices
