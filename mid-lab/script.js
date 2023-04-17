window.onload = doBindings;

function doBindings() {
    document.getElementById("logo").onclick = clicked;
}

function clicked() {
    alert("My roll no is 079");
}