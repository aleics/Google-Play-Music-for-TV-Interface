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


$(document).ready(function () {
	
	var page_url = 'page=';
	var url = location.search;
	var page_url_loc = url.search(page_url);	

	var num_page = parseInt(url.substring(page_url.length+1,url.length));	

	if(num_page == 0){ $("#arrowbtnleft").hide();}
	 
});













	/*$('#arrowbtnleft').click(function(e){

                var left =  $(this).attr('value');
		value--;
                e.preventDefault();
                $.ajax({
                type: "POST",
                url: "http://ec2-54-195-232-8.eu-west-1.compute.amazonaws.com/GooglePlayWebTv/php/ajax.php",
                data: { 'value': value },
                success: function(msg){
                   alert('Success!');
                },
                error: function(msg){
                        alert('Error!');
                }
                });
        });*/


/*function send(){
document.theform.submit();
alert('Submitted!');
}*/
/*$(document).ready(function () {
   document.getElementById('plusplaylist').onclick = function() {
   alert("button was clicked");
};*/


//document.getElementById('logoutbutton').onclick = function() {};

/*$('.button').click(function(){
        var clickBtnValue = $(this).val();
        var ajaxurl = 'ajax.php',
        data =  {'action': clickBtnValue};
        $.post(ajaxurl, data, function (response) {
            // Response div goes here.
            alert("action performed successfully");
        });
    });*/


//$('#logoutbutton').live('click', function() {
  //  $.get('../php/functions.php?functionName=logout');
    //return false;
//});

//});




/*$(document).ready(function () {
document.getElementById('logoutbutton').onclick = function() {
$.ajax({
  type: "POST",
  url: "../php/ajax.php",
  data: { name: "logout" }
}).done(function( msg ) {
  alert( "Data Saved: " + msg );
});
};
});*/
/* var Playlists = new Array();
Playlists = document.getElementById('Playlists'); */
