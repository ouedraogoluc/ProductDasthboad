$(document).ready(function () {

  // const URL = 'https://api-product-laafigram.herokuapp.com/';
  const URL = 'http://127.0.0.1:5000/';
 
  (function getAllProduct(){
    fetch(URL+'products',{
      mode:'no-cors',
      method:'GET'
    })
    .then((response) => response.json())
    .then((data) => displayProduct(data))
    .catch(error => {
      console.log("Request failed", error);
    });
  })()

  function displayProduct(data) {
    console.log(data);
    const product = data.products;
    console.log('====================================');
    console.log(products);
    console.log('====================================');
    $("tbody").empty();
    $.each(product, function (i, elt) {
      const ligne = `<tr>
            <td>${elt.id}</td>
            <td>${elt.name}</td>
            <td>${elt.price}</td>
            <td>${elt.quantity}</td>
            <td>${elt.content}</td>
        
            <td>
            <div class="d-flex justify-content-center mt-0"> 
                     <a class="btn btn-warning mr-2" 
                     href='#' 
                     name="detail" 
                    >  
                     <i class="fa fa-edit">Detail</i></a>
                     <a class="btn btn-danger mr-2" name="detail" href=" ">  
                     <i class="fa fa-edit">Supprimer</i></a>
                   </div>
            </td>
      </tr>`;
      $("#product").append(ligne);
    });
  }
  
    //add paticipant
    $("#formProduct").submit(function (e) { 
      e.preventDefault();
      //recuperer les champs values
      let name = $("#name").val();
      let price = $("#price").val();
      let quantity = $("#quantity").val();
      let content = $("#content").val();
     
     // let image = $("#image").val();
      
      if(!checkEmptyField(name,price,content,quantity)){
         //generate object
         const objet = generateObjet(name,price,content,quantity);
         //to request for add user
         console.log(objet);
         addproductToAPi(objet);
      } else {
          alert("Field is empty !")
      }
  });


  function addProductToAPi(objet){
      const headers = {
          method: "POST",
          body: JSON.stringify(objet),
          headers: {"Content-type": "application/json; charset=UTF-8"}
      }
      //post data with  fetch
      fetch(URL,headers)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        empty();
        if(data.message){
          alert('Un product a ete ajouté avec success');
          //on recharge la page
          document.location.reload();
        }
      })
      .catch(error => {
        // enter your logic for when there is an error (ex. error toast)
          console.log(error)
      })
    }
  
  //vider les champs
  function empty() {
      $("#name").val("");
      $("#price").val("");
      $("#quantity").val("");
      $("#content").val("");
  
   }

  function generateObjet(name,price,quantity){
      const product = {};
      product['name'] = name;
      product['price'] = price;
      product['content'] = content;
      product['quantity'] = quantity;
    
      return product;
  }

  //check if input is empty
  function  checkEmptyField(name,price,content,quantity) {
      if (name == '' && 
          price == ''  && 
          content == '' && 
          quantity == '' 
       
           ){
          return true;
      } else {
          return false;
      }
  }
  

});
