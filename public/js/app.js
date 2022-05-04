//~ LOCAL STORAGE Mini DB key = value
//!stock only strings !!!
//check on devtools Application

console.log("ok");

//?How to stock in localstorage
const key = 'the key';
const value = 'the value';

localStorage.setItem(key, value);

//? Get value of key and value
//! if no key, return null !!!! 
const locvalue = localStorage.getItem(key);
console.log(locvalue); // output "value"

//?remove info
localStorage.removeItem(key); 


const panier = [{
    id: 1,
    name: 'Phone',
    price: 123
}, {
    id: 2,
    name: 'tv',
    price: '321'
    }]

//?stock to local storage
//When we know that we want to get something in localstorage and we know that we work with array
localStorage.setItem('panier', JSON.stringify(panier)); //!json.stringify send it to localstorage

//?how to use it in front end ?
//get data
//!with local storage, we only can stock strings
let getData = localStorage.getItem('panier') || []; // we don't want null
console.log(getData);

//?to get object to use it
getData = JSON.parse(localStorage.getItem('panier'));
console.log(getData);

localStorage.removeItem(panier); // won't work because stringify
localStorage.removeItem('panier'); //works

