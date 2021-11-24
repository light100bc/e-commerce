const express=require('express');//让node的server更容易搭建
// const cors=require('cors');
const bodyParser=require('body-parser');//输入改为js
const path=require('path');

if(process.env.NODE_ENV!=='production') require('dotenv').config()
//如果不是production模式(test时)，dotenv可以碰到.env，即dotenv可以得到secret key

const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);


const app=express();
const port=process.env.PORT||5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// app.use(cors());//不同host port之间可以交流,这里不用

if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,'client/build')))//server用于serveclient/build里的东西

    app.get('*',function(req,res){ //所有的url都pass后面的func
        res.sendFile(path.join(__dirname,'client/build','index.html'))
    })
}

app.listen(port,error=>{
    if(error) throw error;
    console.log('Server running on port'+port);
});//上面的跑好后，set listener 听error

app.post('/payment',(req,res)=>{
    const body={
        source: req.body.token.id,
        amount:req.body.amount,
        currency:'usd'

    };

    stripe.charges.create(body, (stripeErr,stripeRes)=>{
        if(stripeErr){
            console.log("sending error msg");
            res.status(500).send({error:stripeErr});
        }else{
            res.status(200).send({success:stripeRes});
        }
    })
})


