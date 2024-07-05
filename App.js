import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button } from 'react-native';
import { useState } from 'react';
import SearchStudent from './buscarAlumno';


export default function App() {

  const [alumnos, setAlumnos] = useState([]);
  const [modalVisibleDatabase, setModalVisibleDatabase] = useState(false);
  const [modalVisibleAlumno, setModalVisibleAlumno] = useState(false);
  const [modalVisibleCrear, setModalVisibleCrear] = useState(false);



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

  const handleCloseModalDatabse = () => {
    setModalVisibleDatabase(false);
  };

  const handleCloseModalAlumno = () => {
    setModalVisibleAlumno(false);
  };

  const handleVer = () => {
    fetchAll()
    setModalVisibleDatabase(true);
  };

  const handleVerAlumno = () => {
    setModalVisibleAlumno(true);
  };

  const handleCrear = () => {
    setModalVisibleCrear(true)
  };

  // const handleEditar = () => {
  //   // Lógica para editar registros
  //   alert('Editar registro');
  // };

  // const handleEliminar = () => {
  //   // Lógica para eliminar registros
  //   alert('Eliminar registro');
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portal de alumnos</Text>

      {/* PARA CONSULTA BASE DE DATOS */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleVer}>
          <Text style={styles.buttonText}>Ver alumnos</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleDatabase}
          onRequestClose={handleCloseModalDatabse}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Aquí muestra los datos */}
              {alumnos.map((alumno) => (
                <View key={alumno.ID} style={styles.alumnoContainer}>
                  <Text style={styles.nombre}>{alumno.Nombre} {alumno.Apellido}</Text>
                </View>
              ))}

              {/* Botón para cerrar el modal */}
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModalDatabse}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        {/* PARA CONSULTA ALUMNO*/}
        <TouchableOpacity style={styles.button} onPress={handleVerAlumno}>
          <Text style={styles.buttonText}>Buscar alumno</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisibleAlumno}
          animationType="slide"
          onRequestClose={handleCloseModalAlumno}
        >
          <SearchStudent />
          <View style={styles.modalContainer}>
            {/* Botón para cerrar el modal */}
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModalAlumno}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>


        <TouchableOpacity style={styles.button} onPress={handleCrear}>
          <Text style={styles.buttonText}>Crear alumno</Text>
        </TouchableOpacity>


        {/* <TouchableOpacity style={styles.button} onPress={handleEditar}>
          <Text style={styles.buttonText}>Editar alumno</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEliminar}>
          <Text style={styles.buttonText}>Eliminar alumno</Text>
        </TouchableOpacity> */} 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E6B9A6',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
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
  closeButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
