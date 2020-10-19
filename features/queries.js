const { BotkitConversation } = require("botkit");

module.exports = function(controller) {
  let pageLoad = new BotkitConversation('pageload', controller);

  pageLoad.say('Who would you like to checkout?');

  // simulate typing 
  // controller.hears(async (message) => message.text && message.text.toLowerCase() === 'alex', ['message'], async (bot, message) => {
  //   await bot.reply(message, {type: 'typing'});
  //     setTimeout(async () => {
  //       // will have to reset context because turn has now ended.
  //       await bot.changeContext(message.reference);
  //       await bot.reply(message, 'Hi! My name is Alex, what do you want to know about me?');
  //     }, 1000);
  // });

  // controller.hears(new RegExp('alex'), 'message', async (bot, message) => {
  //   await bot.reply(message,{
  //     text: 'Here are some quick replies',
  //     quick_replies: [
  //       {
  //         title: 'Resume',
  //         payload: 'alexResume',
  //       },
  //       {
  //         title: 'Education',
  //         payload: 'alexEducation',
  //       },
  //       {
  //         title: 'Tech Stack',
  //         payload: 'alexTech',
  //       },
  //       {
  //         title: 'Projects',
  //         payload: 'alexProjects',
  //       },
  //     ]
  //   });
  // });

  // controller.hears(new RegExp('kevin'), 'message', async (bot, message) => {
  //   await bot.reply(message,{
  //     text: 'Here are some quick replies',
  //     quick_replies: [
  //       {
  //         title: 'Resume',
  //         payload: 'kevinResume',
  //       },
  //       {
  //         title: 'Education',
  //         payload: 'kevinEducation',
  //       },
  //       {
  //         title: 'Tech Stack',
  //         payload: 'kevinTech',
  //       },
  //       {
  //         title: 'Projects',
  //         payload: 'kevinProjects',
  //       },
  //     ]
  //   });
  // });

  controller.on('welcome_back', async(bot, message) => {
    await bot.reply(message, 'Hello Human! How can I help out?');
  });
  


  controller.hears(new RegExp('winfred|kevin|alex', 'i'), 'message', async (bot, message) => {
    let person = JSON.stringify(message.text);
    await bot.reply(message,{
      text: `Here are some quick replies for ${person.slice(1, person.length - 1)}`,
      quick_replies: [
        {
          title: 'Resume',
          payload: `${person.slice(1, person.length - 1)}Resume`,
        },
        {
          title: 'Education',
          payload: `${person.slice(1, person.length - 1)}Education`,
        },
        {
          title: 'Tech Stack',
          payload: `${person.slice(1, person.length - 1)}Tech`,
        },
        {
          title: 'Projects',
          payload: `${person.slice(1, person.length - 1)}Projects`,
        },
      ]
    });
  });
}