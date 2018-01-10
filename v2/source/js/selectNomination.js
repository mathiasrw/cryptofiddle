import $ from 'jquery'; 

function prevent(event){
	event.preventDefault();
    event.stopPropagation();
}

$('Q.open-about').click(function(event){
	document.getElementById("modal-about").style.width = "400px";
	prevent(event);
});


$('Q.close-about').click(function(event){
	document.getElementById("modal-about").style.width = "0px";
	prevent(event);
});	
