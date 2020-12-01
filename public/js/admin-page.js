const order_btn = document.getElementById('ordersID')
const product_btn = document.getElementById('productID')
const order_cont = document.getElementById('order-contentID')
const product_cont = document.getElementById('product-contentID')
const dash_btn = document.getElementById('dashID')
const dash_cont = document.getElementById('dash-contentID')
const overlay_product = document.getElementById('btn-product-overlayID')
const logout_btn = document.getElementById('logoutID')
const show_product = document.getElementById('show-productID')

product_btn.addEventListener('click',()=>{
    if(overlay_product.style.display == 'inline'){
        overlay_product.style.display='none'        
        overlay_product.style.position='unset'
        logout_btn.style.marginTop='0'      
    }else{
        overlay_product.style.display='inline'
        overlay_product.style.position='absolute'
        overlay_product.style.top='127px'
        logout_btn.style.marginTop='89px'
     
    }
})

const openCont = ()=>{
    // SHOW TABLE IN SHOW PRODUCT BTN
    show_product.addEventListener('click',()=>{
        if(overlay_product.style.display != 'inline'){
            overlay_product.style.display='inline'
            overlay_product.style.position='absolute'
            overlay_product.style.top='127px'
            logout_btn.style.marginTop='86px'

        }else{
            // overlay_product.style.display='none'
            overlay_product.style.position='unset'
            logout_btn.style.marginTop='0'

        }
        if(product_cont.style.display != 'inline'){
            product_cont.style.display='inline';
            order_cont.style.display='none';
            dash_cont.style.display='none'
        }
})
}
openCont();

