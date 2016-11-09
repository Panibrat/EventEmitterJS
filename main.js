var eventsList;
var lostEventsList = [];
var subscribers = [];

if(loadLocalStorageEventList()){
    eventsList = loadLocalStorageEventList();
}else{
    eventsList = [];
    addEvent('Сделать домашку', '14-09-17 09:00');
    addEvent('Отдохнуть', '14-05-16 16:00');
    addEvent('Купить цветы', '17-09-17 16:00');
    addEvent('День РТФ', '07-05-17 11:00');

}


if(loadLocalStorageLostEventsList()){
    lostEventsList = loadLocalStorageLostEventsList();
}else{
    lostEventsList = [];
    addEvent('Прочитать книгу', '31-12-15 19:00');
}

/*if(loadLocalSubscribers()){
    subscribers = loadLocalSubscribers();
}else{
    subscribers = [];
}*/


function addEvent(name, dateTime) {
    console.log(name);
    var longDate = dateTime.split(' ');
    var time = longDate[1];
    var dates =  longDate[0];
    var date = dates.split('-');
    var rightDate = '20' + date[2] + '-' + date[1] + '-' + date[1];
console.log(rightDate);
    var ev = new Event(name, rightDate, time);
    eventsList.push(ev);
    updateLocalStorage();
}


function removeEvent(event) { //removeEvent('Сделать домашку')
    var updatedEventList = eventsList.filter(function(ev) {
        var searchValue = ev.name;
        return searchValue.indexOf(event) === -1;
    });
    eventsList = updatedEventList;
    updateLocalStorage();
}

function Event(name, date){
    this.name = name;
    this.date = date;
    this.time = '09:00';
    this.annual = false;
    this.subsribed = true;
    }


console.log(eventsList);

function Subscriber(name){
    this.name = name;
    this.events = {};
    this.onSubscribe = function(eventsName, func){
        if(!this.events[eventsName]){
            this.events[eventsName] = [func]
        }else{
            this.events[eventsName].push(func);
        }
    }
    subscribers.push(this);
}

var Vasya = new Subscriber('Vasya');
//var Petya = new Subscriber('Petya');
Vasya.onSubscribe('Сделать домашку', function(){console.log('Не успеваю...Сделать домашку')});
Vasya.onSubscribe('Сделать домашку', function(){console.log('Успеваю...Сделать домашку')});
Vasya.onSubscribe('Сделать домашку', function(){console.log('Сделал домашку')});
Vasya.onSubscribe('Отдохнуть', function(){console.log('Не успеваю...Отдохнуть')});
Vasya.onSubscribe('Купить цветы', function(){console.log('Не успеваю...Купить цветы')});
Vasya.onSubscribe('День РТФ', function(){console.log('Купить скафандр...День РТФ')});



var timerId = setInterval(function () {
    var now =  new Date();
    if(eventsList){
        eventsList.forEach(function (ev, i) {
            if(ev.subsribed){
                var evTime = Date.parse(ev.date + 'T' + ev.time);
                if((+evTime)-(+now) < 3500){
                    //FIRE EVENT
                    var firedEv = ev.name;
                    subscribers.forEach(function(subscriber){
                        if(subscriber.events[firedEv]){
                            subscriber.events[firedEv].forEach(function(todo){
                                todo();
                            })
                        }
                    });

                    console.log("ALARM==> ", i, ev.name);
                    lostEventsList.push(ev);
                    alert(ev.name);
                    ev.subsribed = false;
                    eventsList.splice(i, 1);
                    updateLocalStorage();
                }
            }
        })
    }
}, 3000);

function updateLocalStorage() {
    localStorage.clear();
    var upEventsList = JSON.stringify(eventsList);
    localStorage.setItem('eventsList', upEventsList);
    var uplostEventsList = JSON.stringify(lostEventsList);
    localStorage.setItem('lostEventsList', uplostEventsList);


}

function loadLocalStorageEventList() {
    var eventsList = JSON.parse(localStorage.getItem('eventsList'));
    return eventsList;
}
function loadLocalStorageLostEventsList() {
    var lostEventsList = JSON.parse(localStorage.getItem('lostEventsList'));
    return lostEventsList;
}



/*
function loadLocalSubscribers() {
    var subscribers = JSON.parse(localStorage.getItem('subscribers'));
    return subscribers;
}


function updateSubscribers(name) {
    //subscribers.push(name);
    var subscribers = JSON.stringify(name);
    localStorage.setItem('subscribers', subscribers);
}
*/
