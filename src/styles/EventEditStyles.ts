import { StyleSheet } from "react-native";

export const _thEventEdit = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#003333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  partWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Elemanları baştan hizalar
    alignItems: 'center', // Dikey hizalama
    padding: 0,
    margin: 0,
  },

  partSide: {
    width: '24%',
  },

  submitButton: {
    backgroundColor: '#4B0082',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },

  mltpContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  mltptitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  mltpdropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  mltpselectedItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 5,
    margin: 5,
  },
  mltpselectedItemText: {
    color: '#000',
  },
  imageUploadContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom:8,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imageUploadText: {
    textAlign:'center',
    color: '#b1b1b1',
    fontSize: 12,
    marginBottom:12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
});
