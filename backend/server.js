const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3001;
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, './uploads');  // The folder where files will be stored
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);  // Generate unique filename
    return cb(null, filename);  // Provide the generated filename
  }
});
const upload = multer({ storage })
// MongoDB model
const User = require('./models/User.js');
const Product = require('./models/Product.js');
const Ingredients = require('./models/Ingridients.js');
const Posts = require('./models/Posts.js');

app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from React frontend
  credentials: true                // Enable credentials (cookies, sessions)
}));
app.use(cookieParser());
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
// Session setup
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/pharma',
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false
  }
}));
const csrfProtection = csurf({
  cookie: {
    httpOnly: false, // ✅ allow JS access
    secure: false,   // 🔒 set to true in production with HTTPS
    sameSite: 'Lax',
  }
});
// Passport setup
app.use(passport.initialize());
app.use(passport.session());
app.use(csrfProtection);
// Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'mail',
  passwordField: 'pass'
}, async (mail, pass, done) => {
  try {

    const user = await User.findOne({ mail: mail });
    if (!user) return done(null, false, { message: 'User not found' });

    const match = await bcrypt.compare(pass, user.pass);
    if (!match) return done(null, false, { message: 'Incorrect password' });

    return done(null, user._id);
  } catch (err) {
    return done(err);
  }
}));
  
passport.serializeUser((user, done) => {
  done(null, user); // only store ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // ✅ pass whole user object
  } catch (err) {
    done(err);
  }
});


// MongoDB connection 
mongoose.connect('mongodb://127.0.0.1:27017/pharma')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Auth middleware 
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send('Unauthorized');
}


app.get('/get_csrf', (req, res) => {
  const token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token, {
    httpOnly: false, // ✅ So frontend JS can read it
    secure: false,   // 🔒 true in prod with HTTPS
    sameSite: 'Lax',
  });
  res.json({ csrfToken: token }); // Optional, you can skip this if you only want the cookie
});
app.post('/signup', async (req, res) => {
  const { name, pass, mail } = req.body;
  const hashedpass = await bcrypt.hash(pass, 10);
  const user = new User({ name, pass: hashedpass, mail,products:[],
    ingridients:[], 
    temporary:[],
    post:[],
    bookmarks:[] });

  await user.save();
  res.json({ msg: 'User added' });
});

app.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ msg: info.message || 'Invalid credentials' }); // always return JSON
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ msg: 'Login successful' });
    });
  })(req, res, next);
});

app.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Logout error');
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.send('Logged out');
    });
  });
});

