<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Reunion-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <title>Liste des produits</title>
  <link rel="stylesheet" href="./styles/style.css">
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.10/select2-bootstrap.min.css">
  <link rel="stylesheet" href="./styles/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
</head>
<body>
<?php include './includes/navbar.php' ?>
  <div class="container mt-5 mb-5">
    <div class="card border border-primarSalle">
      <div class="card-heard  bg-primary">
      <div class="row">
        <div class="col-md-10 col-xm-4">
          <h3 class="text-left p-2  text-white">Produits </h3>
        </div>
        <div class="col-md-2 col-xm-6">
            <button type="button" class="m-2 btn btn-outline-dark" data-toggle="modal" data-target="#myModal">+</button>
        </div>
      </div>
      <div class="table-responsive">
      <table id="meets" class="rounded-0 table bg-white table-hover table-content w-100">
        <thead> 
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Content</th>
          <th>Quantity </th>
          <th>Price</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      </div>
    </div>
  </div>
  </div>
    <!-- The Modal -->
    <div class="modal fade" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Ajouter une nouvelle</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form id="formProduct">
           <div class="card-content p-3">
             <div class="form-group">
                   <label for="name">Name</label>
                   <input type="text" name="name" required class="form-control" id="name">
                </div>
            <div class="form-group">
                    <label for="content">Content</label>
                    <input type="text" name="content" required class="form-control" id="content">
            </div>
            <div class="form-group">
                    <label for="quantity">Quantity</label>
                    <input type="number" min="1" name="quantity" required class="form-control" id="quantity">
            </div>
            <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number" min="1" name="price" required class="form-control" id="price">
            </div>

        <!--     <div class="form-group">
                <label for="">pays</label>
                <select name="numens" id="room" class="form-control" required >
                <option value="null">Selectionnez pays</option>
                </select> 
              </div> -->
             
              </div>
             <div class="card-footer p-0 m-0">
                <button class="btn btn-primary btn-block" name="bajout" type="submit">Ajouter une produit</button>   
               </div>  
             </div>
          </form> 
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <script src="./js/app.js"></script>
</body>
</html>