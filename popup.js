(function(window, document, undefined) {
	function displayImage(obj) {
		obj.style.display = "block";
	}

	var header = document.getElementsByClassName("header")[0];
	//var readList = document.getElementsByTagName(".readList-wrapper ul")[0];
	var readList = document.querySelector(".readList-wrapper ul");
	//var readings = chrome.storage.sync.get('readings');
// context Menus in experiments
/*
	chrome.contextMenus.create({
		"title": "Any.Read",
		"onclick": function(e) {
			addReading();
		}
	});
*/
	chrome.storage.sync.get(null, function(items) {
		//console.log(items);
		// init
		for (var x in items) {
			addMark(items[x].url, x);
		}
	});

	header.addEventListener("click", function(event) {
		addReading();
	});

	function addReading() {
		var currentTab;
		chrome.tabs.query({active: true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
			currentTab = tabs[0];
			creatMark(currentTab.url, currentTab.title);
		});
		//console.log(currentTab.url);
	}

	function addMark(url, title) {
		var li = document.createElement('li');
		li.innerHTML += "<a href=" + url + " target='_blank' class='reading'>" + title + "</a>" + "<a href=\"#\" class=\"delete\">&#215;</a> <a href=\"#\" class=\"check\">&#9744;</a>";

		addReadListeners(li);
		readList.appendChild(li);
	}

	function creatMark(url, title) {
		//li.textContent = title;
		//console.log(title);
		var d = new Date();
		chrome.storage.sync.get(null, function(items) {
			if (items[title]) {
				assert("This page is already in list!");
			}
			else {
				items[title] = {'url':url, 'date': d.getTime()};
				chrome.storage.sync.set(items, function() {
				//message('Page saved!');
				});
				addMark(url, title);		
			}
		}); 		
	}

	function addReadListeners(li) {
		
		var checkbox = li.querySelector('.check');
		checkbox.addEventListener('click', function(event) {
			event.preventDefault();
			if (li.className === 'checked') {
				li.className = '';
				checkbox.innerHTML = '&#9744;';
			} else {
				li.className = 'checked';
				checkbox.innerHTML = '&#9745';
			}
		});

		var deleteButton = li.querySelector('.delete');
		deleteButton.addEventListener('click', function(event) {
	      event.preventDefault();
	      var text = li.textContent.slice(0, -3);
	      console.log(text);
	      chrome.storage.sync.remove(text, function() {});
	      li.parentNode.removeChild(li);
	    });
	}

})(this, this.document);



/*
function addCount() {
	var readCount = chrome.storage.sync.get("readCount");
	chrome.storage.sync.set({"readCount": readCount+1});
}
*/
