//On vide le local storage pour ne pas conserver d'information sensible
//localStorage.clear();
// récupération id
let url = new URL(window.location.href);
let idOrder = url.searchParams.get("id");

//On affiche l'id de commande.
let orderId = document.getElementById("orderId");
orderId.textContent = idOrder;