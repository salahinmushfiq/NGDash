import React,{ useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const FrontPage = () => {
    const [user,setUser]=useState([]);
    const {id}=useParams();
    
    useEffect(()=>{
        // axios.get(`https://dummyjson.com/users/${id}`).then((response)=>{
        axios.get(`http://127.0.0.1:8000/api/users/?userId=${id}`).then((response)=>{
            
            console.log("respose");
            console.log(response.data);
            setUser(response.data);
            console.log(user);
        });
      },[]);
      
  return (
    
    <div>
        <div class="main">

        <div class="header-wrapper" id="home">
           
                
            <div class="cover" id="cover" data-aos="fade-up">
            

                          <div class="modal" id="gallery-image-modal" role="dialog" >
                            <div class="modal-dialog" >

                               Modal content
                              <div class="modal-content" style="border-radius: 15px;width:150%;">
                                <div class="modal-body">
                                     <button type="button" style="height:50px;width:50px;float:right; margin-bottom:20px;" class="close" data-dismiss="modal" id="gallery-image-modal-close">&times;</button>
                                    <img alt="" src="#" class="modal-image" id="gallery-image-modal-image"/>
                                     <button type="button" class="btn btn-primary" style="width:auto;border-radius: 15px;float:right;margin-top:20px;" id="gallery-image-modal-go-to" href="#">Go To</button>
                                </div>
                              </div>

                            </div>
                          </div>
     
                <div class="cover-left">
                    <img alt="" src="images/eternal_logo-removebg-preview.png"/>
                </div>
                <div class="cover-right">
                <ul class="cover-ul">
                  <li data-aos="fade-up" data-aos-mirror="true">
                    <img alt="" src="images/coverOverlayImage5.jpg" id="Hotelchainbd.com"/>
                  </li>
                    <li data-aos="fade-up" data-aos-mirror="true">
                    <img alt="" src="images/coverOverlayImage3.jpg" id="TravelersChoicebd.com"/>
                  </li>
                  <li data-aos="fade-up" data-aos-mirror="true">
                    <img alt="" src="images/coverOverlayImage4.jpg" id="Travelerschoicebd.com"/>
                  </li>
                  <li data-aos="fade-up" data-aos-mirror="true">
                    <img alt="" src="images/coverOverlayImage8.jpg" id="hotelchainbd.com"/>
                  </li>                             

                  <li>
                    <img alt="" src="images/shosti.PNG" id="shosti.com.bd"/>
                  </li>
                  <li>
                    <img alt="" src="images/slide-image-2.png" id="hotelchainbd.com"/>
                  </li>

                    
                    <li></li>
                </ul>
            
            </div>
            
            </div>
                
                
                
                
        <div class="nav-wrapper" id="nav-wrapper">
                    <nav id="nav">
                    <div class="hamburger">
                       <div class="line line1"></div>
                       <div class="line line2"></div>
                       <div class="line line3"></div>
                   </div>
                   <div class="drawer">
                       <div class="nav-links" id="nav-links">
                           <a href="#home" class="btn-item">
                                <span></span>
                                <span></span>
                                Home
                            </a>
                           <a href="#gallery" class="btn-item">
                                <span></span>
                                <span></span>
                                Gallery
                            </a>
                           <a href="#products" class="btn-item">
                                <span></span>
                                <span></span>
                                Products
                            </a>

                           <a href="#brands" class="btn-item">
                                <span></span>
                                <span></span>
                                Brands
                            </a>

                            <a href="product_details_final1WithZoom.html" class="btn-item">
                                <span></span>
                                <span></span>
                                Details
                            </a>
                           <a href="#services" class="btn-item">
                                <span></span>
                                <span></span>
                                Services
                            </a>
                           <a href="#about" class="btn-item">
                                <span></span>
                                <span></span>
                                About
                            </a>

                           <li><a class="btn-item" href="#">Click 1</a></li>
                           <li><a class="btn-item" href="#">Click 2</a></li>
                           <li><a class="btn-item" href="#">Click 3</a></li>
                           <li><a class="btn-item" href="#">Click 4</a></li>
                           <li><a class="btn-item" href="#">Click 5</a></li>
                           <li><a class="btn-item" href="#">Click 6</a></li>

                        </div>
                   </div>
                </nav> 
                </div>   
        </div>
        
        <div class="gallery" id="gallery">
                      <h1 style="width: 100%; text-align: center;position:absolute;">Gallery</h1>
                  <ul>
                      
                    <li data-aos="fade-right" data-aos-mirror="true" >

                    </li>
                      
                    <li data-aos="fade-up" data-aos-delay="150" data-aos-mirror="true" >

                    </li>
                    <li data-aos="fade-left" data-aos-delay="300" data-aos-mirror="true" >

                    </li>
            
                      <li>

                    </li>
                 </ul>
            </div>
                    
 

        <div class="products-wrapper" id="products" >
            
            
            <h1>Trending</h1>
            <ul class="main-list-categories">
                <li class="main-list active" data-filter="all">All</li>
                <li class="main-list" data-filter="men">Men</li>
                <li class="main-list" data-filter="women">Women</li>
                <li class="main-list" data-filter="kids">Kids</li>
            </ul>
            <ul class="secondary-list-categories">
                <li class="secondary-list active" data-filter="all">All</li>
                <li class="secondary-list" data-filter="shirts">Shirts</li>
                <li class="secondary-list" data-filter="pants">Pants</li>
                <li class="secondary-list" data-filter="shoes">Shoes</li>
                <li class="secondary-list" data-filter="others">Others</li>
            </ul>
            <div class="main-category-items">
                <div class="main-category-item" data-item="men" data-item-2="shirts" data-aos="fade-up">
                    <img alt="" src="images/productsMen1-removebg-preview.png"/>
                    <span class="ribbon1">
                      <span>Sale 10%</span>
                    </span>

                </div>
                <div class="main-category-item" data-item="men" data-item-2="shirts">
                    <img alt="" src="images/productsMen2-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="men" data-item-2="shirts">
                    <img alt="" src="images/productsMen3-removebg-preview.png"/>
                    <span class="ribbon1">
                      <span>Sale 10%</span>
                    </span>
                </div>
                <div class="main-category-item" data-item="men" data-item-2="pants">
                    <img alt="" src="images/productsMen4-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="men" data-item-2="pants">
                    <img alt="" src="images/productsMen10-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="men" data-item-2="pants">
                    <img alt="" src="images/productsMen11-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="men" data-item-2="shoes">
                    <img alt="" src="images/productsMen12-removebg-preview.png"/>
                    <span class="ribbon1">
                      <span>Sale 10%</span>
                    </span>
                </div>
                <div class="main-category-item" data-item="men" data-item-2="shoes">
                    <img alt="" src="images/productsMen13-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="men" data-item-2="shoes">
                    <img alt="" src="images/productsMen14-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="women" data-item-2="shirts">
                    <img alt="" src="images/productsWomen1-removebg-preview.png"/>
                </div>
                 <div class="main-category-item" data-item="women" data-item-2="shirts">
                    <img alt="" src="images/productsWomen2-removebg-preview.png"/>
                     <span class="ribbon1">
                      <span>Sale 10%</span>
                    </span>
                </div>
                 <div class="main-category-item" data-item="women" data-item-2="shirts">
                    <img alt="" src="images/productsWomen3-removebg-preview.png"/>
                </div>
                
                
                <div class="main-category-item" data-item="women" data-item-2="shirts">
                    <img alt="" src="images/productsWomen19-removebg-preview.png"/>
                    <span class="ribbon1">
                      <span>Sale 10%</span>
                    </span>
                </div>
                <div class="main-category-item" data-item="women" data-item-2="shirts">
                    <img alt="" src="images/productsWomen30-removebg-preview.png"/>
                    <span class="ribbon1">
                      <span>Sale 10%</span>
                    </span>
                </div>
                 <div class="main-category-item" data-item="women" data-item-2="shirts">
                    <img alt="" src="images/productsWomen36-removebg-preview.png"/>
                </div>
                 <div class="main-category-item" data-item="women" data-item-2="pants">
                    <img alt="" src="images/productsWomen7-removebg-preview.png"/>
                </div>
                 <div class="main-category-item" data-item="women" data-item-2="pants">
                    <img alt="" src="images/productsWomen8-removebg-preview.png"/>
                </div>
                 <div class="main-category-item" data-item="women" data-item-2="pants">
                    <img alt="" src="images/productsWomen27-removebg-preview.png"/>
                </div>
                 <div class="main-category-item" data-item="women" data-item-2="pants">
                    <img alt="" src="images/productsWomen29-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="women" data-item-2="pants">
                    <img alt="" src="images/productsWomen31-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="women" data-item-2="shoes">
                    <img alt="" src="images/productsWomen12-removebg-preview.png"/>
                </div>
                 <div class="main-category-item" data-item="women" data-item-2="shoes">
                    <img alt="" src="images/productsWomen44-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="women" data-item-2="shoes">
                    <img alt="" src="images/productsWomen47-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="women" data-item-2="shoes">
                    <img alt="" src="images/productsWomen51-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="kids" data-item-2="shirts">
                    <img alt="" src="images/productKids1-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="kids" data-item-2="shirts">
                    <img alt="" src="images/productKids2-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="kids" data-item-2="shirts">
                    <img alt="" src="images/productKids3-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="kids" data-item-2="shirts">
                    <img alt="" src="images/productKids4-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="kids" data-item-2="shoes">
                    <img alt="" src="images/productKids5-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="kids" data-item-2="pants">
                    <img alt="" src="images/productKids8-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="kids" data-item-2="pants">
                    <img alt="" src="images/productKids9-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="kids" data-item-2="pants">
                    <img alt="" src="images/productKids11-removebg-preview.png"/>
                </div>
                <div class="main-category-item" data-item="kids" data-item-2="pants">
                    <img alt="" src="images/productKids12-removebg-preview.png"/>
                </div>
                 <div class="main-category-item" data-item="kids" data-item-2="shoes">
                    <img alt="" src="images/productKids6-removebg-preview.png"/>
                </div>
                 <div class="main-category-item" data-item="kids" data-item-2="shoes">
                    <img alt="" src="images/productKids7-removebg-preview.png"/>
                </div>
            </div>
            
        </div>
        <div class="services-wrapper" id="services" data-aos="fade-up" >
            
            <div>
                <i class="fa-solid fa-box"></i>
                <h2>Free Shipping Method</h2>
                <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
            </div>
            <div>
                 <i class="fa-solid fa-lock"></i>
                <h2>Secure Payment System</h2>
                <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
            </div>
            <div>
                <i class="fa-solid fa-arrows-rotate"></i>
                <h2>Return Policy</h2>
                <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
            </div>
        </div>
        <div class="brands-wrapper" id="brands" >
            <h1>Brands</h1>
            <div class="brand-items">

                 <div class="brand-item" >
                    <img alt="" src="images/brand1.png"/>
                </div>
                <div class="brand-item">
                    <img alt="" src="images/brand2.png"/>
                </div>
                <div class="brand-item">
                    <img alt="" src="images/brand3.jpg" />
                </div>
                <div class="brand-item">
                    <img alt="" src="images/brand.4.png" />
                </div>
                 <div class="brand-item">
                    <img alt="" src="images/brand5.svg" />
                </div>
                 <div class="brand-item">
                    <img alt="" src="images/brand6.png" />
                </div>
            </div>
        </div>   
        <div class="about-wrapper" id="about" >

            <div>
                
                <h5>About</h5>
                <p style="line-height:1.6;" data-aos="fade-up">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore.</p>
            </div>
            <div>
                <h5>Quick Links</h5>
                <ul style="list-style: none;padding: 0;line-height:1.6;" data-aos="fade-up">
                    <li>About</li>
                    <li>Offers and Discounts</li>
                    <li>Get Coupon</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div >
                <h5>New Products</h5>
                 <ul style="list-style: none;padding: 0;line-height:1.6;" data-aos="fade-up">
                    <li>Woman Cloth</li>
                    <li>Fashion Accessories</li>
                    <li>Man Accessories</li>
                    <li>Rubber Made Toys</li>
                </ul>
            </div>
            <div>
                <h5>Support</h5>
                 <ul style="list-style: none;padding: 0;line-height:1.6;" data-aos="fade-up">
                    <li>FAQ</li>
                    <li>Terms and Conditions</li>
                    <li>Privacy Policy</li>
                    <li>Refund Policy</li>
                </ul>
            </div>
        </div>
    
    
        
        
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>       
<script src="main.js"></script>    
    </div>
    </div>
    
  );
}


export default FrontPage