var checkTimeInterval;
var startUpdateDataInterval;
var TimerLength = 5;
var AthanRunning = false;

function startUpdateData() {
	updateData();
}

function messageCallback() {
	if (localStorage.CurrentTime != "شروق الشمس") {
		var bg = chrome.extension.getBackgroundPage();
		var audio = bg.document.getElementById("athan");
		audio.play();
		localStorage.stopaudio = "false";
	}

	var scleft = screen.availWidth - 300;
	var sctop = screen.availHeight - 140;

	var notificationwindow = window.open("athan.html",
		localStorage.CurrentTime,
		"toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, width=300, height=140, directories=no, status=no, top=" + sctop + ", left=" + scleft
	);

	var Title = "أوقات الصلاة";

	// var notification = webkitNotifications.createNotification("", Title, localStorage.CurrentTime);

	// notification.onclick = function () {
	// 	notificationwindow.focus();
	// 	this.close();
	// };

	// notification.show();

	webNotify(Title + " " + localStorage.CurrentTime);

	clearInterval(checkTimeInterval);
	setTimeout(setIntervals, 60000);
}

function AthanNow() {
	if (localStorage.TurnOnAthan == "true") {
		if (localStorage.CurrentTime != "شروق الشمس") {
			var bg = chrome.extension.getBackgroundPage();
			var audio = bg.document.getElementById("athan");
			audio.play();
			localStorage.AudioStoped = "false";
		}
	}

	if (localStorage.Notification == "PopupNotification") {
		var scleft = screen.availWidth - 300;
		var sctop = screen.availHeight - 140;

		var notificationwindow = window.open("athan.html",
			localStorage.CurrentTime,
			"toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, width=300, height=140, directories=no, status=no, top=" + sctop + ", left=" + scleft
		);
		notificationwindow.focus();
	}
	else if (localStorage.Notification == "WebkitNotification") {
		var Title = "أوقات الصلاة";

		// var notification = webkitNotifications.createNotification("", Title, localStorage.CurrentTime);

		// notification.onclick = function () {
		// 	this.close();
		// };

		// notification.show();

		webNotify(Title + " " + localStorage.CurrentTime);
	}

	clearInterval(checkTimeInterval);
	setTimeout(setIntervals, 60000);
}

function checkTime() {
	timeToNextEvent(function (ttn, ttnTime) {
		chrome.browserAction.setBadgeBackgroundColor({ "color": "#FF0000" });
		chrome.browserAction.setBadgeText({ "text": timetonextFormatted(ttn) });
		if (ttn <= 60 && ttn != 0) {
			if (TimerLength == 5) {
				TimerLength = 0.2;
				clearInterval(checkTimeInterval);
				checkTimeInterval = setInterval(checkTime, TimerLength * 1000);
			}
		}
		if (ttn == 0) {
			if (!AthanRunning) {
				AthanRunning = true;
				localStorage.CurrentTime = ttnTime;
				AthanNow();
				TimerLength = 5;
				clearInterval(checkTimeInterval);
				checkTimeInterval = setInterval(checkTime, TimerLength * 1000);
			}
		}
		else {
			AthanRunning = false;
		}
	});
}

function setIntervals() {
	clearInterval(checkTimeInterval);
	clearInterval(startUpdateDataInterval);
	checkTimeInterval = setInterval(checkTime, 5 * 1000);
	startUpdateDataInterval = setInterval(startUpdateData, 60 * 60 * 1000);
}

function webNotify(title) {
	// Let's check whether notification permissions have already been granted
	if (Notification.permission === "granted") {
		// If it's okay let's create a notification
		new Notification(title);
	}

	// Otherwise, we need to ask the user for permission
	else if (Notification.permission !== "denied") {
		Notification.requestPermission().then(function (permission) {
			// If the user accepts, let's create a notification
			if (permission === "granted") {
				new Notification(title);
			}
		});
	}

	// At last, if the user has denied notifications, and you 
	// want to be respectful there is no need to bother them any more.
}

setIntervals();