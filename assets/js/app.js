import {
    hideAnimationLoading,
    notify,
    showAnimationLoading,
    getInfoDocument,
    getListGroupDocument,
    searchCaseBDRequest,
    saveCaseBDRequest,
    getStatusServerRequest
} from "./helper.js";

const listGroup = [];

var collectFileImage = [];
var activeCase = {};
var activeIndex = 0;
var maxActiveIndex = 0;

$(document).ready(function () {
    notify("Страница загрузилась, ожидайте загрузки дел", 'success', 'green');
    getStatusServerRequest();
    initPage();

    function initPage(){
        loadGroupDocument(getListGroupDocument());

        hideAnimationLoading();

        console.log('##### СПИСОК ГРУПП ########')
        console.log(listGroup)
    }

    function loadGroupDocument(response){
        $.each(response, function(nameGroup, listFond) {
            let groupInfo = {
                name: nameGroup,
                fonds: []
            };

            $.each(listFond, function(nameFond, listNumberFonda) {
                let infoFond = {
                    nameGroup: nameGroup,
                    nameFonda: nameFond,
                    numberFonda: 0,
                    literFonda: '',
                    numberList: 0,
                    literList: '',
                    countCase: 0,
                    case: []
                };

                $.each(listNumberFonda, function(numberFonda, listNumberList) {
                    infoFond.numberFonda = numberFonda;

                    $.each(listNumberList, function(numberList, listCase) {
                        infoFond.numberList = numberList;

                        $.each(listCase, function(nameCase, listFile) {
                            infoFond.case.push(nameCase);
                        });
                    });
                });

                groupInfo.fonds.push(infoFond);
            });

            listGroup.push(groupInfo);
            $('#block-load-list-group').append('<button type="button" class="btn btn-outline-danger button-load-group m-1" data-url-group="' + nameGroup + '">' + nameGroup + '</button>');
        });
    }

    function loadCase(group, fond, numberFond,numberList, numberCase){
        let response = getInfoDocument(group, fond, numberFond, numberList, numberCase);
        activeCase = {
            files: []
        }
        collectFileImage = [];
        $.each(response, function(key, value){
            collectFileImage.push(
                '/Список_дел/' +
                String(group) + '/' +
                String(fond) + '/' +
                String(numberFond) + '/' +
                String(numberList) + '/' +
                String(numberCase) + '/'+
                String(key));
        });

        activeCase.group = group;
        activeCase.fond = fond;
        activeCase.numberFond = numberFond;
        activeCase.numberList = numberList;
        activeCase.numberCase = numberCase;
        activeCase.files.push(collectFileImage);
        activeIndex = 0;
        maxActiveIndex = collectFileImage.length - 1;
        searchCaseBDRequest();
        initSlider();
    }

    function initSlider(){
        showAnimationLoading();
        $('#img-show').prop('src' , collectFileImage[activeIndex]);
        $('.name-file-active').text(collectFileImage[activeIndex]);
        $('.name-file-col').text(String(Number(activeIndex) + 1) + '/' + String(Number(maxActiveIndex) + 1));
        setTimeout(imgZoom, 500);
    };

    function imgZoom(){
        $('.show-img').trigger('zoom.destroy');
        $('.show-img').zoom({ magnify: 0.5 });
        hideAnimationLoading();
    }

    $(document).on('click', '.button-load-group', function (){
        showAnimationLoading();

        $('.active-button-group').removeClass('active-button-group');
        $(this).addClass('active-button-group');
        $('#block-load-list-fond').html('');

        for (let group of listGroup){
           if (String(group.name) === String($(this).data('url-group'))){
               for (let fond of group.fonds){
                   $('#block-load-list-fond').append('<button type="button" class="btn btn-outline-secondary button-load-fond m-1" ' +
                       'data-name-fond="' + fond.nameFonda + '"  ' +
                       'data-name-group="' + group.name + '"' +
                       '>' + fond.nameFonda + '</button>');
               }
           }
        }

        hideAnimationLoading();
    });

    $(document).on('click', '.button-load-doc', function (){
        showAnimationLoading();

        $('.active-button-fond').removeClass('active-button-case');
        $(this).addClass('active-button-case');

        loadCase(
            $(this).data('name-group'),
            $(this).data('name-fond'),
            $(this).data('number-fond'),
            $(this).data('number-list'),
            $(this).data('name-case'),
        );

        hideAnimationLoading();
    });

    $(document).on('click', '.button-load-fond', function (){
        showAnimationLoading();

        $('.active-button-fond').removeClass('active-button-fond');
        $(this).addClass('active-button-fond');
        $('#block-load-list-case').html('');

        for (let group of listGroup){
            if (String(group.name) === String($(this).data('name-group'))){
                for (let fond of group.fonds){
                    if (String(fond.nameFonda) === String($(this).data('name-fond'))){
                        for(let caseName of fond.case){
                            $('#block-load-list-case').append('<button type="button" class="btn btn-outline-primary button-load-doc m-1" ' +
                                'data-name-group="' + group.name + '"' +
                                'data-name-fond="' + fond.nameFonda + '"  ' +
                                'data-number-fond="' + fond.numberFonda + '"  ' +
                                'data-number-list="' + fond.numberList + '"' +
                                'data-name-case="' + caseName + '"' +
                                '>' + caseName + '</button>');
                        }
                    }
                }
            }
        }

        hideAnimationLoading();
    });

    $(document).on('click', '.button-img-right', function (){
        if (Number(activeIndex) === Number(maxActiveIndex)) {
            activeIndex = 0;
        }else{
            activeIndex = activeIndex + 1;
        }

        initSlider();
    });

    $(document).on('click', '.button-img-left', function (){
        if (Number(activeIndex) === 0) {
            activeIndex = maxActiveIndex;
        }else{
            activeIndex = activeIndex - 1;
        }

        initSlider();
    });

    $(document).on('click', '#save-form', function (){
        saveCaseBDRequest();
    });
});