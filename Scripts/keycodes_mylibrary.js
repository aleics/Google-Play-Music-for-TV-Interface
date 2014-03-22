$(document).ready(function(){
    mylibrary_navigation();
});

function menu_navigation(){
var chosen = 0;
$('li:eq('+chosen+')').addClass('selected');
	$(document).keydown(function(e){ // 38-up, 40-down
		$('tr').removeClass('selected');
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
		else if (e.keyCode == 13) {
			if(chosen == ""){
				window.location.href = '../main.php'
			}
			else if(chosen == 1){
				window.location.href = 'MyLibrary.php';

			}
			else if(chosen == 2){

			}
			else if(chosen == 3){
				window.location.href = 'Explore.php';
			}
			else if(chosen == 4){
				window.location.href = 'Playlists.php';
			}
        }
		else if( e.keyCode == 39){
			mylibrary_navigation();
		}
	});
}

function mylibrary_navigation(){
var chosen = 1;

	$('li').removeClass('selected');
	
	$('tr:eq('+chosen+')').addClass('selected');
	$(document).keydown(function(e){ // 38-up, 40-down
		if (e.keyCode == 40) {
		
			$('li').removeClass('selected');
			
			if(chosen === "") {
				chosen = 1;
			} else if((chosen+1) < $('tr').length) {
				chosen++; 
			}
			$('tr').removeClass('selected');
			$('tr:eq('+chosen+')').addClass('selected');
		}
		else if (e.keyCode == 38) {
		
			$('li').removeClass('selected');
			
				if(chosen === "") {
				chosen = 1;
			} else if(chosen > 1) {
				chosen--;            
			}
			$('tr').removeClass('selected');
			$('tr:eq('+chosen+')').addClass('selected');
		}
		else if (e.keyCode == 13) {
			$('li').removeClass('selected');
			/*PLAY THE SONG*/
        }
		else if (e.keyCode == 37){
			$('tr').removeClass('selected');
			$('li').removeClass('selected');
			menu_navigation();
			}
	});
}
