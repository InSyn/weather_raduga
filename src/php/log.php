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

$dataTable = $dom->find('tr td');

$data_row = [];

foreach ($dataTable as $key=>$value){

    $data_row[] = [$key, $value->plaintext];

}

$success = file_put_contents('log.txt', $dataArray, FILE_APPEND);
file_put_contents('log.txt', '/r/n--------------------------------------/r/n', FILE_APPEND);

$data_row[] = $success;

echo json_encode($data_row, JSON_UNESCAPED_UNICODE);