var points = 0;
var wordpoints = 1;
var curword;

//unit types
var monkeys = [0, 0];
var typists = [0, 0];
var computers = [0, 0];

var mulby = [1, 1, 1];
var mulbybought = [0, 0, 0]; //number of times upgrade has been bought
var nextupgradecost = [0, 0, 0];
var typeupgradebought = 0;

//arrays of words
var wordsstart = [];
var wordstop = [];
var wordstoplong = [];
var wordsmonkey = [];
var wordstypist = [];
var wordssuper = [];

//TODO: achievements

var numTyped = 0;
typed10 = false;
typed100 = false;
typed1000 = false;
var hasDone = [typed10, typed100, typed1000];

var previndex = -1;
var notificationIcon = null;

function inputEntered(number){
    points = points + number;
	numTyped++;
	document.getElementById("points").innerHTML = points;
};
//note for future readers that code reguarding the notification was pushed by brandon8000
function setNotification(type){
	// Reveal the icon that we were asked for
	if(type == "good"){
		notificationIcon = document.getElementById("good-notification") || null;
		if(notificationIcon != null){
			notificationIcon.style.opacity = 1.0;
		}
	}
	if(type == "bad"){
		notificationIcon = document.getElementById("bad-notification") || null;
		if(notificationIcon != null){
			notificationIcon.style.opacity = 1.0;
		}
	}
	// Because of how quickly these instructions are processed, we have to
	// set a timeout before asking to hide the icon.
	// Otherwise, the changes would happen faster than we could notice them!
	setTimeout(function(){
		if(notificationIcon != null){
			notificationIcon.style.opacity = 0;
		}
	}, 101);
}

//calls choose list, then selects random index within the list and returns a word
function updateWord() {
	var curlist = [];
	curlist = chooseList();
	var random = getRandomInt(0, curlist.length);
	
	//prevent same word from ever being chosen twice in a row...
	while(random === previndex) {
		random = getRandomInt(0, curlist.length);
	}
	previndex = random;
	
	curword = curlist[random]

	document.getElementById("curword").innerHTML = curword;
};

//chooses a list based on how many of different units are bought, returns list
//this could be better -- prime target for updating here...
function chooseList() {
	if((monkeys[1] > 0) || (typists[1] > 0) || (computers[1] > 0)) { //if they've got a super of anything
		var random = getRandomInt(0, (monkeys[1] + typists[1] + computers[1])); 
		if(random > Math.floor((monkeys[1]+ typists[1] + computers[1])/2))  {
			return wordssuper;
		}
		else if(random > (monkeys[1]+ typists[1] + computers[1])/4) {
			return wordstoplong;
		}
		else {
			return wordstypist
		}
	}
	else if((monkeys[0] === 0) && (typists[0] === 0)) { //if they have no monkeys or typists
		return wordsstart;
	}
	else if ((monkeys[0] > 0) && (typists[0] === 0)) { //if fhere's only monkeys
		var random = getRandomInt(0, monkeys[0]); 
			if(random > (5 + Math.floor(monkeys[0]/2)))  {
				return wordsmonkey;
			}
			else if(random > Math.floor(-2 + monkeys[0]/3)) {
				return wordsstart;
			}
			return wordstop;
		
	}
	else if((monkeys[0] > 0) && (typists[0] > 0)) { //if they have monkeys and typists
		var random = getRandomInt(0, monkeys[0] + typists[0]); 
			if(random > (5 + Math.floor((monkeys[0]+typists[0])/2)))  {
				return wordstop;
			}
			else if (random > Math.floor((monkeys[0]+typists[0])/3)) {
				return wordstoplong;
			}
			else {
				return wordsmonkey;
			}
		
	}
}
//i is index for what level of monkey. 0=regular, 1=super
function buyMonkey(i){
	var start;
	var add;
	if(i === 0) {
		start = 10;
		add = 1
	}
	else if(i === 1) {
		start = 50000;
		add = 500;
	}
		var monkeyCost = Math.floor(start * Math.pow(1.1,monkeys[i]));     //Updates cost
		if(points>= monkeyCost){                                   
			monkeys[i] = monkeys[i] + 1;                                   
			points = points - monkeyCost;                          
			document.getElementById('monkeys[0]').innerHTML = monkeys[0];  //updates the number of monkey for the user
			document.getElementById('monkeys[1]').innerHTML = monkeys[1];
			document.getElementById('points').innerHTML = points;  //updates the number of points for the user
			wordpoints = wordpoints+add;
		};
		var nextCost = Math.floor(start * Math.pow(1.1,monkeys[i]));       //works out the cost of the next monkey
	
	if(i === 0) {
		document.getElementById('monkeyCost[0]').innerHTML = nextCost;  //updates the monkey cost for the user
	}
	else if (i ===1) {
		document.getElementById('monkeyCost[1]').innerHTML = nextCost;
	}
	document.getElementById('wordpoints').innerHTML = wordpoints;
};

