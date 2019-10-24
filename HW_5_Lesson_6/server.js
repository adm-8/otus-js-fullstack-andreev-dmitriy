// задержка запроса в мс
const delay = 100; 

// подключаем необходимый для работы HTTP сервера модуль и готовим хост и порт для прослушивания
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

// подрубаем необходимый модуль и создаем promise-ready функцию setTimeout
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);


// создаем экземпляр HTTP сервера
const server = http.createServer((req, res) => {


    // готовим HTTP-код ответа
    res.statusCode = 200;

    // и указываем тип возвращаемого контента
    res.setHeader('Content-Type', 'text/plain');
    
    let body_str = '';
    let body_obj = null;
    let resp_obj = {};

    let req_num = null;


    try{
        
        // получим тело запроса 
        req.on('data', chunk => {
            body_str += chunk.toString();
        });

        req.on('end', () => {

            // засечем время
            let req_start = Date.now();

            // выставляем задержку в delay мс
            setTimeoutPromise(delay)
            .then( () => {

                if(body_str && typeof(body_str)==='string'){
                
                    body_obj = JSON.parse(body_str);
                    req_num = body_obj.req_num;

                }

                // завершим фрмирование ответа и вернем кол-во мс 
                resp_obj.req_num = req_num;
                resp_obj.resp_time = (Date.now() - req_start).toString();
                res.end(JSON.stringify(resp_obj));
                
                console.log(`Запрос выполнен за ${Date.now() - req_start} мс`);
                
            
            } )
            .catch( (e) => { console.log(e.toString()) });
        });               

    }catch(e){
        console.log(e.toString());
        res.end();
    }
       

    
});

// стартуем сервер для прослушки
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});