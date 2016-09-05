var __fbgroup__data = [];
var __fbgroup__page_n = 1;

var __fbgroup__loadGroup = function(){
	var e = document.getElementsByClassName("uiMorePagerPrimary")[0];
	if(typeof(e) != 'undefined' && e != null){
		e.click();
		console.log("[FB GROUP] Loading new page " + __fbgroup__page_n);
		__fbgroup__page_n++;
		setTimeout(__fbgroup__loadGroup, 1000);
	}
	else {
		// stop and dump names
		console.log("[FB GROUP] Dumping names..");
		__fbgroup__getNames();
	}
}

function __fbgroup__getNames() {
	var names = document.getElementsByClassName("fcb");
	var pics = document.getElementsByClassName("_rv");

	for (i = 0; i < names.length; ++i) {

		// Check if user has blocked you
		if(names[i].getElementsByTagName("span").length == 0) {
			var data_full_name = names[i].getElementsByTagName("a")[0].innerHTML;
			var data_blocked = false;
		} else {
			var data_full_name = names[i].getElementsByTagName("span")[0].innerHTML;
			var data_blocked = true;
		}
		var data_sirname = data_full_name.split(" ")[0];
		var data_lastname = data_full_name.split(" ").slice(-1)[0];
		var data_picture = pics[i].src;

		__fbgroup__data.push({full_name: data_full_name, sirname: data_sirname, lastname: data_lastname, picture: data_picture, blocked: data_blocked});
	}

	__fbgroup__downloadData();
}

function __fbgroup__downloadData() {
	var link = document.createElement("a");
	var fileBlob = new Blob([JSON.stringify(__fbgroup__data, null, 2)], {type: "text/json"});
	link.href = URL.createObjectURL(fileBlob);
	link.download = "data.json";
	link.click();
}

__fbgroup__loadGroup();