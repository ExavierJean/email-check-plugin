// ;(function ( $, window, document, undefined ) {
 
// $.fn.	

	var domains = [
		'gmail.com', 
		'hotmail.com', 
		'aol.com', 
		'yahoo.com'
	];

	

	$('#submit').click(function() {
		var userInput = $('#email').val();

		var re = "@([^ ]*)" ;
		// Returns an object with:
		// 0 : @domain.topleveldomain
		// 1 : domain.topleveldomain
		// .index :
		// .input
		var emailObj = userInput.match(re);
		// add this to the right email domain
		// preEmail + domains[0,1,2,3]

		// preEmail is the content before the @ symbol, ex. preEmail = atv246
		var preEmail = emailObj.input.substring(0, emailObj.index);

		// postEmail is the content after the @ symbol, ex. postEmail = gmail.com
		var postEmail = emailObj[1];
		// sift code -> for each domain in domains sift4(postEmail, domain, #)
		var bestDistance = null;
		var bestMatch = null;

		for (var i = 0; i < domains.length; i++){
			 var domain = domains[i];
			 //the difference between user input and current domain string
			 var distance = sift4(postEmail, domain, 2);

			 // this means the strings are the same
			 // so we have no reason to check any of the other domains
			 if (distance === 0){
			 	bestMatch = domain;
			 	bestDistance = distance;
			 	break;
			 }
			 // currently our best match because it's the first loop
			 // (we have nothing to compare to yet)
			 if (i === 0) {
		 		bestMatch = domain;
		 		bestDistance = distance;
		 		continue;
			 } 
			 //taking the distance and compare it to our current BestDistance
			 //if it's better than our current best distance use that as our new best match
			 if (distance < bestDistance) {
			 	bestDistance = distance;
			 	bestMatch = domain;
			 }
		}

		juice(bestMatch, preEmail);

		return bestMatch
	});

		// Sift4 - simplest version
// online algorithm to compute the distance between two strings in O(n)
// maxOffset is the number of characters to search for matching letters
function sift4(s1, s2, maxOffset) {
    if (!s1||!s1.length) {
        if (!s2) {
            return 0;
        }
        return s2.length;
    }

    if (!s2||!s2.length) {
        return s1.length;
    }

    var l1=s1.length;
    var l2=s2.length;

    var c1 = 0;  //cursor for string 1
    var c2 = 0;  //cursor for string 2
    var lcss = 0;  //largest common subsequence
    var local_cs = 0; //local common substring

    while ((c1 < l1) && (c2 < l2)) {
        if (s1.charAt(c1) == s2.charAt(c2)) {
            local_cs++;
        } else {
            lcss+=local_cs;
            local_cs=0;
            if (c1!=c2) {
                c1=c2=Math.max(c1,c2); //using max to bypass the need for computer transpositions ('ab' vs 'ba')
            }
            for (var i = 0; i < maxOffset && (c1+i<l1 || c2+i<l2); i++) {
                if ((c1 + i < l1) && (s1.charAt(c1 + i) == s2.charAt(c2))) {
                    c1+= i;
                    local_cs++;
                    break;
                }
                if ((c2 + i < l2) && (s1.charAt(c1) == s2.charAt(c2 + i))) {
                    c2+= i;
                    local_cs++;
                    break;
                }
            }
        }
        c1++;
        c2++;
            lcss+=local_cs;
    return Math.round(Math.max(l1,l2)- lcss);
}

function juice (bestMatch, preEmail){
	
	$('body > form > div').remove();
	$('body > form').append( '<div id="didYouMean" style="color: red; font-size: 1em;"><h2> Did You Mean "' + preEmail + '@' + bestMatch + '"?</h2>' + ' <a id="yeSir" onclick="return false" href="#" style="text-decoration: none; color: white;">Yes</a>' + ' or ' + '<a id="noSir" href="#" style="text-decoration: none; color: white;">Naw</a></div>');

	yesSir(bestMatch, preEmail);	
	return false
}

function yesSir(preEmail, bestMatch){
	$('#email').val(preEmail + '@' + bestMatch);
	$('body > form > div').remove();
}  

function nosSir(){
	$('body > form > div').remove();
}

$('body > form > div > #yeSir').click(function(){
	yesSir();
});

$('body > form > div > #noSir').click(function(){
	nosSir();
});



	// console.log(emailCheck)
	// console.log(array)

// })( jQuery, window, document );
