const youtube = require('youtube-node');
var youTube = new youtube();
//set an api key for youtube api
youTube.setKey("AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU")

exports.getVideoByName = function(key,callback){
	/*A function to get youtube video by name*/
	
	youTube.search(key,10 ,{channelId: "UCPgfAA83ROUVM-E3NCY154A"},function(error,result){
		if(error)
			console.log(error)
		else{
			//let abc = JSON.stringify(result, null, 2)
			console.log(result)
		}
	})
}