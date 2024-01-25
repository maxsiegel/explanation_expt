<?php

function prn($msg) {
    error_log(print_r($msg, true));
}

$post_data = json_decode(file_get_contents('php://input'), true);
// the directory "data" must be writable by the server
$name = "data/".$post_data['filename'].".csv";
$data = $post_data['data'];
// prn($data);
// write the file to disk
file_put_contents($name, $data);
?>
