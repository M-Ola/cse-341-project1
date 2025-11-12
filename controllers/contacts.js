const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection("contacts").find();
    const contacts = await result.toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
};

const getSingle = async (req, res) => {
  
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact." });
  }
};

const createContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  const contact = { firstName, lastName, email, favoriteColor, birthday };

  try {
    const response = await mongodb
      .getDatabase()
      .collection("contacts")
      .insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      throw new Error("Insert not acknowledged.");
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to create contact." });
  }
};

const updateContact = async (req, res) => {
  

  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  const contact = { firstName, lastName, email, favoriteColor, birthday };

  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .collection("contacts")
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Contact not found or unchanged." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact." });
  }
};

const deleteContact = async (req, res) => {
  
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Contact not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete contact." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