//pretty much same as monkey, maybe use some sort of inheritance if I refactor?
function buyTypist(i){
	var start=0;
	var add=0;
	if(i === 0) {
		start = 1000;
		add = 100;
	}
	else if(i === 1) {
		start = 500000;
		add = 5000;
	}
    var typistCost = Math.floor(start * Math.pow(1.1,typists[i]));    
    if(points>= typistCost){                                   
        typists[i] = typists[i] + 1;                                   
    	points = points - typistCost;                          
        document.getElementById('typists[0]').innerHTML = typists[0]; 
		document.getElementById('typists[1]').innerHTML = typists[1];
		
        document.getElementById('points').innerHTML = points;  
		wordpoints = wordpoints+add;
    };
    var nextCost = Math.floor(start * Math.pow(1.1,typists[i]));
	if(i === 0) {
		document.getElementById('typistCost[0]').innerHTML = nextCost; 
	}
	else if (i === 1) {
		document.getElementById('typistCost[1]').innerHTML = nextCost;
	}
	
	document.getElementById('wordpoints').innerHTML =wordpoints;
};

//same as above
function buyComputer(i){
	var start=0;
	var add=0;
	if(i === 0) {
		start = 10000;
		add = 1000;
	}
	else if (i === 1) {
		start = 5000000;
		add = 5000;
	}
    var computerCost = Math.floor(start * Math.pow(1.1,computers[i]));     
    if(points>= computerCost){                                   
        computers[i] = computers[i] + 1;                                   
    	points = points - computerCost;  
			
		document.getElementById('computers[0]').innerHTML = computers[0];
        document.getElementById('computers[1]').innerHTML = computers[1];  
        document.getElementById('points').innerHTML = points;  
		wordpoints = wordpoints+add;
    };
    var nextCost = Math.floor(start * Math.pow(1.1,computers[i]));  
	if(i === 0) {	
		document.getElementById('computerCost[0]').innerHTML = nextCost;  
	}
	else if(i === 1) {	
		document.getElementById('computerCost[1]').innerHTML = nextCost;  
	}
	document.getElementById('wordpoints').innerHTML =wordpoints;
};
//generic upgrade for all units, based on their tier
function upgradeUnits(i) {
	var upgradecost = Math.floor(Math.pow(5, (i+3)) * Math.pow(2, mulbybought[i]) * (100 * (i+1)));;
	
	if(points>= upgradecost) {
		mulbybought[i] = mulbybought[i] +1;
		points = points - upgradecost;
		mulby[i] *= 1.5;
	}
	nextupgradecost[i] = Math.floor(Math.pow(5, (i+3)) * Math.pow(2, mulbybought[i]) * (100 * (i+1))); //have already incremented mulbybought

	//needed to ensure correct upgradecost is updated...
	if (i === 0) {
		document.getElementById('upgradecost[0]').innerHTML = nextupgradecost[0];
	}
	else if( i === 1) {
		document.getElementById('upgradecost[1]').innerHTML = nextupgradecost[1];
	}
	else if( i === 2) {
		document.getElementById('upgradecost[2]').innerHTML = nextupgradecost[2];
	}
	document.getElementById('points').innerHTML = points;
};

function upgradeType() {
	var upgradecost = Math.floor(Math.pow(10, typeupgradebought+5))
	if(points>= upgradecost) {
		typeupgradebought = typeupgradebought + 1;
		points = points - upgradecost;
		document.getElementById('points').innerHTML = points;
		var newupgradecost = Math.floor(Math.pow(10, typeupgradebought+5))
		document.getElementById('keyboardupgradecost').innerHTML = newupgradecost;
		wordpoints *= 1.5;
		document.getElementById('wordpoints').innerHTML = wordpoints;
	}
}

