const login = document.getElementById('loginID')
const email = document.getElementById('emailID')
const pass = document.getElementById('passID')
window.onload = function () {
    window.scrollTo(0, 0);
    anim(); 
};

const anim = ()=>{
const container = document.getElementById('containerID')
container.style.opacity='1'
container.style.transition='all 0.8s'
container.style.transform='scale(1)'
}


const log = (emailVal, passVal)=>{
    if(emailVal == 'companybeylands@gmail.com' && passVal == 'beylandsofficial'){
        window.location.href = "/admin-page";
        email.value=''
        pass.value=''
       
    }else{
        alert('Empty Fields')
        email.value=''
        pass.value=''
    }
}
login.addEventListener('click',()=>{
    log(email.value, pass.value)
})
document.body.addEventListener('keypress',(e)=>{
    console.clear()
    console.log(e.keyCode)
    if(e.keyCode == 13 && email.value != '' && pass.value != ''){
    log(email.value, pass.value)
    }
})

