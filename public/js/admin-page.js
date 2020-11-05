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
