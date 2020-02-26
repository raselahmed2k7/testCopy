import React,{Component} from 'react';
import Header from '../include/header';
import Breadcums from '../include/breadcums';
import RightSideBar from '../include/rightsidebar';
import HotDealPart from '../include/hotDealPart';
class ProductDetailsdd extends Component{
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
            product_full_description: {},
            product_sku: '',
            product_specification_details: [],
            product_specification_details_description: [],
            product_specification_name: [],
            qc_status: '',
            price:0
        }
      
    }
    componentDidMount() {
        this.getProductDetails();
    }
    
    getProductDetails(){
        // fetch('/api/productDetails/?id={this.state.productId}', {
        fetch('/api/productDetails', 
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
            product_full_description :ProductDetails.data[0].product_full_description,
            product_specification_details : JSON.parse(ProductDetails.data[0].product_specification_details),
            product_specification_details_description : JSON.parse(ProductDetails.data[0].product_specification_details_description),
            product_specification_name : JSON.parse(ProductDetails.data[0].product_specification_name),
            qc_status : ProductDetails.data[0].qc_status,
            product_sku : ProductDetails.data[0].product_sku,
            price : ProductDetails.data[0].price,
        })
        console.log(this.state);
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
    return (
        <div className="App">
        <div className="top-bar">
        <div className="row">
        <div className="top-bar-left">
        
        </div>
        <div className="top-bar-right">
        <ul className="menu">
        <li></li>
        <li></li>
        </ul>
        </div>
        </div>
        </div>
        <Header/>
        
        <br/>
        
        
        <div className="row">
        <div className="medium-2 large-2 columns">
        <p><img src="/image/logo_head_left.png" alt="company logo"/></p>
        </div>
        <div className="medium-7 columns">
        
        <div className="input-group input-group-rounded">
        <input className="input-group-field ex1" type="search" placeholder="Lunch Bag for kid"/>
        <div className="input-group-button">
        <input type="submit" className="button secondary"  value="&nbsp;&nbsp;&nbsp;&nbsp;"/>
        </div>
        </div>
        </div>
        <div className="medium-3 large-3 columns">
        <p><img src="/image/cart.png" alt="company logo"/></p>
        </div>
      
        
        </div>
        
        
        <div className="row">
        <div className="medium-4 large-4 columns">
        <div className="fotorama" data-nav="thumbs" data-allowfullscreen="native"> <a href="#"><img src="/image/1.jpg" alt="Stylexpo"/></a> <a href="#"><img src="/image/2.jpg" alt="Stylexpo"/></a> <a href="#"><img src="/image/3.jpg" alt="Stylexpo"/></a> <a href="#"><img src="/image/4.jpg" alt="Stylexpo"/></a> <a href="#"><img src="/image/5.jpg" alt="Stylexpo"/></a> <a href="#"><img src="/image/6.jpg" alt="Stylexpo"/></a> <a href="#"><img src="/image/4.jpg" alt="Stylexpo"/></a> <a href="#"><img src="/image/5.jpg" alt="Stylexpo"/></a> <a href="#"><img src="/image/6.jpg" alt="Stylexpo"/></a> </div>
        
        </div>
        
        
        <div className="medium-5 columns">
        <div className="product-detail-main">
        <div className="product-item-details">
        <h1 className="product-item-name">{this.state.productName}</h1>
        <div className="rating-summary-block">
        <div title="53%" className="rating-result"> <span style={{width:"53%"}}></span> </div>
        </div>
        <div className="price-box"> <span className="price">${this.state.price}</span> <del className="price old-price">$100.00</del> </div>
        <div className="product-info-stock-sku">
        <div>
        <label>Availability: </label>
        <span className="info-deta">In stock</span> 
        </div>
        <div>
        <label>SKU: </label>
        <span className="info-deta">{this.state.product_sku}</span> 
        </div>
        </div>
        <div>
            {        
                this.state.product_specification_name.map(function (product, i) {
                    //   return  <span key={feature.Id}>{feature.Description}</span>
                    return (
                        <React.Fragment>
                            {product.specificationNameValue}
                        </React.Fragment>
                    )
                    })
            }
        </div>
      
        
        <div className="mb-20">
        <div className="product-qty">
        <label htmlFor="qty">Qty:</label>
        <div className="custom-qty">
        <button onClick={this.handleClickMinus.bind(this)} className="reduced items" type="button"> <i className="fa fa-minus"></i> </button>
        <input type="text" className="input-text qty" title="Qty" value={this.state.productQuantity} maxLength="8" id="qty" name="qty"/>
        <button onClick={this.handleClickPlus.bind(this)} className="increase items" type="button"> <i className="fa fa-plus"></i> </button>
        </div>
        </div>
        </div>
        
        <div className="mb-20">
        <div className="bottom-detail cart-button">
        <ul>
        <li className="pro-cart-icon">
        <form>
        <button title="Add to Cart" className="btn-color-red"><span></span>Buy Now</button>
        </form>
        </li>
        <li className="pro-cart-icon">
        <form>
        <button title="Add to Cart" className="btn-color"><span></span>Add to Cart</button>
        </form>
        </li>
        </ul>
        </div>
        
        
        </div>
        <div className="bottom-detail">
        <ul>
        <li className="pro-wishlist-icon"><a href="wishlist.html"><span></span>Wishlist</a></li>
        <li className="pro-compare-icon"><a href="compare.html"><span></span>Compare</a></li>
        <li className="pro-email-icon"><a href="#"><span></span>Email to Friends</a></li>
        </ul>
        </div>
        <div className="share-link">
        <label>Share This : </label>
        <div className="social-link">
        <ul className="social-icon">
        <li><a className="facebook" title="Facebook" href="#"><i className="fa fa-facebook"> </i></a></li>
        <li><a className="twitter" title="Twitter" href="#"><i className="fa fa-twitter"> </i></a></li>
        <li><a className="linkedin" title="Linkedin" href="#"><i className="fa fa-linkedin"> </i></a></li>
        <li><a className="rss" title="RSS" href="#"><i className="fa fa-rss"> </i></a></li>
        <li><a className="pinterest" title="Pinterest" href="#"><i className="fa fa-pinterest"> </i></a></li>
        </ul>
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
        <img src="/image/pro-banner.jpg" alt="Stylexpo"/>
        </div>
        </div>
        </div>
        
        <div className="row">
        
        <div className="product-detail-tab">
        <div className="row">
        <div className="col-lg-12">
        <div id="tabs">
        <ul className="nav nav-tabs">
        <li><a className="tab-Description selected" title="Description">Description</a></li>
        
        </ul>
        </div>
        <div id="items">
        <div className="tab_content">
        <ul>
        <li>
        <div className="items-Description selected ">
        <div className="Description"> <strong>The standard Lorem Ipsum passage, used since the 1500s</strong><br />
        <p>Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean eleifend laoreet congue. Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy  took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into Stylexponic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets</p>
        <p>Tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean eleifend laoreet congue. Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        </div>
        </li>
        <li>
        <div className="items-Product-Tags"><strong>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</strong><br />
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur</div>
        </li>
        
        </ul>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        
        <div className="row">
        
        <div className="product-detail-tab">
        <div className="row">
        <div className="col-lg-12">
        <div id="tabs">
        <ul className="nav nav-tabs">
        
        <li><a className="tab-Product-Tags" title="Product-Tags">Product-Tags</a></li>
        </ul>
        </div>
        <div id="items">
        <div className="tab_content">
        <ul>
        <li>
        <div className="items-Product-Tags selected"><strong>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</strong><br />
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur</div>
        </li>
        </ul>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        
        
        <div className="row">
        
        <div className="product-detail-tab">
        <div className="row">
        <div className="col-lg-12">
        <div id="tabs">
        <ul className="nav nav-tabs">
        
        <li><a className="tab-Reviews" title="Reviews">Reviews</a></li>
        </ul>
        </div>
        <div id="items">
        <div className="tab_content">
        <ul>
        
        <li>
        <div className="items-Reviews selected">
        <div className="comments-area">
        <h4>Comments<span>(2)</span></h4>
        <ul className="comment-list mt-30">
        <li>
        <div className="comment-user"> <img src="/image/comment-user.jpg" alt="Stylexpo"/> </div>
        <div className="comment-detail">
        <div className="user-name">John Doe</div>
        <div className="post-info">
        <ul>
        <li>Fab 11, 2016</li>
        <li><a href="#"><i className="fa fa-reply"></i>Reply</a></li>
        </ul>
        </div>
        <p>Consectetur adipiscing elit integer sit amet augue laoreet maximus nuncac.</p>
        </div>
        <ul className="comment-list child-comment">
        <li>
        <div className="comment-user"> <img src="/image/comment-user.jpg" alt="Stylexpo"/> </div>
        <div className="comment-detail">
        <div className="user-name">John Doe</div>
        <div className="post-info">
        <ul>
        <li>Fab 11, 2016</li>
        <li><a href="#"><i className="fa fa-reply"></i>Reply</a></li>
        </ul>
        </div>
        <p>Consectetur adipiscing elit integer sit amet augue laoreet maximus nuncac.</p>
        </div>
        </li>
        <li>
        <div className="comment-user"> <img src="/image/comment-user.jpg" alt="Stylexpo"/> </div>
        <div className="comment-detail">
        <div className="user-name">John Doe</div>
        <div className="post-info">
        <ul>
        <li>Fab 11, 2016</li>
        <li><a href="#"><i className="fa fa-reply"></i>Reply</a></li>
        </ul>
        </div>
        <p>Consectetur adipiscing elit integer sit amet augue laoreet maximus nuncac.</p>
        </div>
        </li>
        </ul>
        </li>
        <li>
        <div className="comment-user"> <img src="/image/comment-user.jpg" alt="Stylexpo"/> </div>
        <div className="comment-detail">
        <div className="user-name">John Doe</div>
        <div className="post-info">
        <ul>
        <li>Fab 11, 2016</li>
        <li><a href="#"><i className="fa fa-reply"></i>Reply</a></li>
        </ul>
        </div>
        <p>Consectetur adipiscing elit integer sit amet augue laoreet maximus nuncac.</p>
        </div>
        </li>
        </ul>
        </div>
        <div className="main-form mt-30">
        <h4>Leave a comments</h4>
        <form >
        <div className="row">
        <div className="medium-4">
        <input type="text" placeholder="Name" required/>
        </div>
        <div className="medium-4">
        <input type="email" placeholder="Email" required/>
        </div>
        <div className="medium-4">
        <input type="text" placeholder="Website" required/>
        </div>
        <div className="medium-12">
        <textarea cols="30" rows="3" placeholder="Message" required></textarea>
        </div>
        <div className="medium-2">
        <button className="btn btn-color" name="submit" type="submit">Submit</button>
        </div>
        </div>
        </form>
        </div>
        </div>
        </li>
        
        </ul>
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
        
        <div className="row column">
        
        <ul className="menu">
        <li><a href="#">Yeti Store</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
        <li className="float-right"><a href="#">Copyright 2016</a></li>
        </ul>
        </div>
        
        </div>  
        
        </div>
        )
    }
}
export default ProductDetails;
