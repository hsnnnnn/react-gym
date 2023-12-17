require('dotenv').config();
var express = require("express");
var router = express.Router();
const expressession = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');
const config = require('../config');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { google } = require('googleapis');
app.use(expressession({
  secret: '', 
  resave: false,
  saveUninitialized: true
}));
console.log(config);
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(expressession())
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


// checking if the user is authenticated
passport.use(new GoogleStrategy({
  clientID: '',
  clientSecret: '',
  callbackURL: process.env.REDIRECT_URI || "",
  scope: ['profile', 'email']
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));



passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {

    console.log(req.user);
    res.redirect('/'); 
  }
);











// nodemailer




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: '',
  },
});


const User = mongoose.model('User', { email: String, verificationCode: String, isVerified: Boolean });
mongoose.connect('mongodb://localhost:27017/mailverification', { useNewUrlParser: true, useUnifiedTopology: true });
app.post('/register', async (req, res) => {
  const { email } = req.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const user = await User.findOne({email});
  if (user) {
    if (!user.isVerified) {
      try {
        const newUser = new User({ email, verificationCode, isVerified: false });
        await newUser.save();
    
        const mailOptions = {
          from: 'hsnistaken361@gmail.com',
          to: email,
          subject: 'Hesap Doğrulama',
          text: `Doğrulama kodunuz: ${verificationCode}`,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Mail gönderme hatası:', error);
            return res.status(500).send('Mail gönderme hatası');
          }
    
          const expirationTime = 3 * 60 * 1000; 
          const tokenData = {
            expiresAt: Date.now() + expirationTime,
          };
    
          res.json(tokenData);
        });
      } catch (error) {
        console.error('Kullanıcı kaydetme hatası:', error);
        res.status(500).send('Kullanıcı kaydetme hatası');
      }
      return
    } else {
      console.log(132)
        res.json({message: 'Kullanıcı zaten kayıtlı.'});
      return
    }
    
  }
  try {
    const newUser = new User({ email, verificationCode, isVerified: false });
    await newUser.save();

    const mailOptions = {
      from: 'hsnistaken361@gmail.com',
      to: email,
      subject: 'Hesap Doğrulama',
      text: `Doğrulama kodunuz: ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Mail gönderme hatası:', error);
        return res.status(500).send('Mail gönderme hatası');
      }

      const expirationTime = 3 * 60 * 1000; 
      const tokenData = {
        expiresAt: Date.now() + expirationTime,
      };

      res.json(tokenData);
      
    });
  } catch (error) {
    console.error('Kullanıcı kaydetme hatası:', error);
    res.status(500).send('Kullanıcı kaydetme hatası');
  }
});


app.post('/check-verification-code', async (req, res) => {
  let returnData = { isVerified: false };
  const code = req.body.fullcode;
  const email = req.body.email;

  try {
    const checked = await checkVerificationCode(email, code);
    console.log(175, checked);

    if (checked) {
      returnData.isVerified = true;
    }

    res.json(returnData);
  } catch (error) {
    console.error('Bir hata oluştu:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function checkVerificationCode(email, codeToCheck) {
  try {
    const user = await User.findOne({ email, verificationCode: codeToCheck });

    if (user) {
      await User.updateOne({ _id: user._id }, { $set: { isVerified: true } });
      console.log(`Kullanıcının verificationCode'u doğru.`);
      return true;
    } else {
      console.log(`Kullanıcının verificationCode'u yanlış.`);
      return false;
    }
  } catch (error) {
    console.error('VerificationCode kontrol hatası:', error);
    throw error; 
  } finally {
    
  }
}


app.post('/verify', async (req, res) => {
  const { email, verificationCode } = req.body;

  const user = await User.findOne({ email, verificationCode });

  if (user) {

    user.isVerified = true;
    await user.save();
    res.status(200).send('Doğrulama başarılı.');
  } else {
    res.status(400).send('Doğrulama kodu hatalı.');
  }
});





























mongoose.connection.on('connected', () => {
  console.log('MongoDB bağlantısı başarılı.');
});

// Bağlantı hatası olduğunda
mongoose.connection.on('error', (err) => {
  console.error('MongoDB bağlantı hatası:', err);
});

// Uygulama kapatıldığında bağlantıyı kapat
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB bağlantısı kapatıldı.');
    process.exit(0);
  });
});




app.get('/', (req, res) => {
  res.send(req.user);
});


app.get('/getconfig', (req, res) => {
  const config = process.env
  res.send(config);
});

app.listen(3001, () => console.log("Up & RUnning *3001"));

module.exports = router;

