console.log("--------------Echo Person2");

//~create class
class Person2 {
    //~properties
    firstName;
    lastName;
    email;
    _pokemon; // add _ can hide the info, get the value but cannot modify it
    #_password; // add #_ create an error, cannot get password at all, don't show the info in console.log

    //~constructor
    constructor(firstName, lastName, email, pokemon, password) {
        
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.pokemon = pokemon;
        this.password = password;
    }

   //~getter or accessor method
    get password() {
        return this.#_password;
    }

    get pokemon() {
        return this._pokemon;
    }
    //~setter or mutator method
    set password(pwd) {

       /*  if (pwd.includes("2")) {
            throw new Error("You have put a number 2")
        } */

        if (!pwd.includes('2')) {//in the real pwd
            throw new Error('there is no 2');
            return;
        }

        if (!pwd.includes('#')) {
            console.error('You have forgotten the special character');
        }
    
        console.log("Good password");
        this.#_password = pwd;
    }

    set pokemon(poke) {
        this._pokemon = poke;
    }
}

const harry2 = new Person2('Harry', 'Potter', 'gryffondor@gmail.com', 'Edwige', 'Caput Draconis2#');

console.log(harry2);
//without _ in pokemon property
console.log(harry2._pokemon);//
//add _ now
console.log(harry2.password);

try {

    harry2.password = 'h#gg2'; //cannot change pwd
        
} catch (error) {
    console.error(error.message);
}

harry2.pokemon = "pikachu"; //don't modify the value of 'Edwige'
console.log(harry2._pokemon);