$(document).ready(function () {

   function resetForm() {
    $("#productModal").click(function (e) { 
      e.preventDefault();
     const form = document.querySelector('form');
     // reste
     form.reset();
     // restore le titre
     $('.modal-title').text("Ajouter un produit");
     $('#operation').val('add');
    });
   }

  resetForm();


  // const URL = 'https://api-product-laafigram.herokuapp.com/';
  const URL = 'http://127.0.0.1:5000/';
 
  (function getAllProduct(){
    fetch(URL+'products')
    .then((response) => response.json())
    .then((data) => displayProduct(data))
    .catch(error => {
      console.log("Request failed", error);
    });
  })()

  function displayProduct(data) {
    const products = data.products;
    $("tbody").empty();
    $.each(products, function (i, elt) {
      const ligne = `<tr class='text-center'>
            <td>${elt.id}</td>
            <td>${elt.name}</td>
            <td>${elt.price} FCFA</td>
            <td>
            <div class="d-flex justify-content-center   mt-0"> 
                   <a class="btn btn-info mr-2 productToDetail" href='#' id='${elt.id}' name="detail" name="detail" >  
                       <i class="fa fa-edit">Detail</i>
                     </a>
                     <a class="btn btn-warning mr-2 productToUpdate"  id='${elt.id}' name="update" href=" ">  
                     <i class="fa fa-edit">Update</i>
                   </a>
                     <a class="btn btn-danger mr-2 productToDelete"  id='${elt.id}'  name="detail" href=" ">  
                       <i class="fa fa-edit">Supprimer</i>
                     </a>
                   </div>
            </td>
      </tr>`;
      $("#products").append(ligne);
    });
  }
  
    //add paticipant
    $("#formProduct").submit(function (e) { 
      e.preventDefault();
      //recuperer les champs values
      let name = $("#name").val();
      let content = $("#content").val();
      let quantity = $("#quantity").val();
      let price = $("#price").val();
     
  
     // let image = $("#image").val();
      
      if(!checkEmptyField(name,content,quantity,price)){
         //generate object
         const objet = generateObjet(name,content,quantity,price);
         //to request for add user
         console.log(objet);
         if ( $('#operation').val() === 'add'){
          addProductToAPi(objet);
         } else if( $('#operation').val() === 'update'){
           const id= $('#product_id').val();
           console.log(id);
           updateProductToAPi(objet , id)
          } ;
        
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
      fetch(URL + 'products/create',headers)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        empty();
        if(data.message){
          alert('Un product a ete ajouté avec success');
          //on recharge la page
          document.location.reload();
          //$('#myModal').hide();
        }
      })
      .catch(error => {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error)
      })
    }
  
    function updateProductToAPi(objet, id){
      const headers = {
          method: "PUT",
          body: JSON.stringify(objet),
          headers: {"Content-type": "application/json; charset=UTF-8"}
      }
      //post data with  fetch
      fetch(URL + 'products/'+id,headers)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        empty();
        if(data.message){
          alert('Un product a ete modifié avec success');
          //on recharge la page
          document.location.reload();
          //$('#myModal').hide();
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

  function generateObjet(name,content,quantity,price){
      const product = {};
      product['name'] = name;
      product['content'] = content;
      product['quantity'] = quantity;
      product['price'] = price;
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
  
  $(document).on('click', '.productToDelete', function(e){
    e.preventDefault();
		let product_id = $(this).attr("id");
    let objet = {'id': product_id}
    if(confirm('Voulez vous supprimer ${elt.name} ? Oui ou Non?')){
      deleteDataAPI(objet)
    } else {
      return ; //die()
    }

   
    });

  //supprimer
   function deleteDataAPI(objet) {
    //fetch vers l'api
    fetch(URL + 'products/'+ objet.id , {
      method: 'DELETE',
      body: JSON.stringify(objet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
    ) 
    .then(response => response.json())
    .then(data => {
      console.log(data)
      empty();
      if(data.message){
        alert('Un product a ete supprimé avec success');
        //on recharge la page
        document.location.reload();
      }
    })
    .catch(error => {
      // enter your logic for when there is an error (ex. error toast)
        console.log(error)
    })
    }

    //udpdate
    $(document).on('click', '.productToUpdate', function(e){
      e.preventDefault();
      //show modal
      $('#myModal').modal('show');
      $('#operation').val('update');
      //get product id
      var product_id = $(this).attr("id");
      fetch(URL + 'products/' + product_id)
      .then(response => response.json())
      .then(product => {
        console.log(product);
        //show modal
        $('#myModal').modal('show');
        //get informations
        $('#name').val(product.product.name);
        $('#content').val(product.product.content);
        $('#quantity').val(product.product.quantity);
        $('#price').val(product.product.price);
        $('#product_id').val(product.product.id);
        //edit action
        $('#bsubmit').html('Update');
        $('.modal-title').text("Update product");
      });
      });

      
  
      $(document).on('click', '.productToDetail', function(){
      //get product id
      var product_id = $(this).attr("id");
      fetch(URL + 'products/' + product_id)
      .then(response => response.json())
      .then(product => {
        console.log(product);
        //show modal
        $('#productModalDetail').modal('show');
        //get informations
        $('.productName').text(product.product.name);
        $('.price').text(product.product.price + ' FCFA');
        $('.content').text(product.product.content);
        $('.quantity').text(product.product.quantity);
        $('.modal-title').text("Detail product");
      });
      });

});
