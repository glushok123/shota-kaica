<?php
ini_set('max_execution_time', 600); //600 seconds
ini_set('memory_limit','4096M');

include_once $_SERVER['DOCUMENT_ROOT'] . '/app/config.php';

global  $PATH_DIR_SCAN;

global  $PATH_DIR_SCAN;

$path = $PATH_DIR_SCAN
    . '/' . $_GET['group']
    . '/' . $_GET['fond']
    . '/' . $_GET['numberFond']
    . '/' . $_GET['numberList']
    . '/' . $_GET['numberCase'];

$listGroup = [];

$arrayList = getInfoDocument($path);
$countCase = 0;
$countGroup = 0;

echo json_encode($arrayList);
