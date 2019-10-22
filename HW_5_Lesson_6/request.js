var myXMLHttpRequest = (
    method // GET || POST || etc.
    , URL // URL запроса
    , reqCnt = 1 // кол-во запросов 
    , async = true // синхронный или исинхронный режим работы

    // далее могли бы идти user и password для прокидывания в XHR, но задача не о том =)

) => {

    let fetchResp = (resp) => {
        console.log(resp);
    }

    console.log(`Стартуем запуск ${reqCnt} запрос(ов) методом ${method} по адресу ${URL} в ${async ? 'асинхронном' : 'синхронном'} режиме...`);

  

   
    // reqCnt раз
    for(let i=0; i < reqCnt; i++){

        try{
              // создаем экземпляр XMLHttpRequest
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    fetchResp(`Запрос был обработан за ${xhr.response} мс`);
                    }
            }

            // передаем параметры запроса
            xhr.open(method, URL, async);
                
            // и отправляем запрос
            xhr.send();
            console.log(`Запрос ${i+1} был отправлен...`) ;

        }catch(e){
            console.log(`Ошибка при отправке запроса №${i+1} : ${e.toString()}`)
        }
    }

};


// засекаем время и посылаем запросы сначала асинхронно
var req_start = Date.now();
myXMLHttpRequest('POST', 'http://127.0.0.1:3000/get_some_page', 10);
console.log(`Асинхронные запросы были отправлены за ${Date.now() - req_start} мс`);


// затем синхронно
req_start = Date.now();
myXMLHttpRequest('POST', 'http://127.0.0.1:3000/get_some_page', 10, false);
console.log(`А вот синхронные запросы были отправлены уже за ${Date.now() - req_start} мс`);

