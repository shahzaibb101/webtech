window.onload = doBindings;

function doBindings() {
    document.getElementById("comb1").onmouseover = incHrHeight.bind(this,'v11','p1','hd11');
    document.getElementById("comb1").onmouseout = decHrHeight.bind(this,'v11','p1','hd11');
    document.getElementById("comb2").onmouseover = incHrHeight.bind(this,'v12','p2','hd2');
    document.getElementById("comb2").onmouseout = decHrHeight.bind(this,'v12','p2','hd2');
    document.getElementById("comb3").onmouseover = incHrHeight.bind(this,'v13','p3','hd3');
    document.getElementById("comb3").onmouseout = decHrHeight.bind(this,'v13','p3','hd3');
    document.getElementById("r2").onclick = gotoValidation;
}

function gotoValidation() {
    window.open("test.html");
}

function incHrHeight(var1, var2, var3) {
    document.getElementById(var1).style.height = "140px";
    document.getElementById(var1).style.borderLeft = "6px solid red";
    document.getElementById(var2).style.marginTop = "-60px";
    document.getElementById(var3).style.marginTop = "-90px";
    document.getElementById(var3).style.marginBottom = "35px";
}

function decHrHeight(var1, var2, var3) {
    document.getElementById(var1).style.height = "80px";
    document.getElementById(var1).style.borderLeft = "6px solid rgb(223, 221, 221)";
    document.getElementById(var2).style.marginTop = "15px";
    document.getElementById(var3).style.marginTop = "-20px";
}