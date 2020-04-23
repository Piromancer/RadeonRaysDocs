//Set variables

var enableCookieConsent = true;
var cookieURL = "https://radeon-pro.github.io/RadeonProRenderDocs/cookie_policy.html";
var privacyURL = "https://radeon-pro.github.io/RadeonProRenderDocs/ga_privacy_policy.html";
var cookieText = '<p>We use cookies on this website to analyze traffic and optimize your experience. By browsing this website, you consent to the use of cookies listed in the <a href="' + cookieURL + '">cookie policy</a>.</p>';


//Show cookie consent message

$( document ).ready(function() {
	
	if (enableCookieConsent) {
		
		$('.footer > .container').append('&nbsp; &nbsp; <a href="' + privacyURL + '">GA Privacy Policy</a> &nbsp; <a href="' + cookieURL + '">Cookie Policy</a>');

		$('.footer').before('' + 
		'<div class="cookies fade-out">' + 
			'<div class="cookies-text">' +
				cookieText + 
			'</div>' +
			'<div class="cookies-btn">' +
				'<button class="cookies-close">I understand</button>' +
			'</div>' +
			'</div>');

		function showCookies() {
			if (localStorage.getItem('showCookieConsent') != 'false') {
				$('.cookies').removeClass('fade-out');
			};

			$('.cookies-close').click(function() {
				$('.cookies').addClass('fade-out');
				localStorage.setItem('showCookieConsent','false');
			});
			
		};
		
		setTimeout(showCookies, 750);
	
	};
	
});