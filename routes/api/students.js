var express = require('express');
var router = express.Router();
var Joi = require('joi');
var app = express();

app.use(express.json());

// api/students

const students = [
    {
        id: 1,
        name: 'Jonatan'
    },
    {
        id: 2,
        name: 'Rafael'
    },
    {
        id: 3,
        name: 'Juan'
    }
]

router.get('/', (req, res) => {
    res.send(students);
})

router.get('/:id', (req, res) => {
    const student = students.find(x => x.id == req.params.id);
    if(!student) {
        res.status(404).send('O aluno não foi encontrado');
        return;
    }
    
    res.send(student);
    // res.send(req.query) //get query string ?
})

router.post('/', (req, res) => {
    const { error } = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const student = {
        id: students.length + 1,
        name: req.body.name
    };

    students.push(student);
    res.send(student);
})

router.put('/:id', (req, res) => {
    let student = students.find(x => x.id == req.params.id);
    if(!student){
        res.status(404).send('O aluno não existe');
        return;
    }

    const { error } = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    student.name = req.body.name;
    res.send(student);
});

router.delete('/:id', (req, res) => {
    let student = students.find(x => x.id == req.params.id);
    if(!student){
        res.status(404).send('O aluno não existe');
    }

    const index = students.indexOf(student);
    students.splice(index, 1);

    res.send(student);
})

function validate(student){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(student, schema);
}

module.exports = router;