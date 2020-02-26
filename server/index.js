const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors')
const app = express();
const util = require('util');
var cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cookieParser());
app.use(session({secret:"banijjo", saveUninitialized : false, resave : false}));

app.use(bodyParser.urlencoded({ extended: false }));

const dbConnection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce'
});

const query = util.promisify(dbConnection.query).bind(dbConnection);


// const dbConnection = mysql.createConnection ({
//   host: 'localhost',
//   user: 'microfin_ecom',
//   password: 'sikder!@#',
//   database: 'microfin_ecommerce'
// });

dbConnection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/categories', (req, res) => {
  dbConnection.query('SELECT * FROM category', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'users list.' });
  });
});


app.get('/api/all_product_list',async function(req, res, next) {
  // const users = await db.query( 'SELECT * FROM users WHERE id = 1' );
  const resultArray = {};
  const feature_name = await query('SELECT * FROM feature_name');
  const categoryName = await query('SELECT * FROM category');
  for ( const i in feature_name ) {
    if(feature_name[i].code==2){
      resultArray.HotDeals = await query('SELECT feature_products FROM feature_products where feature_id='+feature_name[i].id);
      resultArray.HotDealsTitle = feature_name[i].name;
    }
    else if(feature_name[i].code==3){
      resultArray.TopSelections = await query('SELECT feature_products FROM feature_products where feature_id='+feature_name[i].id);
      resultArray.TopSelectionsTitle = feature_name[i].name;
      
    }
    else if(feature_name[i].code==4){
      resultArray.NewForYou = await query('SELECT feature_products FROM feature_products where feature_id='+feature_name[i].id);
      resultArray.NewForYouTitle = feature_name[i].name;
      
    }
    else if(feature_name[i].code==0){
      resultArray.BannerTop = await query('SELECT feature_products FROM feature_products where feature_id='+feature_name[i].id);
      resultArray.BannerTopTitle = feature_name[i].name;
      
    }
    else if(feature_name[i].code==6){
      resultArray.StoreWIllLove = await query('SELECT feature_products FROM feature_products where feature_id='+feature_name[i].id);
      resultArray.StoreWIllLoveTitle = feature_name[i].name;
      
    }
    else if(feature_name[i].code==7){
      resultArray.More = await query('SELECT feature_products FROM feature_products where feature_id='+feature_name[i].id);
      resultArray.MoreTitle = feature_name[i].name;
      
    }
    else if(feature_name[i].code==1){
      resultArray.BannerImages = await query('SELECT feature_products FROM feature_products where feature_id='+feature_name[i].id);
      resultArray.BannerImagesTitle = feature_name[i].name;
      
    }
    else if(feature_name[i].code==5){
      resultArray.FeaturedBrands = await query('SELECT feature_products FROM feature_products where feature_id='+feature_name[i].id);
      resultArray.FeaturedBrandsTitle = feature_name[i].name;
      
    }
    
  }
  console.log('Result Printing',resultArray);
  
  resultArray.categories = categoryName;
  return res.send({ error: false, data: resultArray, message: 'all Product list.' });
  
});

app.post('/api/productDetails', async (req, res) => {
  
  const resultArray = {};
  const specificationActualArray = [];
  const productDetails = await query('SELECT * FROM products where id='+req.body.productId+' limit 1');
  const specificationArray = JSON.parse(productDetails[0].product_specification_name);
  for ( const i in specificationArray ) {
    let tempObject ={}
    tempObject.specificationNameValue = specificationArray[i].specificationNameValue;
    const productListSmVendorOtherCategory = await query('SELECT specification_name FROM product_specification_names where id='+specificationArray[i].specificationNameId+'');
    tempObject.specificationName = productListSmVendorOtherCategory[0].specification_name;
    specificationActualArray.push(tempObject);
  }
  const productListSmVendorOtherCategory = await query('SELECT product_name,product_sku,home_image,productPrice,id FROM products where vendor_id='+productDetails[0].vendor_id+' and category_id not in('+productDetails[0].category_id+') and id not in('+productDetails[0].id+') limit 5');
  const productListSmCategoryOthersVendor = await query('SELECT product_name,product_sku,home_image,productPrice,id FROM products where category_id='+productDetails[0].category_id+' and vendor_id not in('+productDetails[0].vendor_id+') and id not in('+productDetails[0].id+') limit 5');
  resultArray.productDetails = productDetails;
  console.log('ssssssssssss',specificationArray);
  resultArray.productSpecifications = specificationActualArray;
  resultArray.producSmVendor = productListSmVendorOtherCategory;
  resultArray.productSmCategory = productListSmCategoryOthersVendor;
  return res.send({ error: false, data: resultArray, message: 'all Product Deatils list.' });
});
var  lastChildsAll = [];

