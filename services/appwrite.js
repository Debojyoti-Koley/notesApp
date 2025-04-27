import { Client, Databases } from "react-native-appwrite";
import { Platform } from "react-native";
const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOIN,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID ,
    col:{
        notes: process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID
    }       
};

const client = new Client().setEndpoint(config.endpoint).setProject(config.projectId);
if(Platform.OS == 'android'){
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME)
}
else if(Platform.OS == 'ios'){
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID)
}
const database = new Databases(client)

export {database, config, client}