const { BotkitConversation } = require("botkit");

module.exports = function(controller) {

  let typing = new BotkitConversation('typing', controller);
    
  controller.hears(async (message) => message.text && message.text.toLowerCase() === 'alex', ['message'], async (bot, message) => {
    await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            // will have to reset context because turn has now ended.
            await bot.changeContext(message.reference);
            await bot.reply(message, 'Hi! My name is Alex, what do you want to know about me?');
        }, 1000);
    // await bot.reply(message, 'Hey! My name is Alex, what do you want to know about me?');
  });



}