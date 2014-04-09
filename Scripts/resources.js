function logout(){
	var x = document.getElementById("logoutbutton");
	//alert("pressed");

	$.ajax({
       	type: "POST",
       	url: "./php/ajax.php",
      	data: { fname: "logout"},
       	success: function(msg){ 
            alert('Success!');
       	}
   	});
};



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
