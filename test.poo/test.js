//POO course O'clock 2022
console.log("----------------Echo Test");


/**
 * DEPRECATED
 */
const userTest = {
    firstName: 'Yumi',
    lastName: '---From test---',
    age: 30,
    //^INIT
    init() {
        userTest.sayHello();
    },
    //^METHOD
    sayHello() {
        console.log(`My user is ${userTest.firstName} ${userTest.lastName} and I am ${userTest.age}`);
    }
};

userTest.init();