function restyle_progress_bar() {

    let height = '40px';
    $('#jspsych-progressbar-container')[0].style.height = height;
    $('#jspsych-progressbar-outer')[0].style.height = height;
    $('#jspsych-progressbar-inner')[0].style.height = height;

    let text = $('#jspsych-progressbar-container span')[0];
    text.style.fontSize = '20px';
    text.style.fontFamily = 'Arial';
}

function saveData(name, data) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'record_data.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        filename: name,
        data: data
    }));
}

// https://stackoverflow.com/questions/926332/how-to-get-formatted-date-time-like-2009-05-29-215557-using-javascript
function getFormattedDate() {

    var d = new Date();

    function pad(x) {
        // make sure single digits are padded with a leading zero
        return ('0' + x).slice(-2)
    }

    d = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + "_" + pad(d.getHours()) + "\:" + pad(d.getMinutes()) + "\:" + pad(d.getSeconds());

    return d;
}