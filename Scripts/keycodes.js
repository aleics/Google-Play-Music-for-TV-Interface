$(document).ready(function(){
    menu_navigation();
});

function menu_navigation(){
var chosen = 0;
$('li:eq('+chosen+')').addClass('selected');
	$(document).keydown(function(e){ // 38-up, 40-down
		if (e.keyCode == 40) { 
			if(chosen === "") {
				chosen = 0;
			} else if((chosen+1) < $('li').length) {
				chosen++; 
			}
			$('li').removeClass('selected');
			$('li:eq('+chosen+')').addClass('selected');
			return false;
		}
		else if (e.keyCode == 38) { 
				if(chosen === "") {
				chosen = 0;
			} else if(chosen > 0) {
				chosen--;            
			}
			$('li').removeClass('selected');
			$('li:eq('+chosen+')').addClass('selected');
			return false;
		}
		else if (e.keyCode == 13 || e.keyCode == 39) {
			if(chosen == ""){
				show_ListenNow();
			}
			else if(chosen == 1){
				show_MyLibrary();
				window.location.href = './html/MyLibrary.php';
			}
			else if(chosen == 2){
				show_Radio();
			}
			else if(chosen == 3){
				show_Explore();
				window.location.href = './html/Explore.php';
			}
			else if(chosen == 4){
				show_Playlists();
				window.location.href = './html/Playlists.php';
			}
        }
	});

}





















/*$(document).ready(function () {

var CurrentSelection = 0;
var menu_elements = document.getElementById('toolbarmenu').getElementsByTagName('li');
var menu_size = menu_elements.length;
var menu_elements_array [];
var number_elements = 0;
var current_element;


for(var i=0; i<menu_size; i++) {
  if(menu_elements[i].className == 'vertical_element') {
    menu_elements_array.push(menu_elements[i]);
  }
}

var current_element = -1;

function ShowElement(index){
	
	for(var i=0; i<number_elements; i++) {
		menu_elements[i].className = 'vertical_number';
	}
	current_element = menu_element[index];     // store current horisontal element
	current_element.className = 'vertical_element_show';      // set class="olishow"	

}



function KeyCheck(e){
 // http://coursesweb.net/
   number_elements = menu_elements.length;
   var keyid = (window.event) ? event.keyCode : e.keyCode;       // get the code of the key pressed

   // modify the index of horisontal /vertical item, calls the indicated function according to pressed key
   switch(keyid) {
      // Up
      case 38:
        CurrentSelection--;
        if(CurrentSelection < 0) CurrentSelection = 0;
        ShowElement(CurrentSelectino);
        break;
      // Down
      case 40:
        CurrentSelection++;
        if(CurrentSelection >= number_elements) CurrentSelection = 0;
        ShowElement(CurrentSelection);
      break;
      // Enter (opens the link)
      case 13:
        if(url_adr != '') window.location = url_adr;
        break;
   }
}

document.onkeydown = KeyCheck;





/*var display_size = menu_size.toString();
document.getElementById('ListenNow').onclick = function() {
document.write('<p>' + display_size + '</p>')
for(var i=0; i<menu_elements_array.length; i++){
var display = menu_elements_array[i].toString()
document.write(display + '<br>');
} */
/*
} 
});*/














// access the KeyCheck() function when a keyboard button is pressed
//document.onkeydown = KeyCheck;

/* 
var currentSelection = 0;
var currentUrl = '';

google.load("jquery", "1.3.1");
google.setOnLoadCallback(function()
{
	// Register keypress events on the whole document
	$(document).keypress(function(e) {
		switch(e.keyCode) { 
			// User pressed "up" arrow
			case 38:
				navigate('up');
			break;
			// User pressed "down" arrow
			case 40:
				navigate('down');
			break;
			// User pressed "enter"
			case 13:
				if(currentUrl != '') {
					window.location = currentUrl;
				}
			break;
		}
	});
	
	// Add data to let the hover know which index they have
	for(var i = 0; i < $("#menu ul li a").size(); i++) {
		$("#menu ul li a").eq(i).data("number", i);
	}
	
	// Simulote the "hover" effect with the mouse
	$("#menu ul li a").hover(
		function () {
			currentSelection = $(this).data("number");
			setSelected(currentSelection);
		}, function() {
			$("#menu ul li a").removeClass("itemhover");
			currentUrl = '';
		}
	);
});

function navigate(direction) {
	// Check if any of the menu items is selected
	if($("#menu ul li .itemhover").size() == 0) {
		currentSelection = -1;
	}
	
	if(direction == 'up' && currentSelection != -1) {
		if(currentSelection != 0) {
			currentSelection--;
		}
	} else if (direction == 'down') {
		if(currentSelection != $("#menu ul li").size() -1) {
			currentSelection++;
		}
	}
	setSelected(currentSelection);
}

function setSelected(menuitem) {
	$("#menu ul li a").removeClass("itemhover");
	$("#menu ul li a").eq(menuitem).addClass("itemhover");
	currentUrl = $("#menu ul li a").eq(menuitem).attr("href");
} */