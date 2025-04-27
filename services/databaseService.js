import {database} from './appwrite'
// const databaseService = 10;
const databaseService = {
    async listDocuments (dbId, colId){
        try{
            const response = await database.listDocuments(dbId,colId);
            return response.documents || [];
        }
        catch(error){
            console.error('Error in fetching documents:', error.message);
            return {error: error.message};
        }
    }
}
export default databaseService;