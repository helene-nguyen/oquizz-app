// Un objet
const paul = {
    // qui a des propriétés
    firstname : "Paul",
    lastname : "Dupont",
    age: 32,

    // une méthode
    sayHello: () => {
        console.log(`Bonjour. Je m'appelle ${paul.firstname} ${paul.lastname} et j'ai ${paul.age} ans.`);
    }
}

// chouette ça marche
paul.sayHello();

// et maintenant, un deuxième ? 

const maurice = {
    firstname: "Maurice",
    lastname: "Durand",
    age: 42,

    // une méthode
    sayHello: () => {
        console.log(`Bonjour. Je m'appelle ${maurice.firstname} ${maurice.lastname} et j'ai ${maurice.age} ans.`);
    }
}

maurice.sayHello();
