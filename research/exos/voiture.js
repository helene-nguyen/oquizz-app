const Vehicule = require('./vehicule');

// Une voiture est un véhicule
class Voiture extends Vehicule {

    constructor(enginePower) {
        // permet d'appeler le constructeur du parent
        super(4, enginePower); // -> nombre de roues et puissance
    }

    // SURCHARGER la methode toString
    toString() {
        return "Voiture : " + super.toString();
    }

}

class SUV extends Voiture {

    constructor(enginePower) {
        super(enginePower)
    }

    // SURCHARGER la methode toString
    toString() {
        return "Voiture de type SUV: " + super.toString();
    }
    
}

class Moto extends Vehicule {
    constructor(enginePower) {
        // permet d'appeler le constructeur du parent
        super(2, enginePower); // -> nombre de roues et puissance
    }

    // SURCHARGER la methode toString
    toString() {
        return "Moto : " + super.toString();
    }
}

const maCaisse = new Voiture(90);
console.log(maCaisse.toString());
console.log( maCaisse instanceof Voiture);
console.log( maCaisse instanceof Vehicule);

const maMoto = new Moto(100);
console.log(maMoto.toString());

console.log( maMoto instanceof Moto);
console.log( maMoto instanceof Voiture);
console.log( maMoto instanceof Vehicule);

const kodiaq = new SUV(150);

console.log(kodiaq.toString());