import {database} from './appwrite'
// const databaseService = 10;
const databaseService = {
    async listDocuments (dbId, colId, queries=[]){
        try{
            const response = await database.listDocuments(dbId,colId,queries);
            return {data: response.documents || [], error:null};
        }
        catch(error){
            console.error('Error in fetching documents:', error.message);
            return {error: error.message};
        }
    },
    async createDocument(dbID, colId, data, id=null){
        try{
            return await database.createDocument(dbID, colId, id||undefined, data);
        }
        catch(error){
            console.error("Error creating document", error.message);
            return{
                error: error.message,
            }
        }
    },
    async updateDocument(dbID, colId, id, data){
        try{
            return await database.updateDocument(dbID, colId, id, data);
        }
        catch(error){
            console.error("Error updating document", error.message);
            return{
                error: error.message,
            }
        }
    },
    async deleteDocument(dbID,colId,id){
        try{
            await database.deleteDocument(dbID,colId,id)
            return {success:true}
        }
        catch(error){
            console.error("Error creating document", error.message);
            return{
                error: error.message,
            }
        }
    }
}
export default databaseService;