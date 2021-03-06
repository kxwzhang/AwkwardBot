const { BotkitConversation } = require("botkit");
const alexResume = require('../public/resumes/alexResume.json');
const kevinResume = require('../public/resumes/kevinResume.json');
const winfredResume = require('../public/resumes/winfredResume.json');

module.exports = function(controller) {
  const resumes = { 
    'alexResume': alexResume,
    'kevinResume': kevinResume,
    'winfredResume': winfredResume
  };
  // Displays a message when a user connects
  controller.on('welcome_back', async(bot, message) => {
    await bot.reply(message, {
      text: 'Hello Human! Here are the statuses of my creators:<br><br> Alex Choy: currently open/looking for work <br> Winfred Huang: currently open/looking for work <br> Kevin Zhang: currently open/looking for work <br><br> Which of my creators would you like to know more about?',
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
  };  

  function generateText(formattedResponse, obj) {
    if(formattedResponse.length) formattedResponse.push("<br>");
    for (const key in obj) {
      const keyName = key.charAt(0).toUpperCase() + key.slice(1);
      obj[key] = obj[key] instanceof Array ? obj[key].join(", ") : obj[key];
      formattedResponse.push(`${keyName}: ${obj[key]} \n`);
    }
  };

  
  function mapResume(response) {
    let formattedResponse = [];
    if (response instanceof Array ) {
      if (!response.length) return "No information found.";
      for (const obj of response) {
        generateText(formattedResponse, obj);
      }
    } else {
      generateText(formattedResponse, response);
    }
    return formattedResponse.join("\r\n\n");
  };

  controller.hears(
    async (message) => /*message.text && */ new RegExp("winfred|kevin|alex", "i"),
    ["message"],
    async (bot, message) => {
      let [name, info] = message.text.split(" ");
      resumeName = name.toLowerCase();
      if (!info) { // just the name, no other info
        // generate quick replies
        // bot response
        await bot.reply(message, {
          text: `What would you like to learn about ${name}?`,
          quick_replies: generateQuickReplies(resumes[`${resumeName}Resume`], name)
        });
      } else { // key into a resume, either top-level or inside basics
          info = info.toLowerCase(); 
        
        // display options within the 'basics'
        if (info === 'basics') {
          await bot.reply(message, {
            text: `What basic information do you want to learn about ${name}?`,
            quick_replies: generateQuickReplies(resumes[`${resumeName}Resume`]['basics'], name),
          });
        } else {
          await bot.reply(message, { type: "typing" });
          // simulate typing 
          setTimeout(async () => {
            let response;
            // Check if we need to key into 'basics' or top level keys
            if (resumes[`${resumeName}Resume`]['basics'][info]) {
              response = resumes[`${resumeName}Resume`]['basics'][info];
            } else {
              response = resumes[`${resumeName}Resume`][info];
            }
            await bot.changeContext(message.reference);
            await bot.reply(message, mapResume(response));
            setTimeout( async () => {
              await bot.reply(message, { type: "typing" });
            }, 1500);
            setTimeout( async () => {
              await bot.reply(message, {
                text: 'Which of my creators would you like to know more about?',
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
            }, 2500);
          }, 1000);
        }
      }
    }
  );
}