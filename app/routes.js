var User = require('./user');
var os = require('os');
var fullname = require('fullname');
var userdetails = require('username')

var userName = os.userInfo().username;



module.exports = function(app, passport){
  
  app.get('/', function(req, res){
    res.render('index.ejs');
  });

  app.get('/login', function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-login', {
    
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
    })
  );

  app.get('/system-login', function(req, res){
    res.render('system-login.ejs', { message: req.flash('signupMessage') });
  });


  app.post('/system-login', function(req,res){
      User.findOne({local:{username: userName}})
      .exec()
      .then(function(doc){
        if(doc){
          console.log("Success")
          return res.render('profile.ejs', { user: doc.local.username})
          grdgdfgs
        
        }
        else{
        
          console.log("Failed")
        }
        
      });
      console.log("........................"+JSON.stringify(os.userInfo()));
      console.log("......................."+os.userInfo().username);
      console.log("......................."+os.userInfo().uid);
      console.log("......................."+os.userInfo().gid);
      console.log("......................."+os.userInfo().shell);
      console.log("......................."+os.userInfo().homedir);
      console.log("......................."+os.hostname());
      console.log("..................."+userdetails.sync());
      console.log("........................"+fullname());
      console.log("........................");
      console.log("........................");
 
  })

  app.get('/signup', function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });
  

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', { user: req.user });
  });


  // app.get('/profile', function(req, res){
  //   res.render('profile.ejs', { user: req.user});
  // });



  app.get('/:username/:password', function(req, res){
    var newUser = new User();
    newUser.local.username = req.params.username;
    newUser.local.password = req.params.password;
    console.log(newUser.local.username + " " + newUser.local.password);
    newUser.save(function(err){
      if(err)
        throw err;
    });
    res.send("Success!");
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  })

};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
}