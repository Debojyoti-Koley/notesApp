import databaseService from "./databaseService";
import {ID, Query} from 'react-native-appwrite';
const dbID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID ;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
    async getNotes(userId){
        if(!userId){
            console.error('Error: missing user id in getNotes()')
            return{
                data: [], error: 'userId is missing'
            }
        }
        try {
            const response = await databaseService.listDocuments(dbID,colId, [
                Query.equal('user_id',userId)
            ]);
            return response;
        } catch (error) {
            console.log('Error in fetching notes', error.message);
            return{ data: [], error: error.message};
        }
    },
    async addNote(user_id, text){
        if(!text){
            return {error: 'Note can not be empty'};
        }
        const data = {
            text: text,
            createdAt: new Date().toISOString(),
            user_id: user_id
        }
        const response = await databaseService.createDocument(dbID, colId, data, ID.unique());

        if(response?.error){
            return {error: response.error};
        }
        return {data: response};
    },
    async updateNote(id, text){
        const response = await databaseService.updateDocument(dbID,colId,id,{text});
        if(response?.error){
            return {error: response.error};
        }
        return {data: response};
    },
    async deleteNote(id){
        const response = await databaseService.deleteDocument(dbID,colId,id);
        if(response?.error){
            return {error: response.error}
        }

        return {success: true};
    }
}
export default noteService;