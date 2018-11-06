// Objects
var AthanTimes = ["أذان الفجر", "شروق الشمس", "أذان الظهر", "أذان العصر", "أذان المغرب", "أذان العشاء"];

// Main Functions
function updateData(callback)
{
	var timesJSON = "data/damascus+3.json";

	if(localStorage.SummerTime == "true")
	{
		timesJSON = "data/damascus+3.json";
	}
	else
	{
		timesJSON = "data/damascus+2.json";
	}

	$.getJSON(timesJSON, function(alldata)
	{
		var data;
		var today = new Date();

		for(var i = 0; i < alldata.length; i++)
		{
			if(alldata[i].Day == today.getDate() && alldata[i].Month == (today.getMonth() + 1))
			{
				data = alldata[i];
			}
		}
		
		localStorage.Morning = data.Morning;
		localStorage.Sun = data.Sun;
		localStorage.Noon = data.Noon;
		localStorage.Afternoon = data.Afternoon;
		localStorage.Evening = data.Evening;
		localStorage.Night = data.Night;

		if(typeof(callback) == "function")
			callback();
	});
}

function timeToNextEvent(callback)
{
	timenow = nowWithoutSec();

	var timetonext = 0;
	var ttnTime = "";

	t1 = getFullTime(localStorage.Morning, "AM");
	t2 = getFullTime(localStorage.Sun, "AM");
	t3 = getFullTime(localStorage.Noon, "AM");
	t4 = getFullTime(localStorage.Afternoon, "PM");
	t5 = getFullTime(localStorage.Evening, "PM");
	t6 = getFullTime(localStorage.Night, "PM");
	t7 = new Date(t1.getTime() + (24 * 60 * 60 * 1000));

	if (timenow < t1)
	{
		timetonext = t1 - timenow;
		ttnTime = AthanTimes[0];
	}

	if (timenow > t1)
	{
		timetonext = t2 - timenow;
		ttnTime = AthanTimes[1];
	}

	if (timenow > t2)
	{
		timetonext = t3 - timenow;
		ttnTime = AthanTimes[2];
	}
	
	if (timenow > t3)
	{
		timetonext = t4 - timenow;
		ttnTime = AthanTimes[3];
	}
	
	if (timenow > t4)
	{
		timetonext = t5 - timenow;
		ttnTime = AthanTimes[4];
	}
	
	if (timenow > t5)
	{
		timetonext = t6 - timenow;
		ttnTime = AthanTimes[5];
	}
	
	if (timenow > t6)
	{
		timetonext = t7 - timenow;
		ttnTime = AthanTimes[0];
	}

	var timetonextSeconds = timetonext / 1000;

	if(typeof(callback) == "function")
		callback(timetonextSeconds, ttnTime);
}


// Helping Functions
function getFullTime(time, AMPM)
{
	var timenow = new Date();
	FullDate = new Date(
		Date.parse(
			(timenow.getMonth() + 1) + '/'
			+ timenow.getDate()+ '/'
			+ timenow.getFullYear() + ' '
			+ time
			+ ' '
			+ timeZone()
			)
		+ (AMPM == "PM" ? 12*3600000 : 0)
		);

	return FullDate;
}

function nowWithoutSec()
{
	var timenow = new Date();
	nowWith0Sec = new Date(
		Date.parse(
			(timenow.getMonth() + 1) + '/'
			+ timenow.getDate() + '/'
			+ timenow.getFullYear() + ' '
			+ timenow.getHours() + ":"
			+ timenow.getMinutes()
			+ ':0 '
			+ timeZone()
		)
	);
	return nowWith0Sec;
}

function timetonextFormatted(timetonextSeconds)
{
	var HH = Math.floor(timetonextSeconds/3600);
	var MM = Math.floor(Math.floor(timetonextSeconds%3600)/60);

	var ttn = HH + ":" + ((MM < 10)?("0" + MM):MM);

	return ttn;
}

function timetonextLongFormat(timetonextSeconds)
{
	var HH = Math.floor(timetonextSeconds/3600);
	var MM = Math.floor(Math.floor(timetonextSeconds%3600)/60);

	var ttn = ((HH < 10)?("0" + HH):HH) + ":" + ((MM < 10)?("0" + MM):MM);

	return ttn;
}

function timeZone()
{
	var Zone = localStorage.TimeZone;

	if(localStorage.SummerTime == "false")
	{
		var z = parseInt(Zone.substr(4,2)) - 1;
		Zone = Zone.substr(0,4) + (z > 10 ? z : "0" + z) + Zone.substr(6,2);
	}

	return Zone;
}

// Startup

if(localStorage.FirstTime != "false")
{
	var notificationwindow = window.open("options.html");
	localStorage.FirstTime = "false";
	localStorage.TurnOnAthan = "true";
	localStorage.Notification = "PopupNotification"; // None, WebkitNotification, PopupNotification

	localStorage.Country = "Syria";
	localStorage.City = "Damascus";
	localStorage.TimeZone = "GMT+0200";

	localStorage.CurrentTime = "";

	localStorage.Morning = "";
	localStorage.Sun = "";
	localStorage.Noon = "";
	localStorage.Afternoon = "";
	localStorage.Evening = "";
	localStorage.Night = "";
}

updateData();