//On vide le local storage pour ne pas conserver d'information sensible
localStorage.clear();
// récupération id
let str = window.location.href;
let url = new URL(str);
let idOrder = url.searchParams.get("id");

//On affiche l'id de commande.
let orderId = document.getElementById("orderId");
orderId.textContent = idOrder;