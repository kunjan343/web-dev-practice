function getById(id) {
    return document.getElementById(id).value;
}

function getByName(name) {
    return document.getElementsByName(name);
}

function getPizzaSize() {
    var pizzaSizes = getByName("size");
    for (size of pizzaSizes) {
        if (size.checked) {
            return size.value;
        }
    }
}

function getPizzaToppings() {
    var selectedToppings = "";
    var toppings = getByName("toppings");
    var isToppingsSelected = false;
    for (topping of toppings) {
        if (topping.checked) {
            isToppingsSelected = true;
            selectedToppings += `<br>${topping.value}`;
        }
    }
    return [selectedToppings, isToppingsSelected];
}

function displayOrder(orderInfo) {
    var result = "";
    for (key in orderInfo) {
        if (orderInfo.hasOwnProperty(key)) {
            result += `${key}:&nbsp;${orderInfo[key]}<br>`;
        }
    }
    document.getElementById("order-status").innerHTML = result;
}

function submitForm() {
    var pizzaForm = document.forms["pizza-form"];
    if (!pizzaForm.checkValidity()) {
        return;
    }
    pizzaForm.addEventListener("submit", function ($ev) {
        $ev.preventDefault();
    });
    var formData = {};
    formData.Name = getById("uName");
    formData.Address = getById("address");
    formData.Size = getPizzaSize();
    var toppings = getPizzaToppings();
    if (!toppings[1]) {
        alert("You should select at-least one topping!");
    }
    formData.Toppings = toppings[0];
    displayOrder(formData);
}