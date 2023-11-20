<?php
ini_set('max_execution_time', 600); //600 seconds
ini_set('memory_limit','4096M');

include_once $_SERVER['DOCUMENT_ROOT'] . '/app/config.php';

global  $PATH_DIR_SCAN;

$listGroup = [];

//$arrayList = getCollectionListGroup($PATH_DIR_SCAN);
$arrayList = getCollectionListGroupInfo($PATH_DIR_SCAN);
$countCase = 0;
$countGroup = 0;

echo json_encode($arrayList);
