// EchoBOT Logs
// -1001461165317

module.exports = (ctx, next) => {
  const sender = ctx.from.username || ctx.from.first_name
  const id = ctx.from.id
  let log = ''
  // So it wont fire for other subtypes where text will be undefined
  try {
    if (ctx.updateSubTypes.includes('text')) {
      log = `[${id}] ${sender}: ${ctx.message.text}`
    } else if (ctx.updateType == 'message') {
      log = `[${id}] ${sender}: sent a ${ctx.updateSubTypes[0]}`
    }
  } catch (error) {
    console.log(error)
  }

  ctx.telegram.sendMessage(-1001461165317, log)

  next(ctx)
}