//maybe add more words here... declares some lists and then makes them into an array. I'm way too lazy to type out array format for so many words, so make the client do it. If it needs to be faster for some reason, I can fix this later.
function setup(){
	
	wordsstart = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
	
	var strmonkey = "dad as sad lad lag sag gag hag had ask jag lass lads fads glad flag flask gags hags dads jags lads lasses has sass gaga ja flasks alfalfa";
	wordsmonkey = strmonkey.split(" ");
	
	var strtypist = "read were pop trip wig yes toy eat your poop the tree treat food leaf reef quit drag tag rag yeah hi rip ripped sweet sip hello yellow free trees greet free year peek peel seek keep sleep freed seen wed reed she he her his their seed weak queer great greed pedal lead there play gray hay yard took look jar jagged sagged ragged lollypop quote quest quadruple it if its swap sheep"
	wordstypist = strtypist.split(" ");	
	
	var strtop = "q w e r t y u i o p";
	wordstop = strtop.split(" ");
	
	var strtopwords = "tree try ire tie wit quit pretty pot wet queue yup pop it tire pepper proper prop row rye toy tower power tweet error quite erupt write writer popper pewter require your err poy poi tip pit prior tripe yip pip ripe wort tory typewriter type pro rope twerp rupture quiet rite wipe"
	
	wordstoplong = strtopwords.split(" ");
	
	var strsuper = "reading popping tripping box dock cat kitten mood moo bark no son buy need want book bottle cup plate bag car crack smack went going mom light chair quick brown fox over down rain plane bread creep jump bead bat can more zoo soon box noon night back  grabbing freedom wristwatch quintuple meaty venting axe peace family saved dog goober zipper break creeped broken crooked pinky five vive virtual zany knave knack boxer mixup exit"
	
	wordssuper = strsuper.split(" ");
	
	loadSave();
};
//thank you to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

//Cookie stuff. Thanks to http://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript	
function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function deleteSave() {
		//ensure that user actually wants to delete their save
		var isSure = confirm("Are you sure you want to delete your save? You'll never be able to get it back");
		if (isSure) {
			eraseCookie("save");
			//after, reload the page to previous standing. This will change current word, but whatever.
			window.location.reload(false); 
		}
}

function loadSave() {
	cookie = readCookie("save");
	console.log(cookie);
	if(cookie){
		//reset all those lovely vars...
		var cookiearr = cookie.split(",").map(Number);

		points = cookiearr[0];
		typeof points;
		wordpoints = cookiearr[1];
		
		monkeys[0] = cookiearr[2];
		monkeys[1] = cookiearr[3];
		document.getElementById('monkeyCost[0]').innerHTML =  cookiearr[4];
		document.getElementById('monkeyCost[1]').innerHTML =  cookiearr[5];
		
		typists[0] = cookiearr[6];
		typists[1] = cookiearr[7];
		document.getElementById('typistCost[0]').innerHTML =  cookiearr[8];
		document.getElementById('typistCost[1]').innerHTML =  cookiearr[9];
		
		computers[0] = cookiearr[10];
		computers[1] = cookiearr[11];
		document.getElementById('computerCost[0]').innerHTML =  cookiearr[12];
		document.getElementById('computerCost[1]').innerHTML =  cookiearr[13];
		
		mulby[0] = cookiearr[14];
		mulby[1] = cookiearr[15];
		mulby[2] = cookiearr[16];
		
		mulbybought[0] = cookiearr[17];
		mulbybought[1] = cookiearr[18];
		mulbybought[2] = cookiearr[19];
		
		document.getElementById('upgradecost[0]').innerHTML = cookiearr[20];
		document.getElementById('upgradecost[1]').innerHTML = cookiearr[21];
		document.getElementById('upgradecost[2]').innerHTML = cookiearr[22];
		
		typeupgradebought = cookiearr[23];
		document.getElementById('keyboardupgradecost').innerHTML = cookiearr[24];
		
		//achievements
		numTyped = cookiearr[25]
		hasDone[0] = cookiearr[26];
		hasDone[1] = cookiearr[27];
		hasDone[2] = cookiearr[28];
		
		//update achievement text
		if(hasDone[0]) {
			document.getElementById("achieveText").innerHTML += "Typed 10 words! <br>";
		}
		if(hasDone[1]) {
			document.getElementById("achieveText").innerHTML += "Typed 100 words! <br>";
		}
		if(hasDone[2])  {
			document.getElementById("achieveText").innerHTML += "Typed 1000 words! <br>";
		}
		//update rest of the ids for user
		document.getElementById('wordpoints').innerHTML = wordpoints;
		document.getElementById('points').innerHTML = points;  
		document.getElementById('monkeys[0]').innerHTML = monkeys[0];  
		document.getElementById('monkeys[1]').innerHTML = monkeys[1];
		document.getElementById('typists[0]').innerHTML = typists[0]; 
		document.getElementById('typists[1]').innerHTML = typists[1];
		document.getElementById('computers[0]').innerHTML = computers[0];
        document.getElementById('computers[1]').innerHTML = computers[1];  
		
		
		
	}
}

