(function(window, document, undefined) {
	var header = document.getElementsByClassName("header")[0];
	var readList = document.getElementsByTagName("ul")[0];

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

	function creatMark(url, title) {
		var li = document.createElement('li');
		//li.textContent = title;

		chrome.storage.sync.set({title: url}, function() {
			//message('Page saved!');
		});

		li.innerHTML += "<a href=" + url + " target='_blank' class='reading'>" + title + "</a>" + "<a href=\"#\" class=\"delete\">&#215;</a> <a href=\"#\" class=\"check\">&#9744;</a>";

		addReadListeners(li);
		readList.appendChild(li);
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
function saveLink() {
	var url = document.location.toString().toLowerCase();
	var title = document.title;
	chrome.storage.sync.set({title: url}, function() {
		message('Page saved!');
	});
}

function deleteLink(key) {
	chrome.storage.sync.remove(key, function() {
		
	});
}

function addCount() {
	var readCount = chrome.storage.sync.get("readCount");
	chrome.storage.sync.set({"readCount": readCount+1});
}
*/