const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addSendingTime = functions.database.ref('/com_list/{push_id}/data')
    .onCreate((snapshot, context) => {

        // TODO 2: 
        // 1. get cureent date data
        // 2. add this data to new column named "time" to current node

    });