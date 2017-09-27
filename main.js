var http = require('http');
var express = require('express');
var twilio = require('twilio');
const {Wit, log} = require('node-wit');
var filter = require('leo-profanity');

// Create our clients
const client = new Wit({accessToken: '###'});
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())

// And setup our main HTTP endpoint for incoming SMS messages!
app.post('/sms', function(req, res) {
	console.log(req.params);
	console.log(req.body);

	const messageContent = req.body.Body;

	client.message(req.body.Body, {})
	.then((data) => {
		var twiml = new twilio.twiml.MessagingResponse();

		if(!data.entities.intent) {
			console.log('Missing intent from Wit, could not match. Data: '+JSON.stringify(data));
			
			if(filter.check(messageContent) == true){
				twiml.message('Really? Are you trying to get on the naughty list?');
			} 
			else {
				twiml.message('Hey, looks like I\'m having some difficulty understanding this message. My little elf, Alyssa, has been helping me with my messages and can fix this. If you could send the message you just sent to amcdevitt97@gmail.com, she can help fix this for everyone! Thanks for understanding :) ' );
			}
		} else {

			let witIntent = data.entities.intent[0].value;

		  	console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
			
		  
		  
			if(witIntent=='cookie'){
				twiml.message('I love all cookies, but my favorite kind is chocolate chip! Feel free to leave me some on Christmas eve!');
			}
			if(witIntent=='reindeer'){
				twiml.message('I have 9 Reindeer that I love equally. Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donner and Blitzen. Oh and Rudolph too. Feel free to throw some oats outside on Christmas Eve! My Reindeer love them.');
			}
			  if(witIntent=='care'){
			  	twiml.message('I love and care for all the children of the world, no matter where they\'re from or what they\'ve done. I can\'t wait to deliver my gifts this year!');
			  }
			  if(witIntent=='meaning_of_xmas'){
			  	twiml.message('Someone special named Jesus was born long ago, and we celebrate his birthday every year on December 25th. Christmas is a great time to appreciate and love your family and friends.');
			  }
			  if(witIntent=='age'){
			  	twiml.message('I\'m 1,748 years old!');
			  }
			  if(witIntent=='is_real_question'){
			  	twiml.message('I\'m only real if you decide to believe 😉');
			  }
			  if(witIntent=='places'){
			  	twiml.message('I travel to all the homes of the little boys and girls of the world. You can track where I go on Christmas Eve with www.noradsanta.org!');
			  }
			  if(witIntent=='naughty_or_nice'){
			  	twiml.message('Guess you\'ll have to wait until Christmas Morning to find out!');
			  }
			  if(witIntent=='santas_home'){
			  	twiml.message('I live in the North Pole with my wonderful wife, Mrs. Claus, the elves, and my 9 reindeer. It\'s chilly, but I like it that way!');
			  }
			  if(witIntent=='request_toy'){
			  	twiml.message('I\'ll add that to your wishlist, but promise you\'ll be good until Christmas! We\'ll see if you get it on Christmas morning...');
			  }
			  if(witIntent=='free_time'){
			  	twiml.message('Right now I\'m actually cooking a mean lasagna. In my free time I like to tinker with the elves, cook, and write my pen-pal, the Tooth Fairy');
			  }
			  if(witIntent=='greeting'){
			  	twiml.message('Ho Ho Ho! Hey there! The elves just got me this new phone and I\'m just now learning how to text. Please bear with me while I try to learn! In the meantime, feel free to ask me any questions you have about me. :) ');
			  }
			  if(witIntent=='compliment'){
			  	twiml.message('Thank you! I\'m happy you feel that way :)');
			  }
			  if(witIntent=='insult'){
			  	twiml.message('Hey now, that\'s not a very nice thing to say...');
			  }
			  if(witIntent=='coal_for_xmas'){
			  	twiml.message('If coal is what you want, coal is what you shall get!');
			  }
			  if(witIntent=='deny_gift'){
			  	twiml.message('I\'ll try my best to let the elves know you don\'t want that. No promises though!');
			  }
			  if(witIntent=='not_christian'){
			  	twiml.message('That\'s alright! Thanks for being a good sport. Just keep our secret safe okay? :) ');
			  }
			  if(witIntent=='thanks'){
			  	twiml.message('You\'re welcome! Ho Ho Ho! ');
			  }
			  if(witIntent=='when'){
			  	twiml.message('I\'ll be flying around and devlivering gifts on the eve of December 24th, and you can open them on Christmas morning, December 25th!');
			  }
		}
		  
		res.writeHead(200, {'Content-Type': 'text/xml'});
		res.end(twiml.toString());
	})
	.catch(console.error);
});

http.createServer(app).listen(1337, function () {
  console.log("Express server listening on port 1337");
});



