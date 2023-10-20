/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@Author Hunter Jacobs | Elcometer Inc.
 */
define(['N/record', 'N/log'], (record, log) => {

    const getPriceValue = (itemOnlinePrice, upmark) => {
        return (itemOnlinePrice * (upmark / 100)) + itemOnlinePrice;
    };

    const myBeforeSubmit = (context) => {
        try {
            const newRecord = context.newRecord;
            const oldRecord = context.oldRecord;

            const upmarkPercentage = parseFloat(newRecord.getValue({ fieldId: 'custitem_connector_pricing_upmark' })) || 0;

            const pricingSublistLineLevel = newRecord.findSublistLineWithValue({
                sublistId: "price",
                fieldId: 'pricelevel',
                value: '5'
            });

            if (pricingSublistLineLevel === -1) {
                log.error('Price Sublist Error', 'Price sublist line not found');
                return;
            }

            const newAmazonFlag = newRecord.getValue({ fieldId: 'custitem_nsc_amazon_flag' });
            const newItemOnlinePrice = parseFloat(newRecord.getSublistValue({
                sublistId: "price",
                fieldId: "price_1_",
                line: pricingSublistLineLevel
            }));

            let priceValue = getPriceValue(newItemOnlinePrice, upmarkPercentage);

            if (context.type == context.UserEventType.CREATE){
                if (newAmazonFlag !== "1") {
                    return;
                } else {
                    newRecord.setValue({
                        fieldId: 'custitem_dynamic_amazon_price',
                        value: `${priceValue.toFixed(2)}`
                    });
                    return;
                }
            }

            const oldUpmarkPercentage = parseFloat(oldRecord.getValue({ fieldId: 'custitem_connector_pricing_upmark' })) || 0;
            const oldAmazonFlag = oldRecord.getValue({ fieldId: 'custitem_nsc_amazon_flag' });
            const oldItemOnlinePrice = parseFloat(oldRecord.getSublistValue({
                sublistId: "price",
                fieldId: "price_1_",
                line: pricingSublistLineLevel
            }));

            if (oldItemOnlinePrice === newItemOnlinePrice && 
                newAmazonFlag === oldAmazonFlag && 
                upmarkPercentage === oldUpmarkPercentage) return;

            if (newAmazonFlag !== "1") {
                newRecord.setValue({ fieldId: 'custitem_dynamic_amazon_price', value: '' });
                return;
            }

            newRecord.setValue({
                fieldId: 'custitem_dynamic_amazon_price',
                value: `${priceValue.toFixed(2)}`
            });

        } catch (error) {
            log.error('General Error in myBeforeSubmit', error);
        }
    };

    return {
        beforeSubmit: myBeforeSubmit
    };
});
