function toFixed(value, precision) {

    function checkPrecision(val, base) {
        val = Math.round(Math.abs(val));
        return isNaN(val) ? base : val;
    }

    var precision = checkPrecision(precision, 0);
    var valueAsString = value.toString();
    var indexOfDecimal = valueAsString.indexOf('.');
    var numOfDecimalPlacesInValue = 0;

    if (indexOfDecimal !== -1) {
        numOfDecimalPlacesInValue = valueAsString.slice(indexOfDecimal + 1, valueAsString.length).length;
    }

    var finalResult = '';

    if (indexOfDecimal === -1 && precision === 0) {
        finalResult = valueAsString;
    } else if (numOfDecimalPlacesInValue < precision) {
        finalResult = valueAsString;
        var numOfZerosToAdd = precision - numOfDecimalPlacesInValue;

        if (numOfDecimalPlacesInValue === 0) {
            finalResult = finalResult + '.';
        }

        while (numOfZerosToAdd--) {
            finalResult = finalResult + '0';
        }
    } else {
        // Remove decimal
        var valueAsStringWithoutDecimal = valueAsString.replace(/\./, '');
        // Find index to shift decimal to
        var indexOfDecimalShiftedByPrecision = indexOfDecimal + precision;
        // Piece together value with shifted decimal
        var valueWithDecimalShiftedByPrecision = valueAsStringWithoutDecimal.slice(0, indexOfDecimalShiftedByPrecision)
            + '.' + valueAsStringWithoutDecimal.slice(indexOfDecimalShiftedByPrecision, valueAsStringWithoutDecimal.length);
        // Round decimal-shifted value
        var roundedValue = Math.round(valueWithDecimalShiftedByPrecision);
        // Remove decimal from rounded value
        var roundedValueAsStringWithoutDecimal = roundedValue.toString().replace(/\./, '');

        // Propend any zeroes that were removed from the original value after rounding
        for (var i = 0; i < valueAsStringWithoutDecimal.length; i++) {
            if (valueAsStringWithoutDecimal[i] !== '0') {
                break;
            } else {
                roundedValueAsStringWithoutDecimal = '0' + roundedValueAsStringWithoutDecimal;
            }
        }

        // Piece together rounded value with accurate decimal
        var roundedValueAsStringWithDecimal = roundedValueAsStringWithoutDecimal.slice(0, indexOfDecimal) + '.'
            + roundedValueAsStringWithoutDecimal.slice(indexOfDecimal, roundedValueAsStringWithoutDecimal.length);
        // Get final result as string with appropriate number of decimal places
        finalResult = Number(roundedValueAsStringWithDecimal).toFixed(precision);
    }
    return finalResult;
}