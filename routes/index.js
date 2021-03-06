var express = require('express');
var router = express.Router();

var quiz_Controller = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz',errors:[] });
});

router.get('/author', function(req, res) {
  res.render('author', {errors:[]});
});

//router.get('/quizes/question', quiz_Controller.question);
//router.get('/quizes/answer', quiz_Controller.answer);

// Autoload de comandos con :quizId
router.param('quizId', quiz_Controller.load); // autoload :quizId
router.param('commentId', commentController.load);

// Definición de rutas de /quizes
router.get('/quizes/stadistics', quiz_Controller.stadistics);
router.get('/quizes', quiz_Controller.index);
router.get('/quizes/:quizId(\\d+)', quiz_Controller.show);
router.get('/quizes/new',sessionController.loginRequired, quiz_Controller.new);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired, quiz_Controller.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired, quiz_Controller.update);
router.post('/quizes/create',sessionController.loginRequired,  quiz_Controller.create);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired, quiz_Controller.destroy);
router.get('/quizes/:quizId(\\d+)/answer', quiz_Controller.answer);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

module.exports = router;
