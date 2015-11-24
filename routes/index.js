var express = require('express');
var router = express.Router();

var async = require('async'),
    redis = require('redis');

var Jailor = require('../models/jailor'),
    Prisoner = require('../models/prisoner'),
    Items = require('../models/items'),
    Crimes = require('../models/crime');

//var client = redis.createClient();
/*
client.on('error', (err) => {
   console.log(err);
});*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prison Management System' });
});

router.get('/login', function(req, res, next) {
    res.render('index', { title: 'Prison Management System' });
});



router.post('/login', function (req, res) {
  console.log(req.body);

    async.parallel([
        (callback) => Jailor.getJailor(req.body, callback),
        (callback) => Prisoner.getAll(callback)
    ], (err, results) => {
        if (err) {
            res.render('error', {
                message: err
            })
        }
        else {
            //res.json(results);
            /*res.render('home', {
                prisoners: results[1]
            });*/
            res.redirect('home');
        }
    });

});

router.get('/home', (req, res) => {

/*
        client.hgetall('prisoners', (err, object) => {
            console.log(err, object);
           if (err || !object || object.length == 0) {*/
               Prisoner.getAll((err, prisoners) => {

                   async.map(prisoners, Items.getItemOfPrisoner, (err, results) => {
                       for (var i = 0; i < results.length; i++) {
                           prisoners[i].items = results[i];
                       }

                       async.map(prisoners, Crimes.getPrisonersOfCrime, (err, results) => {
                           for (var i = 0; i < results.length; i++) {
                               prisoners[i].crimes = results[i];
                           }


                           //client.hmset('prisoners', prisoners);

                           if (err) {
                               console.log(err);
                               res.render("error", {
                                   message: err
                               });

                               /*res.json({
                                   message: err
                               });*/
                           } else {
                               res.render("home", {
                                   prisoners: prisoners
                               });
                               /*res.json({
                                   prisoners: prisoners
                               });*/
                           }
                       });


                   });

               });
          /* } else {
               /!*res.render("home", {
                   prisoners: object
               });*!/
               res.json({
                   prisoners: object
               })
          }
        });*/

});

router.post('/search', (req, res) => {
    var crime = req.body.search;
    console.log(crime);
    Prisoner.getAll((err, prisoners) => {

    async.map(prisoners, Items.getItemOfPrisoner, (err, results) => {
        for (var i = 0; i < results.length; i++) {
            prisoners[i].items = results[i];
        }

        async.map(prisoners, Crimes.getPrisonersOfCrime, (err, results) => {
            for (var i = 0; i < results.length; i++) {
                prisoners[i].crimes = results[i];
            }
            
            for (var i = 0; i < prisoners.length; i++) {
                console.log(prisoners[i].crimes);
                var k = [];
                for(var j = 0; j <= prisoners[i].crimes.length; j++) {
                    if (prisoners[i].crimes[j]) {
                        console.log('s');
                        k.push(prisoners[i].crimes[j].name);
                    }
                }
                
                if(k.indexOf(crime) == -1) {
                    console.log("Now deleting", k);
                    delete prisoners[i];
                } 
            }
            
            console.log(prisoners);
            prisoners = prisoners.filter(p => p != true);

            //client.hmset('prisoners', prisoners);

            if (err) {
                console.log(err);
                res.render("error", {
                    message: err
                });

                /*res.json({
                    message: err
                });*/
            } else {
                res.render("home", {
                    prisoners: prisoners
                });
                /*res.json({
                    prisoners: prisoners
                });*/
            }
        });


    });

});
})

module.exports = router;
