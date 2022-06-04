console.log("-----------Echo factory");


//create a special object
const PersonFactory = {

    makePerson(firstName, lastName, age) {
        let newPerson = {};

        newPerson.firstName = firstName;
        newPerson.lastName = lastName;
        newPerson.age = age;

        newPerson.sayHello = () => {
            console.log(`My Person is ${newPerson.firstName} ${newPerson.lastName} and I am ${newPerson.age}`);
        };

        return newPerson;
    }
};

const yumi = PersonFactory.makePerson('yumi', '---From factory---', 30);

yumi.sayHello();