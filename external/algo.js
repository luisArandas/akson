var algo;
var ajaxreq;

function getpeopledata(){
	//post("fds" + "\n");
	algo = new XMLHttpRequest();
	algo.open("GET","https://algomobile.herokuapp.com/");
	algo.onreadystatechange = readystatechange;
	algo.send();
}

function readystatechange(){
	//post("readyState: "+this.readyState+"\n");
	//post("AllResponseHeaders: "+this.getAllResponseHeaders()+"\n");
	// maxurl dict implementation keys (_getResponseKey is a maxurl specific backdoor for things not in XMLHttpRequest)
	//post("content_type : " + this._getResponseKey("content_type")+"\n");
	//post("total_time : "+ this._getResponseKey("total_time")+"\n");
	//post("size_download : "+ this._getResponseKey("size_download")+"\n");
	//post("filename_out : "+ this._getResponseKey("filename_out")+"\n");
	//post("-----------begin-body----------------\n");
	//post(this.responseText);
	post(this.getResponseHeader("div"));
	
	//post("-----------end-body-may-truncate----------------\n");
	post();
	outlet(0, this.responseText);
}

function readystatechange_parsejson()
{
	if (this.readyState ==4){
		post(this.responseText);
 		var myobj = JSON.parse(this.responseText);
		if (myobj&&myobj.list) { 
        	for (var i=0;i<myobj.list.length;i++) {
				post("name:" + myobj.list[i].name + "\n");
				post("temp:" + myobj.list[i].main.temp + "\n");
				post("description:" + myobj.list[i].weather[0].description + "\n");
			}
		}
	}
}


function getPeopleDataTwo()
{
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("POST","http://api.openweathermap.org/data/2.1/find/name?q=santa%20cruz,US");
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	ajaxreq.send("{}");
}