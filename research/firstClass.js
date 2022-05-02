// BIM ! Une classe
// -> le mot clef class
// -> et le nom de la classe en PascalCase aka une Maj en début de mot

class Person {
    /**
     * Etape 1 : propriétés (props)
     */

    // on déclare une propriétés : TOUTES les instances possèderont la prop "firstname", "lastname" et "age"
    firstname;
    lastname;
    age;

    /**
     * Etape 3 : constructeur
     */
    // Méthode SPECIALE appelé au moment de l'instanciation de l'objet
    // BON PRACTICIES : normalement on me le constructeur avant les autres méthodes
    constructor(firstname, lastname, age){
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
    }

    /**
     * Etape 2 : méthodes
     */
    // puis on ajoute la méthode
    // Dans une class, PAS besoin du mot clef "function" ! Les parenthèses suffisent pour que le JS comprennnent ! 
    sayHello() {
        // this -> this permet de faire référence au futur objet, une fois ce celui ci exister
        console.log(`Bonjour. Je m'appelle ${this.firstname} ${this.lastname} et j'ai ${this.age} ans.`);
    }

    //Un getter et setter c'est une paire de fonctions qui permettent de lire et écrire
    // dans une propriété
    // le setter permet entre-autre de faire des verifications d'intégrités de la donnée
    setFirstname(firstname) {
        if(typeof firstname !== "string") {
            // si ce n'est pas un string on le renvoi balader
            throw Error("Person.prenom must be a string");
        } else {
            this.firstname = firstname;
        }
    }

    getFirstname() {
        return this.firstname;
    }

    setAge(age) {
        if(typeof age == 'number') {
            if(age >= 0 && Number.isInteger(age)) {
                this.age = age;
            }
            else {
                throw Error("Person.age must be an integer greater than 0");
            }
        }
        else { 
            throw Error("Person.age must be a number");
        }
    }

    getAge() {
        return this.age;
        
    }

    getFullname() {
        return this.firstname + ' ' + this.lastname;
    }

}

// on utilise un nouveau mot clef : new qui permet d'instancier un nouvel objet 
// new <Type>(<propriétés du constuctor)//

const paul = new Person('Paul', 'Dupont', 32);
const maurice = new Person('Maurice', 'Durand', 42);

paul.sayHello();
maurice.sayHello();

paul.firstname = 13;


console.log(paul.getFullname());
