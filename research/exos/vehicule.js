/**
 * Propriétés : 
 *  -nbWheels, enginePower, isStarted
 * 
 * Methodes :
 *  - constructor (nbWheels, enginePower) => isStarted est false par défault
 *  - getter et des setter pour toutes les propriétés (pas de conditions particulère dans les setters)
 *  - start() et stop()
 *  - toString() -> "Vhéicule à X roues, de pussance Y, {est démarré | n'est pas démarré}"
 *  - si vous avez fini en avance -> Des conditions de votre imagination dans les setters
 */


class Vehicule {

    #nbWheels;
    #enginePower;
    #isStarted;

    constructor(nbWheels, enginePower) {
        this.#nbWheels = nbWheels;
        this.#enginePower = enginePower;

        this.#isStarted = false;
    }

    set nbWheels(value) {
        this.#nbWheels = value;
    }

    get nbWheels() {
        return this.#nbWheels;
    }

    set enginePower(value) {
        this.#enginePower = value;
    }

    get enginePower() {
        return this.#enginePower;
    }

    get isStarted() {
        return this.#isStarted;
    }

    start() {
        this.#isStarted = true;
    }

    stop() {
        this.isStarted = false;
    }

    toString() {
        return `Vehicule à ${this.#nbWheels} roues, 
                avec un moteur de ${this.#enginePower} chevaux,
                ${this.#isStarted ? `est démarré` : `n'est pas démarré`}`; 

        // let temp = `Vehicule à ${this.#nbWheels} roues, 
        //             avec un moteur de ${this.#enginePower} chevaux, `;

        // if(this.#isStarted) {
        //     temp += 'est démarré';
        //     // temp = temp + 'est démarré';
        // } else {
        //     temp += `n'est pas démarré`;
        // }

        // return temp;
    }
}

module.exports = Vehicule;