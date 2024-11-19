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

// router.get('/contacts', ctrlWrapper(getContactsController));
// router.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));
// router.delete('/contacts/:id', ctrlWrapper(deleteContactController));

// router.post(
//   '/contacts',
//   validateBody(createContactSchema),
//   ctrlWrapper(createContactController),
// );
// router.put(
//   '/contacts/:id',
//   validateBody(createContactSchema),
//   ctrlWrapper(upsertContactController),
// );

// router.patch(
//   '/contacts/:id',
//   validateBody(updateContactSchema),
//   ctrlWrapper(patchContactController),
// );

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

router.put(
  '/:id',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:id',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
