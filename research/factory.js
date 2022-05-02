// C'est l'objet usine
const PersonFactory = {
    // une métohde pour créer des personnes
    makePerson : (firstname, lastname, age) => {

        // on crée un objet vide
        let newPerson = {};

        // on lui ajoute des propriétés
        newPerson.firstname = firstname;
        newPerson.lastname = lastname;
        newPerson.age = age;

        // puis la méthode
        newPerson.sayHello = () => {
            // ici on va pouvoir utiliser "newPerson"
            // chaque appel à l'usine (la factory) aura son propre contexte.

            console.log(`Bonjour. Je m'appelle ${newPerson.firstname} ${newPerson.lastname} et j'ai ${newPerson.age} ans.`);
        };

        // quand on a fini on le retourne

        return newPerson;
    }
}


const paul = PersonFactory.makePerson('Paul', 'Dupont', 32);
const maurice = PersonFactory.makePerson('Maurice', 'Durand', 42);


// TADAAAAA
paul.sayHello();
maurice.sayHello();