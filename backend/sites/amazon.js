
const extractImages = async (page) => {
    const images = await page.$$eval("img[data-a-image-name=landingImage]", (imgs)=>{
        return imgs.map((im)=>im.src)
    });
    const imgurl = images[0];
    console.log(imgurl);
    return imgurl;
}

const extractTitle = async (page) => {
    const title = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll("#productTitle")).map(ele => ele.textContent);
    });
    return title;
}

const extractCost = async (page) => {
    const cost = await page.evaluate(()=>{
        let temp= Array.from(document.querySelectorAll("#corePriceDisplay_desktop_feature_div .a-offscreen")).map(ele => ele.textContent);
        temp=temp[0];
        if(temp==""){
            temp=Array.from(document.querySelectorAll(".apexPriceToPay .a-offscreen")).map(ele => ele.textContent);
            temp=temp[0];
        }
        return temp;
    });
   
    return cost;
}

module.exports = {
    extractImages,
    extractTitle,
    extractCost
}