import express from 'express';

import { createGroceryItemController, deleteGroceryItemController, fetchAllGroceryItemsController , fetchItemByPropertyAndValueController, fullUpdateGroceryItemController } from '../controllers/controller';

import { createGrocerySchema  } from '../schema/creategrocery.schema';

import { fetchItemByPropertySchema } from '../schema/fetchItemByProperty.schema';

import { fullUpdateGrocerySchema, deleteGroceryItemSchema } from '../schema/fullUpdateGroceryItem.schema';

import { partialUpdateGrocerySchema } from '../schema/partialUpdateGroceryItem.schema';

import { fetchAllGroceryItemSchema } from '../schema/fetchAllGroceryItem.schema';

import { validateCreationRequest, validateFetchItemByProperty , validateFullUpdateItem, validatePartialUpdateItem, validateFetchAllGroceryItem, validateDeleteItem} from '../middleware/validator';

const router = express();

router.post('/grocery', validateCreationRequest(createGrocerySchema), createGroceryItemController);

router.get('/groceries',validateFetchAllGroceryItem(fetchAllGroceryItemSchema),fetchAllGroceryItemsController);

router.get('/grocery/:property/:value', validateFetchItemByProperty(fetchItemByPropertySchema), fetchItemByPropertyAndValueController);

router.put('/grocery/:id', validateFullUpdateItem(fullUpdateGrocerySchema),fullUpdateGroceryItemController);

router.patch('/grocery/:id', validatePartialUpdateItem(partialUpdateGrocerySchema),fullUpdateGroceryItemController);

router.delete('/grocery/:id', validateDeleteItem(deleteGroceryItemSchema),deleteGroceryItemController);

export default router;