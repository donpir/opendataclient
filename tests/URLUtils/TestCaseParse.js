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

    var baseUrl = "http://data.kk.dk/dataset/5f512117-fa20-4ffe-9e87-a907973e6889/resource/c05d2bd5-3153-4cd6-8a0d-f1a872d341ae/download/udviklingsmal.csv";

    QUnit.test("Parse Function tests.", function(assert) {
        var parsed = URLUtils.ParseString(baseUrl);
        assert.equal("data.kk.dk", parsed.host, "Check extracted host.");
    });

}//EndTestSuite.