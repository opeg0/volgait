<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

$dbHost = "localhost";
$dbName = "volga-db";
$dbChar = "utf8";
$dbUser = "root";
$dbPass = "";

try {
    $pdo = new PDO(
        "mysql:host=".$dbHost.";dbname=".$dbName.";charset=".$dbChar,
        $dbUser, $dbPass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (Exception $ex) { exit($ex->getMessage()); }

$currDict = $_POST["dictName"];

$sql = "SELECT * FROM `words` Where `Dictionary_name` = '$currDict'";

$dictionary = array();

if($result = $pdo->query($sql)){
    foreach($result as $row){
        array_push($dictionary, $row);
    }
} else{
    echo "Ошибка: " . $pdo->error;
}

print_r(json_encode($dictionary));
