const order_btn = document.getElementById('ordersID')
const product_btn = document.getElementById('productID')
const order_cont = document.getElementById('order-contentID')
const product_cont = document.getElementById('product-contentID')
const dash_btn = document.getElementById('dashID')
const dash_cont = document.getElementById('dash-contentID')
const overlay_product = document.getElementById('btn-product-overlayID')
const show_product = document.getElementById('show-productID')
const email_picture = document.getElementById('email-pictureID')
const logout_popup = document.getElementById('logout-popupID')

product_btn.addEventListener('click',()=>{

    if(overlay_product.style.display == 'inline'){
        overlay_product.style.display='none'        
        overlay_product.style.position='unset'
        logout_btn.style.margin='0.4rem' 

    }else{
        overlay_product.style.display='inline'
        overlay_product.style.position='absolute'    
    }
})

// email_picture.addEventListener('click',()=>{
//     if(logout_popup.style.display =='none'|| logout_popup.style.display ==''){
//         logout_popup.style.opacity ='1';
//         logout_popup.style.display ='inline';
//         logout_popup.style.transition ='all 0.9s';
//         logout_popup.style.transform ='scale(1)';
//     }else{
//         logout_popup.style.opacity ='0';
//         logout_popup.style.display ='none';
//         logout_popup.style.transition ='all 0.4s';
//         logout_popup.style.transform ='scale(0.9)';
//     }
   
// })
const popup = document.querySelector('.logout-popup');
function showPopup() {
  popup.classList.add('open');
}
function hidePopup() {
  popup.classList.remove('open');
}
