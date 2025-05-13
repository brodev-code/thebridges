import { StyleSheet } from 'react-native';

export const _thTicketStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  mB8: {
    marginBottom: 8,
  },
  ticketContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  ticketLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#003333',
  },
  input: {
    color: '#003333',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 40,
    justifyContent: 'center',
  },
  dropdownText: {
    padding: 0,
    color: '#003333',
    fontSize: 14,
  },
  dropdownArrow: {
    color: '#003333',
  },
  dropdownContainer: {
    height: 48,
    width: '60%',
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownList: {
    backgroundColor: '#fff',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#4B0082',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#4B0082',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4B0082',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#4B0082',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
  },
  partSide: {
    width: '48%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    width: '40%',
    color: '#003333',
    marginRight: 10,
  },
  priceInput: {
    width: '60%',
  },
  availableInput: {
    width: '60%',
  },
  ageInput: {
    width: '25%',
    marginRight: 5,
  },
  section: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 10,
  },
  dateInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: '60%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  switchLabel: {
    color: '#003333',
  },
});