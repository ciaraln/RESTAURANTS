const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/angularapp/dist')));

mongoose.connect('mongodb://localhost/mb2');
const FoodSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'The Food name is required!'],
        minlength: [3, '3 characters or more my friends, you can do it!'],
    },
    type: {
        type: String,
        required: [true, 'The Food name is required!'],
        minlength: [3, '3 characters or more my friends, you can do it!'],
    },
    // validating te objects myself versus validations for schema due to not wanting to put iin schema right now, embedding it. 
    reviews: { type: Array, default: [] }
    // we default the array, b/c no reviews are created when the restaurant is brand new. 
} , { timestamps: true });

mongoose.model('Food', FoodSchema);
const Food = mongoose.model('Food')

// root route
app.get('/foods', function (req, res) {
    Food.find({}, function (err, foods) {
        if (err) {
            console.log(err.message);
        } else {
            console.log(' Food found, what"s next!')
            res.json(foods);
        }
    })
})

// Get All Reviews for one Restaurant
app.get('foods/:id', function (req, res) {
    Food.findOne( {_id: req.params.id})
    .populate('reviews')
    .exec(function(err, review) {
        res.render('review', { reviews: review } );
    });
})

//create new food
app.post('/foods', function (req, res) {
    var food = new Food({
        name: req.body.name,
        type: req.body.type,
    })
    // console.log("******************************************")
    // console.log(food)
    // console.log("******************************************")
    food.save(function (err, foods) {
        if (err) {
            console.log("errors", err);
        } else {
            console.log("Your food is successfully added");
            res.redirect('/foods');
        }
    })
})

// Add/create new review
app.post("/foods/write/:id", function(req, res) {
    // console.log("review in serVER!")
    Food.findOne({ _id: req.params.id }, function(err, food) {
        console.log(req.body);
        let error = {}
            if(req.body.customer.length < 3) {
                error [ "customer" ] = " 3 characters for name"
            } if(req.body.stars > 5 ||  req.body.stars < 1 ) {
                error ['stars'] = " must choose between 1 and 5"  
            } if (req.body.review.length < 3) {
                error["review"] = " 3 characters for review"
            }
            //  WHAT WILL WE DO IF THERE IS AN ERROR //
             if( Object.keys(error).length > 0) {
                 console.log("here is the error object")
             } else{
                 var review = {
                     customer: req.body.customer,
                     stars: req.body.stars,
                     review: req.body.review,
                 };
                //  console.log("******************************************")
                //  console.log(review)
                //  console.log("******************************************")
                 food.reviews.push(review);
                 food.save(function (err) {
                     if (err) {
                         console.log(err);
                     } else {
                         console.log('successfully added new review');
                         res.json({message: "Has successfully added" });
                     }
                 })
                //  console.log("successful review")
             }
        })
    })

//retrieve Food by id
app.get('/foods/:id', function (req, res) {
    console.log("here i am")
    Food.findOne({ _id: req.params.id }, function (err, foods) {
        res.json(foods);
    })
})

//update Food by id
app.post('/foods/edit/:id', function (req, res) {
    // console.log(req.body)
    Food.findById(req.params.id, function (err, foods) {
        foods.name = req.body.name;
        foods.type = req.body.type;
        { runValidators: true; context: 'query' };
        foods.save(function (err, foods) {
            if (err) {
                console.log("errors in the update by id yo");
            } else {
                console.log("you updated yo!");
                res.json(foods);
            }
        })
    })
})

//deleting by id
app.delete('/foods/:id', function (req, res) {
    console.log("I can delete")
    Food.findByIdAndRemove(req.params.id, function (err, foods) {
        if (err) {
            console.log("Error, please fix.")
        } else {
            console.log("successful deletion")
        }
        res.json({ name: "" });
    })
})

// // Run to check server
// app.get('/', function (request, response) {
//     response.send("<h1>Hello Express</h1>");
// })

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./angularapp/dist/index.html"))
});

app.listen(8000, function () {
    console.log("server running on  8000");
})