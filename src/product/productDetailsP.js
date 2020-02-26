import React,{Component} from 'react';
import Header from '../include/header';
import Breadcums from '../include/breadcums';
import RightSideBar from '../include/rightsidebar';
import HotDealPart from '../include/hotDealPart';
import $ from 'jquery';
const base = process.env.REACT_APP_FRONTEND_SERVER_URL;

window.jQuery = window.$ = $;
// require ("../js/jquery.flexslider.js");
// import 'bootstrap';
// import flexSlider from 'flexslider';
// window.location.reload();
//WARNING! To be deprecated in React v17. Use componentDidMount instead.


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
			reload:false
        }
      
    }
    componentDidMount() {
        this.render();
       // this.getProductDetails();
        
 

    // $(".flexslider").flexslider({
	// 						animation: "slide",
	// 						controlNav: "thumbnails"
    //     				});

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
    .then(ProductDetails => {
        console.log("Consoling:",ProductDetails.data[0]); 
        this.setState({
            productName : ProductDetails.data[0].product_name,
            productImage : ProductDetails.data[0].image,
            product_full_description : JSON.parse(ProductDetails.data[0].product_full_description),
            product_specification_details : JSON.parse(ProductDetails.data[0].product_specification_details),
            product_specification_details_description : JSON.parse(ProductDetails.data[0].product_specification_details_description),
            product_specification_name : JSON.parse(ProductDetails.data[0].product_specification_name),
            qc_status : ProductDetails.data[0].qc_status,
            product_sku : ProductDetails.data[0].product_sku,
            price : ProductDetails.data[0].price,
        },()=>{
			console.log("Consoling inner",this.state.product_full_description);
			

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
render(){
	let url = "http://admin.banijjo.com.bd";
    return (
        <React.Fragment>

	<Header/>


	<br/>

	<Breadcums/>

	<div className="row">
		<div className="medium-4 large-4 columns">
			
			<div id="slider" className="flexslider">
				<ul className="slides">
					<li>
						<img src="/image/a.jpg" data-imagezoom="true" className="img-responsive"/>
					</li>
					<li>
						<img src="/image/b.jpg" data-imagezoom="true" className="img-responsive"/>
					</li>
					<li>
						<img src="/image/c.jpg" data-imagezoom="true" className="img-responsive"/>
					</li>
					<li>
						<img src="/image/a.jpg" data-imagezoom="true" className="img-responsive" />
					</li>
					<li>
						<img src="/image/b.jpg" data-imagezoom="true" className="img-responsive"/>
					</li>
					<li>
						<img src="/image/c.jpg" data-imagezoom="true" className="img-responsive" />
					</li>
					<li>
						<img src="/image/a.jpg" data-imagezoom="true" className="img-responsive" />
					</li>
					<li>
						<img src="/image/b.jpg" data-imagezoom="true" className="img-responsive" />
					</li>
					<li>
						<img src="/image/c.jpg" data-imagezoom="true" className="img-responsive" />
					</li>
					<li>
						<img src="/image/a.jpg" data-imagezoom="true" className="img-responsive" />
					</li>
					<li>
						<img src="/image/b.jpg" data-imagezoom="true" className="img-responsive" />
					</li>
					<li>
						<img src="/image/c.jpg" data-imagezoom="true" className="img-responsive"/>
					</li>
				</ul>
			</div>
			<div id="carousel" className="flexslider">
				<ul className="slides">
					<li>
						<img src="/image/a.jpg" />
					</li>
					<li>
						<img src="/image/b.jpg" />
					</li>
					<li>
						<img src="/image/c.jpg" />
					</li>
					<li>
						<img src="/image/a.jpg" />
					</li>
					<li>
						<img src="/image/b.jpg" />
					</li>
					<li>
						<img src="/image/c.jpg" />
					</li>
					<li>
						<img src="/image/a.jpg" />
					</li>
					<li>
						<img src="/image/b.jpg" />
					</li>
					<li>
						<img src="/image/a.jpg" />
					</li>
					<li>
						<img src="/image/a.jpg" />
					</li>
					<li>
						<img src="/image/b.jpg" />
					</li>
					<li>
						<img src="/image/c.jpg" />
					</li>
				</ul>
			</div>

			</div>


			<div className="medium-5 columns">
				<h3>The Best 3GB RAM Mobile Phone</h3>
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
				<div className="description">
					<h5><i>Description</i></h5>
					<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
						eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
						Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut 
						odit aut fugit, sed quia consequuntur magni dolores eos qui 
					ratione voluptatem sequi nesciunt.</p>
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
								<div className="entry value-minus1">&nbsp;</div>
								<div className="entry value1"><span>1</span></div>
								<div className="entry value-plus1 active">&nbsp;</div>
							</div>
						</div>

					</div>
					<div className="clearfix"> </div>
				</div>
				<div className="occasional">
					<h5>RAM :</h5>
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
					</div>
					<div className="clearfix"> </div>
				</div>
				<div className="simpleCart_shelfItem">
					<p><span>$460</span> <i className="item_price">$450</i></p>
					<form action="#" method="post">
						<input type="hidden" name="cmd" value="_cart"/>
						<input type="hidden" name="add" value="1"/> 
						<input type="hidden" name="w3ls_item" value="Smart Phone"/> 
						<input type="hidden" name="amount" value="450.00"/>   
						<button type="submit" className="w3ls-cart">Add to cart</button>
					</form>
				</div> 
			</div>
			<div className="medium-3 large-3 columns">
				<div className="brand-logo-pro align-center mb-30">
					<img src="/image/brand5.png" alt="Stylexpo"/>
				</div>
				<div className="sub-banner-block align-center">
					<img src="/image/pro-banner.jpg" alt="Stylexpo"/>
				</div>
			</div>
		</div>

		<div className="row">


			<div className="sap_tabs">	
				<div id="horizontalTab1" style={{display: "block",width: "100%", margin: "0px"}}>
					<ul>
						<li className="resp-tab-item" aria-controls="tab_item-0" role="tab"><span>OVERVIEW</span></li>
						<li className="resp-tab-item" aria-controls="tab_item-1" role="tab"><span>CUSTOMER REVIEWS</span></li>
						<li className="resp-tab-item" aria-controls="tab_item-2" role="tab"><span>SPECIFICATIONS</span></li>
					</ul>		
					<div className="tab-1 resp-tab-content additional_info_grid" aria-labelledby="tab_item-0">
						<h3>The Best 3GB RAM Mobile Phone</h3>
						<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
							eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
							Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut 
							odit aut fugit, sed quia consequuntur magni dolores eos qui 
							ratione voluptatem sequi nesciunt.Ut enim ad minima veniam, quis nostrum 
							exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea 
							commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate 
							velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat 
						quo voluptas nulla pariatur.</p>
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
							{/* <form action="#" method="post">
								<input type="text" name="Name" value="Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Name';}" required=""/>
								<input type="email" name="Email" placeholder="Email" required=""/>
								<input type="text" name="Telephone" value="Telephone" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Telephone';}" required=""/>
								<textarea name="Review" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Add Your Review';}" required="">Add Your Review</textarea>
								<input type="submit" value="Submit" />
							</form> */}
						</div>
					</div>


					<div className="tab-1 resp-tab-content additional_info_grid" aria-labelledby="tab_item-2">
						<div className="row">
							<div className="medium-6 large-6 columns">
								<li>Brand Name: Dreamsindy</li>
								<li>Retail Package: Yes</li>
								<li>Type: Fitted Case</li>
								<li>Features: For Samsung Galaxy case & cover</li>
								<li>Function: Waterproof</li>
								<li>Function: Dirt-resistant</li>
								<li>Function: Anti-knock</li>
							</div>
							<div className="medium-6 large-6 columns">
								<li>Function: Heavy Duty Protection</li>
								<li>Function: Adsorption</li>
								<li>Compatible Brand: Samsung</li>
								<li>Design: Matte</li>
								<li>Design: Glossy</li>
								<li>Design: Plain</li>
								<li>Design: Transparent</li>
								<li>Design: Business</li>
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
					<h5 style={{margin: "0"}} className="text-left">
						Similar Products<a href=""><span style={{float: "right",color: "#009345",fontSize: "14px"}}>See more</span></a></h5>
						<div className="row small-up-6">
							<div className="column">
								<div className="frameMore">
									<span className="helperframeMore">
										<img src="/image/responssive.jpg" alt="More"/>
									</span>
								</div>
							</div>
							<div className="column">
								<div className="frameMore">
									<span className="helperframeMore">
										<img src="/image/responssive.jpg" alt="More"/>
									</span>
								</div>
							</div>
							<div className="column">
								<div className="frameMore">
									<span className="helperframeMore">
										<img src="/image/responssive.jpg" alt="More"/>
									</span>
								</div>
							</div>
							<div className="column">
								<div className="frameMore">
									<span className="helperframeMore">
										<img src="/image/responssive.jpg" alt="More"/>
									</span>
								</div>
							</div>
							<div className="column">
								<div className="frameMore">
									<span className="helperframeMore">
										<img src="/image/responssive.jpg" alt="More"/>
									</span>
								</div>
							</div>
							<div className="column">
								<div className="frameMore">
									<span className="helperframeMore">
										<img src="/image/responssive.jpg" alt="More"/>
									</span>
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
						<h5 style={{margin: "0"}} className="text-left">
							More To Love <a href=""><span style={{float: "right",color: "#009345",fontSize: "14px"}}>See more</span></a></h5>
							<div className="row small-up-6">
								<div className="column">
									<div className="frameMore">
										<span className="helperframeMore">
											<img src="/image/responssive.jpg" alt="More"/>
										</span>
									</div>
								</div>
								<div className="column">
									<div className="frameMore">
										<span className="helperframeMore">
											<img src="/image/responssive.jpg" alt="More"/>
										</span>
									</div>
								</div>
								<div className="column">
									<div className="frameMore">
										<span className="helperframeMore">
											<img src="/image/responssive.jpg" alt="More"/>
										</span>
									</div>
								</div>
								<div className="column">
									<div className="frameMore">
										<span className="helperframeMore">
											<img src="/image/responssive.jpg" alt="More"/>
										</span>
									</div>
								</div>
								<div className="column">
									<div className="frameMore">
										<span className="helperframeMore">
											<img src="/image/responssive.jpg" alt="More"/>
										</span>
									</div>
								</div>
								<div className="column">
									<div className="frameMore">
										<span className="helperframeMore">
											<img src="/image/responssive.jpg" alt="More"/>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
</div>

        
        </React.Fragment>
        )
    }
}
export default ProductDetails;
