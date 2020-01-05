const fs = require('fs');
const readline = require('readline');

const parseTweet = (tweet) => {
  const months = [' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', ' Aug ', ' Sep ', ' Oct ', ' Nov ', ' Dec '];
  for (let i = 0; i<months.length; i++) {
    const dateStartPos = tweet.indexOf(months[i]);
    if (dateStartPos !== -1) {
      const urlStartPos = tweet.search(/http:\/\/|https:\/\//g);
      const tweetedURL = urlStartPos === -1 ? '' : tweet.substring(urlStartPos, tweet.indexOf(' ',urlStartPos));
      return {
        tweet: `${tweet.substring(0,dateStartPos).trim()}`,
        dateTweeted: `${tweet.substring(dateStartPos).trim()}`,
        embeddedURL: `${tweetedURL}`,
      };
    }
  }
  console.log(`No date found`);
};

const readInterface = readline.createInterface({
  input: fs.createReadStream('/Users/jdmedlock/Downloads/extractedtweets.txt'),
  output: process.stdout,
  console: false
});

readInterface.on('line', function(tweet) {
  console.log(parseTweet(tweet));
});
