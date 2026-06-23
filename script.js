const qrText=document.getElementById("qrText");
const qrImage=document.getElementById("qrImage");
const generateBtn=document.getElementById("generateBtn");
const clearBtn=document.getElementById("clearBtn");
const downloadBtn=document.getElementById("downloadBtn");
const startScanner=document.getElementById("startScanner");
const stopScanner=document.getElementById("stopScanner");
const result=document.getElementById("result");

let html5QrCode=null;

generateBtn.addEventListener("click",()=>{

const text=qrText.value.trim();

if(text===""){
alert("Enter text or URL");
return;
}

const qrUrl=`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;

qrImage.src=qrUrl;
qrImage.style.display="block";

downloadBtn.style.display="block";
downloadBtn.href=qrUrl;

});

clearBtn.addEventListener("click",()=>{

qrText.value="";
qrImage.src="";
qrImage.style.display="none";
downloadBtn.style.display="none";

});

startScanner.addEventListener("click",startQRScanner);

stopScanner.addEventListener("click",stopQRScanner);

function startQRScanner(){

if(html5QrCode){
return;
}

html5QrCode=new Html5Qrcode("reader");

html5QrCode.start(
{facingMode:"environment"},
{
fps:10,
qrbox:250
},
(decodedText)=>{

result.innerHTML=decodedText;

if(decodedText.startsWith("http")){
result.innerHTML=`<a href="${decodedText}" target="_blank">${decodedText}</a>`;
}

},
(errorMessage)=>{}
).catch(err=>{
alert("Camera access denied or unavailable");
});

}

function stopQRScanner(){

if(html5QrCode){

html5QrCode.stop()
.then(()=>{

html5QrCode.clear();
html5QrCode=null;

})
.catch(()=>{});

}

}