$(document).ready(function () {

	loadFbScript();

	var loaded = false;

	likeButtonCount = $("a[rel=FBlike]").length;
	$("a[rel=FBlike]")/*.fancybox({
		'titlePosition'		: 'inside',
		'transitionIn'		: 'none',
		'transitionOut'		: 'none'
	})*/.click(function(){
		if (!loaded)
			loadFbScript();
		loaded = true;
	});

	var fb_like = '<div style="display:none"><div id="fb_box" class="fb_box"><h3>Like on Facebook:</h3><h2>'+mail_title+'</h2><div class="fb_loading"><img src="/images/ajax-loader-white.gif" alt="" /></div><fb:like href="'+mail_link+'"></fb:like></div></div>';
	$('body').append(fb_like);

	var hrefs = [];
	$('a[rel=FBlike]').each(function(i) {

		var href = $(this).attr('href');
		var params = getUrlParams(href);

		if (params['fb_url']) {
			var divId = unescape(params['fb_id']);
			$(this).attr('href', '#'+divId);
			if (!hrefs[divId])
			{
				addLikeButton(params['fb_url'], params['fb_subject'], divId);
				hrefs[divId] = 1;
			}
		} else {
			$(this).attr('href', '#fb_box');
		}

		$(this).fzoom({"width":450, "height":150});

	});

	if (document.location.href.indexOf('fb_id') > 0)
	{
		var like = document.location.href.substr(document.location.href.indexOf('fb_id=') + 6, 15);
		setTimeout('$("a[href=#'+like+']").trigger("click");', 100);
	}

});

var likeHtml = '<div style="display:none"><div id="{id}" class="fb_box"><h3>Like on Facebook:</h3><h2>{subject}</h2><div class="fb_loading"><img src="/images/ajax-loader-white.gif" alt="" /></div><fb:like href="{url}"></fb:like></div></div>';
function addLikeButton(url, text, divId) {
	var div = likeHtml.replace('{id}', divId);
	div = div.replace('{url}', url);
	text = text ? text : '';
	div = div.replace('{subject}', text);
	$('body').append(div);
}

window.fbAsyncInit = function() {
	FB.init({appId: '146895975344018', status: true, cookie: true, xfbml: true});

	FB.Event.subscribe('xfbml.render', function() {
		$('#fb_loading').hide();
		$('.fb_loading').hide();
	});

	FB.Event.subscribe('edge.create', function(href, widget) {

			$.get("/links/fblike/" + url);
		});
};


function loadFbScript()
{
    if ( typeof lang === 'undefined' )
    {
        lang = 'en';
    }

	var lng = lang + '_' + lang.toUpperCase();

	if (lang == 'en')
	{
		lng = 'en_US';
	}

    if (lang == 'se')
	{
		lng = 'sv_SE';
	}

    if ( lang == 'ptbr')
    {
		lng = 'pt_BR';
	}
	var fbscript = document.createElement('script');
	fbscript.type = 'text/javascript';
	fbscript.src = document.location.protocol + '//connect.facebook.net/' + lng + '/all.js';
	fbscript.async = true;
	$('#fb-root').append(fbscript);
};

function getUrlParams(str) {
	var vars = [], hash;
	var hashes = str.slice(str.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}