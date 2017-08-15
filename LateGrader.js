/**
 * Copyright Jason Rice on 11/3/16.
 * Files included in this Copyright: index.html, LateGrader.css, LateGrader.js.
 * Any use of this software should give credit to the author.
 * Otherwise this software may be treated as a open source software.
 */

function getPercentInput(txtval){
    var input;
    input = checkType(txtval);
    if(isNaN(input)){
        input = sendAlert("Please enter a valid numeric value.", 0);
    }
    document.getElementById("percentrtn").firstChild.textContent = input +"%";
    return false;
}

function clearInput(){
    document.getElementById("percent").value = "";
    document.getElementById("totalpoints").value = "";
    document.getElementById("percentrtn").firstChild.textContent = "0%";
    document.getElementById("table").innerHTML = "";
    document.getElementById("ppd").value = "";
}

function sendAlert(txt, rtn){
    window.alert(txt);
    clearInput();
    return rtn;
}

function checkType(val){
    if(val == ""){
        return 0;
    }
    if(val.indexOf("/") != -1){
        var tmp = val.split("/");
        for(var t = 0; t<tmp.length; t++){
            tmp[t] = parseFloat(tmp[t]);
            if(!checkIfNum(tmp[t])){
                return sendAlert("Please enter a valid numeric value.", 0);
            }
        }
        var num = tmp[0];
        for(var f = 1; f<tmp.length; f++){
            if(tmp[f] != 0){
                num = num/tmp[f];
            }
            else{
                return sendAlert("Please enter a valid numeric value.", 0);
            }
        }
        return parseInt(num.toFixed(2)*100);
    }
    else if(val.indexOf(".") != -1){
        val = parseFloat(val);
        if(checkIfNum(val)){
            return parseInt(val.toFixed(2)*100);
        }
        else{
            return sendAlert("Please enter a valid numeric value.", 0);
        }
    }
    else if(typeof parseInt(val) == "number"){
        val = parseInt(val);
        return val;
    }
    else{
        return sendAlert("Please enter a valid numeric value.", 0);
    }
}

function checkIfNum(val){
    if(typeof val == "number"){
        return true;
    }
    else{
        return false;
    }
}

function getTotalInput(txt){
    var input = parseInt(txt);
    var perc = checkPercentage();
    if(isNaN(input)){
        sendAlert("Please enter a valid numeric value.", false);
        return false;
    }
    if(input > 1000){
        return sendAlert("to large of a table to display.", false);
    }
    else{
        var html = "";
        html += "<table id=\"lgrades\">";
        console.log("grade gened");
        html += generateTable(input, html, perc);
        html += "</table>";
        console.log(html);
        document.getElementById("table").innerHTML = html;
        return false;
    }
}

function generateTable(num, txt, dp){
    var html = txt;

    //create columns
    html += "<tr><th></th><th colspan=\"6\">Days Late</th></tr>";
    html += "<tr><th>Points</th><th>0</th><th>1</th><th>2</th>";
    html += "<th>3</th><th>4</th><th>5</th></tr>";
    for(var row = 0; row < num; row++){
        html += "<tr><th>"+(num-row)+"</th>";
        for(var day = 0; day < 6; day++){
            html += "<td>" + doCalc(num-row, num, day, dp) + "</td>";
        }
        html += "</tr>";
    }
    return html;
}

function doCalc(tot, full, day, per){
    if(day == 5){
        day = 4;
    } else if(day == 0){
        return parseInt(tot);
    }

    var val = parseInt(tot - (full*per)*day);
    if(val < 0){
        val = 0;
    }
    return val;
}

function checkPercentage(){
    var percent = document.getElementById("ppd").value;
    percent = parseFloat(percent).toFixed(2);
    if(isNaN(percent)){
        return .05;
    }
    if(percent > 1){
        percent = percent/100;
    }
    return percent;
}