import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const SearchDatabase = () => {
    const [alumnos, setAlumnos] = useState([]);


    const fetchAll = async () => {
        try {
          const response = await fetch(`http://localhost:5000/`);
          if (!response.ok) {
            throw new Error('Error al obtener datos');
          }
          const data = await response.json();
          setAlumnos(Array.isArray(data) ? data : [data]);
        } catch (error) {
          console.log("Error")
        }
      };

      fetchAll()

    return (
        <View style={styles.modalContent}>
              {/* Aquí muestra los datos */}
              {alumnos.map((alumno) => (
                <View key={alumno.ID} style={styles.alumnoContainer}>
                  <Text style={styles.nombre}>{alumno.Nombre} {alumno.Apellido}</Text>
                </View>
              ))}

              {/* Botón para cerrar el modal */}
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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

export default SearchDatabase;