app.filter('searchFilter', function () {
    return function (items, type) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.type == type) {
                filtered.push(item);
            }
        }

        return filtered;
    };
});

app.filter("andFilter", function () {
    return function (items, searchText, AND_OR) {

        if (angular.isDefined(searchText) && searchText.length > 0 && angular.isDefined(items)) {
            var returnArray = [],
                // Split on single or multi space
                splitext = searchText.toString().toLowerCase().split(/\s+/),
                // Build Regexp with logical AND using "look ahead assertions"
                regexp_and = "(?=.*" + splitext.join(")(?=.*") + ")",
                //                regexp_and = "(^" + splitext.join(")(?=.*") + ")",
                // Build Regexp with logical OR
                regexp_or = searchText.toString().toLowerCase().replace(/\s+/g, "|"),
                // Compile the regular expression
                re = new RegExp((AND_OR == "AND") ? regexp_and : regexp_or, "i");

            for (var x = 0; x < items.length; x++) {

                // If has skills check on skills
                if (angular.isDefined(items[x].skills)) {
                    for (var y = 0; y < items[x].skills.length; y++) {
                        if (re.test(items[x].skills[y].name + items[x].name + items[x].city)) {
                            var test = _.find(returnArray, function (item) {
                                return item.name == items[x].name
                            });
                            if (angular.isUndefined(test)) {
                                returnArray.push(items[x]);
                            }
                        }
                    }
                } else {
                    // If has no skills check only on name and city
                    if (re.test(items[x].name + items[x].city)) {
                        returnArray.push(items[x]);
                    }
                }

            }
            return returnArray;
        }
    }
});