app.post('/add_product', ensureAuth, upload.any(), async (req, res) => {
  try {
    let { name, subtitle, description } = req.body
    let userid = req.user

    let secondary_benefits_text = JSON.parse(req.body.secondary_benefits_text || '[]');
    let primary_benefits = JSON.parse(req.body.primary_benefits || '[]');
    let allIngredients = JSON.parse(req.body.allIngredients || '[]');
    let faqs = JSON.parse(req.body.faqs || '[]');
    let quantities = JSON.parse(req.body.quantities || '[]');
    let dosage_text = JSON.parse(req.body.dosage_text || '[]');
    let usage_text = JSON.parse(req.body.usage_text || '[]');
    let duration_text = JSON.parse(req.body.duration_text || '[]');
    let additional_text = JSON.parse(req.body.additional_text || '[]');
    let primaryIngredients = JSON.parse(req.body.primaryIngredients || '[]');
    console.log({
      userid,
      name,
      subtitle,
      description,
      primary_benefits,
      allIngredients,
      faqs,
      quantities,
      secondary_benefits_text,
      dosage_text,
      usage_text,
      duration_text,
      additional_text,
      primaryIngredients
    });

    let filesMap = {};
    req.files.forEach(file => {
      if (!filesMap[file.fieldname]) {
        filesMap[file.fieldname] = [];
      }
      filesMap[file.fieldname].push(file.filename); // or push full file object if needed
    });
    console.log(filesMap);

    let new_product = new Product({
      user: userid,
      name,
      description,
      quantities,
      subtitle,
      thumbnail: filesMap.thumbnail[0],
      images: filesMap.images,
      primary_benefits,
      secondary_benefits: secondary_benefits_text.map((text, index) => ({
        text,
        image: filesMap.Secondary_Benefits_image?.[index] || null
      })),
      primaryIngredients:primaryIngredients,
      allIngredients,
      duration: duration_text.map((text, index) => ({
        text,
        image: filesMap.duration_image?.[index] || null
      })),

      dosage: dosage_text.map((text, index) => ({
        text,
        image: filesMap.dosage_image?.[index] || null
      })),
      usage: usage_text.map((text, index) => ({
        text,
        image: filesMap.usage_image?.[index] || null
      })),
      faqs,
      // title,
      additionalDisplay: additional_text.map((text, index) => ({
        name: text,
        image: filesMap.additional_image?.[index] || null
      })),
    })
    await new_product.save()
    let user = await User.findById(userid)
    user.products.push(new_product._id)
    await user.save()
    res.status(200).json({ message: 'success', msg: true, product: new_product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});
app.get('/get_products', ensureAuth, async (req, res) => {
  try {
    let user = req.user

    let products = await Product.find({ user: user })
    console.log(products);
    res.status(200).json({ message: 'success', msg: true, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/get_store_products', ensureAuth, async (req, res) => {
  try {
   

    let products = await Product.find()
    console.log(products);
    res.status(200).json({ message: 'success', msg: true, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/get_ing_info', ensureAuth, async (req, res) => {
  try {
    let user = req.user
    console.log(user);
    let ingredients=await Ingredients.find({user:user})
    
 res.status(200).json({ message: 'success', msg: true, ingredients });
  } catch (err) {

    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/add_ing', ensureAuth, upload.any(), async (req, res) => {
  try {
    let filesMap = {};
    req.files.forEach(file => {
      if (!filesMap[file.fieldname]) {
        filesMap[file.fieldname] = [];
      }
      filesMap[file.fieldname].push(file.filename); // or push full file object if needed
    });
    // console.log(filesMap);
    let userid = req.user;
    let name = req.body.name;
    let scientific_name = req.body.scientific_name;
    let sanskrit_name = req.body.sanskrit_name;
    let image = filesMap.image;
    let uses = req.body.uses;
    let vata = req.body.vata;
    let kapha = req.body.kapha;
    let v_reason = req.body.v_reason;
    let k_reason = req.body.k_reason;
    let benefits_text = JSON.parse(req.body.benefits_text || '[]'); let benefits_image = filesMap.benefits_image;
    let rasa = req.body.rasa;
    let veerya = req.body.veerya;
    let guna = req.body.guna;
    let vipaka = req.body.vipaka;
    let Formulations_text = JSON.parse(req.body.Formulations_text || '[]');
    let formulations_image = filesMap.Formulations_image;
    let Therapeutic_text = JSON.parse(req.body.Therapeutic_text || '[]');

    let therapeutic_image = filesMap.Therapeutic_image;
    let plantParts = JSON.parse(req.body.plantParts)
    let combinedWith = req.body.combinedWith;
    let geographicalLocations = req.body.geographicalLocations;
        console.log({
      userid,
      name,
      scientific_name,
      sanskrit_name,
      image,
      uses,
      vata,
      kapha,
      v_reason,
      k_reason,
      benefits_text,
      benefits_image,
      rasa,
      veerya,
      guna,
      vipaka,
      Formulations_text,
      formulations_image,
      Therapeutic_text,
      therapeutic_image,
      plantParts,
      combinedWith,
      geographicalLocations,
    });
    let new_ingridient = new Ingredients({
      user: userid,
      name,
      scientific_name,
      sanskrit_name,
      uses: JSON.parse(uses),
      vata,
      image,
      kapha,
      v_reason,
      k_reason,
      benefits: benefits_text.map((obj, index) => ({
        image: benefits_image[index],
        text: obj
      })),
      rasa,
      veerya,
      guna,
      vipaka,
      formulations: Formulations_text.map((obj, index) => ({
        image: formulations_image[index],
        text: obj
      })),
      therapeutic_uses: Therapeutic_text.map((obj, index) => ({
        image: therapeutic_image[index],
        text: obj
      })),
      plantParts,
      combinedWith,
      geographicalLocations
    })
    await new_ingridient.save();
    let user = await User.findById(userid);
    user.ingridients.push(new_ingridient._id)
    await user.save();
    res.json({ msg: "true", ingredients: new_ingridient });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/get_ing', ensureAuth, async(req, res) => {
  try {
    let userid = req.user
    let ingredients=await Ingredients.find({user:userid})
    res.status(200).json({ message: 'GET success' ,products:ingredients,msg:true});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// app.post('/get_ing', ensureAuth, async (req, res) => {
//   try {
//     const { primary } = req.body;
//     console.log({primary});
//     let primary_ing = await Promise.all(
//   primary.map((id) => Ingredients.findById(id))
// );
//     // let all_ing=all.map(async(id,idex)=>{ 
//     //   let details=await Ingredients.findById(id)
//     //   return details;
//     // })
//     console.log({primary_ing});
//     // Your logic here
//     res.status(201).json({ message: 'POST success' ,primary_ing,msg:true});
//   } catch (err) {  
//     res.status(500).json({ error: err.message });
//   }
// });

app.post('/add_question', ensureAuth,upload.any(), async (req, res) => {
  try {
    let userid=req.user;
    let user=await User.findById(userid)
    
    let category=req.body.category || 'General';
    let question=req.body.question;
    let description=req.body.description;
    let attachment=req.files[0].filename;
    console.log({userid,category,question,description,attachment});
    let new_question=new Posts({
      user:userid,
      category,
      question,
      description,
      attachment,
      replies:[],
      bookmarked:0,
      like:[]
    })
    await new_question.save();
 user.post.push(new_question._id)
    await user.save()
    res.status(201).json({ message: 'POST success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/get_faq', ensureAuth, async (req, res) => {
  try {
    let post=await Posts.find();
    
    // Your logic here
    res.status(201).json({ message: 'POST success',msg:true,post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/bookmark', ensureAuth, async (req, res) => {
  try{
    let {id}=req.body;
    let userid=req.user;
    let user=await User.findById(userid);
    let post=await Posts.findById(id);
    if(!(user.bookmarks.includes(id))){
      user.bookmarks.push(id)
      await user.save();
      console.log("plus")
      await user.save();
      post.bookmarked++;
      await post.save();
      res.status(201).json({ message: 'POST success',msg:true,post,user:user.bookmarks,op:"plus" });
    }else{
      console.log("minus")
      user.bookmarks.splice(user.bookmarks.indexOf(id),1);
      await user.save();
      post.bookmarked--;
      await post.save();
      res.status(201).json({ message: 'POST success',msg:true,post,user:user.bookmarks,op:"minus" });
    }
   
     
    
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
})
app.put('/like', ensureAuth, async (req, res) => {
  try {
    let userid=req.user;
    let {id}=req.body;
    let post=await Posts.findById(id);
    if(!(post.like.includes(userid))){
      post.like.push(userid);
      await post.save();
      res.status(201).json({ message: 'POST success',msg:true,post,op:"plus" });
    }else{
      post.like.splice(post.like.indexOf(userid),1);
      await post.save();
      res.status(201).json({ message: 'POST success',msg:true,post,op:"minus" });
    }
    
  }catch(err){
    res.status(500).json({ error: err.message });
  }
})
app.get('/get_bookmarks', ensureAuth, async (req, res) => {
  try {
    let userid=req.user;
    let user=await User.findById(userid);
    let bookmarks=await Posts.find({ _id: { $in: user.bookmarks } });
    res.status(200).json({ message: 'GET success',bookmarks,msg:true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put("/update_status", ensureAuth, async (req, res) => {
  try {
    let { id, status } = req.body;
    console.log({id,status});
    let post = await Product.findById(id);
    console.log(post);
    post.status = status;
    await post.save();
    res.status(200).json({ message: "Status updated successfully",msg:true,status:post.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put("/update_status_i", ensureAuth, async (req, res) => {
  try {
    let { id, status } = req.body;
    let post = await Ingredients.findById(id);
    post.status = status;
    await post.save();
    res.status(200).json({ message: "Status updated successfully",msg:true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/ret_cart', ensureAuth,async (req, res) => {
  try {
    let userid=req.user;
    let user=await User.findById(userid);
    let cart=user.cart;
    let product=await Promise.all( cart.map(async (element) => {
      console.log(element);
      let pro=await Product.findById(element.product);
      console.log(pro);
      return pro
    }))
    console.log(product);
    res.status(200).json({ message: 'GET success',product:{product,qnt:1},msg:true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/cart', ensureAuth, async (req, res) => {
 
  try {
    const {product_id } = req.body;
    console.log(product_id);
    let userid=req.user;
    let user=await User.findById(userid);
    let item=user.cart.find(element => element.product==product_id);
    console.log(item);
    if(item){
     res.status(201).json({ message: 'POST success',msg:true }); 
    }else{
    user.cart.push({product:product_id,quantity:1});
    await user.save();
    res.status(201).json({ message: 'POST success' });}
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});   