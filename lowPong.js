if (typeof(Worker) !== "undefined") {
    webWorker = new Worker("lowPong_WebWorker.js");
    webWorker.onmessage = function(event){
        console.log(event.data);
    }
} else {
    alert("Sorry your browser does not support the Web Worker API. Please use a browser with at least the specified version:\nChrome - 4.0 | Edge - 10.0 | Firefox - 3.5 | Safari - 4.0 | Opera - 11.5");
}