app.get('/api/all_category_list', async(req, res) => {
  const allCategories = await query('SELECT * FROM category');
  var categories = await query('SELECT category.id,category.category_name,category_order.status from category_order LEFT JOIN category ON category_order.category_id = category.id');
  
  var categoryArray =[];
  if(categories.length>0){
    lastChildsAll.length = 0;
    for ( const i in categories ) {
      let categoryObj = {}
      var lastChildsObjects = [];
      const subCategoriesList = await query('SELECT * FROM category where parent_category_id='+categories[i].id+'');
      for ( const j in subCategoriesList ) {
        let lastObj = {};
        
        var childArray = findoutChildsOfSub(subCategoriesList[j].id,allCategories);
        lastObj.category = subCategoriesList[j];
        lastObj.lastChilds = childArray;
        lastChildsObjects.push(lastObj);
      }
      categoryObj.category = categories[i];
      categoryObj.subcategories = lastChildsObjects;
      categoryArray.push(categoryObj);
    }
  }
  
  return res.send({ error: false, data: categoryArray, message: 'all category list.' });
})

app.get('/api/all_category_list_more', async(req, res) => {
  const allCategories = await query('SELECT * FROM category');
  var categories = await query('SELECT * FROM category where parent_category_id=0');
  
  var categoryArray =[];
  if(categories.length>0){
    lastChildsAll.length = 0;
    for ( const i in categories ) {
      let categoryObj = {}
      var lastChildsObjects = [];
      const subCategoriesList = await query('SELECT * FROM category where parent_category_id='+categories[i].id+'');
      for ( const j in subCategoriesList ) {
        let lastObj = {};
        
        var childArray = findoutChildsOfSub(subCategoriesList[j].id,allCategories);
        lastObj.category = subCategoriesList[j];
        lastObj.lastChilds = childArray;
        lastChildsObjects.push(lastObj);
      }
      categoryObj.category = categories[i];
      categoryObj.subcategories = lastChildsObjects;
      categoryArray.push(categoryObj);
    }
  }
  
  return res.send({ error: false, data: categoryArray, message: 'all category list.' });
})

function findoutChildsOfSub(cid,allCategories){
  allCategories.forEach(item => {
    if(item.parent_category_id==cid){
      lastChildsAll.push(item);
      findoutChildsOfSub(item.id,allCategories);
    }
  });
  return lastChildsAll;
}


var subNodes = []
function childCategories(){
  subCategories.forEach(subitem => {
    allCategories.forEach(allitem => {
      if(allitem.parent_category_id==subitem.id){
        subNodes.push(allitem)
        
      }
    });
  });
}

var  childCategoryTree = [];
function childCategoriesTrees(categoryLists,childCategoryItem){
  categoryLists.forEach(item => {
    if(item.parent_category_id==childCategoryItem.id){
      childCategoryTree.push(item);
      childCategoriesTrees(categoryLists,item.id);
    }
  });
  return childCategoryTree;
}

var  childCategoryIds = [];
function childCategories(categoryLists,parentId){
  categoryLists.forEach(item => {
    if(item.parent_category_id==parentId){
      childCategoryIds.push(item.id);
      childCategories(categoryLists,item.id);
    }
  });
  return childCategoryIds;
}

