
const puppeteer = require('puppeteer');


exports.getScrapping = async (req, res, next) => {
    const searchQuery = req.body.searchQuery;
    console.log("searchKey :", searchQuery);

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
    });

    const page = await browser.newPage();
    await page.goto("https://shopping.google.com/");
    const inputHandle = await page.waitForXPath("//input[@name = 'q']");
    await inputHandle.type("apple i pad 5", { delay: 50 });

    await page.keyboard.press("Enter");
    await page.waitForNavigation();

    const productDatas = await page.$$("div.sh-dgr__grid-result");
    //    console.log('check', productDatas)

    const extractDatas = [];

    for (const prdData of productDatas) {
        try {
            const title = await page.evaluate((el) => el.querySelector("h4").textContent, prdData);
            const price = await page.evaluate(
                (el) => el.querySelector("div.XrAfOe > span > span > span:nth-child(n) > span").textContent,
                prdData
            );

            const link = await page.evaluate((el) => el.querySelector('div.i0X6df > div.sh-dgr__content > span > a').href, prdData)
            const sitename = await page.evaluate((el) => el.querySelector('div.aULzUe.IuHnof').textContent, prdData)
            const src = await page.evaluate((el)=> el.querySelector('div.i0X6df > div.sh-dgr__content > div.LqJxtf > div > div > div > a > div > div>img').src,prdData)
            // console.log("rc", src)

            extractDatas.push({
                title: title,
                price: price,
                sitename: sitename,
                link: link,
                imageUrl: src
            })
        } catch (error) { }
    }


    let sortedArray = extractDatas.sort((a, b) => { return (parseInt(a.price) - parseInt(b.price)) })
    //  console.log("Sorted Array :", sortedArray);

    res.status(200).json({
        data: sortedArray
    });
};

