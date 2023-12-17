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
  secret: '165196196515160', // Bu değeri güvenli bir şekilde saklayın
  resave: false,
  saveUninitialized: true
  // Diğer session ayarlarını da ekleyebilirsiniz
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
  clientID: '1026510455576-49a6uqu9n8a1sgmeprtl8sev7uitfvgv.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: process.env.REDIRECT_URI || "http://localhost:3001/auth/google/callback",// Bu URL'yi Google API Console'da doğruladığınızdan emin olun
  scope: ['profile', 'email']
},
(accessToken, refreshToken, profile, done) => {
  // Kullanıcı verilerini işleyin
  return done(null, profile);
}));



passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Google ile giriş sayfası
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
// Google'dan dönen çağrı
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Başarılı kimlik doğrulama sonrasında yönlendirilecek rota
    console.log(req.user);
    res.redirect('/'); // İsterseniz bir sayfaya yönlendirme yapabilirsiniz
  }
);











// nodemailer




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hsnistaken361@gmail.com',
    pass: 'aqde nndd zixa zsil',
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
    
          const expirationTime = 3 * 60 * 1000; // 3 dakika (ms cinsinden)
          const tokenData = {
            expiresAt: Date.now() + expirationTime,
          };
    
          res.json(tokenData);
          // res.status(200).send('Kullanıcı kaydı başarılı. Lütfen e-postanızı kontrol edin.'); // Bu satırı kaldırın
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

      const expirationTime = 3 * 60 * 1000; // 3 dakika (ms cinsinden)
      const tokenData = {
        expiresAt: Date.now() + expirationTime,
      };

      res.json(tokenData);
      // res.status(200).send('Kullanıcı kaydı başarılı. Lütfen e-postanızı kontrol edin.'); // Bu satırı kaldırın
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
    throw error; // Hata durumunda hatayı yöneten fonksiyonlara iletmek için
  } finally {
    // İşlemler bittiğinde yapılacak işlemler
  }
}


app.post('/verify', async (req, res) => {
  const { email, verificationCode } = req.body;

  // Veritabanında kullanıcıyı bul ve doğrulama kodunu kontrol et
  const user = await User.findOne({ email, verificationCode });

  if (user) {
    // Doğrulama başarılı, kullanıcıyı güncelle
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

