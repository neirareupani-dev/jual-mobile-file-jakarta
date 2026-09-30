$f = "artikel.html"
$l = Get-Content $f
"===CARD1 (96-100)==="
for ($i=96; $i -le 100; $i++) {
    $line = $l[$i-1]
    "LINE $i LEN=$($line.Length) => [$line]"
}
"===CARD2 (114-125)==="
for ($i=114; $i -le 125; $i++) {
    $line = $l[$i-1]
    "LINE $i LEN=$($line.Length) => [$line]"
}
"===CARD3 (132-143)==="
for ($i=132; $i -le 143; $i++) {
    $line = $l[$i-1]
    "LINE $i LEN=$($line.Length) => [$line]"
}
