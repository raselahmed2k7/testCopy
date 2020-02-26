import React,{Component} from 'react';
import Header from '../include/header';
import Footer from '../include/footer';
import Breadcums from '../include/breadcums';
import RightSideBar from '../include/rightsidebar';
import HotDealPart from '../include/hotDealPart';
import $ from 'jquery';
const base = process.env.REACT_APP_FRONTEND_SERVER_URL;
const fileUrl = process.env.REACT_APP_FILE_URL;
const frontEndUrl = process.env.REACT_APP_FRONTEND_URL;

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

window.jQuery = window.$ = $;

class ProductDetails extends Component{
	constructor(props) {
		super(props);
		console.log(props);
		console.log(this.props.match.params.id);
		// this.toggle = this.toggle.bind(this);
		// this.toggleFade = this.toggleFade.bind(this);
		this.state = {
			productQuantity: 1,
			productId: this.props.match.params.id,
			productName: '',
			productImage: '',
			product_full_description: [],
			product_sku: '',
			product_specification_details: [],
			product_specification_details_description: [],
			product_specification_name: [],
			qc_status: '',
			price:0,
			reload:false,
			productImages:[],
			homeImage:'',
			productListSmVendor:[],
			productListSmCategory:[],
			email:'',
			password:'',
			emailError: '',
			passwordError: ''
		}
		this.handleClickMinus = this.handleClickMinus.bind(this);
		this.addCartDirect = this.addCartDirect.bind(this);
		this.createAccountNext = this.createAccountNext.bind(this);
		this.customerLoginSubmit = this.customerLoginSubmit.bind(this);
		this.handleClickPlus = this.handleClickPlus.bind(this);
		
	}
	
