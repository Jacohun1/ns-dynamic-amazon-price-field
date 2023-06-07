# User Event Script for NetSuite

This script is a User Event Script written for the NetSuite ERP platform. It uses NetSuite's SuiteScript 2.1 API to perform updates on inventory and non-inventory item records when they are submitted.

## Author
Hunter Jacobs, Elcometer Inc.

## Functionality

The script has one main functionality: it adjusts the price of an item based on specific conditions before the record is submitted. 

- It first retrieves the line value of the price level with the ID of 5, which represents our online price level.

- It then checks the manufacturer of the item and whether the item is part of the NetSuite connector. 

- The script also fetches the online price that is about to be submitted. 

- If the item record is being created (context.UserEventType.CREATE), the script sets the 'custitem_dynamic_amazon_price' field value. If the manufacturer is "sagola", it sets the field value to the online price. For other manufacturers, it adds 12% to the online price.

- If the item is not new, the script fetches whether the item was part of the NetSuite connector and the previous online price. If there is no change to the online price and the item's association with the NetSuite connector, the script ends its execution.

- If the new item is not part of the NetSuite connector, the script sets the 'custitem_dynamic_amazon_price' field value to an empty string.

- If the manufacturer is "sagola", it sets the 'custitem_dynamic_amazon_price' field value to the new online price. For other manufacturers, it adds 12% to the new online price.

## Dependencies

This script relies on two standard NetSuite modules:
- 'N/record': Provides a suite of functions to manage records within NetSuite.
- 'N/ui/serverWidget': Allows server scripts to create and manipulate forms, sublists, and form fields.

## Usage

To use this script, upload it to your NetSuite account and set it as a User Event Script on the inventory and non-inventory item records. The script will automatically run in the beforeSubmit event, ensuring that the item's price is adjusted according to the rules outlined above before it is saved to the database.
