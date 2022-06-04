console.log("--------------Echo User");

//~create Class
//C'est ce qu'on va créer
class User {
    //~create properties object : instances we create 
    id; //
    firstName;
    lastName;
    email;
    password; //? do you want to see it or not ? # or not ?
    created_at; //DB s'en occupe
    updated_at; //si on doit mettre à jour les infos donc pas besoin dans constructeur

    //~constructor
    constructor(firstName, lastName, email, password) {
        //~give arguments
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    //~getter
    get fullName() {
        console.log(`I am ${this.firstName} ${this.lastName}`);
    }

}


//Avec "extends", ça nous permet de faire un héritage de la classe principale
//Cela crée quand même une Class mais permet d'hériter des infos de la Class principale (legacy)
//Pas besoin de créer une autre class Admin car va reprendre les infos de User 
//Class enfant = Admin et Class parent = User
class Admin extends User {
    //exemple author
    is_author = false;

    constructor(firstName, lastName, email, password, is_author) { //!
        //condition here
        if (typeof firstName !== 'string') {
            throw new Error("not letters");
        }

        if (!email) {
            throw new Error("No email !!");
        }

        //!add super to fetch the keyword "this" !!!
        super(firstName, lastName, email, password); //don't forget to pass info
        console.log(this.constructor.length); //! C'est ici ! Qu'on peut récupérer les infos de notre Class
        this.is_author = is_author

        //?
       /*  checkEmail(email){
            return true;
        } */
    }
}




//&CALL

//^check user
/* const user = new User('Arthur', 'Pendragon', 'kaamelott@bretagne.com', 'password');
console.log(user); */

//^Create instance Admin
const admin = new Admin("hello", 'Admin', 'admin@admin.com', 'password', true);
console.log(admin);
//via getter
// admin.fullName;

/* console.log(admin.fullName); */ //ici return undefined because console.log return nothing

//^instanceof utility
const user2 = new Admin('Admin', 'Admin', 'admin@admin.com', 'password');
//! instanceof sert à identifier à quelle classe appartient notre instance
//! typeof permet d'identifier le type d'un élément
//!Très important pour tester d'où vient une Class et à identifier d'où elle vient

/* console.log(user instanceof User);
console.log(user instanceof Admin);

console.log(user2 instanceof User);
console.log(user2 instanceof Admin);
 */

//^TEST condition email and first_name