app.post('/api/payOrder', async(req, res) => {
  try{
    const tempSells =   await query("select temp_sell.customer_id,temp_sell.item_ids,temp_sell.quantity,products.productPrice from temp_sell left join products on temp_sell.item_ids=products.id where customer_id='" + req.body.customerId + "'");
    var totalQuantity = 0;
    var totalPrice = 0;
    for ( const i in tempSells ) {
      totalQuantity = totalQuantity + tempSells[i].quantity;
      totalPrice = totalPrice + tempSells[i].productPrice;
      
    }
    var billNo = "BNJ-";
    billNo+=req.body.customerId;
    const insertSell =   await query("insert into sales(bill_no,sales_type,customer_id,sales_date,total_sales_quantity,total_sales_amount) VALUES('" + billNo + "','cash','" + req.body.customerId + "','" + 33 + "','" + totalQuantity + "','" + totalPrice + "')");
    const salesId = insertSell.insertId;
    
    const insertPayment =   await query("insert into product_payment(customer_id,order_id,payment_amount,payment_method) VALUES('" + req.body.customerId + "','"+salesId+"','" + totalPrice + "','cash')");
    for ( const i in tempSells ) {
      let totalAmount = tempSells[i].quantity*tempSells[i].productPrice;
      
      const purchaseDetialsQuantity =  await query("SELECT sum(inv_purchase_details.quantity) as quantity FROM inv_purchase_details WHERE productId = '"+tempSells[i].item_ids+"'");
      const purchaseReturnQuantity =  await query("SELECT sum(inv_purchase_return_details.quantity) as quantity FROM inv_purchase_return_details WHERE productId = '"+tempSells[i].item_ids+"'");
      const salesDetailsQuantity =  await query("SELECT sum(sales_details.sales_product_quantity) as quantity FROM sales_details WHERE product_id = '"+tempSells[i].item_ids+"'");
      
      const salesReturnQuantity =  await query("SELECT sum(sales_return_details.salesReturnQuantity) as quantity FROM sales_return_details WHERE productId = '"+tempSells[i].item_ids+"'");
      const itemInventory = (purchaseDetialsQuantity[0].quantity - purchaseReturnQuantity[0].quantity - salesDetailsQuantity[0].quantity) + salesReturnQuantity[0].quantity;
      
      // console.log('aabb',itemInventory.length);
      // const itemInventory =   await query("select quantity from inv_purchase_details  WHERE productId = '" + tempSells[i].item_ids + "'");
      
      if(itemInventory>0){
        console.log('Inventory',itemInventory[0].quantity);
        if(itemInventory>tempSells[i].quantity){
          await query("insert into sales_details(sales_bill_no_id,product_id,sales_product_quantity,unitPrice,porduct_sales_price,total_amount) VALUES('" + salesId + "','"+tempSells[i].item_ids+"','" + tempSells[i].quantity + "','" + tempSells[i].productPrice + "','" + tempSells[i].productPrice + "','" + totalAmount + "')");
          await query("delete from temp_sell where customer_id='" + req.body.customerId + "' and item_ids='" + tempSells[i].item_ids + "'");
        }
        else{
          throw Error('Item Not in Inventory');
        }
        
      }
      else{
        throw Error('Item Not in Inventory');        
      }
    }
    
    return res.status(200).send({ error: false, data: true, message: 'Nice! Your Order Has been placed Successfully' });
    
  }
  catch(error){
    return res.status(404).send({ error: true, data: false, message: error.message });
  }
})



app.post('/api/loginCustomerInitial', async(req, res) => {
  const loginCustomer = await query("select * from customer where email='" + req.body.email + "' and password='" + req.body.password + "'");
  if(loginCustomer.length>0){
    // const insertProductsTemp = await query("INSERT INTO temp_sell (customer_id, item_ids,quantity) VALUES ('" + loginCustomer[0].id + "', '" + req.body.productId + "','" + req.body.quantity + "')");
    const checkIfExist = await query("select * from temp_sell where item_ids='" + req.body.productId + "' and customer_id='" + loginCustomer[0].id + "'");
    if(checkIfExist.length>0){
      const updateProductTemp = await query("UPDATE temp_sell SET quantity= quantity+1 WHERE customer_id = '" + loginCustomer[0].id + "' and item_ids='" + req.body.productId + "'");
      
    }
    else{
      const insertProductsTemp = await query("INSERT INTO temp_sell (customer_id, item_ids,quantity) VALUES ('" + loginCustomer[0].id + "', '" + req.body.productId + "','" + req.body.quantity + "')");
    }
    
    req.session.customerId = loginCustomer[0].id;
    req.session.save();
    return res.send({ error: false, data: req.session.customerId, message: 'success' });
  }
})

