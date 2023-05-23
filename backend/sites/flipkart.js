
const extractImages = async (page) => {
    const images = await page.$$eval(".q6DClP", (imgs)=>{
        return imgs.map((im)=>im.src)
    });
    const imgurl = images[0];
    console.log(imgurl);
    return imgurl;
}

const extractTitle = async (page) => {
    const title = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll(".B_NuCI")).map(ele => ele.textContent);
    });
    return title;
}

const extractCost = async (page) => {
    const cost = await page.evaluate(()=>{
        let temp= Array.from(document.querySelectorAll("._30jeq3._16Jk6d")).map(ele => ele.textContent);
        temp=temp[0];
        return temp;
    });
   
    return cost;
}

module.exports = {
    extractImages,
    extractTitle,
    extractCost
}