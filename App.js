import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';


export default function App() {

  const [alumnos, setAlumnos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleVer = () => {
    fetchAll()
    // Lógica para ver registros
    setModalVisible(true);
  };

  const handleCrear = () => {
    // Lógica para crear registros
    alert('Crear registro');
  };

  const handleEditar = () => {
    // Lógica para editar registros
    alert('Editar registro');
  };

  const handleEliminar = () => {
    // Lógica para eliminar registros
    alert('Eliminar registro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portal de alumnos</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleVer}>
          <Text style={styles.buttonText}>Ver alumnos</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
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
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.button} onPress={handleCrear}>
          <Text style={styles.buttonText}>Crear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEditar}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEliminar}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
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
    backgroundColor: '#007BFF',
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
