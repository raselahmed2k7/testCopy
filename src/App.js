import React,{Component} from 'react';
import Breadcums from './include/breadcums';
import Footer from './include/footer';
import Categories from './include/categories';
const fileUrl = process.env.REACT_APP_FILE_URL;
// import Header from './include/header';
// import Breadcums from './include/breadcums';
// import RightSideBar from './include/rightsidebar';
// import HotDealPart from './include/hotDealPart';
// import Styles from  './foundation.css';
const base = process.env.REACT_APP_FRONTEND_SERVER_URL;
const baseUrl = process.env.REACT_APP_FRONTEND_URL;

class App extends Component{
   constructor(props) {
      super(props);
      // this.toggleFade = this.toggleFade.bind(this);
      this.state = {
         allProductList:[],
         HotDeals:[],
         TopSelections:[],
         NewForYou:[],
         StoreWIllLove:[],
         More:[],
         BannerImages:[],
         BannerTop:[],
         FeaturedBrands:[],
         Categories:[],
         HotDealsTitle:'',
         TopSelectionsTitle:'',
         NewForYouTitle:'',
         BannerTopTitle:'',
         StoreWIllLoveTitle:'',
         MoreTitle:'',
         BannerImagesTitle:'',
         FeaturedBrandsTitle:'',
      }
   }
   componentDidMount() {
      this.getAllProductList();
   }
   getAllProductList(){
      
      fetch(base+'/api/all_product_list', {
         method: 'GET'
      })
      .then(res => {
         console.log(res);
         return res.json()
      })
      .then(products => {
         console.log('sdddss',products.data.HotDealsTitle);
         if(products.data.categories){
            this.setState({ 
               Categories :products.data.categories
            })
         }
         this.setState({ 
           HotDealsTitle:products.data.HotDealsTitle,
           TopSelectionsTitle:products.data.TopSelectionsTitle,
           StoreWIllLoveTitle:products.data.StoreWIllLoveTitle,
           MoreTitle:products.data.MoreTitle,
           BannerImagesTitle:products.data.BannerImagesTitle,
           NewForYouTitle:products.data.NewForYouTitle,
           FeaturedBrandsTitle:products.data.FeaturedBrandsTitle,
           BannerTopTitle:products.data.BannerTopTitle
         })
    


         if(products.data.HotDeals[0]){
            this.setState({ 
               HotDeals : JSON.parse(products.data.HotDeals[0].feature_products)})
            }
            if(products.data.TopSelections[0]){
               this.setState({ 
                  TopSelections : JSON.parse(products.data.TopSelections[0].feature_products)})
               }
               if(products.data.StoreWIllLove[0]){
                  this.setState({ 
                     StoreWIllLove : JSON.parse(products.data.StoreWIllLove[0].feature_products)})
                  }
                  if(products.data.More[0]){
                     this.setState({ 
                        More : JSON.parse(products.data.More[0].feature_products)})
                     }
                     if(products.data.BannerImages[0]){
                        this.setState({ 
                           BannerImages : JSON.parse(products.data.BannerImages[0].feature_products)})
                        }
                        
                        if(products.data.NewForYou[0]){
                           this.setState({ 
                              NewForYou : JSON.parse(products.data.NewForYou[0].feature_products)})
                           }
                           
                           if(products.data.FeaturedBrands[0]){
                              this.setState({ 
                                 FeaturedBrands : JSON.parse(products.data.FeaturedBrands[0].feature_products)})
                              }

                              if(products.data.BannerTop[0]){
                                 this.setState({ 
                                    BannerTop : JSON.parse(products.data.BannerTop[0].feature_products)})
                                 }
                                 return false;
                              });
                           }
                           
