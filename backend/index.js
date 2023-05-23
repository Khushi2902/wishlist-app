const express = require("express");
const puppeteer = require ("puppeteer");
const cors = require("cors");

const amazon = require("./sites/amazon");
const flipkart = require("./sites/flipkart")

async function extractdata(url) {
    const browser = await puppeteer.launch(`headless: "new"`);
    const page = await browser.newPage();
    await page.goto(url);
    
    const urlnew = new URL(url);
    const hostname = urlnew.hostname;
    let methods = {};
    switch (hostname) {
        case 'www.amazon.in':
            methods = amazon;
            break;
        case 'www.flipkart.com':
            methods = flipkart;
            break;
        default:
            return null;
    }
    const finalobj={
        imgurl: await methods.extractImages(page, hostname),
        title: await methods.extractTitle(page, hostname),
        cost: await methods.extractCost(page, hostname),
        url
    }
    await browser.close();
    return finalobj;
}

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
    res.send("hello");
})
app.post("/", async (req, res) => {
    const url = req.body.url;
    if (url == '') res.send("error");
    console.log("request received");
    const data = await extractdata(url);
    res.send(data);
})
const PORT = 3000;
app.listen(PORT, () => { console.log(`server is listening on http://localhost:${PORT}`) })