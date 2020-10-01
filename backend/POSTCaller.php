<!DOCTYPE html>
<html lang="de">
    <head>
        <title>POST Caller</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        <script>
            var ajaxCallerView = function(){
                this.init();
            };

            ajaxCallerView.prototype.init = function(){
                var self = this;
                $('#ajax-call').on("click", function(){
                    self.submitForm();
                });
                
                $('#clear-output').on("click", function(){
                    self.clearOutput();
                });
            };
            
            ajaxCallerView.prototype.submitForm = function(){
                var self = this;
                var json = $('#json').val();
                $.ajax({
                    url: "paddle.php",
                    type: "post",
                    data: {data: json},
                    success: function (data){
                        self.output(data);
                    },
                    error: function(xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        self.output(err.Message);
                    }
                });
            };
    
            ajaxCallerView.prototype.output = function(stream){
                var outputSpace = $('#output');
                var plainText = JSON.stringify(stream);
                var now = new Date();
                var block = "\n\n"+ now +"\n----------------\n"+plainText;
                
                outputSpace.append(block);
            };
            
            ajaxCallerView.prototype.clearOutput = function(){
               $('#output').html(""); 
            };
            
            $(document).ready(function(){
                console.log("launching ...");
                var veiw = new ajaxCallerView();
            });
        </script>
     </head>
     
     <body>
        <div class='container'>
            <h1>Ajax POST Caller </h1>
            <div id="form">
                
                <div class="form-group">
                    <label for="json">JSON Object Space:</label>
                    <textarea id="json" cols="100" rows="15" class="form-control"></textarea>
                </div>
                
                <button id="clear-output" class="btn btn-danger">Clear Output</button>
                <button id="ajax-call" class="btn btn-success">Send to Server</button>
            </div>
            <br />
            <h3>Output:</h3>
            <div class="card">
                
                <pre class="card-block" id="output"></pre>
            </div>
            
        </div> 
     </body>
</html>