                           hotDeal(){
                              let hotView = [];
                              let counter = 0;
                              if(counter==0){
                                 this.state.HotDeals.map((item,key)=>{
                                    hotView.push(<div className="col-md-3">
                                    <a href={"/productDetails/"+item.productId} className="thumbnail">
                                    <div className="frameHotDeal" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperHotDeal">
                                    <img src={fileUrl+"/upload/product/productImages/"+item.productImage} alt=""/>
                                    </span>
                                    </div>
                                    </a>
                                    </div>)
                                    counter++;
                                 })
                              }
                              
                              if(counter<4){
                                 for(let i= counter;i<4;i++){
                                    hotView.push(<div className="col-md-3">
                                    <a target="__blank" href={'/productDetails/'+103} className="thumbnail">
                                    <div className="frameHotDeal" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperHotDeal">
                                    <img src="/ppppp.jpg" alt=""/>
                                    </span>
                                    </div>
                                    </a>
                                    </div>)
                                 }
                              }
                              return hotView;
                           }
                           
                           topSelections(){
                              let hotView = [];
                              let counter = 0;
                              if(counter==0){
                                 this.state.TopSelections.map((item,key)=>{
                                    hotView.push(<div className="column">
                                    <a href={"/productDetails/"+item.productId} className="thumbnail">
                                    <div className="frameTopSelection" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperframeTopSelection">
                                    <img src={fileUrl+"/upload/product/productImages/"+item.productImage} alt=""/>
                                    </span>
                                    </div>
                                    </a>
                                    </div>)
                                    counter++;
                                 })
                              }
                              
                              if(counter<4){
                                 for(let i= counter;i<4;i++){
                                    hotView.push(<div className="column">                     
                                    <a href="http://banijjo.com.bd/productDetails/48" className="thumbnail">
                                    <div className="frameTopSelection" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperframeTopSelection">
                                    <img src="/ppppp.jpg" alt=""/>
                                    </span>
                                    </div>
                                    </a>
                                    </div>)
                                 }
                              }
                              return hotView;
                           }
                           
                           
                           newForYou(){
                              let hotView = [];
                              let counter = 0;
                              if(counter==0){
                                 this.state.NewForYou.map((item,key)=>{
                                    hotView.push(<div className="column">
                                    <a href={"/productDetails/"+item.productId} className="thumbnail">
                                    <div className="frameTopSelection" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperframeTopSelection">
                                    <img src={fileUrl+"/upload/product/productImages/"+item.productImage} alt=""/>
                                    </span>
                                    </div>
                                    </a>
                                    </div>)
                                    counter++;
                                 })
                              }
                              
                              if(counter<4){
                                 for(let i= counter;i<4;i++){
                                    hotView.push(<div className="column">                     
                                    <a href="http://banijjo.com.bd/productDetails/48" className="thumbnail">
                                    <div className="frameTopSelection" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperframeTopSelection">
                                    <img src="/ppppp.jpg" alt=""/>
                                    </span>
                                    </div>
                                    </a>
                                    </div>)
                                 }
                              }
                              return hotView;
                           }
                           
                           topSelectionBig(){
                              let hotView = [];
                              let counter = 0;
                              if(counter==0){
                                 
                                 
                                 this.state.FeaturedBrands.map((item,key)=>{
                                    hotView.push(<div className="column">
                                    <a href={"/productDetails/"+item.productId}>
                                    <div className="frameFeatureBand" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperframeFeatureBand">
                                    <img src={fileUrl+"/upload/product/productImages/"+item.productImage} alt=""/>
                                    </span>
                                    </div>
                                    </a>
                                    </div>)
                                    counter++;
                                 })
                              }
                              
                              if(counter<2){
                                 for(let i= counter;i<2;i++){
                                    hotView.push(<div className="column">
                                    <a href="http://banijjo.com.bd/productDetails/48">
                                    <div className="frameFeatureBand" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperframeFeatureBand">
                                    <img src="/asche.jpg" alt=""/>

                                    </span>
                                    </div>
                                    </a>
                                    </div>)
                                 }
                              }
                              return hotView;
                           }
                           
