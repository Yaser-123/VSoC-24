const microphoneButton = document.getElementById('microphoneButton');

microphoneButton.addEventListener('click',function(){
    window.open(
        'http://127.0.0.1:5500/Jarvis-in-Javascript-main/mic/index1.html',
        "",
        "width=280px,height=280px"
    );
});