	componentDidMount(){
		this.render();
	}
	componentWillMount() {
		
		this.getProductDetails();
	}
	
	
	
	
	getProductDetails(){
		// fetch('/api/productDetails/?id={this.state.productId}', {
		fetch(base+'/api/productDetails', 
		{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				productId: this.state.productId
			})
		})
		.then(res => {
			console.log(res);
			return res.json()
		})
		.then(response => {
			console.log("Consolinggg:",response.data.productDetails[0]); 
			console.log("Consolingggg:",response.data.producSmVendor); 
			console.log("Consolingggg:",response.data.productSmCategory); 
			console.log("Consolingggfffg:",response.data.productSpecifications); 
			this.setState({productArray:response.data[0]},console.log('ccccc',this.state));
			this.setState({
				productName : response.data.productDetails[0].product_name,
				productImage : response.data.productDetails[0].image,
				product_full_description : response.data.productDetails[0].product_full_description? JSON.parse(response.data.productDetails[0].product_full_description) : null,
				product_specification_details_description : response.data.productDetails[0].product_specification_details_description?JSON.parse(response.data.productDetails[0].product_specification_details_description):null,
				// product_specification_name : response.data.productDetails[0].product_specification_name,
				productImages : response.data.productDetails[0].image?JSON.parse(response.data.productDetails[0].image):null,
				qc_status : response.data.productDetails[0].qc_status,
				product_sku : response.data.productDetails[0].product_sku,
				productPrice : response.data.productDetails[0].productPrice,
				homeImage : response.data.productDetails[0].home_image,
				productListSmCategory : response.data.productSmCategory?response.data.productSmCategory:null,
				productListSmVendor : response.data.producSmVendor?response.data.producSmVendor:null,
				product_specification_name : response.data.productSpecifications?response.data.productSpecifications:null
			},()=>{
				console.log("Consoling inner",this.state);
			})
			
			console.log('Consoling outer',this.state.product_full_description);
			console.log('Consoling outer',this.state.product_specification_details_description);
			// this.setState({ 
			//     productList : products.data
			// })
			// console.log('Product Data : ', this.state.productList);
			return false;
		});
	}
	
	
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
	
	slidesZoom(){
		let slidesImages = [];
		if(this.state.productImages){
			this.state.productImages.map((item,key)=>{
				console.log('bapariiii',item.imageName);
				slidesImages.push(<React.Fragment>
					<li>
					<img src={fileUrl+"/upload/product/productImages/"+item.imageName} data-imagezoom="true" className="img-responsive"/>
					</li>
					</React.Fragment>);
				})
			}
			return slidesImages;
		}
		
		couraselImages(){
			let couresel = [];
			if(this.state.productImages){
				this.state.productImages.map((item,key)=>{
					couresel.push(<React.Fragment>
						{/* <li>
							<img src={fileUrl+"/upload/product/productImages/"+item.imageName} />
						</li> */}
						<li>
						<img src="/asche.jpg" />
						</li>
						</React.Fragment>);
					})
				}
				return couresel;
			}
			
			productDescriptions(){
				let descriptionText = [];
				if(this.state.product_full_description.length>0){
					this.state.product_full_description.map((item,key)=>{
						descriptionText.push(<React.Fragment>
							<h3>{item.title}</h3>
							{
								item.descriptionImage?
								<img src={fileUrl+'/upload/product/productDescriptionImages/'+item.descriptionImage}></img>
								:''
							}
							
							<p>{item.description}</p>
							</React.Fragment>
							)
						})
					}
					else{
						descriptionText.push(<p style={{color:"#ec1c24"}}>No Descriptions Added</p>)
					}
					return descriptionText;
				}
				
				sameVendorOtherProducts(){
					let textList = [];
					let counter = 0;
					if(this.state.productListSmVendor){
						this.state.productListSmVendor.map((item,key)=>{
							console.log('iiiiiiii',item.home_image)
							textList.push(<React.Fragment>
								<div className="column"><a href={'/productDetails/'+item.id}>
								<div className="frameMore">
								<span className="helperframeMore">
								<img src={fileUrl+'/upload/product/productImages/'+item.home_image} alt="More"/>	
								</span>
								</div>
								</a>
								</div>
								</React.Fragment>
								)
								counter++;
							})
							if(counter<6){
								for(let i= counter;i<6;i++){
									textList.push(	<div className="column">
									<div className="frameMore">
									<span className="helperframeMore">
									<img src="/image/responssive.jpg" alt="More"/>
									</span>
									</div>
									</div>)
								}
							}
						}
						return textList;
					}
					
					sameProductsOtherVendor(){
						let textList = [];
						let counter = 0;
						if(this.state.productListSmCategory){
							this.state.productListSmCategory.map((item,key)=>{
								console.log('iiiiiiii',item.home_image)
								textList.push(<React.Fragment>
									<div className="column">
									<a href={'/productDetails/'+item.id}>
									<div className="frameMore">
									<span className="helperframeMore">
									<img src={fileUrl+'/upload/product/productImages/'+item.home_image} alt="More"/>	
									</span>
									</div>
									</a>
									</div>
									</React.Fragment>
									)
									counter++;
								})
								if(counter<6){
									for(let i= counter;i<6;i++){
										textList.push(	<div className="column">
										<div className="frameMore">
										<span className="helperframeMore">
										<img src="/image/responssive.jpg" alt="More"/>
										</span>
										</div>
										</div>)
									}
								}
							}
							return textList;
						}
						
						specificationDetailsPart(){
							const spcArray = [];
							if(this.state.product_specification_name.length>1){
								this.state.product_specification_name.map((item,key)=>{
									spcArray.push(<h5>{item.specificationName.toUpperCase()} :</h5>);
									this.state.product_specification_name.map((item1,key1)=>{
										if(item.specificationName==item1.specificationName){
											spcArray.push(<div className="colr ert">
											<div className="check">
											<label className="checkbox"><input type="checkbox" name="checkbox" checked=""/><i> </i>{item1.specificationNameValue}</label>
											</div>
											</div>)
										}
										else{
											
										}
									})
									spcArray.push(<div className="clearfix"> </div>)
								})
							}
							else{
								// spcArray.push(<h4 style={{color:"green"}}>No Descriptions Yet</h4>)
							}
							
							return spcArray;
						}
						
						addCartDirect(){
							fetch(base+'/api/add_cart_direct', 
									{
										method: 'POST',
										headers: {
											'Accept': 'application/json',
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({
											productId: this.state.productId,
											customerId: localStorage.customer_id,
											quantity: this.state.productQuantity
										})
									})
									.then(res => {
										return res.json()
									})
									.then(response => {
										if(response.data==true){
											// window.location = '/cart';
											var link = document.getElementById('successCartMessage');
											
        									 link.click();
        								
										}
									});
						}

						customerLoginSubmit(event){
							event.preventDefault();
							fetch(base+'/api/loginCustomerInitial', 
							{
								method: 'POST',
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									email: event.target.emailField.value,
									password: event.target.passwordField.value,
									productId: this.state.productId,
									quantity: this.state.productQuantity
								})
							})
							.then(res => {
								return res.json()
							})
							.then(response => {
								console.log('aa',response);
								if(response.data!=''){
									localStorage.setItem("customer_id",response.data);
									// window.location = '/cart';
									var link = document.getElementById('successCartMessage');
									var hide = document.getElementById('hideLogin');
									hide.click();
         							link.click();
								}
							});
						}

						createAccountNext(event){
							event.preventDefault();
							if(event.target.email.value == '' || event.target.email.value == null){
								this.setState({
								emailError: "Email cannot be empty"
							  });
							  return false;
							  }
							  else if (!emailPattern.test(event.target.email.value) && event.target.email.value > 0) {
								this.setState({
								  emailError: "Enter a valid Password"
								});
								return false;

							  }
							  else if(event.target.password.value == '' || event.target.password.value == null){
								this.setState({
								passwordError: "Password cannot be empty"
							  });
							  return false;

							  }
							  else{
									fetch(base+'/api/saveCustomerInitial', 
									{
										method: 'POST',
										headers: {
											'Accept': 'application/json',
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({
											email: event.target.email.value,
											password: event.target.password.value,
											productId: this.state.productId,
											quantity: this.state.productQuantity
										})
									})
									.then(res => {
										return res.json()
									})
									.then(response => {
										if(response.data!=''){
											localStorage.setItem("customer_id",response.data);
											var hideLogin = document.getElementById('hideLogin');
											var link = document.getElementById('successCartMessage');
											hideLogin.click();
         									link.click();
											// window.location = '/cart';
										}
									});
							  }
						
							}	
						
							
						
						render(){
							let url = "http://admin.banijjo.com.bd";
							let counter = 1;
							let specificationName = '';	
							return (
								<React.Fragment>
								 <button style={{display:"none !important"}} id="successCartMessage" type="button" data-toggle="modal" data-target="#exampleModalShipping"role="button"></button>
                        		  <div className="modal" id="exampleModalShipping" tabindex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content" style={{width:"900px"}}>
                              <div className="modal-header">
                                <h5 className="modal-title" style={{textAlign: "center"}}>&nbsp;</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{marginTop: "-25px"}}>
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div className="modal-body">

                                <div className="row">
                                  <div className="col-md-1 col-lg-1">

                                  <i className="fa fa-check" style={{fontSize:"50px",color:"white",backgroundColor: "#009345",borderRadius: "40px"}}></i>
                                </div>
                                <div className="col-md-11 col-lg-11">
                                  <p style={{color:"#009345"}}>Nice.A new item has been added to your Shopping Cart.</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-1 col-lg-1">
                                  </div>
                                  <div className="col-md-3 col-lg-3">

                                  <a  href="/cart" className="btn btn-success" style={{backgroundColor: "#ec1c24",borderColor: "#ec1c24"}}>View Shopping Cart</a>
                                </div>
                                <div className="col-md-3 col-lg-3">
                                  <a href={frontEndUrl} className="btn btn-success" style={{backgroundColor: "#ec1c24",borderColor: "#ec1c24"}}>Continue Shopping</a>
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
								<div className="medium-4 large-4 columns">
								
								<div id="slider" className="flexslider">
								<ul className="slides">
								
								{this.slidesZoom()}
								
								
								</ul>
								</div>
								<div id="carousel" className="flexslider">
								<ul className="slides">
								{/* <li>
									<img src="/asche.jpg" />
								</li> */}
								{this.couraselImages()}
								</ul>
								</div>
								</div>
								<div className="medium-5 columns">
								<h3>{this.state.productName}</h3>
								<div className="rating1">
								<span className="starRating">
								<input id="rating5" type="radio" name="rating" value="5"/>
								<label htmlFor="rating5">5</label>
								<input id="rating4" type="radio" name="rating" value="4"/>
								<label htmlFor="rating4">4</label>
								<input id="rating3" type="radio" name="rating" value="3" checked/>
								<label htmlFor="rating3">3</label>
								<input id="rating2" type="radio" name="rating" value="2"/>
								<label htmlFor="rating2">2</label>
								<input id="rating1" type="radio" name="rating" value="1"/>
								<label htmlFor="rating1">1</label>
								</span>
								</div>
								
								<div className="color-quality">
								<div className="color-quality-left">
								<h5>Color : </h5>
								<ul>
								<li><a href="#"><span></span></a></li>
								<li><a href="#" className="brown"><span></span></a></li>
								<li><a href="#" className="purple"><span></span></a></li>
								<li><a href="#" className="gray"><span></span></a></li>
								</ul>
								</div>
								<div className="color-quality-right">
								<h5>Quality :</h5>
								<div className="quantity"> 
								<div className="quantity-select">                           
								<div onClick={this.handleClickMinus} className="entry value-minus1">&nbsp;</div>
								<div className="entry value1"><span>{this.state.productQuantity}</span></div>
								<div onClick={this.handleClickPlus} className="entry value-plus1 active">&nbsp;</div>
								</div>
								</div>
								
								</div>
								<div className="clearfix"> </div>
								</div>
								<div className="occasional">
								{
									this.specificationDetailsPart()
								}
								{/* <h5>RAM :</h5>
									<div className="colr ert">
									<div className="check">
									<label className="checkbox"><input type="checkbox" name="checkbox" checked=""/><i> </i>3 GB</label>
									</div>
									</div>
									<div className="colr">
									<div className="check">
									<label className="checkbox"><input type="checkbox" name="checkbox"/><i> </i>2 GB</label>
									</div>
									</div>
									<div className="colr">
									<div className="check">
									<label className="checkbox"><input type="checkbox" name="checkbox"/><i> </i>1 GB</label>
									</div>
								</div> */}
								<div className="clearfix"> </div>
								</div>
								<div className="simpleCart_shelfItem">
								<p><span>৳{this.state.productPrice}</span> <i className="item_price">৳{this.state.productPrice}</i></p>
								<form action="#" method="post">
								<input type="hidden" name="cmd" value="_cart"/>
								<input type="hidden" name="add" value="1"/> 
								<input type="hidden" name="w3ls_item" value="Smart Phone"/> 
								<input type="hidden" name="amount" value="450.00"/> 
								{
									localStorage.customer_id!=''?
									<button type="button" onClick={this.addCartDirect} style={{backgroundColor:"009345"}} className="w3ls-cart">Add to cart</button>

									:<button type="button" data-toggle="modal" data-target="#exampleModal" style={{backgroundColor:"009345"}} className="w3ls-cart">Add to cart</button>

								}
								
								</form>
								</div> 
								</div>



								
							<div className="modal" id="exampleModal" tabindex="-1" role="dialog">
								<div className="modal-dialog" role="document">
									<div className="modal-content" style={{width: "50%",marginLeft:"20%"}}>
										<div className="modal-header">
											{/* <h5 className="modal-title" style={{textAlign: "center",color:"#009345"}}>Banijjo.com</h5> */}
										{/* <img width= src = "/image/banijjoLogo.png"/>	 */}
									
										<button id="hideLogin" type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">×</span>
											</button>
												<div className="frameTopSelection">
													<span className="helperframeTopSelection" style={{background:"white"}}>
													<img src="/image/banijjoLogo.png" alt=""/>
													</span>
												</div>
										</div>
										<ul className="nav nav-tabs">
											<li className="active" style={{paddingLeft: "80px"}}><a data-toggle="tab" href="#home">REGISTER</a></li>
											<li style={{paddingLeft: "30px"}}><a data-toggle="tab" href="#menu1">Sign In</a></li>
										</ul>
										<div className="tab-content">
											<div id="home" className="tab-pane fade in active">
												<div className="modal-body">
													<form className="form-signin" onSubmit={this.createAccountNext}>
														<div className="form-label-group">
																<input type="email" id="inputEmail" name="email" className="form-control" placeholder="Email address" required/>
																{this.state.emailError? <span style={{color:"red"}}>{this.state.emailError}</span>:''}
														</div>
													
														<div className="form-label-group">
																<input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required/>
																{this.state.passwordError? <span style={{color:"red"}}>{this.state.passwordError}</span>:''}
														</div>
														<div className="modal-footer">
															<button type="submit"  className="btn btn-danger" style={{backgroundColor: "#ec1c24"}}>Create Account</button>
																<p align="left"><a href="#" target="_blank" className="">Forgot Password?</a></p>
														</div>
													</form>
												</div>
												
											</div>
											<div id="menu1" className="tab-pane fade">
											<div className="modal-body">
												<form className="form-signin" onSubmit={this.customerLoginSubmit}>
														<div className="form-label-group">
															<input type="email" name="emailField" className="form-control" placeholder="Email " required />
														</div>
														<div className="form-label-group">
															<input type="password"  name="passwordField" className="form-control" placeholder="Password" required/>
														</div>
														<div className="modal-footer">
															<button type="submit" className="btn btn-danger" style={{backgroundColor: "#ec1c24"}}>Login</button>
															<p align="left"><a href="#" target="_blank" className="">Forgot Password?</a></p>
														</div>	
												</form>
											</div>

																															
										</div>
										</div>
									</div>
							
								</div>
							</div>
							
								<div className="medium-3 large-3 columns">
								<div className="brand-logo-pro align-center mb-30">
								<img src="/image/brand5.png" alt="Stylexpo"/>
								</div>
								<div className="sub-banner-block align-center">
								<img src="/asche.jpg" alt="Stylexpo"/>
								</div>
								</div>
								</div>
								<div className="row">
								<div className="sap_tabs">	
								<div id="horizontalTab1" style={{display: "block", width: "100%",margin: "0px"}}>
								<ul>
								<li className="resp-tab-item" aria-controls="tab_item-0" role="tab"><span>OVERVIEW</span></li>
								<li className="resp-tab-item" aria-controls="tab_item-1" role="tab"><span>CUSTOMER REVIEWS</span></li>
								<li className="resp-tab-item" aria-controls="tab_item-2" role="tab"><span>SPECIFICATIONS</span></li>
								</ul>		
								<div className="tab-1 resp-tab-content additional_info_grid" aria-labelledby="tab_item-0">
								{this.productDescriptions()}
								
								</div>	
								
								<div className="tab-2 resp-tab-content additional_info_grid" aria-labelledby="tab_item-1">
								<h4>(2) Reviews</h4>
								<div className="additional_info_sub_grids">
								<div className="medium-2 additional_info_sub_grid_left">
								<img src="/image/t1.png" alt=" " className="img-responsive" />
								</div>
								<div className="medium-10 additional_info_sub_grid_right">
								<div className="additional_info_sub_grid_rightl">
								<a href="single.html">Laura</a>
								<h5>Oct 06, 2016.</h5>
								<p>Quis autem vel eum iure reprehenderit qui in ea voluptate 
								velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat 
								quo voluptas nulla pariatur.</p>
								</div>
								<div className="additional_info_sub_grid_rightr">
								<div className="rating">
								<div className="rating-left">
								<img src="/image/star-.png" alt=" " className="img-responsive"/>
								</div>
								<div className="rating-left">
								<img src="/image/star-.png" alt=" " className="img-responsive"/>
								</div>
								<div className="rating-left">
								<img src="/image/star-.png" alt=" " className="img-responsive"/>
								</div>
								<div className="rating-left">
								<img src="/image/star.png" alt=" " className="img-responsive"/>
								</div>
								<div className="rating-left">
								<img src="/image/star.png" alt=" " className="img-responsive"/>
								</div>
								<div className="clearfix"> </div>
								</div>
								</div>
								<div className="clearfix"> </div>
								</div>
								<div className="clearfix"> </div>
								</div>
								<div className="additional_info_sub_grids">
								<div className="medium-2 additional_info_sub_grid_left">
								<img src="/image/t2.png" alt=" " className="img-responsive" />
								</div>
								<div className="medium-10 additional_info_sub_grid_right">
								<div className="additional_info_sub_grid_rightl">
								<a href="single.html">Michael</a>
								<h5>Oct 04, 2016.</h5>
								<p>Quis autem vel eum iure reprehenderit qui in ea voluptate 
								velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat 
								quo voluptas nulla pariatur.</p>
								</div>
								<div className="additional_info_sub_grid_rightr">
								<div className="rating">
								<div className="rating-left">
								<img src="/image/star-.png" alt=" " className="img-responsive"/>
								</div>
								<div className="rating-left">
								<img src="/image/star-.png" alt=" " className="img-responsive"/>
								</div>
								<div className="rating-left">
								<img src="/image/star.png" alt=" " className="img-responsive"/>
								</div>
								<div className="rating-left">
								<img src="/image/star.png" alt=" " className="img-responsive"/>
								</div>
								<div className="rating-left">
								<img src="/image/star.png" alt=" " className="img-responsive"/>
								</div>
								<div className="clearfix"> </div>
								</div>
								</div>
								<div className="clearfix"> </div>
								</div>
								<div className="clearfix"> </div>
								</div>
								<div className="review_grids">
								<h5>Add A Review</h5>
								<form action="#" method="post">
								{/* <input type="text" name="Name" value="Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Name';}" required=""/>
								<input type="email" name="Email" placeholder="Email" required=""/>
								<input type="text" name="Telephone" value="Telephone" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Telephone';}" required=""/>
								<textarea name="Review" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Add Your Review';}" required="">Add Your Review</textarea>
							<input type="submit" value="Submit" /> */}
							</form>
							</div>
							</div>
							
							
							<div className="tab-1 resp-tab-content additional_info_grid" aria-labelledby="tab_item-2">
							<div className="row">
							<div className="medium-6 large-6 columns">
							{
								
								this.state.product_specification_details_description?
								this.state.product_specification_details_description.map((item,key)=>{
									if(counter==1){
										if(((key+1)%8)===0){
											counter = key;
											return false;
										}
										else{
											return(<li>{item.specificationDetailsName}: {item.specificationDetailsValue}</li>)
										}
									}
								})
								:''
							}
							</div>
							
							
							<div className="medium-6 large-6 columns">
							{
								counter>1?
								this.state.product_specification_details_description.map((item,key)=>{
									if(key>=counter){
										return(<li>{counter}{item.specificationDetailsName}: {item.specificationDetailsValue}</li>)
									}
								})
								:
								''
							}
							</div>
							</div> 			        					            	      
							</div>	
							</div>
							</div>
							</div>
							
							<div className="row">
							<div className="row column">
							<p>&nbsp;</p>
							</div>
							<div className="medium-12 columns">
							<h5 style={{color:"#009345"}} className="text-left">
							Similar Products<a href=""><span style={{float: "right",color: "#009345",fontSize: "14px"}}>See more</span></a></h5>
							<div className="row small-up-6">
							{this.sameProductsOtherVendor()}
							</div>
							</div>
							</div>



							
							
							<div className="row">
							<div className="row column">
							<p>&nbsp;</p>
							</div>
							<div className="medium-12 columns">
							<h5 style={{color:"#009345"}} className="text-left">
							Same Vendor Other Products <a href=""><span style={{float: "right",color: "#009345",fontSize: "14px"}}>See more</span></a></h5>
							<div className="row small-up-6">
							{this.sameVendorOtherProducts()}
							</div>
							</div>
							</div>
							<Footer/>
							
							</React.Fragment>
							)
						}
					}
					export default ProductDetails;
					