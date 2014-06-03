function display(chosenid){
$.ajax({ url: './server.php',
         data: {display: chosenid},
	 dataType: 'text',
         type: 'GET',
         success: function(output) {
                      alert(output);
                  }
});
}