app.post('/api/saveCustomerInitial', async(req, res) => {
  const insertCustomer = await query("INSERT INTO customer (email, password) VALUES ('" + req.body.email + "', '" + req.body.password + "')");
  if(insertCustomer){
    const checkIfExist = await query("select * from temp_sell where item_ids='" + req.body.productId + "' and customer_id='" + insertCustomer.insertId + "'");
    if(checkIfExist.length>0){
      const updateProductTemp = await query("UPDATE temp_sell SET quantity= quantity+1 WHERE customer_id = '" + insertCustomer.insertId + "' and item_ids='" + req.body.productId + "'");
      
    }
    else{
      const insertProductsTemp = await query("INSERT INTO temp_sell (customer_id, item_ids,quantity) VALUES ('" + insertCustomer.insertId + "', '" + req.body.productId + "','" + req.body.quantity + "')");
    }
    // const insertProductsTemp = await query("INSERT INTO temp_sell (customer_id, item_ids,quantity) VALUES ('" + insertCustomer.insertId + "', '" + req.body.productId + "','" + req.body.quantity + "')");
    req.session.customerId = insertCustomer.insertId;
    req.session.save();
    return res.send({ error: false, data: insertCustomer.insertId, message: 'success' });
  }
})

app.post('/api/add_cart_direct', async(req, res) => {
  const checkIfExist = await query("select * from temp_sell where item_ids='" + req.body.productId + "' and customer_id='" + req.body.customerId + "'");
  if(checkIfExist.length>0){
    const updateProductTemp = await query("UPDATE temp_sell SET quantity= quantity+1 WHERE customer_id = '" + req.body.customerId + "' and item_ids='" + req.body.productId + "'");
    
  }
  else{
    const insertProductsTemp = await query("INSERT INTO temp_sell (customer_id, item_ids,quantity) VALUES ('" + req.body.customerId + "', '" + req.body.productId + "','" + req.body.quantity + "')");
    
  }
  return res.send({ error: false, data:true, message: 'success' });
})


app.post('/api/saveCustomerAddress', async(req, res) => {
  let updateCustomerShipping = await query("UPDATE customer SET name='" + req.body.name + "',phone_number='" + req.body.phone_number + "',address='" + req.body.address + "',city='" + req.body.city + "',district='" + req.body.district + "' WHERE id = '" + req.body.customerId + "'");
  console.log("UPDATE customer SET name='" + req.body.name + "',phone_number='" + req.body.phone_number + "',address='" + req.body.address + "',city='" + req.body.city + "',district='" + req.body.district + "' WHERE id = '" + req.body.customerId + "'");
  if(updateCustomerShipping){
    return res.send({ error: false, data:true, message: 'success' });
  }
})

app.post('/api/getCustomerCartProducts', async(req, res) => {
  const cartProducts = await query("SELECT products.id,products.product_name,products.productPrice,products.product_specification_details_description,products.productPrice*temp_sell.quantity AS totalPrice, products.home_image,temp_sell.item_ids,temp_sell.quantity FROM temp_sell LEFT JOIN products ON temp_sell.item_ids = products.id WHERE temp_sell.customer_id='" + req.body.customerId + "'");
  
  return res.send({ error: false, data: cartProducts, message: 'customer cart product list.' });
})

app.post('/api/getCustomerCartProductsCount', async(req, res) => {
  const customerProductCount = await query("SELECT COUNT(customer_id) as counting from temp_sell WHERE customer_id = '" + req.body.customerId + "'");
  console.log('ggg',customerProductCount)
  return res.send({ error: false, data: customerProductCount, message: 'customer cart product list.' });
  
})


