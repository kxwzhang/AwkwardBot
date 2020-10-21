const { BotkitConversation } = require("botkit");
const alexResume = require('../public/resumes/alexResume.json');
const kevinResume = require('../public/resumes/kevinResume.json');
const winfredResume = require('../public/resumes/winfredResume.json');

module.exports = function(controller) {
  // Displays a message when a user connects
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

  function generateQuickReplies(resume, name) {
    const quickReplies = Object.keys(resume).map((key) => {
      let capKey = key.charAt(0).toUpperCase() + key.slice(1);
      return { title: capKey, payload: `${name} ${capKey}` };
    });
    return quickReplies;
  }

  controller.hears(
    async (message) => message.text && new RegExp("winfred|kevin|alex", "i"),
    ["message"],
    async (bot, message) => {
      let [name, info] = message.text.split(" ");
      if (!info) { // just the name, no other info
        // generate quick replies
        // bot response
        await bot.reply(message, {
          text: `What would you like to learn about ${name}?`,
          quick_replies: generateQuickReplies(alexResume, name)
        });
      } else { // key into a resume, either top-level or inside basics
          info = info.toLowerCase(); // somehow it's basics
        
        // display options within the 'basics'
        if (info === 'basics') {
          await bot.reply(message, {
            text: `What would you like to learn about ${name}?`,
            quick_replies: generateQuickReplies(alexResume['basics'], name),
          });
        } else {
          await bot.reply(message, { type: "typing" });
          // simulate typing 
          setTimeout(async () => {
            let response;
            // Check if we need to key into 'basics' or top level keys
            if (alexResume['basics'][info]) {
              response = alexResume['basics'][info]; // refactor to run about/contact/location/profiles or bottom level
            } else {
              response = alexResume[info]; // refactor to run about/contact/location/profiles or bottom level
            }
            await bot.changeContext(message.reference);
            await bot.reply(message, JSON.stringify(response));
          }, 1000);
        }
      }
    }
  );
}