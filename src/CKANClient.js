/*
 ** This file is part of OpenDataClient.
 **
 ** OpenDataClient is free software: you can redistribute it and/or modify
 ** it under the terms of the GNU General Public License as published by
 ** the Free Software Foundation, either version 3 of the License, or
 ** (at your option) any later version.
 **
 ** OpenDataClient is distributed in the hope that it will be useful,
 ** but WITHOUT ANY WARRANTY; without even the implied warranty of
 ** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 ** GNU General Public License for more details.
 **
 ** You should have received a copy of the GNU General Public License
 ** along with OpenDataClient. If not, see <http://www.gnu.org/licenses/>.
 **
 ** Copyright (C) 2016 OpenDataClient - Donato Pirozzi (donatopirozzi@gmail.com)
 ** Distributed under the GNU GPL v3. For full terms see the file LICENSE.
 ** License: http://www.gnu.org/licenses/gpl.html GPL version 3 or higher
 **/

function CKANClient() {
}//EndFunction.

CKANClient.prototype = (function() {

    /*var httpGetAsync = function(theUrl, callback, errorCallback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200)
                callback(xhttp.responseText);
        };
        xhttp.onerror = function (XMLHttpRequest, textStatus, errorThrown) {
            if (typeof errorCallback !== 'undefined')
                errorCallback("Check DataStoreAPI.");
        };
        xhttp.open("GET", theUrl, true);//true for asynchronous.
        xhttp.send(null);
    };//EndFunction.*/

    var _processListOfDatasets = function(jsonResponse, userCallback) {
        var datasets = [];

        var jsonResults = jsonResponse.result.results;

        for (var i=0; i<jsonResults.length; i++) {
            var jsonResult = jsonResults[i];
            var jsonResources = jsonResult.resources;

            //The dataset to retrieve to the calling function.
            var rtnDataset = {
                title: jsonResult.title,
                licenseId: jsonResult.license_id,
                licenseName: jsonResult.license_title,
                resources: []
            };

            //TODO: Check here whether the dataset is private and active.
            //console.log("state " + jsonResult.state);
            //console.log("private " + jsonResult.private);

            for (var j=0; j<jsonResources.length; j++) {
                var jsonResource = jsonResources[j];

                var parsedUrl = URLUtils.ParseString(jsonResource.url);
                var pageUrl = parsedUrl.host + "/dataset/" + jsonResult.name + "/resource/" + jsonResource.id;

                var rtnResource = {
                    id: jsonResource.id,
                    name: jsonResource.name,
                    format: jsonResource.format,
                    url: jsonResource.url,
                    pageUrl: pageUrl
                };
                rtnDataset.resources.push(rtnResource)
            }//EndForJ.

            datasets.push(rtnDataset);
        }//EndForI.

        userCallback(datasets);
    };

    //Public object content.
    return {
        constructor: CKANClient,

        /**
         * It support the version 3 of the CKAN API.
         * @param baseUrl
         * @param userCallback
         */
        listDatasets: function (baseUrl, userCallback, options) {
            if (typeof options === 'undefined')
                options = { jsonp: false };

            var apiListDataset = baseUrl + "/api/3/action/package_search" + "?rows=10000";

            if (options.jsonp) {
                URLUtils.JSONP(apiListDataset, function (jsonResponse) {
                    _processListOfDatasets(jsonResponse, userCallback);
                });
            } else
                //Make http request.
                URLUtils.HTTPGetAsync(apiListDataset, function(responseText) {
                    var jsonResponse = JSON.parse(responseText);
                    _processListOfDatasets(jsonResponse, userCallback);
                }, function () {
                    //Error, it try to use JSONP, otherwise retrives the error.
                    console.log("CKANClient API: failed to load " + baseUrl + ", trying to use JSONP.");
                    URLUtils.JSONP(apiListDataset, function (jsonResponse) {
                        _processListOfDatasets(jsonResponse, userCallback);
                    });
                });
        }//EndFunction.

    };
})();
