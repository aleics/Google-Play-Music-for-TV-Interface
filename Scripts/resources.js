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

function playsong(chosenid){
                          $.ajax({
			  type: 'GET',
                          url: '/GooglePlayWebTv/php/audio.php',
			  dataType: 'text',
                          data: {'id' : chosenid },
                          success: function (response) {
			     document.getElementById("audio").autoplay = true;
			     document.getElementById("audio").load();
		             //document.getElementById("playbuttontracklist").style.display = 'none';
			     //$("#pausebuttontracklist").show();
			  },
                          error: function () {
                             alert("ERROR");
                          }
                        });

	}

function pause(){
	$document.getElementById("audio").pause();
}


/*function addOrUpdateUrlParam(name, value)
{
  var href = window.location.href;
  var regex = new RegExp("[&\\?]" + name + "=");
  if(regex.test(href))
  {
    regex = new RegExp("([&\\?])" + name + "=\\d+");
    window.location.href = href.replace(regex, "$1" + name + "=" + value);
  }
  else
  {
    if(href.indexOf("?") > -1)
      window.location.href = href + "&" + name + "=" + value;
    else
      window.location.href = href + "?" + name + "=" + value;
  }
}*/



/*function play(){
        document.getElementById("playbuttontracklist").addEventListener('click', function(e){
                        $.ajax({
                          url: '/GooglePlayWebTv/php/play.php',
                          data: {'play' : "yes" },
                          success: function (response) {
				document.getElementById("playbuttontracklist").style.display='block';
				document.getElementById("pausebuttonbuttontracklist").style.display='block';
				document.getElementById("footerplaybuttons").style.display='block';


        			$("#playbuttontracklist").hide();
			        $("#pausebuttontracklist").show();
				$("#footerplaybuttons").show();
                          },
                          error: function () {
                             alert("ERROR");
                          }
                        });

                        });

};
*/


/*function removeParam(parameter)
{
  var url=document.location.href;
  var urlparts= url.split('?');

 if (urlparts.length>=2)
 {
  var urlBase=urlparts.shift(); 
  var queryString=urlparts.join("?"); 

  var prefix = encodeURIComponent(parameter)+'=';
  var pars = queryString.split(/[&;]/g);
  for (var i= pars.length; i-->0;)               
      if (pars[i].lastIndexOf(prefix, 0)!==-1)   
          pars.splice(i, 1);
  url = urlBase+'?'+pars.join('&');
}
return url;
}

function UpdateID(){

	document.getElementById("playbuttontracklist").addEventListener('click', function(e){
		removeParam('id');
	});




}*/







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
