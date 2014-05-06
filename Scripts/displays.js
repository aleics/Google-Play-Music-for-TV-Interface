function DisplayVariablesPerPages(matrix,num_page){

	var variables_per_page = 14;
	var start = 0+(variables_per_page*num_page);
	var end = 13+(variables_per_page*num_page);
	
	if(end>=matrix.length){
		end = matrix.length;
	}
	
	if(matrix[0] instanceof Array){
	for(y=start;y<end;y++){
		document.write("<tr>");
			for(x=0;x=matrix[y].length;x++){
				if((x%3)==0){
				document.write("<td style='width: 350px;'><input type='image' id='playbuttontracklist' class='buttontracklist' src='../Images/play_logo.png'><input type='image' id='pausebuttontracklist' class='buttontracklist' src='../Images/pause_logo.png' style='position: relative; right: 35px; top: -1px; visibility:hidden;'><a href='#' style='position: relative; left: -32px;'><span>" + matrix[y][x] + "<input type='image' id='morebutton' src='../Images/more.png'></td>");
				}
				else{
				document.write("<td><a href='#'><span>" + matrix[y][x] + "</td>");
				}
			}
		document.write("</tr>");
	}
	}
	
	else if(!(matrix[0] instanceof Array)){
	
	for(y=start;y<end;y++){
	document.write("<tr>");
	document.write("<td> <a href='#'><span>"+ matrix[y] + "</td>");
	document.write("</tr>");
	
	}
	}
	
}