var express = require('express');
var router = express.Router();

var quiz_Controller = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req, res) {
  res.render('author', {});
});

//router.get('/quizes/question', quiz_Controller.question);
//router.get('/quizes/answer', quiz_Controller.answer);
// Autoload de comandos con :quizId
router.param('quizId', quiz_Controller.load); // autoload :quizId

// Definición de rutas de /quizes
router.get('/quizes', quiz_Controller.index);
router.get('/quizes/:quizId(\\d+)', quiz_Controller.show);
router.get('/quizes/:quizId(\\d+)/answer', quiz_Controller.answer);

module.exports = router;
