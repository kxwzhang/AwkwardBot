const { BotkitConversation } = require("botkit");
const alexResume = require('../public/resumes/alexResume.json');
const kevinResume = require('../public/resumes/kevinResume.json');
const winfredResume = require('../public/resumes/winfredResume.json');

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

  controller.hears(new RegExp('Resume', 'i'), 'message', async (bot, message) => {
    let person = JSON.stringify(message.text);
    await bot.reply(message,{
      text: `Here are some quick replies for ${person.slice(1, person.length - 1)}'s Resume`,
      quick_replies: [
        {
          title: 'Basics',
          payload: `${person.slice(1, person.length - 1)}Basics`,
        },
        {
          title: 'Work',
          payload: `${person.slice(1, person.length - 1)}Work`,
        },
        {
          title: 'Volunteer',
          payload: `${person.slice(1, person.length - 1)}Volunteer`,
        },
        {
          title: 'Education',
          payload: `${person.slice(1, person.length - 1)}Education`,
        },
        {
          title: 'Skills',
          payload: `${person.slice(1, person.length - 1)}Skills`,
        },
        {
          title: 'Languages',
          payload: `${person.slice(1, person.length - 1)}Languages`,
        },
        {
          title: 'Interests',
          payload: `${person.slice(1, person.length - 1)}Interests`,
        },
      ]
    });
  });
}