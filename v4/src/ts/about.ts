

$('.open-about').click(function(event){
	document.getElementById("modal-about").style.width = "400px";
	event.preventDefault();
    event.stopPropagation();
});


$('.close-about').click(function(event){
	document.getElementById("modal-about").style.width = "0px";
	event.preventDefault();
    event.stopPropagation();
});
