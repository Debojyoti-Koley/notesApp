import databaseService from "./databaseService";

const dbID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID ;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteServices = {
    async getNotes(){
        const response = await databaseService.listDocuments(dbID,colId);
        if(response.error){
            return {error: response.error}
        }
        return {data:response};
    }
}
export default noteServices;