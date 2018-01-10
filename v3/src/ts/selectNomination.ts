import * as $ from 'jquery';

function prevent(event: any){
	event.preventDefault();
    event.stopPropagation();
}

$('Q.open-about').click(function(event: any){
	document.getElementById("modal-about").style.width = "400px";
	prevent(event);
});


$('Q.close-about').click(function(event: any){
	document.getElementById("modal-about").style.width = "0px";
	prevent(event);
});
