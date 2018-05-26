var music=new Audio("snd/music.mp3");
var click=new Audio("snd/click.mp3");
var clock=new Audio("snd/clock.mp3");
music.volume=0.05;
click.volume=0.4;
clock.volume=0.4;
music.loop=true;

var gamespeed=1;
var energy = 0;
var lvl = 1;
var curExp = 0;
var expAmount = 100;
var flag1=true;
var flags=new Array(10);
var globalcost=1.0;
var dynamomultiplier=1;
var score=0;
var sound=true;
var info=false;
flags[0]=true;
flags[1]=true;
flags[2]=true;
flags[3]=true;
flags[4]=true;
flags[5]=true;
flags[6]=true;
flags[7]=true;
flags[8]=true;
flags[9]=true;
var names=new Array(9);				var bonuses=new Array(9);	var costs=new Array(9); var times=new Array(9);
names[0]="Dynamo";					bonuses[0]=1;				costs[0]=10;			times[0]=0;
names[1]="Młyny wodne";				bonuses[1]=2;				costs[1]=70;			times[1]=0.4;
names[2]="Panele słoneczne";		bonuses[2]=5;				costs[2]=200;			times[2]=0.8;
names[3]="Wiatraki";				bonuses[3]=15;				costs[3]=800;			times[3]=1.5;
names[4]="Reaktory węglowe";		bonuses[4]=120;				costs[4]=3000;			times[4]=2.2;
names[5]="Reaktory atomowe";		bonuses[5]=800;				costs[5]=20000;			times[5]=3.1;
names[6]="Orbitalne panele";		bonuses[6]=50000;			costs[6]=400000;		times[6]=4.5;
names[7]="Węzeł słoneczny";			bonuses[7]=3000000;			costs[7]=6000000;		times[7]=7;
names[8]="Reaktory antymaterii";	bonuses[8]=10000000;		costs[8]=20000000;		times[8]=10;
var levels=new Array(9);
levels[0]=1;
levels[1]=0;
levels[2]=0;
levels[3]=0;
levels[4]=0;
levels[5]=0;
levels[6]=0;
levels[7]=0;
levels[8]=0;
var timers=new Array(8);
timers[0]=0;
timers[1]=0;
timers[2]=0;
timers[3]=0;
timers[4]=0;
timers[5]=0;
timers[6]=0;
timers[7]=0;
var lasteng=0;
var enground=0;
var engtimer=0;
var yearinfo=new Array(12);
yearinfo[0]=0;	yearinfo[6]=0;
yearinfo[1]=0;	yearinfo[7]=0;
yearinfo[2]=0;	yearinfo[8]=0;
yearinfo[3]=0;	yearinfo[9]=0;
yearinfo[4]=0;	yearinfo[10]=0;
yearinfo[5]=0;	yearinfo[11]=0;
var month=2;
var yearround=0;
var boostcost=new Array(6);	var boosts=new Array(6);	var boostsonoff=new Array(6);	var boostsenergycost=new Array(6);
boostcost[0]=2000;			boosts[0]=false;			boostsonoff[0]=false;			boostsenergycost[0]=10000;
boostcost[1]=14000;			boosts[1]=false;			boostsonoff[1]=false;			boostsenergycost[1]=100000;
boostcost[2]=160000;		boosts[2]=false;			boostsonoff[2]=false;			boostsenergycost[2]=1000000;
boostcost[3]=1000000;		boosts[3]=false;			boostsonoff[3]=false;			boostsenergycost[3]=70000000;
boostcost[4]=20000000;		boosts[4]=false;			boostsonoff[4]=false;			boostsenergycost[4]=120000000;
boostcost[5]=100000000;		boosts[5]=false;			boostsonoff[5]=false;			boostsenergycost[5]=8000000000;
var mobile=false;

function start() {
	music.play();
	setboosts();
	setTimeout(loop(),5000);
}

