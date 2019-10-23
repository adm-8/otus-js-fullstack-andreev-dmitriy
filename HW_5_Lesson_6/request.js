let reqNum = 5;
let host = '127.0.0.1';
let port = 3000;


const http = require('http');
const options = {
    host: host
    ,port: port
    ,method: 'POST'
};

const sendRequest = (data) => {

    encodedData = JSON.stringify(data);

    const req = http.request(options, (resp) => {
        resp_str = '';
        resp_start_time = Date.now();
        resp_time = 0;


        // получаем данные 
        resp.on('data', (chunk) => {
            resp_str += chunk;
        }); 

        // по завершению запроса преобразуем строковый ответ в объект
        resp.on('end', () => {
            resp_obj = JSON.parse(resp_str);
            resp_time = Date.now() - resp_start_time;
            console.log(`Запрос ${resp_obj.req_num} был обработан за ${resp_time} мс\n`);
        });

    }); // end of const req = http.request
    
    console.log(`Отпрвка запроса ${data.req_num}\n`);
    req.write(encodedData);
    req.end();
};

for(let i = 0; i < reqNum; i++ ){
    sendRequest({"req_num": i+1});
}