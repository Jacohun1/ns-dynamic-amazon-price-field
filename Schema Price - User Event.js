/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@Author Hunter Jacobs | Elcometer Inc.
 */
 
// Load two standard modules.
define ( ['N/record', 'N/ui/serverWidget'] ,
    // Add the callback function.
    (record, serverWidget) => {
 
        // In the beforeSubmit function, add new price to Schema custom field on inv & non-inv item records.
        myBeforeSubmit = (context) => {
            //Simplify Code - remove context.
            const newRecord = context.newRecord;
            const oldRecord = context.oldRecord;

            //Pull the line value of the price level with the Id of 5 (Our Online Price Level).
            const pricingSublistLineLevel = newRecord.findSublistLineWithValue({
                sublistId: "price",
                fieldId: 'pricelevel', //The Id of the sublist values
                value: '5'
            })

            //See who the manufacturer in NS is.
            const itemManufacturer = newRecord.getValue({
                fieldId: 'manufacturer'
            });

            //get the online price that is about to be submitted
            const newItemOnlinePrice = newRecord.getSublistValue({
                sublistId: "price",
                fieldId: "price_1_",
                line: pricingSublistLineLevel
            });

            //get the online price that was on the record prior
            const oldItemOnlinePrice = oldRecord.getSublistValue({
                sublistId: "price",
                fieldId: "price_1_",
                line: pricingSublistLineLevel
            });

            //If there is no change to the online price the script should be done
            if (oldItemOnlinePrice === newItemOnlinePrice)
                return;

            if (itemManufacturer.toLowerCase() === "sagola") {
                newRecord.setValue({
                    fieldId: 'custitem_dynamic_amazon_price',
                    value: `${Number(newItemOnlinePrice).toFixed(2)}`
                });
            } else {
                newRecord.setValue({
                    fieldId: 'custitem_dynamic_amazon_price',
                    value: `${Number((newItemOnlinePrice * .12) + newItemOnlinePrice).toFixed(2)}`
                });
            }

        }
        //Return the before submit statement
        return {
            beforeSubmit: myBeforeSubmit
        };
    });
