function closeNotification()
{
	localStorage.AudioStoped = "true";
	window.close();
}

$(document).ready(function()
{
	$(document).find(".time-now").text(localStorage.CurrentTime);

	if(localStorage.CurrentTime == "شروق الشمس")
	{
		$("#stopaudio").hide();
	}
	else
	{
		var bg = chrome.extension.getBackgroundPage();
		var audio = bg.document.getElementById("athan");
		//audio.play();
		localStorage.AudioStoped = "false";

		$("#stopaudio").click(function()
		{
			audio.pause();
			audio.currentTime = 0;
			closeNotification();
		});
	}

	setTimeout(closeNotification, 240000);
});