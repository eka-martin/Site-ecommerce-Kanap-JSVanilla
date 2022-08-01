let url_str = 'window.location.href';
let url = new URL(url_str);
let search_params = url.searchParams;


if (search_params.has('id')) {

    console.log(search_params.get('id'))
}

console.log('test');