var TV_BASE_PRICE = 999.99;
var AUDIO_BASE_PRICE = 499.99;
var itemsTotal = 0;
var PROMO_CODE = "BUY20";
var promoApplied = false;

function setValue(id, value) {
    document.getElementById(id).value = value;
}

function getNumberValue(id) {
    return parseFloat(document.getElementById(id).value);
}

function changeTVQuantity() {
    setValue("samsung-tv-price", getNumberValue("samsung-tv") * TV_BASE_PRICE);
    calculateItemsTotal();
}

function changeAudioQuantity() {
    setValue("samsung-audio-price", getNumberValue("samsung-audio") * AUDIO_BASE_PRICE);
    calculateItemsTotal();
}

function calculateItemsTotal() {
    var tvTotal = getNumberValue("samsung-tv-price");
    var audioTotal = getNumberValue("samsung-audio-price");
    itemsTotal = tvTotal + audioTotal;
    setValue("items-total", itemsTotal)
}

function getDeliveryType() {
    var deliveryOptions = document.getElementsByName("delivery");
    for (option of deliveryOptions) {
        if (option.checked) {
            return parseFloat(option.value);
        }
    }
}

function isGiftWrapped() {
    var giftWrapping = document.getElementById("gift-wrapping");
    if (giftWrapping.checked) {
        return parseFloat(giftWrapping.value);
    }
    return 0;
}

function insurePurchase() {
    var insurePurchanse = document.getElementById("insure-purchase");
    if (insurePurchanse.checked) {
        return (itemsTotal * 0.1);
    }
    return 0;
}

function countSubTotal() {
    var deliveryCharge = getNumberValue("deliver-charge");
    var wrappingCharge = getNumberValue("wrapping-charge");
    var insureCharge = getNumberValue("insure-charge");
    var promoPrice = promoApplied ? (itemsTotal * 0.2) + itemsTotal : itemsTotal;
    var chargeWithoutInsure = deliveryCharge + wrappingCharge + insureCharge + promoPrice;
    var subTotal = (chargeWithoutInsure * 0.1) + chargeWithoutInsure;
    setValue("sub-total", subTotal);
    return subTotal;
}

function generateOrder() {
    var pizzaForm = document.forms["pizza-form"];
    if (!pizzaForm.checkValidity()) {
        return;
    }
    pizzaForm.addEventListener("submit", function ($ev) {
        $ev.preventDefault();
    });
    var promo = document.getElementById("promo-code").value;
    if (promo !== "" && promo !== PROMO_CODE) {
        alert("Please enter correct promo code");
        promoApplied = false;
        return;
    } else if (promo === PROMO_CODE) {
        promoApplied = true;
    }
    setValue("deliver-charge", getDeliveryType());
    setValue("wrapping-charge", isGiftWrapped());
    setValue("insure-charge", insurePurchase());
    var subTotal = countSubTotal();
    var tax = subTotal * 0.13;
    setValue("tax", tax);
    setValue("billing-total", tax + subTotal);
}

document.addEventListener("DOMContentLoaded", function (event) {
    setValue("samsung-tv-price", TV_BASE_PRICE);
    setValue("samsung-audio-price", AUDIO_BASE_PRICE);
    calculateItemsTotal();
});