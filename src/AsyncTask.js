/*----------------------------------------
AsyncTask implementation in Javascript
using Javascript promises

Syntax definition :
function onPreExecute(){...}
function doInBackground(){...}
function onPostExecute(status,response){
	if(status == true){...}
	else{...}
}
var mAsyncTask = new AsyncTask(onPreExecute,doInBackground,onPostExecute);
if(mAsyncTask.exists){
	mAsyncTask.execute();
}

For ajax calls :
var ajaxObj = {
	url: '...',
	method: 'GET/POST',
	data: {...}
}
var mAsyncAjax = new AsyncTask(onPreExecute,ajaxObj,onPostExecute);
if(mAsyncTask.exists){
	mAsyncTask.execute();
}
------------coded by j0y-----------------*/




'use strict';

function AsyncTask(pre,background,post){
			if(Promise==null) this.exists = false;
			if(typeof(background)=="object"){
				this.isAjax = true;
			}
			else if(typeof(background) == "string"){
				this.isAjax = true;
				background = {
					url: background,
					method: "GET",
					data: {}	
				};
			}
			else{
				this.isAjax = false;
			}
			this.onPreExecute = pre;
			this.doInBackground = background;
			this.onPostExecute = post;
			this.exists = true;
	}
	AsyncTask.prototype.isAjax = null;
	AsyncTask.prototype.wait = 0;
	AsyncTask.prototype.delay = function(millis){
			this.wait = parseInt(millis/2);
	};
	AsyncTask.prototype.execute = function(){
			var context = this;
			if(this.onPreExecute==null){
				throw new Error("AsyncTask() was not initialized properly");
			}
			this.onPreExecute();
			var context = this;
			setTimeout(function(){
       				var p1 = new Promise(
       					function(resolve, reject) {
       						if(context.isAjax){
       							var obj = context.doInBackground;
       							resolve(context.ajax(obj.url,obj.method,obj.data));
       						}
       						else{
               					resolve(context.doInBackground());
               				}	
                	}
    				);
    				p1.then(function(val) {
            			context.errorHandle(true,val);
        			}).catch(function(reason) {
        				context.errorHandle(false,reason);
        			});
        	},this.wait);
	};
	AsyncTask.prototype.errorHandle = function(status,value){
			var context = this;
			if(value!=undefined){
				setTimeout(function(){
					context.onPostExecute(status,value);
				},this.wait);
			}
	};
	AsyncTask.prototype.ajax = function(url,method,data){
			var context = this;
			var formData = new FormData();
			for ( var key in data ) {
    			formData.append(key, data[key]);
			}
			if(method == null){
				method = "GET";
			}
			var xhr = new XMLHttpRequest();
			xhr.open(method,url,true);
			xhr.bef
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					context.errorHandle(true,xhr.responseText);
				}
				else if(xhr.readyState == 4){
					context.errorHandle(false,xhr.status);
				}
			}
			xhr.send(formData);
	};