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
