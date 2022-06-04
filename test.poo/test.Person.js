console.log("--------------Echo Person");


//Use for encapsuling code : isolate code
//Everything in Class stay in Class !!!! 
//~Create Class
class Person {
    //~-----------------object created : instances
    firstName;
    lastName;
    age;
    //add for getters
    _pokemon; //ce qu'on ne veut pas rendre accessible
    #_password; //rendre cette propriété privée avec #, on empêche la lecture et l'écriture directement sur ces propriétés

    //to give an argument, we use a constructor
    //special METHOD !!!automatically called when INSTANCE is created donc dès qu'on met le mot "new"
    //c'est le constructeur qui est lancé
    //~----------constructor
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;

    }

    //!SOLUTION 2 getters/setters IMPORTANT
    //permet de protéger notre code, pour ne pas rendre disponible en dehors des Class
    //~----------getters : les accesseurs
    /*  get pokemon() {
         return this._pokemon;
     } */
    get password() {
        //retourne la valeur du password, on peut accéder à password car on est DANS la class
        //return donne une donnée pour avoir accès à l'extérieur
        //ne retourne que la valeur, impossible qu'on puisse la modifier en dehors
        return this.#_password;
    };

    //~---------setters : les mutateurs
    //fait pour modifier la propriété privée
    /*     set pokemon(poke) {
            this._pokemon = poke;
        } */

    set password(pwd) {
        //on peut faire une vérification comme ça
        if (pwd.length < 6) {
            throw new Error("Wrong password");
            return;
        };
        //on peut faire d'autre test

        this.#_password = pwd;

    };

    //!

    //modern js, we cannot use Person class
    //We use this => current objetct
    //~methods
    sayHello() {
        console.log(`My Person is ${this.firstName} ${this.lastName} and I am ${this.age}`);
    }

}

//~export the module
//solution 1
/* export default Person; */
//solution 2
//new va permettre d'instancer une classe
//ici on parle alors de POO
const harry = new Person('harry', 'Potter', 30, 'Edwige', 'Caput draconis');
console.log(harry);
// console.log(harry.#_password);
harry._pokemon = "pikachu";
console.log(harry._pokemon);

//on peut ajouter une nouvelle propriété en faisant SOLUTION 1 DEPRECATED
/* yumi2.pokemon = 'pikachu';
console.log(yumi2); */

//ici on fait appel à la methode
/* console.log(yumi2.sayHello()); */ //ici on peut enlever le console.log car il y a déjà un console log dans la methode
/* 
yumi2.sayHello();
//~check for getters/setters
console.log(yumi2);
//test
yumi2.password = 'password-test';
console.log(yumi2.password); //access to the word "password" of property but not THE password

try {
    yumi2.password = 'pass'; //create an error
} catch (error) {
    console.error(error.message);
}
console.log(yumi2.password); */