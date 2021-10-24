// 2 задача

const EventEmitter = require('events');
var moment = require('moment');

const emitter = new EventEmitter();

let newData = process.argv.slice(2)[0].split('-').reverse().join('-');
let stringData = newData.substring(0, 10) + 'T' + newData.substring(11);
let formattedDateMiliSeconds = moment(stringData).valueOf()-moment().valueOf();

const run = async () => {
    if (formattedDateMiliSeconds <= 0) {
        emitter.emit('close');
    } else {
        emitter.emit('update', formattedDateMiliSeconds);
        formattedDateMiliSeconds-=1000;
        await new Promise(resolve => setTimeout(resolve, 1000));
        await run();
    }
}

class Handlers {
    static update(payload) {
        console.log(payload);
        let diff = moment.duration(payload, 'milliseconds');
        let y = Math.floor(diff.years());
        let mn = Math.floor(diff.months());
        let d = Math.floor(diff.days());
        let h = Math.floor(diff.hours());
        let m = Math.floor(diff.minutes());
        let s = Math.floor(diff.seconds());

        if (payload <= 3600000) {
            console.log("Таймер: "+m+" минут "+s+" секунд");
        } else if ((payload > 3600000) || (payload <= 86400000)){
            console.log("Таймер: "+d+" дней "+h+" часов "+m+" минут "+s+" секунд");
        } else {
            console.log("Таймер: "+y+" лет "+mn+" месяцев "+d+" дней "+h+" часов "+m+" минут "+s+" секунд");
        }
    }
    static close() {
        console.log('Таймер завершен');
    }
}
  
emitter.on('update', Handlers.update);
emitter.on('close', Handlers.close);
  
run();