function saveGame() {
		//set up variables to be restored in the future, split with the , symbol. Wherever there is an [i], there is a backslash between each index
	//documentation: savetxt is formatted as points\wordpoints\monkeys[i]\monkeyCost[i]\typists[i]\typistCpst[i]\computers[i]\computerCost[i]\mulby[i]\mulbybought[i]\upgradeCost[i]
	var savetxt = "";
	savetxt += String(points) + ","; //0
	savetxt += String(wordpoints) + ","; //1
	
	//monkeys
	savetxt += monkeys.join(",") + ","; //2, 3
	savetxt += String(Math.floor(10 * Math.pow(1.1,monkeys[0]))) + ",";//4
	savetxt += String(Math.floor(50000 * Math.pow(1.1,monkeys[1]))) + ","; //5
	
	//typists
	savetxt += typists.join(",") + ","; //6, 7
	savetxt += String(Math.floor(1000 * Math.pow(1.1,typists[0]))) + ","; //8
	savetxt += String(Math.floor(500000 * Math.pow(1.1,typists[1]))) + ","; //9
	
	//computers
	savetxt += computers.join(",") + ","; //10, 11
	savetxt += String(Math.floor(10000 * Math.pow(1.1,computers[0]))) + ","; //12
	savetxt += String(Math.floor(5000000 * Math.pow(1.1,computers[1]))) + ","; //13
	
	//stuff for upgrades
	savetxt += mulby.join(",") + ","; //14, 15, 16
	savetxt += mulbybought.join(",") + ","; //17,18,19
	
	//calc upgrade costs and add in
	savetxt +=String(Math.floor(Math.pow(5, (0+3)) * Math.pow(2, mulbybought[0]) * (100 * (0+1)))) + ",";//20
	savetxt +=String(Math.floor(Math.pow(5, (1+3)) * Math.pow(2, mulbybought[1]) * (100 * (1+1)))) + ","; //21
	savetxt +=String(Math.floor(Math.pow(5, (2+3)) * Math.pow(2, mulbybought[2]) * (100 * (2+1)))) + ","; //22
	
	//typeupgradebought
	savetxt += typeupgradebought + ",";// 23
	savetxt += String(Math.floor(Math.pow(10, typeupgradebought+5))) + ","; //24
	
	//achievements
	savetxt += String(numTyped) + ",";
	savetxt += hasDone.join(",") + ","
	
	//set cookie
	createCookie('save',savetxt,700); //keep for ~2 years
	
	console.log("cookie saved: " + savetxt)
}
window.setInterval(function(){
	var addpoints = 0;
	addpoints =  (1   * monkeys[0])* mulby[0];
	addpoints += (100 * monkeys[1])* mulby[0];
	addpoints += (5   * typists[0])* mulby[1];
	addpoints += (500 * typists[1])* mulby[1];
	addpoints += (25  * computers[0]) * mulby[2];
	addpoints += (2500* computers[1]) * mulby[2];
	
	points = points + Math.floor(addpoints);
	
	
	document.getElementById('points').innerHTML =points;  //updates the number of cookies for the user

}, 1000);

//check for achievements every 30 seconds
window.setInterval(function(){
	//number of words typed achievements 
	if((typed10 === false) && (numTyped >= 10)){
		typed10 = true;
		saveGame(); //if something is achieved, save the game automatically
		document.getElementById("achieveText").innerHTML += "Typed 10 words! <br>";
	}
	else if ((typed100 === false) && (numTyped >= 100)) {
		typed100 = true;
		saveGame();
		document.getElementById("achieveText").innerHTML += "Typed 100 words! <br>";
	}
	else if ((typed1000 === false) && (numTyped >= 1000)) {
		typed1000 = true;
		saveGame();
		document.getElementById("achieveText").innerHTML += "Typed 1000 words! <br>";
	}	
	//set hasDone to correct value
	hasDone = [typed10, typed100, typed1000];
}, 30000);


//save a cookie with game info
window.setInterval(function() {
	saveGame();

}, 100000); //ever 100 seconds
	

