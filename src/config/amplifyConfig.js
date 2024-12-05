import { Amplify } from 'aws-amplify';

// Configuration for AWS Amplify
const amplifyConfig = {
  Auth: {
    // Firebase authentication will be used here; no need for Cognito setup
    mandatorySignIn: true,
    region: "us-east-2", // Your AWS region
    identityPoolId: "dummy", // Not required since using Firebase
    identityPoolRegion: "us-east-2", // Same region
  },
  API: {
    endpoints: [
      {
        name: "Casty APP SyncAPI", // Your API name
        endpoint: "https://4afbrs6s5nfm7jmdwzbg455if4.appsync-api.us-east-2.amazonaws.com/graphql", // Replace with actual endpoint
        region: "us-east-2", // Your region
      },
    ],
  },
};

Amplify.configure(amplifyConfig);
