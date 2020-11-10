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

//DROP DOWN JS
$(".dropdown-menu li a").click(function(){
  
  $(".btns:first-child").html($(this).text()+' <span class="caret"></span>');
  
});
// highlight_row()
// function highlight_row() {
//     var table = document.getElementById('display-table');
//     var cells = table.getElementsByTagName('td');

//     for (var i = 0; i < cells.length; i++) {
//         // Take each cell
//         var cell = cells[i];
//         // do something on onclick event for cell
//         cell.onclick = function () {
//             // Get the row id where the cell exists
//             var rowId = this.parentNode.rowIndex;

//             var rowsNotSelected = table.getElementsByTagName('tr');
//             for (var row = 0; row < rowsNotSelected.length; row++) {
//                 rowsNotSelected[row].style.backgroundColor = "";
//                 rowsNotSelected[row].classList.remove('selected');
//             }
//             var rowSelected = table.getElementsByTagName('tr')[rowId];
//             rowSelected.style.backgroundColor = "yellow";
//             rowSelected.className += "table";

//             msg = 'The ID of the company is: ' + rowSelected.cells[0].innerHTML;
//             msg += '\nThe cell value is: ' + this.innerHTML;
//             alert(msg);
//         }
//     }

// }