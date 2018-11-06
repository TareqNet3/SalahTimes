function showTimes()
{
	var timenow = new Date();
	var timetonext = 0;

	t1 = getFullTime(localStorage.Morning, "AM");
	t2 = getFullTime(localStorage.Sun, "AM");
	t3 = getFullTime(localStorage.Noon, "AM");
	t4 = getFullTime(localStorage.Afternoon, "PM");
	t5 = getFullTime(localStorage.Evening, "PM");
	t6 = getFullTime(localStorage.Night, "PM");
	t7 = new Date(t1.getTime() + (24 * 60 * 60 * 1000));

	$("#fajr").text(localStorage.Morning);
	$("#shams").text(localStorage.Sun);
	$("#dhuhr").text(localStorage.Noon);
	$("#asr").text(localStorage.Afternoon);
	$("#magreb").text(localStorage.Evening);
	$("#ishaa").text(localStorage.Night);

	if (timenow > t1)
	{
		clearClasses();
		$("#shams").parent().addClass("time-line-current");
		timetonext = t2 - timenow;
	}

	if (timenow > t2)
	{
		clearClasses();
		$("#dhuhr").parent().addClass("time-line-current");
		timetonext = t3 - timenow;
	}
	
	if (timenow > t3)
	{
		clearClasses();
		$("#asr").parent().addClass("time-line-current");
		timetonext = t4 - timenow;
	}
	
	if (timenow > t4)
	{
		clearClasses();
		$("#magreb").parent().addClass("time-line-current");
		timetonext = t5 - timenow;
	}
	
	if (timenow > t5)
	{
		clearClasses();
		$("#ishaa").parent().addClass("time-line-current");
		timetonext = t6 - timenow;
	}
	
	if (timenow > t6)
	{
		clearClasses();
		$("#fajr").parent().addClass("time-line-current");

		if(timenow.getHours < t1.getHours())
		{
			timetonext = t1 - timenow;
		}
		else
		{
			timetonext = t7 - timenow;
		}
	}

	var diffSeconds = timetonext / 1000;

	var HH = Math.floor(diffSeconds/3600);
	var MM = Math.floor(Math.floor(diffSeconds%3600)/60) + 1;

	var formatted = ((HH < 10)?("0" + HH):HH) + ":" + ((MM < 10)?("0" + MM):MM);

	$("#timetonext").text(formatted);
}


function clearClasses()
{
	$("#fajr").parent().removeClass("time-line-current");
	$("#shams").parent().removeClass("time-line-current");
	$("#dhuhr").parent().removeClass("time-line-current");
	$("#asr").parent().removeClass("time-line-current");
	$("#magreb").parent().removeClass("time-line-current");
	$("#ishaa").parent().removeClass("time-line-current");
}

$(document).ready(function()
{
	showTimes();
	updateData(showTimes);

	var showTimesInterval = setInterval(showTimes ,5000);

	if(localStorage.stopaudio == "true")
	{
		localStorage.stopaudio = "true";
		$("#stopaudio").hide();
	}
	else
	{
		localStorage.stopaudio = "false";
		$("#stopaudio").show();
	}

	$("#stopaudio").click(function()
	{
		var bg = chrome.extension.getBackgroundPage();
		var audio = bg.document.getElementById("athan");
		audio.pause();
		audio.currentTime = 0;
		localStorage.stopaudio = "true";
		$("#stopaudio").hide();
	});
});