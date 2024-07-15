```
yarn

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Coding Challenge: Purchase Order Form

## Objective

Your task is to create a form for creating purchase orders. The form should be capable of making a POST request to `http://localhost:3000/api/orders`. 

## Requirements

1. The form should include a dropdown list of suppliers. The list of suppliers should be fetched through a GET request to `api/suppliers`.

2. The form should also include a dropdown list of items. The list of items should be fetched through a GET request to `api/suppliers/[id]/items`, where `[id]` is the ID of the selected supplier.

3. The form should validate the input data to ensure it matches the `PurchaseOrder` type as defined in src/types/index.ts. 

4. For the sake of this coding challenge, the POST request does not have to perform any server-side validations. However, you should ensure on the front end that the request is a valid `PurchaseOrder` type.

5. After the user completes the purchase order form, the UI should redirect to a page that shows a list of purchase orders. Each purchase order should have a link to view the individual order page.

6. In the individual order page, the user should be able to edit the `PurchaseOrderStatus` through a PATCH request and delete the order through a DELETE request. After performing these actions, the UI should redirect back to the orders list page.

## Steps

1. Fetch the list of suppliers from `api/suppliers` and populate the suppliers dropdown.

2. When a supplier is selected, fetch the list of items from `api/suppliers/[id]/items` and populate the items dropdown.

3. Implement form validation to ensure the data matches the `PurchaseOrder` type.

4. On form submission, make a POST request to `api/orders` with the form data.

5. Redirect to the orders list page and provide links to individual order pages.

6. Implement PATCH and DELETE requests on the individual order page.

## Resources

Feel free to use the internal component library located under `src/components` for building the form and other UI elements. Note that the primitive components are based on radix/ui.

There is a utility library in `src/utils/api.ts` to help with API calls. We use `react-query` for fetching, caching, synchronizing and updating server state

## Evaluation

Your solution will be evaluated on the following criteria:

1. Correctness: Does the form correctly make a POST request to `api/orders` with data that matches the `PurchaseOrder` type?

2. Code Quality: Is your code clean, readable, and well-organized?

3. Error Handling: Does your code handle potential errors gracefully?

4. User Experience: Is the form easy to use and understand?

Good luck!



## Copyright

(c) Didero Inc.
All rights reserved.
