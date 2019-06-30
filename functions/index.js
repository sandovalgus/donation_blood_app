
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Firestore = require('@google-cloud/firestore');
admin.initializeApp(functions.config().firebase);

exports.notificationsCampaig =  functions.firestore.document('campaigns/{id}').onWrite(evt => {
  console.log(evt);
  const payload = {
    notification: {
        title: 'Nueva Campaña !',
        body: `Donar Sangre es donar vida`
    }
  }




  return admin.messaging().sendToDevice("eg6QoUpykCk:APA91bF_Mzfcq90m_Lpmz2qEDsxLY-z3ov9n1tvQnhe2Pz85eT3oieCVFOC4arTpyl5fbW00VQs3jy4vunXlJPw4wBWWd8RiCdFYDx7z17zUNMRhw5Z2GqMxJG2-3kGkWW1XThoHwz-L", payload)
});
