var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

//creates the routes
router.get("/", function (req, res) {
    burger.selectAll(function (data) {

        var handlebarsobject = {
            burgers: data
        };
        console.log(handlebarsobject);
        res.render("index", handlebarsobject)
    });
});

router.post("/api/burger", function (req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
            req.body.burger_name, req.body.devoured
        ], function (result) {
            //send back the id of the new burger
            res.json({ id: result.insertId });
        });
});

router.put("api/burger/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }

    });
});

router.delete("/api/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

module.exports = router;