var myXMLHttpRequest = (
    method // GET || POST || etc.
    , URL // URL запроса
    , reqCnt = 1 // кол-во запросов 
    , async = true // синхронный или исинхронный режим работы

    // далее могли бы идти user и password для прокидывания в XHR, но задача не о том =)

) => {

    console.log(`Стартуем запуск ${reqCnt} запрос(ов) методом ${method} по адресу ${URL} в ${async ? 'асинхронном' : 'синхронном'} режиме...`);

    // создаем экземпляр XMLHttpRequest
    let xhr = new XMLHttpRequest();
   
    // reqCnt раз
    for(let i=0; i < reqCnt; i++){
        // настраиваем его
        xhr.open(method, URL, async);

        // и отправляем запрос
        xhr.send();
        console.log(`Request ${i+1} sent...`);
    }
    
 
};


// посылаем 100 запросов сначала асинхронно
myXMLHttpRequest('POST', 'http://127.0.0.1:3000/get_some_page', 100);


// затем посылаем 100 запросов синхронно
myXMLHttpRequest('POST', 'http://127.0.0.1:3000/get_some_page', 100, false);

