
var db = require('../db');
var Product = require('../models/product.model')


module.exports.showAllProduct = (req, res) => {
    var sessionId = req.signedCookies.sessionId;
    var allCart = db.get('sessions').find({ id: sessionId}).get('cart').value();
    var countCart = 0;
    for(let item in allCart)
    {
        countCart += allCart[item];      
    }
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = (page-1) * perPage;
    var end = page * perPage;
    var productsAll = db.get('products').value();
    var products = productsAll.slice(start, end);
    var countAllPages = Math.ceil(productsAll.length / perPage);
    var allPagesShow = [];
    var dotBefore = false;
    var dotAfter = false;
    var pageNext = 0;
    var pagePrev = 0;
    
    if(page === 1)
    {
        pagePrev = 1;
        pageNext = 2;
    }

    if(page === countAllPages)
    {
        pagePrev = countAllPages - 1;
        pageNext = countAllPages;
    }

    if(page > 1 && page < countAllPages)
    {
        pageNext = page + 1;
        pagePrev = page - 1;
    }

    if(page + 3 <= countAllPages)
    {
        dotAfter = true;
    }

    if(page === countAllPages-2)
    {
        dotAfter = true;
    }

    if(page >= 3)
    {
        dotBefore = true;
    }

    if(page < countAllPages && page > 1)
    {
        allPagesShow = [page-1, page, page+1];
    }

    if(countAllPages === 2){
        allPagesShow = [1, 2];
    }

    if(countAllPages === 3)
    {
        allPagesShow = [1, 2, 3];
    }

    if(page === 1 && page < countAllPages) 
    {
        
        if(countAllPages >= 3)
        {
            allPagesShow = [1, 2, 3];
        }
    }

    if(page === countAllPages-1 && countAllPages > 3)
    {
        allPagesShow = [ page-1,page,page+1]
    }

    if(page === countAllPages && countAllPages > 3)
    {
        allPagesShow = [ page-2,page-1,page]
    }
    res.render("products/index", {
        pageNow: page,
        pagePrev: pagePrev,
        pageNext: pageNext,
        products: products,
        endPage: countAllPages,
        allPagesShow: allPagesShow,
        dotAfter: dotAfter,   
        dotBefore: dotBefore,
        countCart: countCart   
    })
};

module.exports.showAllProductMongoose  = async (req, res) => {
    var productsAll = await Product.find();
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = (page-1) * perPage;
    var end = page * perPage;
    // var productsAll = db.get('products').value();
    var products = productsAll.slice(start, end);
    var countAllPages = Math.ceil(productsAll.length / perPage);
    var allPagesShow = [];
    var dotBefore = false;
    var dotAfter = false;
    var pageNext = 0;
    var pagePrev = 0;
    
    if(page === 1)
    {
        pagePrev = 1;
        pageNext = 2;
    }

    if(page === countAllPages)
    {
        pagePrev = countAllPages - 1;
        pageNext = countAllPages;
    }

    if(page > 1 && page < countAllPages)
    {
        pageNext = page + 1;
        pagePrev = page - 1;
    }

    if(page + 3 <= countAllPages)
    {
        dotAfter = true;
    }

    if(page === countAllPages-2)
    {
        dotAfter = true;
    }

    if(page >= 3)
    {
        dotBefore = true;
    }

    if(page < countAllPages && page > 1)
    {
        allPagesShow = [page-1, page, page+1];
    }

    if(countAllPages === 2){
        allPagesShow = [1, 2];
    }

    if(countAllPages === 3)
    {
        allPagesShow = [1, 2, 3];
    }

    if(page === 1 && page < countAllPages) 
    {
        
        if(countAllPages >= 3)
        {
            allPagesShow = [1, 2, 3];
        }
    }

    if(page === countAllPages-1 && countAllPages > 3)
    {
        allPagesShow = [ page-1,page,page+1]
    }

    if(page === countAllPages && countAllPages > 3)
    {
        allPagesShow = [ page-2,page-1,page]
    }
    res.render('products/index', {
        pageNow: page,
        pagePrev: pagePrev,
        pageNext: pageNext,
        products: products,
        endPage: countAllPages,
        allPagesShow: allPagesShow,
        dotAfter: dotAfter,   
        dotBefore: dotBefore   
    })
}