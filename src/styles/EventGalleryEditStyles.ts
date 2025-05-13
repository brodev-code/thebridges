import { StyleSheet } from 'react-native';

const _thGalleryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1E2D3D',
    marginBottom: 10, // Boşluğu azaltmak için marginBottom değerini düşürdüm
  },
  galleryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Galeri ve fotoğraflar arasındaki boşluğu azaltmak için
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  addImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 24,
    color: '#4A4A4A',
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4B0082',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  galleryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  galleryDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#4B0082',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10, // Boşluğu azaltmak için marginBottom değerini düşürdüm
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    // Bu stil boş, gerekirse doldurun
  },
  addGalleryButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  galleryItem: {
    padding: 10,
    marginRight: 10,
    height: 100,
    width:100,
    overflow:'hidden',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGalleryItem: {
    backgroundColor: '#b1b1b1',
    borderColor: '#4B0082',
  },
  imageContainer: {
    marginRight: 10,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  flatListContentContainer: {
    paddingBottom: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 20,
  },
});

export default _thGalleryStyles;