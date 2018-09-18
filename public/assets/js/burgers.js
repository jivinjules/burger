$(function () {
    $(".change-devour").on("click", function(event) {
        //ASK IN CLASS WHY THERE IS NO PREVENT DEFAULT
        var id = $(this).data("id");
        var newDevour = $(this).data("newdevour");

        var newDevourState = {
            devoured: newDevour
        };

        //the PUT (UPDATE) request

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(
            function() {
                console.log("changed devour to ", newDevour);
                //Reload page
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#bur").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("Created a new burger");
                //Reload Page
                location.reload();

            }
        );
    });

    $(".delete-burger").on("click", function(event) {
        var id = $(this).data("id");

        //send the DELETE request.
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function() {
                console.log("deleted burger", id);
                //Reload page
                location.reload();
            }
        );
    });


});