$(function() {
	$('#menu').load('Menu.html');
	var hrefIndex = location.href.indexOf('#');
	if (hrefIndex != -1) 
		$('#main').load(location.href.substring(hrefIndex+1) + '.html');
	else
		$('#main').load('Home.html');
});

