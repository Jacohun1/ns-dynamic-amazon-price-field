Alright, here's the README documentation in the format suitable for GitHub:

---

# User Event Script for Item Pricing Update

This script is designed to handle item pricing updates based on specific conditions for a NetSuite record.

## :sparkles: Features
1. **Price Calculation**: Calculates the price value based on an item's online price and an upmark percentage.
2. **Before Submit Handling**: Manages changes to the item record during the `beforeSubmit` event.

## :gear: Configuration
- **NetSuite API Version**: 2.1
- **Script Type**: User Event Script

## :bust_in_silhouette: Author
- **Name**: Hunter Jacobs
- **Affiliation**: Elcometer Inc.

## :package: Dependencies
- `N/record`
- `N/log`

## :bulb: How it works

When an item record is submitted, the script:
1. Fetches the online price and upmark percentage.
2. Checks if the item is marked for Amazon.
3. Calculates the new price based on the upmark percentage.
4. Updates the item's Amazon price if necessary.

## :warning: Error Handling
The script logs errors in two scenarios:
1. If the price sublist line is not found.
2. If there is a general error during the `beforeSubmit` event handling.

---

You can copy and paste this directly into a `README.md` file in your GitHub repository for the script. Adjustments can be made as necessary.
