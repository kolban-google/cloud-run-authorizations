async function setClaim(email, claims) {
    const admin = require('firebase-admin');
    const app = admin.initializeApp();
    try {

        const user = await admin.auth().getUserByEmail(email);
        //console.log(`User: ${JSON.stringify(user)}`);
        await admin.auth().setCustomUserClaims(user.uid, claims);
        console.log(`Claims set on ${email}`);
    }
    catch (ex) {
        console.log(ex);
    }
    app.delete();
}

if (process.argv.length != 4) {
    console.log("Usage: node set-claim.js EMAIL CLAIMS");
    return;
}
setClaim(process.argv[2], JSON.parse(process.argv[3]));