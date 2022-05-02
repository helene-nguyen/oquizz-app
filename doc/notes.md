## Relation 1,N

1,N -> Relation assez peu commune. Très souvent c'est le 0,N qui est utilisé car la relation 1,N sous entend que l'entité A ne peux exister sans au moins 1 Entité B.


## Relation : 
- OneToOne : 1 vers 1 (1 -> 1) -> FK sur A ou B
- OneToMany : 1 A vers Plusieurs B (1 -> N) -> FK sur B (A_id)
- ManyToMany : Plusieurs vers plusieurs (N -> N) -> Table de liaison entre A et B


## Constructeur & Getter et Setter : 

-> Constructor : code qui est appelé à l'instanciation "la fabrication de de l'objet" -> I.E. : L'usine fabrique la voiture avec les options

-> Getter et Setter : Permet de récupérèr les propriétés d'un objet et les modifier APRES l'existance de celle-ci. -> I.E -> JE peux pas repeindre une voiture en #F0F si elle n'a pas encore été fabriquée
    - https://www.figma.com/file/j5sOLgd8NI2dYkrxo2H4a1/Untitled?node-id=0%3A1


## Schema MVC

[https://www.figma.com/file/uUvmN0WmkjiKwbQAUEAvXm/MVC?node-id=0%3A1]