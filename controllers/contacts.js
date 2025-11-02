const mongodb = require('../data/database');
const Objectid = require('mongodb').ObjectId;

const getAll = async (req, res) => {
     const result = await mongodb
       .getDatabase()
      
       .collection("contacts")
       .find();
     result.toArray().then((contacts) => {
       res.setHeader("Content-Type", "application/json");
       res.status(200).json(contacts);
     });
        

};

const getSingle = async (req, res) => {
    const contactsid = new Objectid(req.params.id);
    const result = await mongodb
      .getDatabase()
      
      .collection("contacts")
      .find({_id: contactsid});
    result.toArray().then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts[0]);
    });
       
    };

module.exports = {
    getAll, getSingle
}