                           storeWillLove(){
                              let hotView = [];
                              let counter = 0;
                              if(counter==0){
                                 this.state.StoreWIllLove.map((item,key)=>{
                                    hotView.push(<div className="column">
                                    <a href={"/productDetails/"+item.productId}>
                                    <div className="frameFeatureBand" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperframeFeatureBand">
                                    <img src={fileUrl+"/upload/product/productImages/"+item.productImage} alt=""/>
                                    </span>
                                    </div></a>
                                    </div>)
                                    counter++;
                                 })
                              }
                              
                              if(counter<2){
                                 for(let i= counter;i<2;i++){
                                    hotView.push(<div className="column">
                                    <a href="http://banijjo.com.bd/productDetails/48">
                                    <div className="frameFeatureBand" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperframeFeatureBand">
                                    <img src="/asche.jpg" alt=""/>
                                    </span>
                                    </div></a>
                                    </div>)
                                 }
                              }
                              
                              // if(counter==0){
                              //    this.state.StoreWIllLove.map((item,key)=>{
                              //      hotView.push(<div className="column">
                              //      <a href={"/productDetails/"+item.productId}><img style={{height:"140px"}} className="thumbnail" src={fileUrl+"/upload/product/productImages/"+item.productImage}/></a>
                              //      </div>)
                              //      counter++;
                              //    })
                              //  }
                              
                              // if(counter<2){
                              //  for(let i= counter;i<2;i++){
                              //    hotView.push(<div className="column">
                              //    <a href="http://banijjo.com.bd/productDetails/48"><img style={{height:"114px"}} className="thumbnail" src="/asche.jpg"/></a>
                              //    </div>)
                              //  }
                              // }
                              return hotView;
                           }
                           
                           More(){
                              let hotView = [];
                              let counter = 0;
                              if(counter==0){
                                 this.state.More.map((item,key)=>{
                                    hotView.push(<div className="column">
                                    <a href={"/productDetails/"+item.productId}>
                                    <div className="frameMore" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperframeMore">
                                    <img src={fileUrl+"/upload/product/productImages/"+item.productImage} alt=""/>
                                    </span>
                                    </div>
                                    </a>
                                    </div>)
                                    counter++;
                                 })
                              }
                              
                              if(counter<6){
                                 for(let i= counter;i<6;i++){
                                    hotView.push(<div className="column">
                                    <a href="http://banijjo.com.bd/productDetails/48">
                                    <div className="frameMore" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperframeMore">
                                    <img src="/asche.jpg" alt=""/>
                                    </span>
                                    </div></a>
                                    </div>)
                                 }
                              }
                              return hotView;
                           }
                           
