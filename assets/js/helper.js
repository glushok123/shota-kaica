const hostServer = 'http://194-67-74-141.cloudvps.regruhosting.ru';
const urlSearchCaseBD = '';
const urlSaveCaseBD = '';
const urlStatusServer = '/api/test/get';

export function notify(message, type, color = "#ff5f6d"){
    Toastify({
        text: message,
        close: true,
        className: type,
        style: {
            background: color,
        }
    }).showToast();
}

export function getListGroupDocument(group = ''){
    var responseServ = '';

    showAnimationLoading();
    $.ajax({
        url: "/app/module/getListGroupsDocuments.php",
        method: "GET",
        data: { group: group },
        async: false,
        dataType: "json",
        success: function(response) {
            responseServ = response;
        },
    });


    return responseServ;
}

export function getInfoDocument(group, fond, numberfond, numberList, numberCase){
    var responseServ = '';

    $.ajax({
        url: "/app/module/getInfoDocument.php",
        method: "GET",
        data: {
            group: group,
            fond: fond,
            numberFond: numberfond,
            numberList: numberList,
            numberCase: numberCase ,
        },
        async: false,
        dataType: "json",
        success: function(response) {
            responseServ = response;
        },
    });

    return responseServ;
}

export function showAnimationLoading(){
    $('.block-spinner').addClass('z-index-100')
    $('.block-spinner').show();
}

export function hideAnimationLoading(){
    $('.block-spinner').hide();
    $('.block-spinner').removeClass('z-index-100')
}

export function searchCaseBDRequest(){ //Проверка в БД дела и вывод информации (запрос на сервер)

}

export function saveCaseBDRequest(){ //Сохранение в БД дела (запрос на сервер)

}

export function getStatusServerRequest(){ //Проверка подключения к серверу (запрос на сервер)
    showAnimationLoading();

    $.ajax({
        headers: { "Accept": "application/json"},
        url: hostServer + urlStatusServer,
        method: "GET",
        crossDomain: true,
        async: false,
        dataType: "json",
        success: function(response) {
            console.log(response);
        },
    });


    hideAnimationLoading();
}