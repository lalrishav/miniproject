/*This page consist of all the routes to the server*/
'use strict'
let lib = require('./lib/lib');
let video = require('./controller/video')
var validSearchKey = function(req,res,next){
	/*This is a middleware function to check valid search */
	var keyWord = req.body.key;
	//load the list of invalid key and perform checking
	lib.invalidKeywordList(req,res,(found)=>{
		let list = found.list
		/*Basically here we are using brute force assuming 
		  the less data to be checked but in real time
		  there may be millions of data to check so we must
		  use trie data structure to check it*/
		  var flagToCheckValidation = 0
		for(var i=0;i<list.length;i++){
			if(keyWord.indexOf(list[i])!=-1){
				flagToCheckValidation = 1;
				let errorMessage = "Sorry can not complete your request as the content you want to search comes under restricted area!!!"
				req.flash('warning',errorMessage)
				res.redirect("/");
			}
		}
		if(flagToCheckValidation == 0)
			return next();
	})
} 

module.exports = function(app){
	app.get("/",function(req,res){
		let pageInfo = {};
		pageInfo.warning = req.flash("warning");
		console.log(pageInfo);
		res.render("index",pageInfo)
	})

	app.post("/video/search",validSearchKey,function(req,res){
		let keyWord = req.body.key;
		video.getVideoByName(keyWord,(found)=>{
			if(found.res == false || found.data.length < 0){
				let errorMessage = "Sorry no data found"
				req.flash('warning',errorMessage)
				res.redirect("/");
			}
			else{
				let pageInfo = {}
				pageInfo.result = found.data;
				console.log(found.data[0])
				res.render("searchResult",pageInfo); 
			}
		})

	})
}