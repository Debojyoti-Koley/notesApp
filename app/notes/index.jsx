import { useEffect, useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ActivityIndicator, Alert} from 'react-native'
import NoteList from '@/components/NoteList'
import AddNoteModal from '@/components/AddNoteModal'
import noteService from '@/services/noteService'

const NoteScreen = () =>{
    const [notes,setNotes] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [newNote, setNewNote] = useState('')
    const [loading, setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(()=>{
        console.log("useEffect")
        fetchNotes();
    },[]);


    const fetchNotes = async () => {
        setLoading(true);
        const response = await noteService.getNotes();
        console.log(response)
        if(response.error){
            setError(response.error);
            Alert.alert('Error', response.error);
        }else{
            setNotes(response.data);
            setError(null);
        }
        setLoading(false);
        const res = await noteService.getNotes()
        console.log("fetchnotes called")
        console.log(res)
    }
    

    const addNote = async () =>{
        if(newNote.trim()==='') return;

       const response = await noteService.addNote(newNote);
       if(response.error){
        Alert.alert('Error', response.error)
       }
       else{
        setNotes([...notes, response.data]);
       }
       setNewNote('')
        setModalVisible(false)
    }
    const deleteNote = async (id)=>{
        Alert.alert('Delete Note', 'Do you want to delete this note?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text:'Delete',
                style:'destructive',
                onPress: async ()=>{
                    const response = await noteService.deleteNote(id);
                    console.log('onpress',response)
                    if(response.error){
                        Alert.alert('Error',response.error);
                    }
                    else{
                        setNotes(notes.filter((note)=>note.$id !== id));
                    }
                }
            }
        ])
    };

    const editNote = async (id, newText)=>{
        if(!newText.trim()){
            Alert.alert('Error', 'Text can not be empty');
            return;
        }
        const response = await noteService.updateNote(id, newText);
        if(response.error){
            Alert.alert('Error', response.error);
        }else{
            setNotes((prevNotes)=>prevNotes.map((note)=>note.$id ===id ? {...note, text: response.data.text}:note));
        }
    }
    return(
        <View style={styles.container}>
            {loading? (
                <ActivityIndicator size='large' color='#007ers'/>
            ): (
                <>
                {error && <Text style={styles.errorText}>{error}</Text>}
                <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote}/>
                </>
            )}
            <TouchableOpacity style={styles.addButton} onPress={()=>setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ Add Note</Text>
            </TouchableOpacity>

            <AddNoteModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                newNote={newNote}
                setNewNote={setNewNote}
                addNote={addNote}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
      addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
      },
      addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
      },
})
export default NoteScreen;