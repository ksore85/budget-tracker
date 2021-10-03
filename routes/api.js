const router = require("express").Router();
const { db } = require("../models/transaction.js");
const Transaction = require("../models/transaction.js");

router.post("/api/transaction", ({body}, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/api/transaction/bulk", ({body}, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
  Transaction.find({}).sort({date: -1})
    .then(dbTransaction => {
      if (dbTransaction.length === 0) {
        let firstTime = {
          "_id": "615a056023b89239ebf49a02",
          "name": "transaction 4",
          "value": 6,
          "date": "2021-10-03T19:32:48.933Z",
          "__v": 0
      }
        res.json([firstTime])
      }
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;