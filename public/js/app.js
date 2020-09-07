
const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msg = document.querySelector('#msg1');
const load = document.querySelector('#load');
msg.textContent = '';

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = input.value
    load.textContent='Loading...'
    msg.textContent = '';
    const url = 'http://localhost:3000/weather?address='+location;
   
    fetch(url).then((res)=>{
        res.json().then((data)=>{
            if(data.err){
               
                msg.textContent = data.err
                load.textContent=''
            }else {
               
                msg.textContent=stringfy(data)
                load.textContent=''
            }
        })
    })

})

const stringfy = (data)=> {
    return 'It is ' + data.response.temp + ' degrees in ' + data.response.loc + '. There is ' + data.response.rain + '% chance of rain';
}