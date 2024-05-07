document.addEventListener("DOMContentLoaded", function () {
    var addItemBtn = document.getElementById("addItemBtn");
    var listItemsContainer = document.getElementById("listItemsContainer");

    addItemBtn.addEventListener("click", function () {
        var selectedItem = document.getElementById('item').value;
        var qtyRequest = document.getElementById('qtyRequest').value;
        var qtyReturn = document.getElementById('qtyReturn').value;

        var itemDiv = document.createElement("div");
        itemDiv.classList.add("card", "px-2", "py-1", "listItem", "rounded-3", "mb-2");

        var innerHTML = `
            <div class="card shadow-sm col-sm rounded-pill bg-white mb-2">
                <label class="ps-3" id="itemName">${selectedItem}</label>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <div class="bg-white shadow-sm col-6 border border-dark-subtle rounded-pill text-center" id="qtyRequest">${qtyRequest}</div>
                    <label class="ps-2">QtyRequest</label>
                </div>
                <div class="d-flex">
                    <div class="bg-white shadow-sm col-6 border border-dark-subtle rounded-pill text-center" id="qtyReturn">${qtyReturn}</div>
                    <label class="ps-2">QtyReturn</label>
                </div>
                <button class="btn-close" aria-label="close"></button>
            </div>
            `;
        itemDiv.innerHTML = innerHTML;

        listItemsContainer.appendChild(itemDiv);

        countItemList();
    });

    listItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-close")) {
            event.target.closest('.listItem').remove();
            countItemList();
        }
    });
});


function countItemList() {
    var itemList = document.querySelectorAll('.listItem');

    var itemCount = itemList.length;

    var countElement = document.getElementById('count');
    countElement.textContent = itemCount;
}

document.addEventListener('DOMContentLoaded', function () {
    var submitBtn = document.getElementById('submitListItem');
    var nameInput = document.getElementById('name');
    var phoneInput = document.getElementById('phone');
    var isiTable = document.getElementById('isiTable');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
    
        if (!nameInput.value || !phoneInput.value) {
            nameInput.classList.add('is-invalid');
            phoneInput.classList.add('is-invalid');
        } else {
            nameInput.classList.remove('is-invalid');
            phoneInput.classList.remove('is-invalid');
    
            var itemsData = collectItemListData();

            // console.table(itemsData);
    
            if (itemsData.length > 0) {
                var tableRows = "";
    
                for (var i = 0; i < itemsData.length; i++) {
                    var rowData = `
                        <tr>
                            <th scope="row">${i + 1}</th>
                            <td>${itemsData[i].name}</td>
                            <td>${itemsData[i].qtyRequest}</td>
                            <td>${itemsData[i].qtyReturn}</td>
                        </tr>
                    `;
                    tableRows += rowData;
                }
    
                var tbody = document.querySelector('tbody');
                tbody.innerHTML = tableRows;
                
    
                var guestModal = new bootstrap.Modal(document.getElementById('submitModal'));
                guestModal.show();
            } else {
                var popover = new bootstrap.Popover(document.getElementById('addItemBtn'), {
                    toggle: 'popover',
                    placement: 'right',
                    container: 'body',
                    trigger: 'focus',
                    content: function () {
                        return "Add request items to the list.";
                    }
                });
    
                popover.show();
    
                setTimeout(function () {
                    popover.hide();
                }, 1500);
            }
        }
    });    


    function collectItemListData() {
        var itemList = document.querySelectorAll('.listItem');
        var itemsData = [];

        for (var i = 0; i < itemList.length; i++) {
            var item = itemList[i];
            var itemNameElement = item.querySelector('.ps-3');
            var qtyRequestElement = item.querySelector('#qtyRequest');
            var qtyReturnElement = item.querySelector('#qtyReturn');


            if (itemNameElement && qtyRequestElement && qtyReturnElement) {
                var itemName = itemNameElement.textContent;
                var qtyRequest = qtyRequestElement.textContent;
                var qtyReturn = qtyReturnElement.textContent;

                itemsData.push({ name: itemName, qtyRequest: qtyRequest, qtyReturn: qtyReturn });
            }
        }

        return itemsData;
    }

    countItemList();

    document.getElementById('submitButton').addEventListener('click', function () {
        var itemsData = collectItemListData();

        console.table(itemsData);

        // var xhr = new XMLHttpRequest();
        // var url = 'item-request';
        // xhr.open('POST', url, true);
        // xhr.setRequestHeader('Content-Type', 'application/json');

        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         console.log('Data berhasil dikirim ke kontroler.');
        //     }
        // };

        // var data = JSON.stringify(itemsData);
        // xhr.send(data);
    });
});

