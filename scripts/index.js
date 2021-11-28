const api = 'http://localhost:36879';
    const contentType = 'application/json';
    const dataType = "json";

    $(document).ready(function () {
        $("#submit-activation").validate();
        $.ajax({
            type: 'GET',
            url: api + '/api/code',
            contentType: contentType,
            dataType: dataType,
            success: function(result){
                console.log(result);
                result.forEach(element => {
                    // $("#buttonsBox").append(
                    // '<button id="'+ element.id+'" class="btn" style="background-color:'+ element.htmlColor+'; color:'+element.htmlTextColor+'; padding: 15px 32px; margin: 10px;" data-codeid="'+ element.id +'" data-code="'+element.name+'" data-toggle="modal" data-target="#exampleModal">' + element.name  +'</button>');
                    $("#buttonsBox").append(
                        `
                        <div class="col">
                        <div class="card" style="width: 18rem; height: 27rem;">
                        <img class="card-img-top" height="200" width="40" src="./img/${element.name}.png" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-title">${element.name}</h5>
                          <p class="card-text">${element.description}</p>
                          <button id="${element.id}" class="btn" style="background-color:${element.htmlColor}; color:${element.htmlTextColor}; padding: 15px 32px; margin: 10px;" data-codeid="${element.id}" data-code="${element.name}" data-toggle="modal" data-target="#exampleModal">${element.name}</button>
                        </div>
                      </div>
                      </div>
                        `
                    );
                });
            }
        });



        $.ajax({
            type: 'GET',
            url: api + '/api/location',
            contentType: contentType,
            dataType: dataType,
            success: function (result){
                console.log(result);
                result.forEach(element => {
                    $("#select-location").append(
                        '<option value='+ element.id +'>'+ element.name +'</option>'
                    );
                })
            }
        });



        let activation = {
            codeId: '',
            locationId: '',
            activatedBy: ''
        };


        $('#exampleModal').on('hide.bs.modal', function (event) {
            activation = null;
            var form = $("#submit-activation")[0].reset();
            console.log(activation);
        });

        var codeId = 0;
        $('#exampleModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            var codeName = button.data('code');
            codeId = button.data('codeid');
            var modal = $(this);
            modal.find('.modal-title').text('Are You Sure You Want To Activate ' + codeName)
            
        });
        
        $("#submit-activation").submit(function (e) {
            var form = $(this);

            e.preventDefault();
            
            var locationId = $("#select-location").val();
            var activatedBy = $("#badge-number").val();


            activation = {
                codeId: codeId,
                locationId: parseInt(locationId),
                activatedBy: parseInt(activatedBy)
            };

            console.log(activation);
            var data = JSON.stringify(activation);

            $.ajax({
                type: 'POST',
                url: api + '/api/activation',
                contentType: contentType,
                dataType: dataType,
                data: data,
                success: function (result){
                    console.log(result);
                    location.reload();
                },
                error: function (data){
                    console.log(jQuery.parseJSON(data.responseText));
                }
            });


            form[0].reset();
        });
    });