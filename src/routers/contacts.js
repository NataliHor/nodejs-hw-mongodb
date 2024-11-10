import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

// router.get('/contacts/:id', ctrlWrapper(getContactByIdController));

// router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:id', ctrlWrapper(deleteContactController));

// router.put('/contacts/:id', ctrlWrapper(upsertContactController));

// router.patch('/contacts/:id', ctrlWrapper(patchContactController));

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.put(
  '/contacts/:id',
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/contacts/:id',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
router.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

export default router;
