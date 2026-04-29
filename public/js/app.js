
// fetch('http://localhost:3000/weather?address=bostan').then((res) => res.json()).then((data) => {
//     if(data.error){
//         console.log(data.error);
//     }else{
//         console.log(data.location)
//         console.log(data.forcast)
//     }
// }).catch((error) => console.log(error))

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')


const messageSecond = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    const location = searchElement.value;
    messageOne.textContent = 'Loading...'
    messageSecond.textContent = ''
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => res.json()).then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageSecond.textContent = data.forcast
        }
    }).catch((error) => console.log(error))
})