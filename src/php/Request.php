<?php

include_once ('curl.php');
include_once ('simple_html_dom.php');

header('Access-Control-Allow-Origin: *');

$c = curl::app('http://62.213.36.254')
    ->set(CURLOPT_HEADER, 1);

$data = $c->request(
    'all_main.php?lg_ex=meteo&pw_ex=krsk2019&butn=Вход'
);

$dom = str_get_html($data['html']);

$dataArray = [];

$dataTable = $dom->find('tr td');
$tableLength = count($dataTable);

foreach ($dataTable as $key => $cell) {

    $dataArray[] = $cell->plaintext;

}

//var_dump($dataArray);

$stadiumStationData  = [];
$topStationData  = [];
$bottomStationData  = [];
$rowLength = '';

if($dataTable[21]->plaintext === "s29670"){

    foreach ($dataTable as $key=>$value){
        $stadStRow = 20 * 7 - 12;
        $topStRow = $stadStRow + 21;
        $botStRw = $topStRow + 21;
        $dEnd = $botStRw + 21;
        $rowLength = 21;

        if (($key >= $stadStRow) && ($key < $topStRow)) {
            $stadiumStationData[] = $value->plaintext;
        } elseif (($key >= $topStRow) && ($key < $botStRw)) {
            $topStationData[] = $value->plaintext;
        } elseif (($key >= $botStRw)&&($key < $dEnd)){
            $bottomStationData[] = $value->plaintext;
        }
    }

}
else {

    foreach ($dataTable as $key => $value) {
        $stadStRow = 20 * 7 - 6;
        $topStRow = $stadStRow + 22;
        $botStRw = $topStRow + 22;
        $dEnd = $botStRw + 22;
        $rowLength = 22;

        if (($key >= $stadStRow) && ($key < $topStRow)) {
            $stadiumStationData[] = $value->plaintext;
        } elseif (($key >= $topStRow) && ($key < $botStRw)) {
            $topStationData[] = $value->plaintext;
        } elseif (($key >= $botStRw) && ($key < $dEnd)) {
            $bottomStationData[] = $value->plaintext;
        }
    }

}

$dataArray = [
    $stadiumStationData,
    $topStationData,
    $bottomStationData,
    $rowLength
];

echo json_encode($dataArray, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE, 512);