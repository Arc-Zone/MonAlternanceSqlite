const express = require("express")
const homeController = require('../controllers/home.js')
const router = express.Router()
const { uploadCV, uploadLettre } = require('../config/multer');
const path = require("path");
const fs = require('fs');




router.get('/', homeController.home)
router.get('/alternance', homeController.alternance)
router.get('/docs' , homeController.docs)
router.get('/motivation' , homeController.motivation)
router.get('/model' , homeController.msg)
router.get('/post/:id' , homeController.post)
router.get('/todo' , homeController.todo)
router.get('/entreprise' , homeController.entreprise)
router.get('/calendar' , homeController.calendar)


router.post('/deleteAlternance/:id' , homeController.deleteAlternance)
router.post('/postEntreprise' , homeController.postEntreprise)
router.post('/addPost' , homeController.addPost)
router.post('/postTodo' , homeController.postTodo)
router.post('/deleteTodo/:id' , homeController.deleteTodo)
router.post('/message' , homeController.message)
router.post('/deleteMessage/:id' , homeController.deleteMessage )
router.post('/deleteEntreprise/:id' , homeController.deleteEntreprise )
router.post('/scheduleAppointment/addscheduleAppointment' , homeController.addscheduleAppointment)
router.post('/updateStatus/waiting/:id' , homeController.waiting)
router.post('/updateStatus/accepte/:id', homeController.accepted)
router.post('/updateStatus/refuse/:id' , homeController.refused)

router.post('/upload-doc', uploadCV.single('cv'), (req, res) => {
    res.redirect('/docs');
});

router.post('/delete-doc', (req, res) => {
    const filename = req.body.filename;

    const filePath = path.join(__dirname, '..', 'public', 'docs', 'cv' , filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Erreur lors de la suppression :', err);
            return res.status(500).send('Erreur serveur');
        }
        console.log('Fichier supprimé :', filename);
        res.redirect('/docs');
    });
});
router.post('/delete-lettre', (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'docs', 'motivation_letter', req.body.filename);
  fs.unlinkSync(filePath);
  res.redirect('/motivation');
});

router.post('/upload-lettre', uploadLettre.single('letterFiles'), (req, res) => {
    res.redirect('/motivation');
});


module.exports.router = router