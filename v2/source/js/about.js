import $ from 'jquery'; 

function prevent(event){
	event.preventDefault();
    event.stopPropagation();
}

$('.open-about').click(function(event){
	document.getElementById("modal-about").style.width = "400px";
	prevent(event);
});


$('.close-about').click(function(event){
	document.getElementById("modal-about").style.width = "0px";
	prevent(event);
});	
