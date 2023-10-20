NetSuite User Event Script: Item Price Adjuster
This script, designed for the NetSuite ERP platform, leverages the SuiteScript 2.1 API. Its main purpose is to adjust item prices under certain conditions before the record is finalized.

Details
Author: Hunter Jacobs, Elcometer Inc.

Features
Price Adjustment: The script modifies an item's price before the record is saved.
Retrieves the online price level (ID of 5) from the price level line.
Determines the item manufacturer and its association with the NetSuite connector.
Captures the online price set for submission.
For newly created items (context.UserEventType.CREATE):
If the manufacturer is "sagola", it sets the 'custitem_dynamic_amazon_price' to the online price.
Otherwise, it increases the online price by 12%.
For existing items:
Checks if the online price or the item's connector association hasn't changed. If not, the script terminates.
If the item is not linked with the NetSuite connector, the 'custitem_dynamic_amazon_price' is cleared.
If the manufacturer is "sagola", the new online price is set. Otherwise, it's raised by 12%.
Dependencies
'N/record': Offers a range of functions to handle records in NetSuite.
'N/ui/serverWidget': Enables server scripts to manipulate forms, sublists, and fields.
Implementation
Upload this script to your NetSuite account.
Designate it as a User Event Script for inventory and non-inventory item records.
The script will activate during the beforeSubmit event, adjusting the item's price as per the rules mentioned above prior to saving it.
