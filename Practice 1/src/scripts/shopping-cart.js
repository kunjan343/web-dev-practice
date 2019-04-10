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