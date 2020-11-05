const order_btn = document.getElementById('ordersID')
const inventory_btn = document.getElementById('inventoryID')
const order_cont = document.getElementById('order-contentID')
const inventory_cont = document.getElementById('inventory-contentID')
const dash_btn = document.getElementById('dashID')
const dash_cont = document.getElementById('dash-contentID')

const openCont = ()=>{
     dash_btn.addEventListener('click',()=>{
        if(dash_cont.style.display != 'flex'){
            inventory_cont.style.display='none';
            order_cont.style.display='none';
            dash_cont.style.display='flex'
        }     
})
    order_btn.addEventListener('click',()=>{
        if(order_cont.style.display != 'flex'){
            dash_cont.style.display='none'
            inventory_cont.style.display='none';
            order_cont.style.display='flex';
        }     
})
    inventory_btn.addEventListener('click',()=>{
        if(inventory_cont.style.display != 'inline'){
            inventory_cont.style.display='inline';
            order_cont.style.display='none';
            dash_cont.style.display='none'
        }
})

}
openCont();