function loop() {
	document.getElementById("energy").innerHTML = energy+" ("+enground+"/s)";
	var progressbar = (energy/expAmount)*300;
	engtime();
	if(progressbar>300) progressbar = 300;
	document.getElementById("progressbar").style.width= progressbar+"px";
	if(flags[0]==true) document.getElementById("btnlvup").innerHTML= button(0, expAmount, "levelup","levelup()");
	button(0,expAmount);
	showskills();
	setTimeout("loop()",100/gamespeed);
}

function button(flag, amount, id="", click="") {
	if(!(flag>0&&lvl<=levels[flag-1])) {
		if((energy*globalcost)>=amount) {
			flags[flag]=false;
			return '<button class="lvlupsbutton" id="'+id+'" onClick="'+click+'">+</button>';
		} else {
			flags[flag]=true;
			return '<button disabled id="'+id+'" onClick="'+click+'">+</button>';
		}
	} else {
		flags[flag]=true;
		return '<button disabled id="'+id+'" onClick="'+click+'">+</button>';
	}
}

function levelup() {
	if(energy>=expAmount) {
		energy-=expAmount;
		lvl++;
		document.getElementById("lvl").innerHTML=lvl;
		expAmount=expAmount*2.3;
		expAmount=Math.round(expAmount);
		flags[0]=true;
		if(sound==true) click.play();
	}
}	
function showskills() {
	showskillsStat(0);
	showskillsStat(1);
	showskillsStat(2);
	showskillsStat(3);
	showskillsStat(4);
	showskillsStat(5);
	showskillsStat(6);
	showskillsStat(7);
	showskillsStat(8);
	timeenergy();
}
function showskillsStat(skillnb) {
	if(flags[skillnb+1]==true&&skillnb==0) {
		document.getElementById("skill"+skillnb).innerHTML= button(skillnb+1, costs[skillnb], skillnb,"skilllvlup("+skillnb+")")+
		'<div class="skillstat">'+names[skillnb]+"</br>Poziom: "+levels[skillnb]+'</div><div class="skillstat">Dochód: '+(bonuses[skillnb]*dynamomultiplier)+
		"/"+times[skillnb]+"s</br>Koszt: "+(Math.round(costs[skillnb]*globalcost))+'</div><div style="clear: both;"></div>';
	}
	else if(flags[skillnb+1]==true) {
		document.getElementById("skill"+skillnb).innerHTML= button(skillnb+1, costs[skillnb], skillnb,"skilllvlup("+skillnb+")")+
		'<div class="skillstat">'+names[skillnb]+"</br>Poziom: "+levels[skillnb]+'</div><div class="skillstat">Dochód: '+bonuses[skillnb]+
		"/"+times[skillnb]+"s</br>Koszt: "+(Math.round(costs[skillnb]*globalcost))+'</div><div style="clear: both;"></div>';
		
	}
	button(skillnb+1, costs[skillnb]);
}
function skilllvlup(skillnb) {
	if(energy>=(Math.round(costs[skillnb]*globalcost))) {
		energy-=(Math.round(costs[skillnb]*globalcost));
		flags[skillnb+1]=true;
		levels[skillnb]+=1;
		if(skillnb==0) {
			bonuses[0]=bonuses[0]*2.1;
			bonuses[skillnb]=Math.round(bonuses[skillnb]);
			costs[0]*=2.6;
			costs[skillnb]=Math.round(costs[skillnb])
		} else {
			bonuses[skillnb]*=1.5;
			bonuses[skillnb]=Math.round(bonuses[skillnb]);
			costs[skillnb]=costs[skillnb]*((skillnb/10)+1.5);
			costs[skillnb]=Math.round(costs[skillnb]);
		}
		
		if(levels[skillnb]==1) {
			switch(skillnb) {
				case 1: document.getElementById("JSwater").innerHTML='<div class="build" id="water"></div>'; break;
				case 2: document.getElementById("JSsunpanels").innerHTML='<div class="build" id="sunpanels"></div>'; break;
				case 3: document.getElementById("JSwindmills").innerHTML='<div class="build" id="windmills"></div>'; break;
				case 4: document.getElementById("JScarbonreactors").innerHTML='<div class="build" id="carbonreactors"></div>'; break;
				case 5: document.getElementById("JSnuclearreactors").innerHTML='<div class="build" id="nuclearreactors"></div>'; break;
				case 6: document.getElementById("JSorbitalpanels").innerHTML='<div class="build" id="orbitalpanels"></div>'; break;
				case 7: document.getElementById("JSsunnode").innerHTML='<div class="build" id="sunnode"></div>'; break;
				case 8: document.getElementById("JSantimatterreactors").innerHTML='<div class="build" id="antimatterreactors"></div>'; break;
			}
		}
		if(sound==true) click.play();
	}
}
function timeenergy() {
	
	for(var i=0;i<8;i++) {
		if(levels[i+1]>0) {
			if(timers[i]>=times[i+1]) {
				energy+=bonuses[i+1];
				timers[i]=0;
			}
			timers[i]+=0.1;
		}
	}
}
function dynamo() {
	energy+=bonuses[0]*dynamomultiplier;
}
function engtime() {
	if(engtimer==100) {
		enground=(energy-lasteng)/10;
		enground=Math.round(enground);
		lasteng=energy;
		engtimer=0;
		year();
		yearinfo[month-1]=enground;
		score+=enground;
	}
	engtimer++;
}
function year() {
	if(month==13) {
		month=1;
		yearround=0;
		for(var i=0;i<12;i++) {
			yearround+=yearinfo[i];
		}
		if(yearround<0) document.getElementById("yearinfo").style.color="red";
		else document.getElementById("yearinfo").style.color="#0ff";
		document.getElementById("yearinfo").innerHTML="Produkcja roczna: "+yearround;
		setboosts();
		if(sound==true) clock.play();
	}
	var calendars="";
	for(var i=0;i<month;i++) {
		calendars=calendars+'<div class="calendar"></div>';
	}
	document.getElementById("progressBg2").innerHTML=calendars;
	month++;
}
function setboosts() {
	var boostsicons="";
	var allboostscost=0;
	for(var i=0;i<6;i++) {
		if(boosts[i]==false) {
			if(yearround>=boostcost[i]) boostsicons=boostsicons+'<div class="boostc" id="boost'+i+'c" onClick="activeboost('+i+')"></div>';
			else boostsicons=boostsicons+'<div class="boost" id="boost'+i+'"></div>';
		} else {
			allboostscost+=(boostcost[i]*0.9);
			if(yearround>=allboostscost) {
				boostsicons=boostsicons+'<div class="boost" id="boost'+i+'w"></div>';
				if(boostsonoff[i]==false) booston(i);
			} else {
				boostsicons=boostsicons+'<div class="boost" id="boost'+i+'r"></div>';
				if(boostsonoff[i]==true) boostoff(i);
			}
		}
	}
	document.getElementById("boosts").innerHTML=boostsicons;
}
function activeboost(nbboost) {
	if(energy>=boostsenergycost[nbboost]) {
		boosts[nbboost]=true;
		setboosts();
		energy-=boostsenergycost[nbboost];
	}
	if(sound==true) click.play();
}
function booston(nbboost) {
	boostsonoff[nbboost]=true;
	switch(nbboost) {
		case 0: times[1]+=-0.1; times[1]=Math.round(times[1]*10)/10; times[3]+=-0.4; times[3]=Math.round(times[3]*10)/10; break;
		case 1: dynamomultiplier=2; break;
		case 2: times[2]+=-0.3; times[2]=Math.round(times[2]*10)/10; times[6]+=-1.0; times[6]=Math.round(times[6]*10)/10; break;
		case 3: times[4]+=-0.6; times[4]=Math.round(times[4]*10)/10; times[5]+=-0.7; times[5]=Math.round(times[5]*10)/10; break;
		case 4: times[7]+=-2.0; times[7]=Math.round(times[7]*10)/10; times[8]+=-3.0; times[8]=Math.round(times[8]*10)/10; break;
		case 5: globalcost=0.8;
	}
	for(var i=1;i<=9;i++) {
		flags[i]=true;
	}
}	
function boostoff(nbboost) {
	boostsonoff[nbboost]=false;
	switch(nbboost) {
		case 0: times[1]+=0.1; times[1]=Math.round(times[1]*10)/10; times[3]+=0.4; times[3]=Math.round(times[3]*10)/10; break;
		case 1: dynamomultiplier=1; break;
		case 2: times[2]+=0.3; times[2]=Math.round(times[2]*10)/10; times[6]+=1.0; times[6]=Math.round(times[6]*10)/10; break;
		case 3: times[4]+=0.6; times[4]=Math.round(times[4]*10)/10; times[5]+=0.7; times[5]=Math.round(times[5]*10)/10; break;
		case 4: times[7]+=2.0; times[7]=Math.round(times[7]*10)/10; times[8]+=3.0; times[8]=Math.round(times[8]*10)/10; break;
		case 5: globalcost=1.0;
	}
	for(var i=1;i<=9;i++) {
		flags[i]=true;
	}
}	
function soundonoff() {
	if(sound==true) {
		sound=false;
		document.getElementById("sound").innerHTML='<i class="icon-volume-off"></i>';
		document.getElementById("range").style.display="none";
		music.pause();
	} else {
		sound=true;
		document.getElementById("sound").innerHTML='<i class="icon-volume-up"></i>';
		document.getElementById("range").style.display="inline-block";
		music.play();
	}
	if(sound==true) click.play();
}
function showhelp() {
	document.getElementById("helpcontainer").innerHTML='<div id="imghelp"><button class="topbutton" id="closehelp" onClick="closehelp()">x</button></div>';
	closeinfo();
	if(sound==true) click.play();
}
function closehelp() {
	document.getElementById("helpcontainer").innerHTML="";
	if(sound==true) click.play();
}
function showinfo() {
	if(info==false) {
		info=true;
		var text="";
		text=text+'<div id="information">';
		text=text+'		<div id="title">Premie</div>';
		text=text+'		<div class="bonusinfo">';
		text=text+'			<div class="bonus" id="boost0c"></div>';
		text=text+'			<div class="bonustext" id="booststat0">asdasdad</div>';
		text=text+'		</div>';
		text=text+'		<div class="bonusinfo">';
		text=text+'			<div class="bonus" id="boost1c"></div>';
		text=text+'			<div class="bonustext" id="booststat1">asdasdad</div>';
		text=text+'		</div>';
		text=text+'		<div class="bonusinfo">';
		text=text+'			<div class="bonus" id="boost2c"></div>';
		text=text+'			<div class="bonustext" id="booststat2">asdasdad</div>';
		text=text+'		</div>';
		text=text+'		<div class="bonusinfo">';
		text=text+'			<div class="bonus" id="boost3c"></div>';
		text=text+'			<div class="bonustext" id="booststat3">asdasdad</div>';
		text=text+'		</div>';
		text=text+'		<div class="bonusinfo">';
		text=text+'			<div class="bonus" id="boost4c"></div>';
		text=text+'			<div class="bonustext" id="booststat4">asdasdad</div>';
		text=text+'		</div>';
		text=text+'		<div class="bonusinfo">';
		text=text+'			<div class="bonus" id="boost5c"></div>';
		text=text+'			<div class="bonustext" id="booststat5">asdasdad</div>';
		text=text+'		</div>';
		text=text+'		<button class="topbutton" id="closeinfo" onClick="closeinfo()">x</button>';
		text=text+'</div>';
		document.getElementById("informationcontainer").innerHTML=text;
		showbooststat();
	} else closeinfo();
	if(sound==true) click.play();
}
function closeinfo() {
	document.getElementById("informationcontainer").innerHTML="";
	info=false;
	if(sound==true) click.play();
}
function showbooststat() {
	var text="";
	text=text+'Pomyślne wiatry:</br>';
	text=text+'Wymagana produkcja roczna: '+boostcost[0]+'</br>';
	text=text+'Wymagana produkcja co roku: '+boostcost[0]*0.9+'</br>';
	text=text+'Kosz energii: '+boostsenergycost[0]+'</br>';
	text=text+'Młyn wodny: czas -0.1s </br>Wiatraki: czas -0.4s';
	document.getElementById("booststat0").innerHTML=text;
	text="";
	text=text+'Zatrudnij Pudziana:</br>';
	text=text+'Wymagana produkcja roczna: '+boostcost[1]+'</br>';
	text=text+'Wymagana produkcja co roku: '+boostcost[1]*0.9+'</br>';
	text=text+'Kosz energii: '+boostsenergycost[1]+'</br>';
	text=text+'Wydajność dynama x2';
	document.getElementById("booststat1").innerHTML=text;
	text="";
	text=text+'Bezchmurne niebo:</br>';
	text=text+'Wymagana produkcja roczna: '+boostcost[2]+'</br>';
	text=text+'Wymagana produkcja co roku: '+boostcost[2]*0.9+'</br>';
	text=text+'Kosz energii: '+boostsenergycost[2]+'</br>';
	text=text+'Młyn wodny: czas -0.3s </br>Wiatraki: czas -1.0s';
	document.getElementById("booststat2").innerHTML=text;
	text="";
	text=text+'Wzmożona praca w kopalniach:</br>';
	text=text+'Wymagana produkcja roczna: '+boostcost[3]+'</br>';
	text=text+'Wymagana produkcja co roku: '+boostcost[3]*0.9+'</br>';
	text=text+'Kosz energii: '+boostsenergycost[3]+'</br>';
	text=text+'Reaktory węglowe: czas -0.6s </br>Reaktory atomowe: czas -0.7s';
	document.getElementById("booststat3").innerHTML=text;
	text="";
	text=text+'Dodatkowe zespoły naukowców:</br>';
	text=text+'Wymagana produkcja roczna: '+boostcost[4]+'</br>';
	text=text+'Wymagana produkcja co roku: '+boostcost[4]*0.9+'</br>';
	text=text+'Kosz energii: '+boostsenergycost[4]+'</br>';
	text=text+'Węzeł słoneczny: czas -2.0s </br>Reaktory antymaterii: czas -3.0s';
	document.getElementById("booststat4").innerHTML=text;
	text="";
	text=text+'Inwestorzy:</br>';
	text=text+'Wymagana produkcja roczna: '+boostcost[5]+'</br>';
	text=text+'Wymagana produkcja co roku: '+boostcost[5]*0.9+'</br>';
	text=text+'Kosz energii: '+boostsenergycost[5]+'</br>';
	text=text+'Ceny wszystkich ulepszeń -20%';
	document.getElementById("booststat5").innerHTML=text;
}
function showscore() {
	document.getElementById("container").style.filter="blur(10px)";
	document.getElementById("newgamecontainer").innerHTML='<div id="ngbg"><div id="ng"></br>Twój wynik: '+score+'</br>Czy chcesz zresetować grę?</br></br><button class="endbutton" id="yes" onClick="yes()">Tak</button></br><button class="endbutton" id="no" onClick="no()">Nie</button></div></div>';
	closeinfo();
	if(sound==true) click.play();
}
function yes() {
	no();
	
	score=0;
	energy = 0;
	lvl = 1;
	curExp = 0;
	expAmount = 100;
	flag1=true;
	globalcost=1.0;
	dynamomultiplier=1;
	flags[0]=true;
	flags[1]=true;
	flags[2]=true;
	flags[3]=true;
	flags[4]=true;
	flags[5]=true;
	flags[6]=true;
	flags[7]=true;
	flags[8]=true;
	flags[9]=true;
	names[0]="Dynamo";					bonuses[0]=1;				costs[0]=10;			times[0]=0;
	names[1]="Młyny wodne";				bonuses[1]=2;				costs[1]=70;			times[1]=0.4;
	names[2]="Panele słoneczne";		bonuses[2]=5;				costs[2]=200;			times[2]=0.8;
	names[3]="Wiatraki";				bonuses[3]=15;				costs[3]=800;			times[3]=1.5;
	names[4]="Reaktory węglowe";		bonuses[4]=120;				costs[4]=3000;			times[4]=2.2;
	names[5]="Reaktory atomowe";		bonuses[5]=800;				costs[5]=20000;			times[5]=3.1;
	names[6]="Orbitalne panele";		bonuses[6]=50000;			costs[6]=400000;		times[6]=4.5;
	names[7]="Węzeł słoneczny";			bonuses[7]=3000000;			costs[7]=6000000;		times[7]=7;
	names[8]="Reaktory antymaterii";	bonuses[8]=10000000;		costs[8]=20000000;		times[8]=10;
	levels[0]=1;
	levels[1]=0;
	levels[2]=0;
	levels[3]=0;
	levels[4]=0;
	levels[5]=0;
	levels[6]=0;
	levels[7]=0;
	levels[8]=0;
	timers[0]=0;
	timers[1]=0;
	timers[2]=0;
	timers[3]=0;
	timers[4]=0;
	timers[5]=0;
	timers[6]=0;
	timers[7]=0;
	lasteng=0;
	enground=0;
	engtimer=0;
	yearinfo[0]=0;	yearinfo[6]=0;
	yearinfo[1]=0;	yearinfo[7]=0;
	yearinfo[2]=0;	yearinfo[8]=0;
	yearinfo[3]=0;	yearinfo[9]=0;
	yearinfo[4]=0;	yearinfo[10]=0;
	yearinfo[5]=0;	yearinfo[11]=0;
	month=2;
	yearround=0;
	boostcost[0]=2000;			boosts[0]=false;			boostsonoff[0]=false;			boostsenergycost[0]=1000;
	boostcost[1]=14000;			boosts[1]=false;			boostsonoff[1]=false;			boostsenergycost[1]=10000;
	boostcost[2]=160000;		boosts[2]=false;			boostsonoff[2]=false;			boostsenergycost[2]=100000;
	boostcost[3]=1000000;		boosts[3]=false;			boostsonoff[3]=false;			boostsenergycost[3]=700000;
	boostcost[4]=20000000;		boosts[4]=false;			boostsonoff[4]=false;			boostsenergycost[4]=12000000;
	boostcost[5]=100000000;		boosts[5]=false;			boostsonoff[5]=false;			boostsenergycost[5]=80000000;
	setboosts();
	document.getElementById("progressBg2").innerHTML='<div class="calendar"></div>';
	document.getElementById("JSwater").innerHTML="";
	document.getElementById("JSsunpanels").innerHTML="";
	document.getElementById("JSwindmills").innerHTML="";
	document.getElementById("JScarbonreactors").innerHTML="";
	document.getElementById("JSnuclearreactors").innerHTML="";
	document.getElementById("JSorbitalpanels").innerHTML="";
	document.getElementById("JSsunnode").innerHTML="";
	document.getElementById("JSantimatterreactors").innerHTML="";
	document.getElementById("lvl").innerHTML=lvl;
}
function no() {
	document.getElementById("container").style.filter="blur(0)";
	document.getElementById("newgamecontainer").innerHTML='';
	if(sound==true) click.play();
}
function openmobile() {
	if(sound==true) click.play();
	if(mobile==true) {
		document.getElementById("screenbutton").style.display="none";
		mobile=false;
	} else {
		document.getElementById("screenbutton").style.display="block";
		mobile=true;
	}
}
function changemusic(value) {
	music.volume=value;
}