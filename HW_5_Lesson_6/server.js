// подключаем необходимый для работы HTTP сервера модуль и готовим хост и порт для прослушивания
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

// подрубаем необходимый модуль и создаем promise-ready функцию setTimeout
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

// задерска запроса в мс
const delay = 100; 

// создаем экземпляр HTTP сервера
const server = http.createServer((req, res) => {

    // готовим HTTP-код ответа
    res.statusCode = 200;

    // и указываем тип возвращаемого контента
    res.setHeader('Content-Type', 'text/plain');

    // засечем время
    let req_start = Date.now();

    // выставляем задержку в delay мс
    setTimeoutPromise(delay)
        .then( () => {
            // завершим фрмирование ответа и вернем кол-во мс 
            res.end((Date.now() - req_start).toString());
        } );

    
});

// стартуем сервер для прослушки
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});