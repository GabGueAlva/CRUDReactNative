import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const SearchStudent = () => {
    const [id, setId] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:5000/${id}`);
            const data = await response.json();

            if (response.ok) {
                setStudentData(data);
                setError('');
            } else {
                setError(data.message || 'No se encontró el estudiante.');
                setStudentData(null);
            }
        } catch (err) {
            console.log(err)
            setStudentData(null);
        }
    };

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el ID del estudiante"
                value={id}
                onChangeText={setId}
            />
            <Button title="Buscar" onPress={handleSearch} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {studentData ? (
                <View style={styles.result}>
                    <Text>Id: {id}</Text>
                    <Text>Nombre: {studentData.Nombre}</Text>
                    <Text>Apellido: {studentData.Apellido}</Text>
                    <Text>Curso: {studentData.Curso_id}</Text>
                </View>
            ) : null}
            
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
      },
      modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
      },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
    result: {
        marginTop: 16,
    },
});

export default SearchStudent;