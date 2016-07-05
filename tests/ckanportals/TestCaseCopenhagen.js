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

runTests();

function runTests() {

    var baseUrl = "http://data.kk.dk";
    var baseUrlDataset = "http://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:biblioteker&outputFormat=csv&SRSNAME=EPSG:4326";
    var odc = new CKANClient();

    function runTest(datasets) {
        QUnit.test("Copenaghen CKAN listing datasets.", function(assert) {
            assert.notEqual(datasets, null, "Dataset loading.");
            assert.ok(datasets.length > 0);
            console.log("End Test Copenaghen.")
        });
    };

    odc.listDatasets(baseUrl, runTest);

}//EndTestSuite.