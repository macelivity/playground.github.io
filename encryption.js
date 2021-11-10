outputTextObj = document.getElementById("outputText");
shouldEncrypt = true;

function switchDeEncrypt(){
    shouldEncrypt = !shouldEncrypt;

    switchButton = document.getElementById("switchButton");
    startButton = document.getElementById("startButton");
    textInputLabel = document.getElementById("textInputLabel");
    encryptionArea = document.getElementById("encryptionArea");

    if(shouldEncrypt){
        switchButton.innerHTML = "Decrypt";
        startButton.innerHTML = "Encrypt!";
        textInputLabel.innerHTML = "Text to encrypt";
        encryptionArea.style.backgroundColor = 'rosybrown';
    }
    else{
        switchButton.innerHTML = "Encrypt";
        startButton.innerHTML = "Decrypt!";
        textInputLabel.innerHTML = "Text to decrypt";
        encryptionArea.style.backgroundColor = 'olivedrab';
    }
}

async function onStartButtonPressed(){
    password = document.getElementById("passwordInputField").value;
    text = document.getElementById("textInputField").value;
    if(shouldEncrypt){
        outputTextObj.value = await encryptText(password, text);
    }
    else{
        outputTextObj.value = await decryptText(password, text);
    }
}


async function decryptText(password, text){
    textHash = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if(char == "\n") break;
        textHash += char;        
    }

    generatedHash = "";
    await sha256(password).then(function(val) { generatedHash = val; });
    if(generatedHash != textHash) return "Wrong Password!";

    result = "";
    text = text.substring(textHash.length + 1);

    for (let i = 0; i < text.length; i++) {
        let charValue = text.charCodeAt(i);
        charValue -= password.charCodeAt(i % password.length);
        result += String.fromCharCode(charValue);
    }
    return result;
}


async function encryptText(password, text){
    result = "";
    await sha256(password).then(function(val) { result += val; });
    result += "\n";

    for (let i = 0; i < text.length; i++) {
        let charValue = text.charCodeAt(i);
        charValue += password.charCodeAt(i % password.length);
        result += String.fromCharCode(charValue);
    }
    return result;
}


async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}