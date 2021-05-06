let carts = document.querySelectorAll('.add-cart');


let products = [
   {
      name: "Red T-shirt",
      tag: "redshirt",
      price:  10,
      inCart: "0"
   },
   {
      name: "Black T-shirt",
      tag: "blacktshirt",
      price:  10,
      inCart: "0"
   },
   {
      name: "Gray T-shirt",
      tag: "whitetshirt",
      price:  15,
      inCart: "0"
   },
   {
      name: "Black Polo T-shirt",
      tag: "blackpolo1",
      price:  30,
      inCart: "0"
   },
/////////////
   {
      name: "Custom T-Shirt",
      tag: "customtshir2",
      price:  35,
      inCart: "0"
   },
   {
      name: "Square Neck Top",
      tag: "squarenecktop",
      price:  15,
      inCart: "0"
   },
   {
      name: "Designer Trousers",
      tag: "customtrousers",
      price:  65,
      inCart: "0"
   },
   {
      name: "Black Dress",
      tag: "blackdress2",
      price:  60,
      inCart: "0"
   },

   {
      name: "Printed Sliders",
      tag: "rickandmortysliders",
      price:  20,
      inCart: "0"
   },
   {
      name: "Queen Pink Dress",
      tag: "quennpinkdress",
      price:  80,
      inCart: "0"
   },
   {
      name: "Black Shoes",
      tag: "sportshoes5",
      price:  45,
      inCart: "0"
   },
   {
      name: "Pyjama Set",
      tag: "pyjamaset",
      price:  30,
      inCart: "0"
   },
];


for (let i=0; i < carts.length; i++){
   carts[i].addEventListener('click',() =>{
      cartNumbers(products[i]);
      totalCost(products[i]);
   })
}


function onLoadCarrtNumbers(){
   let productNumbers = localStorage.getItem('cartNumbers');

   if(productNumbers){
      document.querySelector('#cartImg sup').textContent = productNumbers;
   }
}


function cartNumbers(product){
   
   let productNumbers = localStorage.getItem("cartNumbers");

   productNumbers = parseInt(productNumbers);

   if( productNumbers ){
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('#cartImg sup').textContent = productNumbers + 1;
   } else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('#cartImg sup').textContent = 1;
   }

   setItems(product);
  
}

function setItems(product) {
   let cartItems = localStorage.getItem('productsInCart ');
   cartItems = JSON.parse(cartItems);
   if (cartItems != null){
      if(cartItems[product.tag] == undefined){
         cartItems ={
            ...cartItems,
            [product.tag]: product
         }
         product.inCart = 0;
      }
      cartItems[product.tag].inCart += 1;

   } else {
      product.inCart = 1;
      cartItems = {
         [product.tag]:product
      }
   }

   localStorage.setItem("productsInCart ", JSON.stringify(cartItems ));
}

function totalCost(product){
   let cartCost = localStorage.getItem('totalCost');

   if(cartCost != null){
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
   } else{

      localStorage.setItem("totalCost", product.price);
   }

   
}


function displayCart(){
   let cartItems = localStorage.getItem("productsInCart ");
   cartItems = JSON.parse(cartItems);
   let productContainer = document.querySelector(".products");
   let cartCost = localStorage.getItem('totalCost');

   //console.log(cartItems);
   if( cartItems && productContainer ){
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
         productContainer.innerHTML += `
         <div class = "product-title"  >
            <img class = "col-3 " src="./Images/products/${item.tag}.jpg"></img>
            <span class="cartSpan">${item.name}</span>
         </div>
         <div class = "price ">$${item.price}.00</div>
         <div class = "quantity "><input type="number" disabled value="${item.inCart}"></div>
         <div class = "total ">$${item.inCart * item.price}.00</div>
         <div class= "remove-btn" id = ${item.tag}><button type="button" class="btn btn-danger btn-lg" href="#">Remove</button></div>
         
         `;
      });
     
      productContainer.innerHTML += `
         <div class="total-price ">Total Price:</div>
         <div class="total-price" id="totalPriceValue">$${cartCost}</div>

         <div class="checkoutBtn"><button type="button" class="btn btn-danger btn-lg" href="#">Checkout</button></div>
      `
     
   }
   removeBtn();
   checkout()
}

