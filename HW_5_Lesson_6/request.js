// задаем дефолтные настройки
let reqNum = 5;
let async = true;
let host = '127.0.0.1';
let port = 3000;

// создаем функцию отправки запросов
const sendRequest = (
        rn          // номер текущего запроса
        , totalReq  // кол-во запросов которое надо отправить
        , host      // адрес хоста
        , port      // порт
    ) => {


    const http = require('http');
    const options = {
        host: host
        ,port: port
        ,method: 'POST'
    };


    data = {"req_num": rn}; // просто для примера, в теле запроса будем отправлять номер запроса
    encodedData = JSON.stringify(data);

    const req = http.request(options, (resp) => {

        // получаем данные 
        resp_str = '';
        resp.on('data', (chunk) => {
            resp_str += chunk;
        }); 

        // по завершению запроса преобразуем строковый ответ в объект
        resp.on('end', () => {
            resp_obj = JSON.parse(resp_str);
            console.log(`Запрос ${resp_obj.req_num} был обработан за ${resp_obj.resp_time} мс\nТело ответа = ${resp_str}\n\n`);
            
            // если были отправлены не все запросы
            // и функция запующена в синхронном режиме
            // отпарвим ещё запрос только по завершению предыдущего
            if(rn < totalReq && async === false){
                sendRequest(rn+1, totalReq, host, port );
            }
            
        });

        

    }); // end of const req = http.request
    
    console.log(`Отпрвка запроса ${data.req_num} на ${host}:${port}\n`);
    req.write(encodedData);
    req.end();
    
    // если были отправлены не все запросы
    // и функция запующена в Асинхронном режиме
    // отпарвим ещё запрос, но не дожидаясь обработки ответа предыдущим
    if(rn < totalReq && async === true){
        sendRequest(rn+1, totalReq, host, port);
    }
};


// получим данные переданные из командной строки через process.argv
console.log('\nБыли переданы следующие аргументы:\n');
let args = process.argv.slice(2);
args.forEach((val, index) => {
    //console.log(`${index}: ${val}`);
    param = val.split('=');
    console.log(param);
 
    switch(param[0]){
        case 'reqNum': reqNum = param[1]; break;
        case 'async': (param[1] === 'false' || param[1] === '0') ? async = false: async = true; break;
        case 'host': host = param[1]; break;
        case 'port': port = param[1]; break;
    }
});

console.log('\nПриступаем к обработке запросов с итоговыми настройками:\n');
console.log(`reqNum = ${reqNum}`);
console.log(`async = ${async}`);
console.log(`host = ${host}`);
console.log(`port = ${port}`);
console.log('\n\n* * * * * * *\n');

// Если кол-во запросов больше ноля, отправляем данные
if(reqNum > 0){
    sendRequest(1, reqNum, host, port);
}