                           bannerImages(){
                              let hotView = [];
                              //   let tempView = [];
                              let counter = 0;
                              this.state.BannerImages.map((item,key)=>{
                                 
                                 hotView.push(<div className="column">
                                 <a href={"/productDetails/"+item.productId}>
                                 <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperSlider">
                                 <img src={fileUrl+"/upload/product/productImages/"+item.productImage} alt=""/>
                                 </span>
                                 </div></a>
                                 </div>)
                                 
                                 counter++;
                              })
                              
                              
                              if(counter<5){
                                 for(let i= counter;i<5;i++){
                                    
                                    hotView.push(<div className="column">
                                    <a href="http://banijjo.com.bd/productDetails/48">
                                    <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                    <span className="helperSlider">
                                    <img src="/asche.jpg" alt=""/>
                                    </span>
                                    </div></a>
                                    </div>)
                                    
                                 }
                              }
                              return hotView;
                           }
                           
                           
                           bannerTop(){
                              let hotView = [];
                              let counter = 0;
                              if(counter==0){
                                 this.state.BannerTop.map((item,key)=>{
                                    if(key==0){
                                       hotView.push(<div className="item active">
                                       <div className="row">
                                       <div className="column">
                                       <a href={"/productDetails/"+item.productId}>
                                       <div className="frameSliderBig" style={{borderBottom: "1px solid #ddd"}}>
                                       <span className="helperSliderBig">
                                       <img src={fileUrl+"/upload/product/productImages/"+item.productImage} alt=""/>
                                       </span>
                                       </div></a>
                                       </div>
                                       </div>
                                       </div>)
                                    }
                                    else{
                                       hotView.push(<div className="item">
                                       <div className="row">
                                       <div className="column"> <a href="http://banijjo.com.bd/productDetails/48">
                                       <div className="frameSliderBig" style={{borderBottom: "1px solid #ddd"}}>
                                       <span className="helperSliderBig">
                                       <img src="/asche.jpg" alt=""/>
                                       </span>
                                       </div></a>
                                       </div>
                                       </div>
                                       </div>)
                                    }
                                    //  hotView.push(<div className="column">
                                    //  <a href={"/productDetails/"+item.productId}><img style={{height:"114px"}} className="thumbnail" src={fileUrl+"/upload/product/productImages/"+item.productImage}/></a>
                                    //  </div>)
                                    counter++;
                                 })
                              }
                              
                              if(counter<3){
                                 for(let i= counter;i<5;i++){
                                    if(i==0){
                                       hotView.push(<div className="item active">
                                       <div className="row">
                                       <div className="column">
                                       <div className="frameSliderBig" style={{borderBottom: "1px solid #ddd"}}>
                                       <span className="helperSliderBig">
                                       <img src="image/responssive.jpg" alt="More"/>
                                       </span>
                                       </div>
                                       </div>
                                       </div>
                                       </div>)
                                    }
                                    else{
                                       hotView.push(<div className="item">
                                       <div className="row">
                                       <div className="column">
                                       <div className="frameSliderBig" style={{borderBottom: "1px solid #ddd"}}>
                                       <span className="helperSliderBig">
                                       <img src="image/responssive.jpg" alt="More"/>
                                       </span>
                                       </div>
                                       </div>
                                       </div>
                                       </div>)
                                    }
                                    //   hotView.push(<div className="column">
                                    //   <a href="http://banijjo.com.bd/productDetails/48"><img style={{height:"114px"}} className="thumbnail" src="/asche.jpg"/></a>
                                    //   </div>)
                                 }
                              }
                              return hotView;
                           }
                           
