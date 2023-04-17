window.onload = doBindings;

function doBindings() {
    document.getElementById("s-btn").onclick = btnClick;
}

function btnClick(event) {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    const regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (regex_pattern.test(email) == false) {
        document.getElementById("email").style.border = "2px solid red";
    }
    else if(pass.length < 8) {
        document.getElementById("email").style.border = "2px solid green";
        document.getElementById("pass").style.border = "2px solid red";
        event.preventDefault();
    }
    else {
        return true;
    }
    
    
}