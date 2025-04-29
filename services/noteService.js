import databaseService from "./databaseService";
import {ID} from 'react-native-appwrite';
const dbID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID ;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
    async getNotes(){
        console.log("getNotes called")
        const response = await databaseService.listDocuments(dbID,colId);
        if(response.error){
            return {error: response.error}
        }
        return {data:response};
    },
    async addNote(text){
        if(!text){
            return {error: 'Note can not be empty'};
        }
        const data = {
            text: text,
            createdAt: new Date().toISOString()
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