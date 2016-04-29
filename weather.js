var day = $$('.day');
var temp = $$('.temperature');
var week = $$('.week');
var forepic = $$('.forepic');
var totalData = $$('.totalData');
var bottomWeek = $$('.bottom-week');
var ibottom = $$('.ibottom');
var totalTemp = $$('.total-temp');
var change = $$('.change');
var again = $$('.again')
function $$ (selector) {
    return document.querySelectorAll(selector);
}
function SetTime (dt) {
    var weekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday']
    var weekArr2 = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
    var monthArr = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var time = new Date(dt * 1000);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var monthE = monthArr[time.getMonth()];
    var date = time.getDate();
    var weeks = weekArr2[time.getDay()];
    var week = weekArr[time.getDay()];
    this.year = year;
    this.monthE = monthE;
    this.month = month;
    this.date = date;
    this.week = week;
    this.weeks = weeks;
}
var request = new XMLHttpRequest();
request.open("GET",'http://openweathermap.org/data/2.5/forecast/daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a',true);
request.send();
function getTime () {
	request.onreadystatechange = function() {
		if(request.readyState === 4 && request.status === 200) {
			var data = JSON.parse(request.responseText);
			(function  () {          
                var time = new SetTime(data.list[0].dt);    
                day[0].innerHTML = time.month + '/' + time.date;
                temp[0].innerHTML = data.list[0].temp.day + '°C';
                totalTemp[0].innerHTML = data.list[0].temp.max +'~' + data.list[0].temp.min +'°C';
                week[0].innerHTML = time.week;
                totalData[0].innerHTML = time.year + '/' + time.month + '/' + time.date;
                bottomWeek[0].innerHTML = time.weeks;
                for (var i = 0; i < day.length; i++) {
                    var time = new SetTime(data.list[i].dt);
                    day[i].innerHTML = time.month + '/' + time.date;
                    bottomWeek[i].innerHTML = time.weeks;
                    totalTemp[i].innerHTML = data.list[i].temp.max +'~' + data.list[i].temp.min +'°C';
                    temp[i].innerHTML = data.list[i].temp.day + '°C';
                }
			})();
            (function () {
                var weather = data.list[0].weather[0].main;
                for (var i = 0; i < ibottom.length; i++) {
                    weather[i] = data.list[i].weather.main;
                    // alert(weather[i])
                    for (var i = 0; i < ibottom.length; i++) {
                        if (weather = "Sun") {
                        ibottom[i].innerHTML = "&#xe887;";
                    }else if (weather = "Clouds") {
                        ibottom[i].innerHTML = "&#xe6f0;";
                    }else {
                        ibottom[i].innerHTML = "&#xe630;";
                    } 
                }
                
                }
            })();
            //点击切换
            function removeClass(element, classN) {
                var className = element.className;
                element.className = className.replace(classN, '');
            }
            for (var i = 0; i < day.length; i++) {
                var on = function () {
                    var newTemp = data.list[i].temp.day + '°C';
                    var newDay = totalTemp[i].innerHTML;
                    removeClass(temp, again);
                    again.innerHTML = newTemp;
                    alert(newTemp);
                    //alert(newDay);
                }
                change[i].addEventListener('click',on)
            } 
            //轮播
            var i = 0;
            var changeTemp = function () {
                if (i >= 6) {
                    i = 0;
                }
                temp.className = '';
                temp[i].style.display = "none";
                temp[i].style.left = - (160 * i) + "px";
                i++;
            }
            var a = setInterval(changeTemp,1000);
            setTimeout(a,1000);
		}
	}
}
getTime();
