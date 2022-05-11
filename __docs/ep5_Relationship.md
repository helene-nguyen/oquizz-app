# Relationships

## Les associations dans Sequelize

Dans le but de gérer les associations, on crée d'abord les modèles et ENSUITE on associe.

Tout se passe dans index.js qu'on mettra dans notre dossier *models*, pour nous permettre d'utiliser les assocations entre les tables avec Sequelize, on va devoir les définir dans un premier temps.

Il y a 4 modèles d'associations avecSequelize :

> hasOne = a un seul

> hasMany = a plusieurs

> belongsTo = appartient à

> belongsToMany = appartient à plusieurs

```js
//~require models
const Level = require('./level');
const Answer = require('./answer');
const Question = require('./question');
const Quiz = require('./quiz');
const Tag = require('./tag');
const User = require('./user');

//~associations
//^------------Level - Question
Question.belongsTo(Level, {
    foreignKey: 'level_id'
});

Level.hasMany(Question, {
    foreignKey: 'level_id'
});

//^-----------Question - Answer
Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answers'
});

Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question'
});

Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'good_answer'
});

//^-----------Question - Quiz
Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    as: 'quiz'
});
    
Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
    as: 'questions'
});


//^-----------Quiz - User
Quiz.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});
    
User.hasMany(Quiz, {
    foreignKey: 'user_id',
    as: 'quiz_list'
});


//^-----------Quiz - Tag
// MANIERE D'ECRIRE LORSQU'IL Y A UNE TABLE PIVOT

Tag.belongsToMany(Quiz, { //on est sur Tag
    as: 'quizList', //donc en faisant table.quizlist on va retrouver nos éléments
    foreignKey: 'quiz_id', //on cherche tous les éléments associés à cette clé
    through: 'quiz_has_tag', //en passant par cette table de liaison, va chercher les associations
    otherKey: 'tag_id' //a spécifier cette clé pour faire la liaison entre plusieurs ressources
})

//reciproque
Quiz.belongsToMany(Tag, {
    as: 'tags',
    foreignKey: 'quiz_id', //reciproque la meme
    through: 'quiz_has_tag',
    otherKey: 'tag_id'

})


//~export modules
module.exports = {
    Level,
    Answer,
    Question,
    Quiz,
    Tag,
    User
}
```

(Astuce category - product pour définir les associations)

Et cela nous permet donc d'utiliser cela dans notre controller de la manière suivante :

```js
//test pour utiliser la table de liaison et les alias
const tags = await Tag.findAll({
        include: [{
                association: 'quiz_list' // notre alias ici
        }],
        attributes: {
                exclude: ['created_at', 'updated_at']
        }
        });

```


### Autre

Exemple de requête SQL avec une table de liaison :

```js
SELECT quiz.title, tag."name" 
FROM "quiz"
JOIN "quiz_has_tag"
ON quiz.id = quiz_id
JOIN "tag"
ON tag.id = tag_id
WHERE tag.id = 1
ORDER BY "title";
```

Exemple de requête qu'on peut avoir si on n'utilise pas les associations avec Sequelize :

```sql
Executing (default): SELECT "Tag"."id", "Tag"."name", "quizList"."id" 
AS "quizList.id", "quizList"."title" 
AS "quizList.title", "quizList"."description" 
AS "quizList.description", "quizList"."user_id" 
AS "quizList.user_id", "quizList"."created_at" 
AS "quizList.created_at", "quizList"."updated_at" 
AS "quizList.updated_at", "quizList->quiz_has_tag"."created_at" 
AS "quizList.quiz_has_tag.created_at", "quizList->quiz_has_tag"."updated_at" 
AS "quizList.quiz_has_tag.updated_at", "quizList->quiz_has_tag"."quiz_id" 
AS "quizList.quiz_has_tag.quiz_id", "quizList->quiz_has_tag"."tag_id" 
AS "quizList.quiz_has_tag.tag_id" 
FROM "tag" AS "Tag" 
LEFT OUTER JOIN ( "quiz_has_tag" AS "quizList->quiz_has_tag" 
INNER JOIN "quiz" AS "quizList" 
ON "quizList"."id" = "quizList->quiz_has_tag"."tag_id") 
ON "Tag"."id" = "quizList->quiz_has_tag"."quiz_id";
```
