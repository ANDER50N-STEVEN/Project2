<?php


include("dbinfo.php");
// Start XML file, create parent node
$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);
// Opens a connection to a pgSQL server
$conn_string = "host=localhost port=5432 dbname=apartments user=steven password=password";
$conn = pg_connect($conn_string);  
if(!$conn){
    die ("Could not open connection to database server");
}
$query = "SELECT * FROM markers";
$result = pg_query($conn, $query);
if(!$result){
    die('Invalid query : ' . pg_last_error());
}
header("Content-type: text/xml");
// Iterate through the rows, adding XML nodes for each
while ($row = pg_fetch_assoc($result)){
// ADD TO XML DOCUMENT NODE
$node = $dom->createElement("marker");
$newnode = $parnode->appendChild($node);
$newnode->setAttribute("id",$row['id']);
$newnode->setAttribute("name",$row['name']);
$newnode->setAttribute("address", $row['address']);
$newnode->setAttribute("lat", $row['lat']);
$newnode->setAttribute("lng", $row['lng']);
$newnode->setAttribute("type", $row['type']);
}
echo $dom->saveXML();
?>
