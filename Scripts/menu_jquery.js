$(document).ready(function () {
    $("li").click(function () {
        $('li > ul').not($(this).children("ul")).hide();
        $(this).children("ul").toggle();
    });
/* 	
	$('#createplaylistinput').submit(function(){
		alert("Submitted");
		}); */
	
	
	$('#plusplaylist').click(function(){
		show_PlusPlaylist();
	});
	
	$('#pauselogo').click(function(){
		show_Play();
	});
	$('#playlogo').click(function(){
		show_Pause();
	});
/* 	$('#play_element').click(function(){
		show_PlayFooter();
	}); */
	
	/* $('#ListenNow').click(function() {
		 show_ListenNow(); 
	});
	$('#MyLibrary').click(function() {
		 show_MyLibrary(); 
	});
	$('#Radio').click(function() {
		show_Radio();
	});
	$('#Explore').click(function() {
		 show_Explore();
	});
	$('#Playlists').click(function() {
		 show_Playlists(); 
	}); */
});

function show_PlusPlaylist(){
	$('#input_playlist').show();
	$('#submit_playlist').show();
	$('#Playlist_List').hide();
}

function show_Play(){
	$('#playlogo').show();
	$('#pauselogo').hide();
}
function show_Pause(){
	$('#playlogo').hide();
	$('#pauselogo').show();
}


function show_PlayFooter(){
	$('#footer_play').show();
	show_Pause();
	$('#nextlogo').show();
	$('#previouslogo').show();
}








 function show_ListenNow(){
	$('#headerboxListenNow').show();
	$('#headerboxPlaylists').hide();
	$('#headerboxExplore').hide();
	$('#headerboxRadio').hide();
	$('#headerboxMyLibrary').hide();
	$('#createplaylistbox').hide();
	$('#createplaylistinput').hide();
	$('#submitcreateplaylistinput').hide()
}
function show_MyLibrary(){
	$('#headerboxMyLibrary').show();
	$('#headerboxPlaylists').hide();
	$('#headerboxExplore').hide();
	$('#headerboxRadio').hide();
	$('#createplaylistbox').hide();
	$('#createplaylistinput').hide();
	$('#submitcreateplaylistinput').hide();
		
}
function show_Radio(){
	$('#headerboxRadio').show();
	$('#headerboxPlaylists').hide();
	$('#headerboxExplore').hide();
	$('#createplaylistbox').hide();
	$('#createplaylistinput').hide();
	$('#submitcreateplaylistinput').hide();
}
function show_Explore(){
	$('#headerboxExplore').show();
	$('#headerboxPlaylists').hide();
	$('#createplaylistbox').hide();
	$('#createplaylistinput').hide();
	$('#submitcreateplaylistinput').hide();
}
function show_Playlists(){
	$('#headerboxPlaylists').show();
	$('#createplaylistbox').hide();
	$('#createplaylistinput').hide();
	$('#submitcreateplaylistinput').hide();
}
	
	
	
	
	
	
	
	
	