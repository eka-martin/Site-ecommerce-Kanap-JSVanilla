// let search_params = new URLSearchParams(window.location.href);
// if (search_params.has('_id')) {
//     let id = search_params.get('_id');
//     console.log(id);
// }

// const queryString_url_id = window.location.search;
// console.log(queryString_url_id);


const url = new URL('file:///C:/Users/Katya/Desktop/cite/OPENCLASSROOM/P5/P5-Dev-Web-Kanap-master/front/html/product.html?id=107fb5b75607497b96722bda5b504926');
const theid = url.searchParams.get("id");
console.log(theid);




// let url = new URL(window.location.href);
// let search_params = url.searchParams;
// console.log(search_params.get('id'));