                           render(){
                              const hotCounter = 0;
                              return (
                                 <div>
                                 <br/>
                                 <Breadcums/>
                                 <div className="row">
                                 <Categories somProp={this.state.Categories}/>
                                 
                                 
                                 <div className="medium-6 columns">
                                 <div className="container">
                                 <div className="row">
                                 <div className="col-md-6">
                                 <div id="Carousellg" className="carousel slide">
                                 <ol className="carousel-indicators">
                                 <li data-target="#Carousellg" data-slide-to="0" className="active"></li>
                                 <li data-target="#Carousellg" data-slide-to="1"></li>
                                 <li data-target="#Carousellg" data-slide-to="2"></li>
                                 </ol>
                                 <div className="carousel-inner">
                                 {this.bannerTop()}
                                 
                                 </div>
                                 <a data-slide="prev" href="#Carousellg" style={{marginTop:"130px"}} className="left carousel-control">‹</a>
                                 <a data-slide="next" href="#Carousellg" style={{marginTop:"130px"}} className="right carousel-control">›</a>
                                 </div>
                                 </div>
                                 </div>
                                 </div>
                                 
                                 <div className="row small-up-5">
                                 <div className="container">
                                 <div className="row">
                                 <div className="col-md-6">
                                 <div id="Carouselsm" className="carousel slide">
                                 <ol className="carousel-indicators">
                                 <li data-target="#Carouselsm" data-slide-to="0" className="active"></li>
                                 <li data-target="#Carouselsm" data-slide-to="1"></li>
                                 <li data-target="#Carouselsm" data-slide-to="2"></li>
                                 </ol>
                                 <div className="carousel-inner">
                                 <div className="item active">
                                 <div className="row">
                                 {this.bannerImages()}
                                 
                                 </div>
                                 </div>
                                 
                                 <div className="item">
                                 <div className="row">
                                 <div className="column">
                                 <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperSlider">
                                 <img src="image/responssive.jpg" alt="More"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="column">
                                 <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperSlider">
                                 <img src="image/responssive.jpg" alt="More"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="column">
                                 <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperSlider">
                                 <img src="image/responssive.jpg" alt="More"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="column">
                                 <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperSlider">
                                 <img src="image/responssive.jpg" alt="More"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="column">
                                 <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperSlider">
                                 <img src="image/responssive.jpg" alt="More"/>
                                 </span>
                                 </div>
                                 </div>
                                 </div>
                                 </div>
                                 <div className="item">
                                 <div className="row">
                                 <div className="column">
                                 <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperSlider">
                                 <img src="image/responssive.jpg" alt="More"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="column">
                                 <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperSlider">
                                 <img src="image/responssive.jpg" alt="More"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="column">
                                 <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperSlider">
                                 <img src="image/responssive.jpg" alt="More"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="column">
                                 <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperSlider">
                                 <img src="image/responssive.jpg" alt="More"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="column">
                                 <div className="frameSlider" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperSlider">
                                 <img src="image/responssive.jpg" alt="More"/>
                                 </span>
                                 </div>
                                 </div>
                                 </div>
                                 </div>
                                 </div>
                                 <a data-slide="prev" href="#Carouselsm" style={{marginTop: "30px"}} className="left carousel-control">‹</a>
                                 <a data-slide="next" href="#Carouselsm" style={{marginTop: "30px"}} className="right carousel-control">›</a>
                                 </div>
                                 </div>
                                 </div>
                                 </div>
                                 </div>
                                 </div>
                                 <div className="medium-3 large-3 columns">
                                 <h4 align="center" style={{color:"#009345"}}>Welcome</h4>
                                 <p><img src="image/banijjoLogo.png" alt="company logo"/></p>
                                 <p style={{color:"#ec1c24",fontSize:"25px",textAlign: "center"}}><strong style={{color:"#ec1c24",fontWeight: "normal"}}>One Account</strong>
                                 <br/><strong style={{color:"#009345",fontWeight: "normal"}}>All all of Banijjo</strong>
                                 </p>
                                 <div className="row">
                                 <div className="small-12 columns">
                                 <input type="text" id="middle-label" placeholder="Enter Your Mobile or Phone"/>
                                 </div>
                                 </div>
                                 <a href="#" className="button large expanded" style={{backgroundColor:"#009345"}}>Next</a>
                                 <h5>Or Sign Up with</h5>
                                 <p>
                                 
                                 <a href="#" className="fb btn">
                                 <i className="fa fa-facebook fa-fw"></i> Login with Facebook
                                 </a>
                                 </p>
                                 <p> <a href="#" className="google btn"><i className="fa fa-google fa-fw">
                                 </i> Login with Google+
                                 </a>
                                 </p>
                                 </div>
                                 </div>
                                 <div className="row">
                                 <div className="row column">
                                 </div>
                                 <div className="medium-12 columns">
                                 <h5 style={{margin: "0"}} className="text-left">
                                {this.state.HotDealsTitle}
                                 
                                 </h5>
                                 <div className="row small-up-5">
                                 <div className="container">
                                 <div className="row">
                                 <div className="col-md-12">
                                 <div id="Carousel" className="carousel slide">
                                 <ol className="carousel-indicators">
                                 <li data-target="#Carousel" data-slide-to="0" className="active"></li>
                                 <li data-target="#Carousel" data-slide-to="1"></li>
                                 <li data-target="#Carousel" data-slide-to="2"></li>
                                 </ol>
                                 <div className="carousel-inner">
                                 <div className="item active">
                                 <div className="row">
                                 {this.hotDeal()}
                                 </div>
                                 </div>
                                 <div className="item">
                                 <div className="row">
                                 <div className="col-md-3">
                                 <a href="#" className="thumbnail">
                                 <div className="frameHotDeal" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperHotDeal">
                                 <img src="image/responssive.jpg" alt="Hot Deal"/>
                                 </span>
                                 </div>
                                 </a>
                                 </div>
                                 <div className="col-md-3">
                                 <a href="#" className="thumbnail">
                                 <div className="frameHotDeal" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperHotDeal">
                                 <img src="image/responssive.jpg" alt="Hot Deal"/>
                                 </span>
                                 </div>
                                 </a>
                                 </div>
                                 <div className="col-md-3">
                                 <a href="#" className="thumbnail">
                                 <div className="frameHotDeal" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperHotDeal">
                                 <img src="image/responssive.jpg" alt="Hot Deal"/>
                                 </span>
                                 </div>
                                 </a>
                                 </div>
                                 <div className="col-md-3">
                                 <a href="#" className="thumbnail">
                                 <div className="frameHotDeal" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperHotDeal">
                                 <img src="image/responssive.jpg" alt="Hot Deal"/>
                                 </span>
                                 </div>
                                 </a>
                                 </div>
                                 </div>
                                 </div>
                                 <div className="item">
                                 <div className="row">
                                 <div className="col-md-3">
                                 <a href="#" className="thumbnail">
                                 <div className="frameHotDeal" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperHotDeal">
                                 <img src="image/responssive.jpg" alt="Hot Deal"/>
                                 </span>
                                 </div>
                                 </a>
                                 </div>
                                 <div className="col-md-3">
                                 <a href="#" className="thumbnail">
                                 <div className="frameHotDeal" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperHotDeal">
                                 <img src="image/responssive.jpg" alt="Hot Deal"/>
                                 </span>
                                 </div>
                                 </a>
                                 </div>
                                 <div className="col-md-3">
                                 <a href="#" className="thumbnail">
                                 <div className="frameHotDeal" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperHotDeal">
                                 <img src="image/responssive.jpg" alt="Hot Deal"/>
                                 </span>
                                 </div>
                                 </a>
                                 </div>
                                 <div className="col-md-3">
                                 <a href="#" className="thumbnail">
                                 <div className="frameHotDeal" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperHotDeal">
                                 <img src="image/responssive.jpg" alt="Hot Deal"/>
                                 </span>
                                 </div>
                                 </a>
                                 </div>
                                 </div>
                                 </div>
                                 </div>
                                 <a data-slide="prev" href="#Carousel" className="left carousel-control">‹</a>
                                 <a data-slide="next" href="#Carousel" className="right carousel-control">›</a>
                                 </div>
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
                                 <div className="medium-6 columns">
                                 <h5 style={{margin: "0"}} className="text-left">
                                 {this.state.TopSelectionsTitle}
                                 <a href="#"><span style={{float: "right",color: "#009345",fontSize: "14px"}}>See more</span></a> </h5>
                                 <div className="row small-up-4">
                                 {this.topSelections()}
                                 </div>
                                 </div>
                                 <div className="medium-6 columns">
                                 <h5 style={{margin: "0"}} className="text-left">
                                 {this.state.NewForYouTitle}
                                 <a href="#"><span style={{float: "right",color: "#009345",fontSize: "14px"}}>See more</span></a></h5>
                                 <div className="row small-up-4">
                                 {this.newForYou()}
                                 </div>
                                 </div>
                                 </div>
                                 <div className="row">
                                 <div className="row column">
                                 <p>&nbsp;</p>
                                 </div>
                                 <div className="medium-6 columns">
                                 <h5 style={{margin: "0"}} className="text-left">
                                 {this.state.FeaturedBrandsTitle}

                                 <a href="#"><span style={{float: "right",color: "#009345",fontSize: "14px"}}>See more</span></a></h5>
                                 <div className="row small-up-2">
                                 {this.topSelectionBig()}
                                 </div>
                                 </div>
                                 <div className="medium-6 columns">
                                 <h5 style={{margin: "0"}} className="text-left">
                                 {this.state.StoreWIllLoveTitle}

                                 <a href="#"><span style={{float: "right",color: "#009345",fontSize: "14px"}}>See more</span></a></h5>
                                 <div className="row small-up-2">
                                 {this.storeWillLove()}
                                 </div>
                                 </div>
                                 </div>
                                 <div className="row">
                                 <div className="row column">
                                 <p>&nbsp;</p>
                                 </div>
                                 <h5  style={{margin: "0",paddingLeft: "15px"}} className="text-left">
                                 Featured Categories</h5>
                                 <div className="medium-3 columns">
                                 <div className="row">
                                 <div className="medium-2 columns">
                                 <p>&nbsp;</p>
                                 <p>&nbsp;</p>
                                 </div>
                                 </div>
                                 <div className="row">
                                 <div className="medium-8 columns">
                                 <div className="frameFeatureCat" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCat">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <p></p>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 </div>
                                 </div>
                                 </div>
                                 
                                 <div className="medium-3 columns" style={{paddingLeft: "25px"}}>
                                 <div className="row" style={{border: "2px",borderStyle:"solid",borderColor: "#5698C5",borderSpacing:"5px"}}>
                                 <h5>&nbsp;&nbsp;&nbsp;Sub category<a href="#"><span style={{float: "right",color:"#009345",fonSize: "14px",paddingRight: "5px"}}>See more</span></a></h5>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 </div>
                                 <br/>
                                 <div className="row" style={{border: "2px",borderStyle:"solid",borderColor: "#5698C5",borderSpacing:"5px"}}>
                                 <h5>&nbsp;&nbsp;&nbsp;Sub category<a href="#"><span style={{float: "right",color:"#009345",fonSize: "14px",paddingRight: "5px"}}>See more</span></a></h5>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 </div>
                                 </div>
                                 <div className="medium-3 columns" style={{paddingLeft: "25px"}}>
                                 <div className="row" style={{border:"2px",borderStyle:"solid",borderColor: "#5698C5",borderSpacing:"5px"}}>
                                 <h5>&nbsp;&nbsp;&nbsp;Sub category<a href="#"><span style={{float: "right",color:"#009345",fonSize: "14px",paddingRight: "5px"}}>See more</span></a></h5>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 </div>
                                 <br/>
                                 <div className="row" style={{border:"2px",borderStyle:"solid",borderColor: "#5698C5",borderSpacing:"5px"}}>
                                 <h5>&nbsp;&nbsp;&nbsp;Sub category<a href="#"><span style={{float: "right",color:"#009345",fonSize: "14px",paddingRight: "5px"}}>See more</span></a></h5>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 </div>
                                 </div>
                                 <div className="medium-3 columns" style={{paddingLeft: "25px"}}>
                                 <div className="row" style={{border:"2px",borderStyle:"solid",borderColor: "#5698C5",borderSpacing:"5px"}}>
                                 <h5>&nbsp;&nbsp;&nbsp;Sub category<a href="#"><span style={{float: "right",color:"#009345",fonSize: "14px",paddingRight: "5px"}}>See more</span></a></h5>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 </div>
                                 <br/>
                                 <div className="row" style={{border:"2px",borderStyle:"solid",borderColor: "#5698C5",borderSpacing:"5px"}}>
                                 <h5>&nbsp;&nbsp;&nbsp;Sub category<a href="#"><span style={{float: "right",color:"#009345",fonSize: "14px",paddingRight: "5px"}}>See more</span></a></h5>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
                                 </span>
                                 </div>
                                 </div>
                                 <div className="medium-4 columns">
                                 <div className="frameFeatureCatSm" style={{borderBottom: "1px solid #ddd"}}>
                                 <span className="helperframeFeatureCatSm">
                                 <img src="image/responssive.jpg" alt="Featured Bands"/>
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
                                 {this.state.MoreTitle}

                                 </h5>
                                 <div className="row small-up-6">
                                 {this.More()}
                                 </div>
                                 </div>
                                 </div>
                                 
                                 <Footer/>
                                 </div>
                                 
                                 
                                 )
                              }
                           }
                           
                           export default App;
                           