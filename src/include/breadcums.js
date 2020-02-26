import React,{Component} from 'react';
const homeUrl = process.env.REACT_APP_FRONTEND_URL;

const base = process.env.REACT_APP_FRONTEND_SERVER_URL;
const frontEndUrl = process.env.REACT_APP_FRONTEND_URL;
const fileUrl = process.env.REACT_APP_FILE_URL;
class Breadcums extends Component{
   constructor(props) {
      super(props);
      this.state = {
          cartItemCount:'',
          customerId:localStorage.customer_id,
          searchKeyText:''
      }
      
      this.searchItem = this.searchItem.bind(this);
  }
  componentDidMount() {
      this.getCustomerCartProducts();
  }
  getCustomerCartProducts(){
  
        fetch(base+'/api/getCustomerCartProductsCount', 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: this.state.customerId
          })
        })
        .then(res => {
          return res.json()
        })
        .then(response => {
           console.log('rererere',response);
          this.setState({ 
            cartItemCount :response.data[0].counting           
        }) 
        });
  }

  searchItem(event){
   event.preventDefault();
   this.setState({searchKeyText:event.target.searchKey.value});
   window.location.href = "/search/"+event.target.searchKey.value;
  }

    render(){
        return (
            <React.Fragment>
                   <div className="row">
         <div className="medium-2 large-2 columns">
            <p><a href={homeUrl}><img src="/image/banijjoLogo.png" alt="Banijjo logo"/></a></p>
         </div>
         <div className="medium-7 columns">
            <form onSubmit={this.searchItem}>
               <div className="input-group input-group-rounded">
                  <input  name="searchKey" className="input-group-field ex1" style={{border:"1px solid #009345"}} type="search" placeholder="Search Item"/>
                  <div className="input-group-button">
                     <input type="submit" style={{background:"#ec1c24"}}  className="button secondary" value="&nbsp;&nbsp;&nbsp;&nbsp;"/>
                  </div>
               </div>
            </form>
           
            <ul className="menu">
               <li><a href="#">Kids | </a></li>
               <li><a href="#">dress | </a></li>
               <li><a href="#">diaper | </a></li>
               <li><a href="#">school dress | </a></li>
               <li><a href="#">More..</a></li>
            </ul>
         </div>
         <div className="medium-3 large-3 columns">
            <a class="" href="/cart" style={{color:"#009345"}}>
             <i class="fa fa-shopping-cart" style={{fontSize: "40px"}}></i> Cart
             <span class="badge badge-light" style={{backgroundColor: "#ec1624"}}>{this.state.cartItemCount>0?this.state.cartItemCount:0}</span>
          </a>
         </div>
      </div>
      <div className="row">
         <div className="medium-2 large-2 columns">
            <p>&nbsp;</p>
         </div>
         <div className="medium-7 columns">
            <ul className="dropdown menu" data-dropdown-menu>
               <li className="has-submenu">
                  <a href="#">Hot Deals</a>
               </li>
               <li className="has-submenu">
                  <a href="#">Discount</a>
               </li>
               <li className="has-submenu">
                  <a href="#">Women</a>
               </li>
               <li className="has-submenu">
                  <a href="#">Men</a>
               </li>
               <li className="has-submenu">
                  <a href="#">Girl</a>
               </li>
               <li className="has-submenu">
                  <a href="#">Boy</a>
               </li>
               <li className="has-submenu">
                  <a href="#">Kid</a>
               </li>
               <li className="has-submenu">
                  <a href="#">Baby</a>
               </li>
            </ul>
         </div>
         <div className="medium-3 large-3 columns">
            <p>&nbsp;</p>
         </div>
      </div>

            </React.Fragment>
            )
        }
    }
    
    export default Breadcums;