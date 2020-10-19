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
    await bot.reply(message, {
      text: 'Hello Human! Which of my creators would you like to know more about?',
      quick_replies: [
        {
          title: 'Alex',
          payload: 'Alex'
        },
        {
          title: 'Winfred',
          payload: 'Winfred'
        },
        {
          title: 'Kevin',
          payload: 'Kevin'
        }
      ]
    });
  });
  


  controller.hears(new RegExp('winfred|kevin|alex', 'i'), 'message', async (bot, message) => {
    // Remove quotes
    const person = JSON.stringify(message.text).replace(/['"]+/g, '');
    const personInfo = person.split(" "); 
    const personName = personInfo[0];
    // check if the first word is their name
    // if it's not, it won't show as "Person's Resume"

    // if personInfo length is 1, ask what info the user wants
    // if personInfo length is 2, dive deeper into that info

    // get keys of first layer to show as quick_replies
    // key into each sub-layer and get all keys in that layer to display as quick replies



    await bot.reply(message,{
      text: `What would you like to learn about ${personName}?`,
      quick_replies: [
        {
          title: 'Basics',
          payload: `${personName}'s Basics`,
        },
        {
          title: 'Resume',
          payload: `${personName}'s Resume`,
        },
        {
          title: 'Education',
          payload: `${personName}'s Education`,
        },
        {
          title: 'Tech Stack',
          payload: `${personName}'s Tech`,
        },
        {
          title: 'Projects',
          payload: `${personName}'s Projects`,
        },
      ]
    });
  });

  controller.hears(new RegExp('Resume', 'i'), 'message', async (bot, message) => {
    // let person = JSON.stringify(message.text);
    await bot.reply(message,{
      text: `Here are some quick replies for Resume`,
      quick_replies: [
        {
          title: 'Basics',
          payload: kevinResume.basics,
        },
        {
          title: 'Work',
          payload: kevinResume.work,
        },
        {
          title: 'Volunteer',
          payload: kevinResume.volunteer,
        },
        {
          title: 'Education',
          payload: kevinResume.education,
        },
        {
          title: 'Skills',
          payload: kevinResume.skills,
        },
        {
          title: 'Languages',
          payload: kevinResume.languages,
        },
        {
          title: 'Interests',
          payload: kevinResume.interests,
        },
      ]
    });
  });
}