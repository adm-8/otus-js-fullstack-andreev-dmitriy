let reqNum = 5;
let host = '127.0.0.1';
let port = 3000;


const http = require('http');
const options = {
    host: host
    ,port: port
    ,method: 'POST'
};

const sendRequest = (rn, totalReq) => {

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
            
            // если были отправлены не все запросы, отпарвим ещё разок
            if(rn < totalReq){
                sendRequest(rn+1, totalReq);
            }

        });

    }); // end of const req = http.request
    
    console.log(`Отпрвка запроса ${data.req_num}\n`);
    req.write(encodedData);
    req.end();
    
};

sendRequest(1, reqNum);