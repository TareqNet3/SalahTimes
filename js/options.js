$(document).ready(function()
{
	LoadOptions();

	$("#save").click(SaveOptions);
});

function LoadOptions()
{
	if(localStorage.TurnOnAthan == "true")
	{
		$("#athan").prop('checked', true);
	}
	else
	{
		$("#athan").prop('checked', false);
	}

	if (localStorage.Notification == "None")
	{
		$("#NotificationPopup").prop('checked', false);
		$("#NotificationWebkit").prop('checked', false);
		$("#NotificationNone").prop('checked', true);
	}
	else if(localStorage.Notification == "WebkitNotification")
	{
		$("#NotificationPopup").prop('checked', false);
		$("#NotificationWebkit").prop('checked', true);
		$("#NotificationNone").prop('checked', false);
	}
	else //PopupNotification
	{
		$("#NotificationPopup").prop('checked', true);
		$("#NotificationWebkit").prop('checked', false);
		$("#NotificationNone").prop('checked', false);
	}

	$('#Country').val(localStorage.Country);

	$('#City').val(localStorage.City);

	if(localStorage.SummerTime == "true")
	{
		$("#summer-time").prop('checked', true);
	}
	else
	{
		$("#summer-time").prop('checked', false);
	}
}

function SaveOptions()
{
	if($("#athan").prop('checked'))
	{
		localStorage.TurnOnAthan = "true";
	}
	else
	{
		localStorage.TurnOnAthan = "false";
	}

	if($("#NotificationPopup").prop('checked'))
	{
		localStorage.Notification = "PopupNotification";
	}
	else if($("#NotificationWebkit").prop('checked'))
	{
		localStorage.Notification = "WebkitNotification";
	}
	else
	{
		localStorage.Notification = "None";
	}

	localStorage.Country = $('#Country').val();

	localStorage.City = $('#City').val();

	if($("#summer-time").prop('checked'))
	{
		localStorage.SummerTime = "true";
	}
	else
	{
		localStorage.SummerTime = "false";
	}

	$("#ShowNotification").fadeIn().delay(800).fadeOut();
}