//REMOVE BUTTON
function removeBtn(){
   let cartItems = localStorage.getItem("productsInCart ");
   cartItems = JSON.parse(cartItems);
   console.log(cartItems)
   console.log(Object.keys(cartItems))
   var tags = Object.keys(cartItems)
   console.log("tags ", tags)

   let priceContainer = document.querySelector("#totalPriceValue")

   var removeCartItems = document.getElementsByClassName('remove-btn');
   var len = removeCartItems.length;

   for ( var j=0; j<len; j++){
      
      var button = removeCartItems[j];
      //console.log(removeCartItems)

      button.addEventListener('click', function(event) {
         console.log("clicked");


         var buttonPressed = button.getAttribute("id");
         console.log("Button pressed", buttonPressed)


         var buttonClicked = event.target.parentElement;
         
         var deletedPrice = buttonClicked.previousElementSibling.innerText;
         deletedPrice = deletedPrice.slice(1, -3);
         deletedPrice = parseInt(deletedPrice);
 
         priceContainer.removeChild(priceContainer.firstChild);
         updateCartTotal(deletedPrice);


         console.log(deletedPrice)
         console.log(typeof(deletedPrice))

         var deletedRow = [buttonClicked, a = buttonClicked.previousElementSibling, b = a.previousElementSibling, c = b.previousElementSibling, d = c.previousElementSibling];
         for (var k = 0; k < deletedRow.length; ++k) {
         deletedRow[k].remove();
         
         }
         
        
         //removeELem(tags[j])

      })

   }
}

function updateCartTotal(price){
   let cartCost = localStorage.getItem('totalCost');
   cartCost = parseInt(cartCost);
   localStorage.setItem("totalCost", cartCost - price);

   let priceContainer = document.querySelector("#totalPriceValue")

   priceContainer.innerHTML += `
   $${cartCost-price}
   `;

}

function checkout(){
   var checkoutCart = document.getElementsByClassName('checkoutBtn');
   checkoutCart[0].addEventListener('click', function(event) {
      var a = confirm("Are you sure you want to checkout?");
      if (a==true){
      localStorage.clear();
      location.reload();
      }
   })
}


function removeELem(tag){
   let cartItems = localStorage.getItem("productsInCart ");
   cartItems = JSON.parse(cartItems);
   console.log(cartItems)
   console.log(cartItems[tag])
   delete cartItems[tag]
   localStorage.setItem("productsInCart ", cartItems);

}


//End of Cart Section






// TIMER FOR EXCLUSIVE PRODUCTS

if(document.getElementById("demo")){
   
   var countDownDate = new Date("Aug 10, 2021 4:20:69").getTime();

 
   var x = setInterval(function() {

  
   var now = new Date().getTime();

   
   var distance = countDownDate - now;

   
   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  
   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
   + minutes + "m " + seconds + "s ";

  
   if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
   }
   }, 1000);
}


//GLass Magnifier
function magnify(imgID, zoom){
   var img, glass, w, h, bw;
   img = document.getElementById(imgID);

  
   var children = Array.prototype.slice.call(document.getElementsByClassName("img-magnifier-glass"), 0);
   console.log(children);
   for (var i = 0; i < children.length; ++i) {
      children[i].remove();
    }
 
  
   glass = document.createElement("DIV");
   glass.setAttribute("class", "img-magnifier-glass");
  
 
   
   img.parentElement.insertBefore(glass, img);
 
 
   glass.style.backgroundImage = "url('" + img.src + "')";
   glass.style.backgroundRepeat = "no-repeat";
   glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
   bw = 3;
   w = glass.offsetWidth / 2;
   h = glass.offsetHeight / 2;
 
   
   glass.addEventListener("mousemove", moveMagnifier);
   img.addEventListener("mousemove", moveMagnifier);
 
 
   glass.addEventListener("touchmove", moveMagnifier);
   img.addEventListener("touchmove", moveMagnifier);
   function moveMagnifier(e) {
     var pos, x, y;
     
     e.preventDefault();
    
     pos = getCursorPos(e);
     x = pos.x;
     y = pos.y;
     
     if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
     if (x < w / zoom) {x = w / zoom;}
     if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
     if (y < h / zoom) {y = h / zoom;}
    
     glass.style.left = (x - w) + "px";
     glass.style.top = (y - h) + "px";
    
     glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
   }
 
   function getCursorPos(e) {
     var a, x = 0, y = 0;
     e = e || window.event;
     
     a = img.getBoundingClientRect();
     
     x = e.pageX - a.left;
     y = e.pageY - a.top;
   
     x = x - window.pageXOffset;
     y = y - window.pageYOffset;
     return {x : x, y : y};
   }


};


onLoadCarrtNumbers();
displayCart();