const db = require('../db/db');
const fs = require('fs');
const path = require('path');

    async function home (req, res) {
    let [rows, fields] = await db.query(`SELECT * FROM offre_emploie `)
    let waitingRows = await db.query(`SELECT * FROM offre_emploie WHERE offre_emploie.waiting = 1`)
    const waitingCount = waitingRows[0].length;
    let refusedRows = await db.query(`SELECT * FROM offre_emploie WHERE offre_emploie.refused = 1`)
    const refused = refusedRows[0].length;
      let validedRows = await db.query(`SELECT * FROM offre_emploie WHERE offre_emploie.valided = 1`)
    const valided = validedRows[0].length;
 let relancedRows = await db.query(`
                                                                SELECT *
                                                                FROM offre_emploie
                                                                WHERE date(date_emploie) = date('now', '-7 days');
                                                                `);

    res.render('home.ejs' , {lastCandidature:rows , waitingCount:waitingCount , refused:refused , valided:valided , relancedRows:relancedRows})

}

        async function alternance(req, res, next) {
        try {
            // 1) Récupère toutes les offres, triées par date décroissante
            const [rows] = await db.query(`
            SELECT *
            FROM offre_emploie
            ORDER BY date_emploie DESC
            `);

            // 2) Regroupe par date (format fr-FR « mardi 15 juillet 2025 »)
            const grouped = rows.reduce((acc, row) => {
            const dateKey = new Date(row.date_emploie)
                .toLocaleDateString('fr-FR', {
                weekday: 'long',
                day:     'numeric',
                month:   'long',
                year:    'numeric'
                });
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(row);
            return acc;
            }, {});

            // 3) Passe l’objet groupé à ta vue
            res.render('alternance.ejs', { groupedAlternances: grouped });
        } catch (err) {
            next(err);
        }
        }

async function docs(req, res) {
    const docsPath = path.join(__dirname, '../public/docs/cv');
    fs.readdir(docsPath, (err, files) => {
        if (err) {
        console.error('Erreur lecture dossier:', err);
        return res.status(500).send('Erreur lors du chargement des documents');
        }
        const pdfs = files.filter(file => file.endsWith('.pdf'));
        res.render('doc.ejs', { pdfs });
    });
    }

async function motivation (req , res){
    const lettreDir = path.join(__dirname, '..', 'public', 'docs', 'motivation_letter');
    const lettreFiles = fs.readdirSync(lettreDir).filter(file => file !== '.DS_Store');

    res.render('motivation.ejs',  { lettreFiles })
}

async function msg (req ,res){
    let [rows , fields] =  await db.query(`SELECT * FROM model_message`)
    res.render('model-message.ejs' , {msgs:rows})
}
async function post (req , res){
    let id = req.params.id
    let [rows , fields] = await db.query(`SELECT * FROM offre_emploie WHERE id = ?`,  [id])
    
    let posts = rows[0]
    res.render("post.ejs" , {posts})
}
async function addPost (req , res) {
    let name_emploie = req.body.name_emploie
    let entreprise = req.body.entreprise
    let type_emploie = req.body.type_emploie
    let description = req.body.description
    let city_job = req.body.city_job
    let plateform_job = req.body.plateform_job
    let link_job = req.body.link_job
    try{
    await db.query(`INSERT INTO offre_emploie 
                                (name_emploie, entreprise, type_emploie, description_job, plateform_job , city_job,  link_job)
                                VALUES (? , ? , ? , ? , ? , ? , ?)` , [name_emploie , entreprise , type_emploie , description , plateform_job ,city_job  , link_job])

    res.redirect('/alternance')
    console.log('la requete est passé')
    }catch{
        res.render('404')
    }
}
async function todo(req ,res) {
    let [rows , fields] = await db.query(`SELECT * FROM todo`)
    res.render('todo.ejs' , {todos:rows})
}
async function postTodo(req,res) {
    let todo = req.body.todo
    let [rows , fields] = await db.query(`INSERT INTO todo (todo_name) VALUES (?)` , [todo])
    res.redirect('/todo')
}

