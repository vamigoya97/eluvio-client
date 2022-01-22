const { ElvClient } = require("./node_modules/@eluvio/elv-client-js");
require('dotenv').config()

async function createClient() {

    const client = await ElvClient.FromConfigurationUrl({
        configUrl: "https://demov3.net955210.contentfabric.io/config"
    });
    
    const wallet = client.GenerateWallet();
    const signer = wallet.AddAccount({
        accountName: "eluvio-test-wallet",
        privateKey: process.env.PRIVATE_KEY
    });

    client.SetSigner({signer});
    
    const libraryId = client.utils.AddressToLibraryId(client.contentSpaceAddress);

    const createResponse = await client.CreateContentObject({
        libraryId
    })
    const objectId = createResponse.id;
    const writeToken = createResponse.write_token;

    const finalizeResponse = await client.FinalizeContentObject({
        libraryId: client.contentSpaceLibraryId,
        objectId,
        writeToken
    });

    const versionHash = finalizeResponse.hash;

    console.log(versionHash);
}

createClient();
