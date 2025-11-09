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
    const contactId = new Objectid(req.params.id);
    const result = await mongodb
      .getDatabase()
      
      .collection("contacts")
      .find({_id: contactId});
    result.toArray().then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts[0]);
    });
       
};

    
const createContact = async (req, res) => {
  
const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response=  await   mongodb.getDatabase().db().collection("contacts").inserteOne(contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating contact.');
};

};



const updateContact = async (req, res) => {
  const contactId = new Objectid(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ id: contactId }, contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating contact.");
  }
};

const deleteContact = async (req, res) => {
  const contactId = new Objectid(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ id: contactId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting contact.");
  }
};




module.exports = {
    getAll, getSingle, createContact, updateContact, deleteContact

}


