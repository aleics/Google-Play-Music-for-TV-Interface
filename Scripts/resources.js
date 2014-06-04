/*
RESOURCES.JS
File that contains all the Javascript functions needed
*/

//AJAX communication if the logout button is pressed
function logout(){
	document.getElementById("logoutbutton").addEventListener('click', function(e){
		        $.ajax({
         		  url: '/GooglePlayWebTv/php/logout.php',
         		  data: {'DeleteAllFiles' : "yes" },
 		          success: function (response) {
             			window.location.href = "/GooglePlayWebTv/";
          		  },
		          error: function () {
		             alert("ERROR");
		          }
		        });
	
			});
	
};

//Arrow navigation
$(document).ready(function () {
	
	var page_url = 'page=';
	var url = location.search;
	var page_url_loc = url.search(page_url);	

	var num_page = parseInt(url.substring(page_url.length+1,url.length));	

	if(num_page == 0){ $("#arrowbtnleft").hide();}
});	 

//AJAX communication if the play button is pressed
function playsong(chosenid){
                          $.ajax({
			  type: 'GET',
                          url: '/GooglePlayWebTv/php/audio.php',
			  dataType: 'text',
                          data: {'id' : chosenid },
                          success: function (response) {
			     document.getElementById("audio").autoplay = true;
			     document.getElementById("audio").load();
			  },
                          error: function () {
                             alert("ERROR");
                          }
                        });

	}

function pause(){
	$document.getElementById("audio").pause();
}
