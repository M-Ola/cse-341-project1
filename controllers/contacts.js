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

   // POST: Create a new contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to create contact' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid input', details: err.message });
  }
};

// PUT: Update a contact
const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('contacts').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Contact updated successfully' });
    } else {
      res.status(404).json({ error: 'Contact not found or no changes made' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Failed to update contact', details: err.message });
  }
};

// DELETE: Remove a contact
const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact', details: err.message });
  }
};


module.exports = {
    getAll, getSingle, createContact, updateContact, deleteContact

}


