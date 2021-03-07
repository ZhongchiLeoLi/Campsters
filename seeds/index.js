const fetch = require("node-fetch");
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors}= require('./seedHelpers');
mongoose.connect('mongodb+srv://campster_dev:155M00wD7gmbuhP0@cluster0.pgq7t.mongodb.net/Campster?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
}).catch((err) => {
    console.log("OH NO! MONGO CONNECTION ERROR!!!");
    console.log(err);
});

const Campground = require('../models/campground');

const sample = array => array[Math.floor(Math.random() * array.length)];

const getImg = async () => {
    const imgs = [];
    let url = "https://api.unsplash.com/search/photos?page=1&per_page=30&query=camping&client_id=9MN_m5K70_FLhy66K34NsRoXpQ-bMY9FOOEOOa2No9k";
    let res = await fetch(url);
    let data = await res.json();
    console.log(data.results.length);
    for (let i = 0; i < 30; i++) {
        imgs.push(data.results[i].urls.regular);
    }
    url = "https://api.unsplash.com/search/photos?page=2&per_page=30&query=camping&client_id=9MN_m5K70_FLhy66K34NsRoXpQ-bMY9FOOEOOa2No9k";
    res = await fetch(url);
    data = await res.json();
    console.log(data.results.length);
    for (let i = 0; i < 29; i++) {
        imgs.push(data.results[i].urls.regular);
    }
    url = "https://api.unsplash.com/search/photos?page=3&per_page=30&query=camping&client_id=9MN_m5K70_FLhy66K34NsRoXpQ-bMY9FOOEOOa2No9k";
    res = await fetch(url);
    data = await res.json();
    console.log(data.results.length);
    for (let i = 0; i < 30; i++) {
        imgs.push(data.results[i].urls.regular);
    }
    url = "https://api.unsplash.com/search/photos?page=4&per_page=30&query=camping&client_id=9MN_m5K70_FLhy66K34NsRoXpQ-bMY9FOOEOOa2No9k";
    res = await fetch(url);
    data = await res.json();
    console.log(data.results.length);
    for (let i = 0; i < 30; i++) {
        imgs.push(data.results[i].urls.regular);
    }
    url = "https://api.unsplash.com/search/photos?page=5&per_page=30&query=camping&client_id=9MN_m5K70_FLhy66K34NsRoXpQ-bMY9FOOEOOa2No9k";
    res = await fetch(url);
    data = await res.json();
    console.log(data.results.length);
    for (let i = 0; i < 30; i++) {
        imgs.push(data.results[i].urls.regular);
    }
    url = "https://api.unsplash.com/search/photos?page=6&per_page=30&query=camping&client_id=9MN_m5K70_FLhy66K34NsRoXpQ-bMY9FOOEOOa2No9k";
    res = await fetch(url);
    data = await res.json();
    console.log(data.results.length);
    for (let i = 0; i < 30; i++) {
        imgs.push(data.results[i].urls.regular);
    }
    return imgs;
}


const seedDB = async () => {
    await Campground.deleteMany({});
    const imageArr = await getImg();
    for(let i = 0; i < 179; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 70) + 30;
        const loc = `${cities[random1000].city}, ${cities[random1000].state}`;
        const camp = new Campground({
            author: '6041071d596f42103466e684',
            location: loc,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: imageArr[i],
                    filename: 'Campster/campgroundseeds'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit est accusamus mollitia, ducimus error quidem consectetur veritatis! Sapiente repellat rerum totam dolore velit perspiciatis assumenda quisquam sit voluptatum, omnis ab. Possimus aperiam natus, impedit rerum eveniet cupiditate omnis consectetur deleniti, quae ipsum delectus corrupti cumque consequatur nam magnam unde officiis temporibus cum. Soluta sapiente facilis quos, dolorum id at quibusdam.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})