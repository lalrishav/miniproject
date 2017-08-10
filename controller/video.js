const youtube = require('youtube-node');
var youTube = new youtube();
//set an api key for youtube api
youTube.setKey("AIzaSyDgexepnWUBo9Tw-aUvpP95aiJjeeorlyM")

exports.getVideoByName = function(key,callback){
	/*A function to get youtube video by name*/
	
	youTube.search(key,10,{channelId: "UCPgfAA83ROUVM-E3NCY154A"},function(error,result){
		if(error){
			callback({"res":false})
		}
		else{
			callback({"res":true,"data" : result["items"]});
			//let abc = JSON.stringify(result, null, 2)
			/*console.log(result["items"][0]["id"])
			console.log("-------------------------")
			console.log(result["items"][0]["snippet"])*/
		}
	})
	
}