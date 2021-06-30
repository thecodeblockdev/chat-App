const socket = io()
let enterName;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    enterName = prompt('Please enter your name: ')
} while(!enterName)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: enterName,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')  
    textarea.value = ""
    scrollToBottom()

    //Sent to server
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


//Recieve msg
socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}