const fs = require('fs');
const readline = require('readline');

const parseTweet = (tweet) => {
  const months = [' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', 
                  ' Aug ', ' Sep ', ' Oct ', ' Nov ', ' Dec '];
  
  return months.reduce((tweetObject,currentMonth) => {
    const dateStartPos = tweet.indexOf(currentMonth);
    if (dateStartPos === -1) return tweetObject;
    const urlStartPos = tweet.search(/http:\/\/|https:\/\//g);
    const tweetedURL = urlStartPos === -1 ? '' 
      : tweet.substring(urlStartPos, tweet.indexOf(' ',urlStartPos));
    return {
      tweet: `${tweet.substring(0,dateStartPos).trim()}`,
      dateTweeted: `${tweet.substring(dateStartPos).trim()}`,
      embeddedURL: `${tweetedURL}`,
    };
  }, {});
};

const readInterface = readline.createInterface({
  input: fs.createReadStream('/Users/jim/Downloads/extractedtweets.txt'),
  output: process.stdout,
  console: false
});

readInterface.on('line', function(tweet) {
  console.log(parseTweet(tweet));
});
