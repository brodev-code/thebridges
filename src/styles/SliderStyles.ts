import { Dimensions, StyleSheet } from "react-native";

export const { width } = Dimensions.get('window');

export const _thSlider = StyleSheet.create({
  wrapper: {
    height: 180,
  },
  card: {
    width: width - 48,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  imageStyle: {
    borderRadius: 16,
    backgroundColor:'#bbb',
  },
  blurContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%', // Daha geniş bir alan kaplasın
    overflow: 'hidden',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    filter: 'blur(5px)',
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: '-40%', // Üst kısımdan taşacak şekilde ayarla
    height: '140%', // Orjinal resmin üzerine binecek şekilde
    borderRadius: 16,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    flexDirection: 'column-reverse',
  },
  content: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  location: {
    fontSize: 12,
    color: '#FFFFFF65',
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#FFFFFF65',
    marginRight: 8,
  },
  favoriteContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});