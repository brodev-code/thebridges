import { Dimensions, StyleSheet } from 'react-native';
export const { width } = Dimensions.get('window');
export const theme = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    title: {
        color: '#4A148C',
    },
    label: {
        color: '#004D40',
    },
    primary:{
      color: '#4A148C',
    },
    secondary:{
      color: '#004D40',
    },
    input: {
        borderColor: '#E0E0E0',
        backgroundColor: '#FAFAFA',
    },
    placeholderColor: {
        color: '#9E9E9E',
    },
    link: {
        color: '#4A148C',
        textDecorationLine: 'underline',
    },
    button: {
        backgroundColor: '#4A148C',
    },
    buttonText: {
        color: '#FFFFFF',
    },
    appleButton: {
        backgroundColor: '#000000',
    },
    facebookButton: {
        backgroundColor: '#3B5998',
    },
    googleButton: {
        backgroundColor: '#DB4437',
    },
    textLeft:{
      textAlign:'left',
    },
    textRight:{
      textAlign:'right',
    },
    pB8:{
      paddingBottom:8
    },
    pB16:{
      paddingBottom:16
    },
    mB8:{
      marginBottom:8
    },
    mB16:{
      marginBottom:16
    },
    mT16:{
      marginTop:16
    },
    pT16:{
      paddingTop:16
    },
});
export const themeColor = {
colors: {
    // Purple Shades
    purple1: '#FAF2FF',
    purple2: '#B491CD',
    purple3: '#9161B4',
    purple4: '#6E309B',
    purple5: '#4B0082',
    purple6: '#3C0068',
    purple7: '#2D004E',
    purple8: '#1E0034',
    purple9: '#0F001A',
    purple10: '#000000',

    // Teal Shades
    teal1: '#D8F2F2',
    teal2: '#90CCCC',
    teal3: '#60B3B3',
    teal4: '#309999',
    teal5: '#008080',
    teal6: '#006666',
    teal7: '#004D4D',
    teal8: '#003333',
    teal9: '#001A1A',
    teal10: '#000000',

    // Red Shades
    red1: '#FCCEDA',
    red2: '#FA9DB5',
    red3: '#F76D8F',
    red4: '#F53C6A',
    red5: '#F20B45',
    red6: '#C20937',
    red7: '#910729',
    red8: '#61041C',
    red9: '#30020E',
    red10: '#000000',

    // Others
    white: '#FFFFFF',
    black: '#000000',
    grey: '#9E9E9E',
    orange: '#FFA500',
  },
  // Alt gezinme çubuğu renkleri
  tabBar: {
    activeTintColor: '#4B0082', // Purple5
    inactiveTintColor: '#000000', // Black
    backgroundColor: '#FFFFFF', // White
  },
};

export const themeTypo = {
    buttonStyles: {
        primary: {
          backgroundColor: '#4B0082',
          color: '#FFFFFF',
        },
        secondary: {
          backgroundColor: '#FFFFFF',
          borderColor: '#4B0082',
          color: '#4B0082',
        },
        danger: {
          backgroundColor: '#F20B45',
          color: '#FFFFFF',
        },
      },
      navigationTab: {
        activeColor: '#4B0082',
        inactiveColor: '#000000',
      },
      typography: {
        fontSizeSmall: 12,
        fontSizeMedium: 16,
        fontSizeLarge: 20,
        fontWeightLight: '300',
        fontWeightRegular: '400',
        fontWeightBold: '700',
      },
};

export const _thBar = StyleSheet.create({
  tabBar: {
    backgroundColor: themeColor.colors.white,
    borderTopWidth: 0,
    elevation: 5,
    height: 60,
  },
});

export const _thLocationButton = StyleSheet.create({
    container: {
      marginVertical: 10,
      width:110,
      height:32,
      alignItems: 'center',
   },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height:"100%",
        padding: 2,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        color:"#003333",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        elevation: 2,
    },
    text: {
        flex: 1,
        color:"#003333",
        fontSize:12,
        fontWeight:"500"
    },
    dropdown: {
      position:"absolute",
        top:33,
        right:0,
        width:width-48,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        zIndex:5,
    },
    searchButton: {
      paddingHorizontal: 16,
      paddingVertical:8,
      backgroundColor: '#4B0082',
      borderRadius: 8,
      alignItems: 'center',
  },

  searchButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
  },
  input: {
    height: 40,
    width:  width-112,
    borderColor: '#B1B1B1',
    color:"#003333",
    borderWidth: 1,
    borderRadius:8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  locationButton: {
    backgroundColor: '#4B0082',
    borderRadius: 50,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  parted1:{
    width: width*2/3-60,
    marginRight: 8,
  },
  parted2:{
    width:  width/3-60,
  }

});


export const _thFavorite = StyleSheet.create({
  favoriteButton: {
    position: 'relative',
    width: 32,
    height:32,
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteImage: {
    width: 16,
    height: 16,
  },
});

export const _thParticipantAvatars = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  participant: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  moreContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    marginLeft: 5,
  },
  moreText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export const _thEventGallery = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#f8f8f8",
    marginBottom:16,
  },
  header: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    marginRight: 10,
  },
  imageCard:{
    marginRight:4
  },
  image: {
    width: Dimensions.get("window").width - 48,
    height: 280,
    resizeMode: "cover",
    borderRadius:8,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  galleryContainer: {
    marginBottom:16
  },
  galleryName: {
    fontSize: 16,
    color:"#003333",
    fontWeight: "bold",
    marginBottom: 5,
  },
  galleryDescription: {
    fontSize: 12,
    color: "#B1B1B1",
    marginBottom: 10,
  },
  noPhotosText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  noGalleriesText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  divider:{
    marginVertical:8,
    borderBottomColor:'#EBEBEB',
    borderBottomWidth:1
  }
});

