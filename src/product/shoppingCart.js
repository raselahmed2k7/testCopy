import React,{Component} from 'react';
import Header from '../include/header';
import Footer from '../include/footer';
import Breadcums from '../include/breadcums';
import Categories from '../include/categories';
const base = process.env.REACT_APP_FRONTEND_SERVER_URL;
const frontEndUrl = process.env.REACT_APP_FRONTEND_URL;
const fileUrl = process.env.REACT_APP_FILE_URL;
class ShoppingCart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Categories:[],
            textArray:[],
            allCategories:[],
            cartProducts:[],
            isAddress :false,
            checkAgreement:false,
            responseMessage:'',
            termsMessage:''
        }
        
        // this.testClick = this.testClick.bind(this);loadProduct
        this.payOrder = this.payOrder.bind(this);
        this.addressSubmit = this.addressSubmit.bind(this);
        this.loadProduct = this.loadProduct.bind(this);
        this.changeAgreement = this.changeAgreement.bind(this);
        this.handleClickPlus = this.handleClickPlus.bind(this);
        this.handleClickMinus = this.handleClickMinus.bind(this);
    }
    componentDidMount() {
        this.getAllCategories();
        this.gettermsConditions();
        this.getCustomerCartProducts();
    }

    gettermsConditions(){
      fetch(base+'/api/get_terms_conditions', {
        method: 'GET'
    })
    .then(res => {
        console.log(res);
        return res.json()
    })
    .then(termsConditions => {
        this.setState({termsMessage:termsConditions.data})
            return false;
        });
    }

    changeAgreement(){
      console.log('checking');
      if(this.state.checkAgreement==false){
        this.setState({checkAgreement:!this.state.checkAgreement},()=>{console.log('aaa',this.state)})
      }
      else{
        this.setState({checkAgreement:!this.state.checkAgreement},()=>{console.log('bbb',this.state)})

      }
    }

    getCustomerCartProducts(){
      if(localStorage.customer_id!=''){
        fetch(base+'/api/getCustomerCartProducts', 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: localStorage.customer_id
          })
        })
        .then(res => {
          return res.json()
        })
        .then(response => {
          this.setState({ 
            cartProducts :response.data            
            // allCategories :categories.data.allCategories        
        }) 
        console.log('tere',this.state);
        });
      }
          
    }
    // clickDiv(el) {
    //   el.click()
    // }
    handleClickMinus(){
      this.setState({
        productQuantity : this.state.productQuantity - 1
      })
    }
    
    handleClickPlus(){
      this.setState({
        productQuantity : this.state.productQuantity + 1
      })
    }

    payOrder(){
      console.log('payyyy');
      fetch(base+'/api/payOrder', 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: localStorage.customer_id
        })
      })
      .then(res => {
        return res.json()
      })
      .then(response => {
        console.log(response);
      if(response.data==true){
        this.setState({responseMessage:response.message});
        var link = document.getElementById('successCartMessage');
         var cartModalclose = document.getElementById('cartModalClose');
        var paymentModalClose = document.getElementById('paymentModalClose');
        paymentModalClose.click();
        cartModalclose.click();
        link.click();
        // window.location.href = "/";
      }
      else if(response.data==false){
        this.setState({responseMessage:response.message});	
        var link = document.getElementById('successCartMessage');	
        var cartModalclose = document.getElementById('cartModalClose');
        var paymentModalClose = document.getElementById('paymentModalClose');
        paymentModalClose.click();
        cartModalclose.click();		
        link.click();		
      }
      });
    }
    getAllCategories(){
        fetch(base+'/api/all_category_list_more', {
            method: 'GET'
        })
        .then(res => {
            console.log(res);
            return res.json()
        })
        .then(categories => {
            console.log('cccccccc',categories);
            this.setState({ 
                Categories :categories.data ,            
                // allCategories :categories.data.allCategories        
            })      
                return false;
            });
        }
        loadProduct(){
          window.location.href = '/';
        }

        addressSubmit(event){
            event.preventDefault();

                fetch(base+'/api/saveCustomerAddress', 
                {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: event.target.customerName.value,
                    phone_number: event.target.customerMobile.value,
                    address: event.target.address.value,
                    city: event.target.city.value,
                    district: event.target.district.value,
                    customerId: localStorage.customer_id
                  })
                })
                .then(res => {
                  return res.json()
                })
                .then(response => {
                  if(response.data!=''){
                    // localStorage.setItem("customer_id",response.data);
                    this.setState({isAddress:true},()=>{console.log('consoling address',this.state)})
                    let link = document.getElementById('closeAddress');
                         link.click();
                    // window.location = '/cart';
                  }
                })
        }

        render(){
            let url = "http://admin.banijjo.com.bd";
            let counter = 1;
            let specificationName = '';	
            let totalAmount = 0;
            return (
                <React.Fragment>
                  <button style={{display:"none !important"}} id="successCartMessage" type="button" data-toggle="modal" data-target="#exampleModalShipping" role="button"></button>
                        		  <div className="modal" id="exampleModalShipping" tabindex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content" style={{width:"900px"}}>
                              <div className="modal-header">
                                <h5 className="modal-title" style={{textAlign: "center"}}>&nbsp;</h5>
                                <button onClick={this.loadProduct} type="button" className="close" data-dismiss="modal" aria-label="Close" style={{marginTop: "-25px"}}>
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div className="modal-body">

                                <div className="row">
                                  <div className="col-md-1 col-lg-1">

                                  <i className="fa fa-check" style={{fontSize:"50px",color:"white",backgroundColor: "#009345",borderRadius: "40px"}}></i>
                                </div>
                                <div className="col-md-11 col-lg-11">
                                  <p style={{color:"#ec1c24"}}>{this.state.responseMessage}.</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-1 col-lg-1">
                                  </div>
                                  <div className="col-md-3 col-lg-3">

                                </div>
                                <div className="col-md-3 col-lg-3">
                                  <a href={frontEndUrl} className="btn btn-success" style={{backgroundColor: "#ec1c24",borderColor: "#ec1c24"}}>Buy More Product</a>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                            </div>
                          </div>
                            </div>
                        </div>

                 <br/>
                        <Breadcums/>
                         <div className="row">
                              <div className="medium-8 columns">
                                <div className="card shopping-cart">
                                  <div className="card-header bg-dark text-light">
                                    {/* <i className="fa fa-shopping-cart" aria-hidden="true"></i> */}
                                    <a href={frontEndUrl} style={{color:"#ec1c24"}} className="btn btn-outline-info btn-sm pull-right">Continue shopping</a>
                                    <div className="clearfix"></div>
                                  </div>
                                  <div className="card-body">
                                    {
                                      
                                      this.state.cartProducts.length>0?
                                      this.state.cartProducts.map((item,key)=>{
                                        totalAmount = totalAmount + (item.quantity*item.productPrice)
                                          return(<React.Fragment>
                                          <div className="row">
                                            <div className="col-12 col-sm-12 col-md-2 text-center">
                                              {
                                                item.home_image?<img className="img-responsive" src={fileUrl+"/upload/product/productImages/"+item.home_image} alt="prewiew" width="120" height="80"/>
                                                : <img className="img-responsive" src="http://placehold.it/120x80" alt="prewiew" width="120" height="80"/>
                                              }
                                              
                                            </div>
                                            <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                                              <h5 className="product-name"><strong>{item.product_name}</strong></h5>
                                              <strong style={{fontSize: "12px"}}><b>Color:</b>Black Tshirt</strong>&nbsp;&nbsp;&nbsp;<strong style={{fontSize: "12px"}}><b>Model:</b>M</strong>
                                            <h6><b>৳{item.productPrice}</b></h6>
                                          </div>

                                            <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                                              <div className="col-9 col-sm-9 col-md-9">
                                                <div className="quantity"> 
                                                  <div className="quantity-select">                           
                                                      <div className="entry value-minus1">&nbsp;</div>
                                                          <div className="entry value1"><span>{item.quantity}</span></div>
                                                      <div className="entry value-plus1 active">&nbsp;</div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="col-1 col-sm-1 col-md-1 text-right">
                                                <button type="button" className="btn btn-outline-danger btn-xs">
                                                  <i className="fa fa-trash" aria-hidden="true" style={{fontSize: "24px",color:"red"}}></i>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                          <hr/>
                                        </React.Fragment>)
                                      })
                                      :''
                                    }
                                  {/* <button id="pos" ref={this.clickDiv} onClick={this.testClick}></button> */}

                                </div>
                                <div className="card-footer">
                                  {/* <div className="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                                    <div className="row">
                                      <div className="col-6">
                                        <input type="text" className="form-control" placeholder="cupone code"/>
                                      </div>
                                      <div className="col-6">
                                        <input type="submit" className="btn btn-default" value="Use cupone"/>
                                      </div>
                                    </div>
                                  </div> */}
                                  <div className="pull-right" style={{margin: "10px"}}>
                                  <div className="pull-right" style={{margin: "5px"}}>
                                      Total price: <b>{totalAmount}৳</b>
                                    </div>

                                    <a data-toggle="modal" data-target="#exampleModal" href="#" className="btn btn-success pull-right">Place Order</a>
                                  
                                  </div>
                                </div>
                              </div>

                              </div>

                              <div className="medium-4 large-4 columns">
                                  <div className="panel panel-default">
                          <div className="panel-heading text-center">
                          <h4>Order Summary</h4>
                          </div>
                          <div className="panel-body">
                          <div className="col-md-12">
                          <strong>Subtotal (# item)</strong>
                          <div className="pull-right"><span>৳</span><span>{totalAmount}</span></div>
                          </div>
                          <div className="col-md-12">
                          <strong>Tax</strong>
                          <div className="pull-right"><span>৳</span><span>0.00</span></div>
                          </div>
                          <div className="col-md-12">
                          <small>Shipping</small>
                          <div className="pull-right"><span>-</span></div>
                          <hr/>
                          </div>
                          <div className="col-md-12">
                          <strong>Order Total</strong>
                          <div className="pull-right"><span>৳</span><span>{totalAmount}৳</span></div>
                          <hr/>
                          </div>

                          <button type="button" className="btn btn-primary btn-lg btn-block" style={{backgroundColor: "#EB1C22",borderColor: "#EB1C22"}}>Buy</button>

                          </div>

                          </div>
                              </div>


          <div style={{marginLeft:"20%",background:"none"}} className="modal" id="exampleModal" tabindex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content" style={{width: "450px"}}>
                <div className="modal-header">
                <button id="cartModalClose" type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                <div className="frameTopSelection">
													<span className="helperframeTopSelection" style={{background:"white"}}>
													<img src="/image/banijjoLogo.png" alt=""/>
													</span>
												</div>
                 
                </div>
                <div className="modal-body">
                    <div className="col-md-12">
                      <strong>Total</strong>
                      <div className="pull-right"><i className="fa fa-angle-right" aria-hidden="true" style={{fontSize: "32px"}}></i>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <h4>৳{totalAmount}</h4>
                      <div className="pull-right">
                      </div>
                    </div>
                    <p>&nbsp;</p>
                    <div className="col-md-12">
                      <strong>Shipping Information</strong>
                      <div className="pull-right"><i className="fa fa-angle-right" aria-hidden="true" style={{fontSize: "32px"}}></i>
                      </div><br/>
                      <button type="button" className="next-btn next-medium next-btn-primary next-btn-text" data-toggle="modal" data-target="#addressModal"role="button"><i className="fa fa-plus" style={{fontSize:"15px"}}></i> Add new address</button>
                    </div>
                    <p>&nbsp;</p>
                    <div className="col-md-12">
                        <input style={{width: "20px"}} onChange={this.changeAgreement} name="agree" type="checkbox"/><span>   Agree terms and conditions</span><br/>
                        <a data-toggle="modal" data-target="#termsModal"  href="#" >View terms & conditions</a>
                    </div>
                </div>
                <div className="modal-footer">
                  <button data-toggle="modal" data-target="#exampleModalPayment" type="button" disabled={(this.state.isAddress && this.state.checkAgreement)?false:true} className="btn btn-danger" style={{backgroundColor:"#EB1C22",borderColor:"#EB1C22"}}> Order Confirm</button>
                </div>
              </div>
            </div>
          </div>

          <div style={{marginLeft:"20%",background:"none"}} className="modal" id="termsModal" tabindex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content" style={{width: "500px",minHeight:"500px"}}>
                <div className="modal-header" style={{textAlign:"center"}}>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                <div className="frameTopSelection">
													<span className="helperframeTopSelection" style={{background:"white"}}>
													<img src="/image/banijjoLogo.png" alt=""/>
													</span>
												</div> 
                Terms and Conditions
                
                </div>
                <div className="modal-body">
{this.state.termsMessage}
                </div>
              </div>
            </div>
          </div>


          <div class="modal" id="exampleModalPayment" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
            <div class="modal-content" style={{width: "900px"}}>
              <div class="modal-header">
              <button id="paymentModalClose" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              <div className="frameTopSelection">
													<span className="helperframeTopSelection" style={{background:"white"}}>
													<img src="/image/banijjoLogo.png" alt=""/>
													</span>
												</div>    
                                    
              </div>
              <ul class="nav nav-tabs" style={{marginLeft:"10%"}}>
              <li class="active" style={{paddingLeft: "80px"}}><a data-toggle="tab" href="#home">Cash on Delivery</a></li>
              <li style={{paddingLeft: "30px"}}><a data-toggle="tab" href="#menu1">SSLCOMMERZE</a></li>
              <li style={{paddingLeft: "30px"}}><a data-toggle="tab" href="#menu2">DMoney</a></li>
            </ul>
            <div class="tab-content">
              <div id="home" class="tab-pane fade in active">
                <div class="modal-body">
                      <div class="row">
                        <div class="col-md-6 col-lg-6">
                          <div class="form-group" style={{marginLeft: "133px"}}>
                            <label class="control-label">Total Amount : </label>
                            <span> ৳{totalAmount}</span>
                            {/* <input type="text" class="form-control" placeholder="NAME HERE" /> */}
                          </div>
                        </div>
                      </div>
                    <div class="row">
                      <div class="col-md-2 col-lg-2" style={{marginLeft: "133px"}}>
                      <button onClick={this.payOrder} type="button" class="btn btn-danger" style={{backgroundColor: "#FF4747"}}>Pay Cash</button>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                </div>
              </div>
              <div id="menu1" class="tab-pane fade">
                 <div class="row">
                        <div class="col-md-6 col-lg-6">
                          <div class="form-group" style={{marginLeft: "65px"}}>
                            <label class="control-label">Total Amount : </label>
                            <span> ৳{totalAmount}</span>
                            {/* <input type="text" class="form-control" placeholder="NAME HERE" /> */}
                          </div>
                        </div>
                      </div>
                    <div class="row">
                      <div class="col-md-2 col-lg-2" style={{marginLeft: "65px"}}>
                      <button type="button" class="btn btn-danger" style={{backgroundColor: "#FF4747",wicth:"150%"}}>Pay With SSL</button>
                    </div>
                  </div>
                  <div class="modal-footer">
                </div>
              </div>
              <div id="menu2" class="tab-pane fade">
              <div class="row">
                        <div class="col-md-6 col-lg-6">
                          <div class="form-group" style={{marginLeft: "75px"}}>
                            <label class="control-label">Total Amount : </label>
                            <span> ৳{totalAmount}</span>
                            {/* <input type="text" class="form-control" placeholder="NAME HERE" /> */}
                          </div>
                        </div>
                      </div>
                    <div class="row">
                      <div class="col-md-2 col-lg-2" style={{marginLeft: "75px"}}>
                      <button type="button" class="btn btn-danger" style={{backgroundColor: "#FF4747"}}>Pay With DMoney</button>
                    </div>
                  </div>
                  <div class="modal-footer">
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


          <div class="modal" id="addressModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content" style={{width:"900px"}}>
                <div class="modal-header">
                <div className="frameTopSelection">
													<span className="helperframeTopSelection" style={{background:"white"}}>
													<img src="/image/banijjoLogo.png" alt=""/>
													</span>
												</div>
                  <button id="closeAddress" type="button" class="close" data-dismiss="modal" aria-label="Close" style={{marginTop: "-25px"}}>
                    <span aria-hidden="true">×</span>
                  </button>
                </div>


                <div class="modal-body">
                  <h4>Shipping Information</h4>
                  <form onSubmit={this.addressSubmit}>
                  <div class="row">
                    <div class="col-md-6 col-lg-6">
                      <div class="form-group">
                        <label class="control-label">Name</label>
                        <input type="text" class="form-control" name="customerName" placeholder="Name"/>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-6">
                      <div class="form-group">
                        <label class="control-label">Phone Number</label>
                        <input type="number"  name="customerMobile" class="form-control"  placeholder="Mobile" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 col-lg-6">
                      <div class="form-group">
                        <label class="control-label">District</label>
                        <select class="form-control"  name="district">
                          <option value="dhaka">Dhaka</option>
                          <option value="rajshahi">Rajshahi</option>
                          <option value="khulna">Khulna</option>
                          <option value="rangpur">Rangpur</option>
                        </select>                      
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6">
                      <div class="form-group">
                        <label class="control-label">City</label>
                        {/* <input type="text" name="city" class="form-control" placeholder="City" /> */}
                        <select class="form-control"  name="city">
                          <option value="dhaka">Dhaka</option>
                          <option value="rajshahi">Rajshahi</option>
                          <option value="khulna">Khulna</option>
                          <option value="rangpur">Rangpur</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                  <div class="col-md-6 col-lg-6">
                      <div class="form-group">
                        <label class="control-label">Address</label>
                        {/* <input type="text" name="address" class="form-control" placeholder="Street" /> */}
                        <textarea style={{height:"100px"}} name="address" class="form-control" placeholder="Address" ></textarea>
                      </div>
                    </div>
                    
                  </div>
                  

                  

                <div class="row">
                  <div class="col-md-2 col-lg-2">
                   <button type="submit" class="btn btn-danger" style={{backgroundColor: "#FF4747"}}>save</button>
                 </div>
               </div>
               </form>
              </div>
              <div class="modal-footer">

              </div>

            </div>

          </div>
        </div>
        <div class="modal" id="paymentModal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style={{width:"900px"}}>
              <div class="modal-header">
              <div className="frameTopSelection">
													<span className="helperframeTopSelection" style={{background:"white"}}>
													<img src="/image/banijjoLogo.png" alt=""/>
													</span>
												</div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{marginTop: "-25px;"}}>
                  <span aria-hidden="true">×</span>
                </button>
              </div>


              <div class="modal-body">
                <h4>Payment Methods</h4>

                <div class="row">
                  <div class="col-md-3 col-lg-3">
                    <img src="image/card.png"/>

                  </div>
                  <div class="col-md-3 col-lg-3">
                    <img src="image/card2.png"/>
                  </div>
                  <div class="col-md-3 col-lg-3">
                    <img src="image/card3.png"/>
                  </div>
                  <div class="col-md-3 col-lg-3">
                    <img src="image/card4.png"/>
                  </div>



                </div>


                <div class="row">
                  <div class="col-md-4 col-lg-4">
                    <div class="form-group">
                      <label class="control-label">CARD NUMBER</label>
                      <input type="text" class="form-control" placeholder="0000 0000 0000 0000" />
                    </div>
                  </div>

                  <div class="col-md-4 col-lg-4">
                    <div class="form-group">
          
                  </div>
                </div>

                <div class="col-md-4 col-lg-4">
                  <div class="form-group">
                    <label class="control-label">CVV</label>
                    <input type="text" class="form-control" placeholder="000" />
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-md-6 col-lg-6">
                  <div class="form-group">
                    <label class="control-label">CARD HOLDER</label>
                    <input type="text" class="form-control" placeholder="NAME HERE" />
                  </div>
                </div>
                <div class="col-md-6 col-lg-6">
                  <div class="form-group">
                    <label class="control-label">EXPIRES</label>
                    <input type="text" class="form-control" placeholder="MM/YY" />
                  </div>
                </div>
              </div>

            <div class="row">
              <div class="col-md-2 col-lg-2">
               <button type="button" class="btn btn-danger" style={{backgroundColor: "#FF4747"}}>Confirm</button>
             </div>
           </div>
         </div>
         <div class="modal-footer">

         </div>

       </div>

     </div>
   </div>

                          </div>                                           
                        <Footer/>
                </React.Fragment>
                )
            }
}
export default ShoppingCart;
