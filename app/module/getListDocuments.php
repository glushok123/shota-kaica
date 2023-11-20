<?php
ini_set('max_execution_time', 600); //600 seconds
ini_set('memory_limit','4096M');

include_once $_SERVER['DOCUMENT_ROOT'] . '/app/config.php';

global  $PATH_DIR_SCAN;

$path = empty($_GET['group']) ? $PATH_DIR_SCAN : $PATH_DIR_SCAN . '/' . $_GET['group'];

$info = [];
$arrayList = getCollectionListCase($path);
$countCase = 0;
$countFond = 0;

if (empty($arrayList)){
    echo json_encode(['status' => 'error', 'message' => "Папка с названием <<{$_GET["group"]}>> пустая"]);
    return;
}

foreach ($arrayList as $fondName => $fond){
    $info[$countFond]['nameFonda'] = $fondName;

    foreach ($fond as $numberFonda => $list){
        $info[$countFond]['numberFonda'] = $numberFonda;

        foreach ($list as $numberList => $caseList){
            $info[$countFond]['numberList'] = $numberList;

            foreach ($caseList as $caseNumber => $case){
                $countCase += 1;
                $caseInfo = [
                    'number' => $caseNumber,
                    'countScan' => count($case),
                    'url' => $fondName . '/' . $numberFonda . '/' . $numberList . '/' . $caseNumber,
                ];

                foreach ($case as $nameFile) {
                    $caseInfo['files'][] = $nameFile;
                }

                $info[$countFond]['caseList'][] = $caseInfo;
            }
        }
    }

    $info[$countFond]['countCase'] = $countCase;
}


echo json_encode(['status' => 'success' , 'data' => $info]);
