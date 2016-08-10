# AsyncTask-JS
Asynchronous Task execution implemented in pure Javascript using Javascript promises (along with Ajax support)

<b>USAGE</b>

```<script type="text/javascript" src="src/AsyncTask.js"></script>```

and then,

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

---

<b>For ajax calls</b>

    function onPreExecute(){...}
    var ajaxObj = {
	    url: '...',
	    method: 'GET/POST',
	    data: {...}
    }
    function onPostExecute(status,response){
    	if(status == true){...}
    	else{...}
    }
    var mAsyncAjax = new AsyncTask(onPreExecute,ajaxObj,onPostExecute);
    if(mAsyncTask.exists){
    	mAsyncTask.execute();
    }


See <b>demo.html</b> and <b>demo_ajax.html</b> for more information
