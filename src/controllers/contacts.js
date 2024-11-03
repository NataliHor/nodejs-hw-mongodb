import createHttpError from "http-errors";
import * as contactServices from "../services/contacts.js";

export const getContactsController = async (req, res, next) => {
  const data = await contactServices.getContacts();

  res.json({
    status: 200,
    message: "Successfully find contacts!",
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const data = await contactServices.getContactById(id);

  if (!data) {
    next(createHttpError(404, "Contact not found!"));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const data = await contactServices.createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;

  const data = await contactServices.deleteContact({ _id });

  if (!data) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { id: _id } = req.params;

  const result = await contactServices.updateContact({
    _id,
    payload: req.body,
    options: {
      upsert: true,
    },
  });

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: "Contact upserted successfully",
    data: result.data,
  });
};

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;

  const result = await contactServices.updateContact({
    _id,
    payload: req.body,
  });

  if (!result) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: "Contact patched successfully",
    data: result.data,
  });
};