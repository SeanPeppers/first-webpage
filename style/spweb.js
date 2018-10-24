//removes the pictures on the news page
function myFunction() {
	var x = document.getElementsByClassName("jstlnks");
	for (var i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
}
//so that on mobile the header doesn't stay to the top left
function dropMenu() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
		document.getElementById("home").style.display = "block";
	} else {
		document.getElementById("home").style.display = "none";
		x.className = "topnav";
	}
}
/*if (window.matchMedia("(max-width: 600px)").matches) {
	document.getElementById("mainheader").style.backgroundImage = "url('myspace.jpg')";
} else {
	document.getElementById("mainheader").style.backgroundImage = "url('myspace.jpg')";
}*/
//this is so that the picture will size itself in the header
/*function changepic() {
	var currimagepath;
	var currimage = document.getElementById("mainheader").style.backgroundImage = "url('myspace.jpg')";
	if (window.screen.width < 1100) {
		document.getElementById("mainheader").style.backgroundImage = "url('pic/phone.jpg')";
	}
	if (window.screen.width > 1100) {
		document.getElementById("mainheader").style.backgroundImage = "url('pic/myspace.jpg')";
	}
	if (window.screen.width > 1700) {
		document.getElementById("mainheader").style.backgroundImage = "url('pic/ms2.jpg')";
	}
}
*/

$("#toggle").click(function() {
	
	$(this).toggleClass('on');
	$("#resize").toggleClass("active");
	
	});