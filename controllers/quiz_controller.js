//Importamos el modelo
var models = require('../models/models.js');
/*
exports.question = function(req, res) {
  models.Quiz.findAll().then(function(quiz) {
  	res.render('quizes/question', { pregunta: quiz[0].pregunta});
  })
};
*/

// Autoload :id
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { 
				next(new Error('No existe quizId=' + quizId)); 
			}
		}
	).catch(function(error) { next(error);});
};

exports.new = function(req, res) {
	 var quiz = models.Quiz.build(
	 	{pregunta: "Pregunta", respuesta: "Respuesta"}
	 );

	 res.render('quizes/new', {quiz: quiz,errors:[]});
};

// POST /quizes/create
exports.create = function(req, res) {
var quiz = models.Quiz.build( req.body.quiz );
var errors = quiz.validate();
	if (errors) {
	var i=0; var errores=new Array();
	//se convierte en [] con la propiedad message por compatibilida con layout
	for (var prop in errors) errores[i++]={message: errors[prop]}; 
		res.render('quizes/new', {quiz: quiz, errors: errores});
	} else {
		// save: guarda en DB campos pregunta y respuesta de quiz
		quiz.save({fields: ["pregunta", "respuesta"]}).then( 
		function(){ res.redirect('/quizes')})
		} // res.redirect: Redirección HTTP a lista de preguntas
		
};


exports.index = function(req, res) {
  console.log(req.query.search);
  if(req.query.search){
	models.Quiz.findAll({where:["pregunta like ?", "\%"+ req.query.search+"\%"]}).then(function(quizes) {
  		res.render('quizes/index.ejs', {quizes:quizes, errors:[]});
  	}).catch(function(error) { next(error);});
  }
  else{
	  models.Quiz.findAll().then(function(quizes) {
	  	res.render('quizes/index.ejs', {quizes:quizes, errors:[]});
	  }).catch(function(error) { next(error);});
  }
};

exports.show = function(req, res) {
  	res.render('quizes/show', { quiz: req.quiz, errors:[]});
};



exports.answer = function(req, res) {
 	if (req.query.respuesta === req.quiz.respuesta) {
  		res.render('quizes/answer', {quiz:req.quiz, respuesta: 'Correcto',errors:[] });
	}
	else{
		res.render('quizes/answer', {quiz:req.quiz, respuesta: 'Incorrecto',errors:[] });	
	}	
};
