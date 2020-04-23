// Localization

	//Specify variables
	
		// Turn localization on/off
		var localized = false;
		
		//Define list of language codes (2 chars) and display names. Language code should be same as language folder in URL.
		var lans = {en:'English', ja:'日本語', ru: 'Русский'};
		
		//Define languages for each document section. Child sections must follow parent sections. If section is not localized, leave language list empty.
		var docsections = [
		
			{	section: '',
				lans: ['en', 'ja']},
				
			{	section: '/sdk',
				lans: []},

			{	section: '/rif',
				lans: []},
				
			{	section: '/uber',
				lans: []},
		
			{	section: '/plugins',
				lans: ['en', 'ja']},
				
			{	section: '/plugins/matlib',
				lans: []},
			
			{	section: '/plugins/blender',
				lans: []},
				
			{	section: '/plugins/maya',
				lans: ['en','ja']},
				
			{	section: '/plugins/3dsmax',
				lans: []}
				
			];
			

	//Common script variables
	var url = window.location.href;
	var displayswitcher = false;


	//Check page language
	var lancode = window.location.href.match(/\/([a-z]{2})\//g);
	if (lancode) {
		lancode = lancode.map(s => s.slice(1,-1));
		var pagelan = lancode[lancode.findIndex(v => Object.keys(lans).includes(v))];
	};

	
	//Check available languages for page
	var sectionlans = [];
	docsections.forEach(element => {
		if (url.includes(pagelan + element.section + '/')) {
			sectionlans = element.lans;	
		};
	});

	
	//Build html language selector
	var lanselector = '<select class="languages">\r\n';
	Object.entries(lans).forEach(([key, value]) => {
		if (key == pagelan && sectionlans.includes(key)) {
			lanselector += '<option value="' + key + '" selected disabled>' + value + '</option>\r\n';
			displayswitcher = true;
			}
		else if (sectionlans.includes(key)) {
			lanselector += '<option value="' + key + '">' + value + '</option>\r\n';
			}
	});
	lanselector += '</select>'


	//Insert language selector to html code
	if (localized && displayswitcher) {
		$('.breadcrumbs-aside').html(lanselector);
		$('header > .container').append('<div class="lan-switcher">' + lanselector + '</div>'); // responsive
	};

	
	//Switch page to selected language
	 $('.languages').on('change', function () {
		var newlan = $(this).val();
		var pageurl = $(location).attr('href');
		pageurl = pageurl.replace(pagelan + '/', newlan + '/');
		window.location.href = pageurl;
	});
		

	// Additional processing for lightboxed images: pushing image :title: attribute to image titile and data-title
	if (pagelan !== 'en') {
		$('table p.last').each(function() {
			var lightboxtext = $(this).find('strong').html();
			$(this).siblings('a').attr({'title': lightboxtext, 'data-title': lightboxtext});
		});
	};
	