app.post('/api/all_category_product_list', async(req, res) => {
  var parentId = req.body.categoryId;
  const categoryLists = await query('SELECT * FROM category');
  const childCategoryIds = childCategories(categoryLists,parentId);
  const productLists = await query('SELECT * FROM products where category_id IN('+childCategoryIds+')');
  return res.send({ error: false, data: productLists, message: 'all category product list.' });
})


app.get('/api/get_terms_conditions', async(req, res) => {
  const termsCOnditions = await query("SELECT * FROM terms_conditions");
  console.log('aaaaa',termsCOnditions[0].terms_and_conditions);
  return res.send({ error: false, data: termsCOnditions[0].terms_and_conditions, message: 'terms' });
})

app.post('/api/searchProductList', async(req, res) => {
  var searchKey = req.body.searchKey;
  const productLists = await query("SELECT * FROM products WHERE product_name LIKE '%"+searchKey+"%' or product_name LIKE '"+searchKey+"%' or product_name LIKE '%"+searchKey+"' or product_name='"+searchKey+"'");
  return res.send({ error: false, data: productLists, message: 'all search product list.' });
})



app.get('/api/search_filter_products', (req, res) => {
  console.log('Vendor Values : ', req.query.vendorId);
  console.log('categoryList Values : ', req.query.categoryList);
  
  dbConnection.query('SELECT * FROM products WHERE vendor_id = "'+ req.query.vendorId +'" AND category_id = "'+req.query.categoryList+'"', function (error, results, fields) {
    
    if (error) throw error;
    return res.send({ data: results, message: 'data' });
    
  });
  
  // return res.send({ success: 'true', data: req.query.id, message: 'data' });
  
});

app.get('/api/search_purchase_products', (req, res) => {
  console.log('Vendor Values : ', req.query.vendorId);
  console.log('Vendor Values : ', req.query.id);
  
  var searchedProducts = [];
  
  new Promise (function (resolve, reject) {
    
    dbConnection.query('SELECT id FROM products WHERE vendor_id = "'+ req.query.vendorId +'" AND product_name LIKE "%'+ req.query.id +'%" OR product_sku LIKE "%'+ req.query.id +'%" ', function (error, results, fields) {
      console.log(results);
      if (error) throw error;
      // return res.send({ data: results, message: 'data' });
      if (results.length > 0) {
        resolve(results);
      }
      else {
        reject('rejected');
      }
      
    });
    
  }).then( function (purchaseElements) {
    console.log(purchaseElements);
    
    async.forEachOf(purchaseElements, function (purchaseElement, i, inner_callback){
      
      var select_sql = "SELECT products.id AS id, products.home_image as home_image, products.product_name AS product_name, products.product_sku AS product_sku FROM products JOIN inv_purchase_details ON products.id = inv_purchase_details.productId WHERE products.id='"+purchaseElement.id+"' AND inv_purchase_details.productId='"+purchaseElement.id+"' ";
      dbConnection.query(select_sql, function(err, results, fields){
        if(!err){
          if (results.length > 0) {
            searchedProducts.push(results);
          }
          
          inner_callback(null);
        } else {
          console.log("Error while performing Query");
          inner_callback(err);
        };
      });
    }, function(err){
      if(err){
        //handle the error if the query throws an error
        console.log('Error at ASYNC');
        return res.send({ data: [], message: 'data' });
      }else{
        //whatever you wanna do after all the iterations are done
        console.log('Success at ASYNC');
        return res.send({ data: searchedProducts, message: 'data' });
      }
    });
    
  }).catch(function (reject) {
    console.log('Rejected');
    return res.send({ data: [], message: 'data' });
  })
  
  // return res.send({ success: 'true', data: req.query.id, message: 'data' });
  
});


app.get('/api/product_list', (req, res) => {
  dbConnection.query('SELECT * FROM products limit 5 ', function (error, results, fields) {
    console.log(results);
    if (error) throw error;
    return res.send({ error: error, data: results, message: 'sepecification name list.' });
  });
});



app.post('/api/saveCategory',(req,res)=>{
  //return res.send({success:true});
  return res.send(req.body);
  //console.log(req);
});

app.listen(3001, () =>
console.log('Express server is running on localhost:3001')
);