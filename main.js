
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
var wordsmonkey = [];
var wordstypist = [];
var wordssuper = [];

function inputEntered(number){
    points = points + number;
	document.getElementById("points").innerHTML = points;
};



function updateWord() {
	var curlist = [];
	curlist = chooseList();
	var random = getRandomInt(0, curlist.length);
	
	curword = curlist[random]

	document.getElementById("curword").innerHTML = curword; 
};

function chooseList() {
	if((monkeys[1] > 0) || (typists[1] > 0) || (computers[1] > 0)) {
		var random = getRandomInt(0, (monkeys[1] + typists[1] + computers[1])); 
		if(random > monkeys[0]) {
			return wordssuper;
		}
		else {
			return wordstypist
		}
	
	}
	else if((monkeys[0] === 0) && (typists[0] === 0)) {
		return wordsstart;
	}
	else if ((monkeys[0] > 0) && (typists[0] === 0)) {
		var random = getRandomInt(0, monkeys[0]); 
			if(random > (5 + Math.floor(monkeys[0]/2)))  {
				return wordsmonkey;
			}
			return wordsstart;
		
	}
	else if((monkeys[0] > 0) && (typists[0] > 0)) {
		var random = getRandomInt(0, monkeys[0] + typists[0]); 
			if(random > (5 + Math.floor((monkeys[0]+typists[0])/2)))  {
				return wordstypist;
			}
			else {
				return wordsmonkey;
			}
		
	}
}

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

function setup(){
	
	wordsstart = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
	
	var strmonkey = "dad as sad lad lag sag gag hag had ask jag lass lads fads glad flag flask gags hags dads jags lads lasses flasks alfalfa";
	wordsmonkey = strmonkey.split(" ");
	
	var strtypist = "read were pop trip wig yes toy eat your poop the tree treat food leaf reef quit drag tag rag yeah hi rip ripped sweet sip hello yellow free trees greet free year peek peel seek keep sleep freed seen wed reed she he her his their"
	wordstypist = strtypist.split(" ");	
	
	var strsuper = "reading popping tripping box dock cat kitten mood moo bark no son buy need want book bottle cup plate bag car crack smack went going mom light chair quick brown fox over down rain plane bread creep jump bead bat can more zoo soon box noon night back"
	
	wordssuper = strsuper.split(" ");
};
//thank you to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}	

window.setInterval(function(){
	points = points + (1   * monkeys[0])* mulby[0];
	points = points + (100 * monkeys[1])* mulby[0];
	points = points + (5   * typists[0])* mulby[1];
	points = points + (500 * typists[1])* mulby[1];
	points = points + (25  * computers[0]) * mulby[2];
	points = points + (2500* computers[1]) * mulby[2];
	
	
	document.getElementById('points').innerHTML =points;  //updates the number of cookies for the user

}, 1000);


