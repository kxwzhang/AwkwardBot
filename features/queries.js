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

  parent = { 
    "about" : "basics", 
    "contact" : "basics", 

  }

  function generateQuickReplies(resume, name) {
    const quickReplies = Object.keys(resume).map((key) => {
          let capKey = key.charAt(0).toUpperCase() + key.slice(1);
          return { title: capKey, payload: `${name} ${capKey}` };
    });
    return quickReplies;
  }

  // const names = ['kevin', 'winfred', 'alex'];
  // message.text.split(" ")[0].toLowerCase() => name from the message
  // names.includes(nameFromMessage)
  /**
   * Receives an 'info' key. Check if it's a top-level key in the reusmes
   * If it's not top-level, then key into resume[basics][info]
   *['alex', 'winfred', 'kevin'].includes(message.text.split(" ")[0].toLowerCase())
   */
  controller.hears(
    async (message) => message.text && new RegExp("winfred|kevin|alex", "i"),
    ["message"],
    async (bot, message) => {
      let [name, info] = message.text.split(" ");
      // console.log("message", message);
      // console.log("info", info);
      // console.log("alexResume[info]", alexResume[info]);
      /*
    const person = JSON.stringify(message.text).replace(/['"]+/g, '');
    const [personName, info] = person.split(" "); 
    */
      if (!info) { // just the name, no other info
        // generate quick replies
        // const quickReplies = Object.keys(alexResume).map((key) => {
        //   let capKey = key.charAt(0).toUpperCase() + key.slice(1);
        //   return { title: capKey, payload: `${name} ${capKey}` };
        // });
        // // bot response
        // await bot.reply(message, {
        //   text: `What would you like to learn about ${name}?`,
        //   quick_replies: quickReplies,
        // });
        // bot response
        await bot.reply(message, {
          text: `What would you like to learn about ${name}?`,
          quick_replies: generateQuickReplies(alexResume, name)
        });
      } else { // key into a resume, either top-level or inside basics
          info = info.toLowerCase(); // somehow it's basics
          console.log("info", info);
          console.log("alexResume[info]", alexResume[info]);
          console.log("alexResume.basics[info]", alexResume['basics'][info]);
        // key into the 'basics' of resume
        if (info === 'basics') {
          // bot response ---> alex[about]
          console.log('hitting info === basics');
          await bot.reply(message, {
            text: `What would you like to learn about ${name}?`,
            quick_replies: generateQuickReplies(alexResume['basics'], name),
          });
        } else {
          console.log('info !== basics I think');
          await bot.reply(message, { type: "typing" });
          setTimeout(async () => {
            // will have to reset context because turn has now ended.
            let response = alexResume[info]; // refactor to run about/contact/location/profiles or bottom level
            await bot.changeContext(message.reference);
            await bot.reply(message, Object.keys(JSON.parse(response)));
          }, 1000);
        }
      }
    }
  );

  // controller.hears(new RegExp('Alex Basics', 'i'), 'message', async (bot, message) => {
  //   const person = JSON.stringify(message.text).replace(/['"]+/g, '');
  //   const [personName, info] = person.split(' ');

  //   await bot.reply(message,{
  //     text: `Here are some quick replies for Basics`,
  //     quick_replies: [
  //       {
  //         title: 'About',
  //         payload: `${personName} About`,
  //       },
  //       {
  //         title: 'Contact',
  //         payload: `${personName} Contact`,
  //       },
  //       {
  //         title: 'Location',
  //         payload: `${personName} Location`,
  //       },
  //       {
  //         title: 'Profiles',
  //         payload: `${personName} Profiles`,
  //       }
  //     ]
  //   });
  // });
  
  // controller.hears(new RegExp('winfred|kevin|alex', 'i'), 'message', async (bot, message) => {
  //   // Remove quotes
  //   const person = JSON.stringify(message.text).replace(/['"]+/g, '');
  //   const [personName, info] = person.split(" "); 
  //   // check if the first word is their name
  //   // if it's not, it won't show as "Person's Resume"

  //   // Text is "Alex"
  //   // Text is "Alex Basics"
  //   // Text is "Alex Basics About"
  //   // { "about": "basics", "location": "basics" }
  //   // alexResume[basics][about]

  //   // if personInfo length is 1, ask what info the user wants
  //   // if personInfo length is 2, dive deeper into that info

  //   // get keys of first layer to show as quick_replies
  //   // key into each sub-layer and get all keys in that layer to display as quick replies
  //   const quickReplies = Object.keys(alexResume)
  //     .map(key => {
  //       let capKey = key.charAt(0).toUpperCase() + key.slice(1);
  //       return { title: capKey, payload: `${personName} ${capKey}`}
  //     });
  //   // map over the keys to make title and payload objects
  //   // setting each element to an object with title/payload
  //   // then set quick_replies to the array we made above
    

  //   //              Alex
  //   //       Alex Basics
  //   // Alex Basics About

  //   // if resume[info] is not null, then access resume[info] and do something with it
  //   // else (so if null), then we know it's a key inside of basics. so we need to access resume[basics][info]

  //   await bot.reply(message, {
  //     text: `What would you like to learn about ${personName}?`,
  //     quick_replies: quickReplies
  //   });
  // });

}