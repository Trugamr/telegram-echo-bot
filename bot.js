// Setting up environment variables from .env file
require('dotenv').config()

const Telegraf = require('telegraf')
const logger = require('./middlewares/logger-middleware')

const { TELEGRAM_BOT_TOKEN } = process.env

const bot = new Telegraf(TELEGRAM_BOT_TOKEN)

const helpMessage = `
List of commands
/start - start the bot
/help - commands reference
`
// Middleware
bot.use(logger)

bot.start(ctx => {
  ctx.reply(`Hello ${ctx.from.first_name}, ask me to do something!`)
  ctx.reply(helpMessage)
})

bot.help(ctx => ctx.reply(helpMessage))

bot.command('echo', ctx => {
  const input = ctx.message.text
  const inputArr = input.split(' ')

  let message = ''

  if (inputArr.length > 1) {
    inputArr.shift()
    message = inputArr.join(' ')
  } else {
    message = 'You said echo.'
  }

  ctx.reply(message)
})

// Start polling
bot.launch()