async function deleteTodo(req , res) {
    let id = req.params.id
    let [rows , fields] = await db.query(`DELETE FROM todo WHERE id = ?` , [id])
    res.redirect('/todo')
}
async function entreprise(req,res) {
    let [rows , fields] = await db.query(`SELECT * FROM entreprise`)
    res.render('entreprise.ejs' , {entreprises:rows})
}
async function postEntreprise(req , res) {
    let entrepriseName  = req.body.NameEntreprise
    let entrepriseMail  = req.body.emailEntreprise
    let entreprise_phone = req.body.telEntreprise
    let [rows , fields] = await db.query(`INSERT INTO entreprise (entreprise_name  , entreprise_phone  , entreprise_mail ) VALUES (?,?,?)` , [entrepriseName , entreprise_phone , entrepriseMail])

res.redirect('/entreprise')
}

async function message(req , res) {
    let titleMessage = req.body.titleMessage
    let message = req.body.message
    let [rows , fields] = await db.query(`INSERT INTO model_message (message_core , title) VALUES (?,?)` , [message , titleMessage])
    res.redirect('/model')
}
async function deleteMessage(req , res) {
    let id = req.params.id
    await db.query(`DELETE FROM model_message WHERE id = ? ` , [id])
    res.redirect('/model')
}
async function deleteMessage(req , res) {
    let id = req.params.id
    await db.query(`DELETE FROM model_message WHERE id = ? ` , [id])
    res.redirect('/model')
}

async function deleteAlternance(req , res) {
    let id = req.params.id
    await db.query(`DELETE FROM offre_emploie WHERE id = ? ` , [id])
    res.redirect('/alternance')
}

async function deleteEntreprise(req , res) {
    let id = req.params.id
    await db.query(`DELETE FROM entreprise WHERE id = ? ` , [id])
    res.redirect('/entreprise')
}

async function waiting(req , res) {
    let updateValided = 0
    let updateRefused = 0
    let updateWaiting = 1
    let id = req.params.id
    await db.query(`UPDATE offre_emploie SET valided = ? , refused = ? , waiting = ?  WHERE id = ?`,  [updateValided , updateRefused , updateWaiting, id])
    res.redirect('/alternance')
}

async function accepted (req , res){
    let updateValided = 1
    let updateRefused = 0
    let updateWaiting = 0
    let id = req.params.id
    await db.query(`UPDATE offre_emploie SET valided = ? , refused = ? , waiting = ?  WHERE id = ?`,  [updateValided , updateRefused , updateWaiting, id])
    res.redirect('/alternance')
}
async function refused (req , res) {
    let updateValided = 0
    let updateRefused = 1
    let updateWaiting = 0
    let id = req.params.id
    await db.query(`UPDATE offre_emploie SET valided = ? , refused = ? , waiting = ?  WHERE id = ?`,  [updateValided , updateRefused , updateWaiting, id])
    res.redirect('/alternance')
}

async function calendar(req , res) {
     let [rows , fields] = await db.query(`SELECT * FROM appointments `)
    res.render('calendar.ejs')
}
async function addscheduleAppointment(req, res) {
  // 1) On récupère les données du formulaire
  const { context, appointment_date } = req.body;

  try {
    // 2) On exécute l'INSERT en passant bien les deux valeurs
    await db.query(
      `INSERT INTO appointments (context, appointment_date)
       VALUES (?, ?)`,
      [context, appointment_date]
    );

    // 3) On peut ensuite recharger la vue du calendrier, ou rediriger
    // Par exemple, si tu as un route GET /calendar qui affiche tout :
    return res.redirect('/calendar');
  } catch (err) {
    console.error('❌ Erreur addscheduleAppointment:', err);
    return res.status(500).send('Erreur interne lors de la planification du RDV.');
  }
}

module.exports.addscheduleAppointment = addscheduleAppointment
module.exports.calendar = calendar
module.exports.refused = refused
module.exports.accepted = accepted
module.exports.waiting = waiting
module.exports.deleteEntreprise = deleteEntreprise
module.exports.deleteAlternance = deleteAlternance
module.exports.deleteMessage = deleteMessage
module.exports.message = message
module.exports.postEntreprise = postEntreprise
module.exports.entreprise = entreprise 
module.exports.deleteTodo = deleteTodo
module.exports.postTodo = postTodo
module.exports.todo = todo
module.exports.addPost = addPost
module.exports.post = post
module.exports.msg = msg
module.exports.motivation = motivation
module.exports.docs = docs
module.exports.alternance = alternance
module.exports.home = home
