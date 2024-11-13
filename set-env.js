const fs = required ('fs');

const envConfigFile = `
export const environment = {
    production: true,
    firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
  }
};
`;

fs.writeFileSync('./src/environments/environment.prod.ts', envConfigFile);
fs.writeFileSync('./src/environments/environment.ts', envConfigFile);
console.log('Wrote environment variables to environment.prod.ts and environment.ts');