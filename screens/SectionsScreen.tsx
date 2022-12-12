import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCurrentList,
  addCategory,
  removeCategory,
  UserState,
} from "../reducers/user";

export default function SectionsScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const dispatch = useDispatch();
  const currentList = useSelector(
    (state: { user: UserState }) => state.user.value.currentList
  );

  // Ajouter un rayon dont ouverture et fermeture modale //

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setNewCatName("");
  };

  const newCat = {
    name: newCatName,
    image: "../assets/lists/rayon.png",
    items: [],
  };

  const handleAdd = () => {
    dispatch(addCategory(newCat));
    handleCloseModal();
  };

  // Supprimer un rayon //

  const handleDelete = (catName) => {
    console.log(catName);
    dispatch(removeCategory(catName));
  };

  // Afficher les rayons de la liste en cours de création //

  let viewSections = [];
  if (currentList) {
    viewSections = currentList.categories.map(
      (categoryData: any, i: number) => {
        return (
          <View key={i} style={styles.sectionContainer}>
            <View style={styles.head}>
              <Text>{categoryData.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  handleDelete(categoryData.name);
                }}
              >
                <FontAwesome name="minus-circle" size={20} />
              </TouchableOpacity>
            </View>
            <Image
              source={require("../assets/lists/rayon.png")}
              style={styles.picture}
            />
          </View>
        );
      }
    );
  }

  // Au retour arrière, remplace l'affichage du nom de liste par String vide //

  let listName = "";
  if (currentList) {
    listName = currentList.name;
  }

  // Retour arrière et effacer la liste en cours de création //

  const handleQuit = () => {
    navigation.navigate("TabNavigator", { screen: "Lists" });
    dispatch(removeCurrentList());
  };

  return (
    <View style={styles.backgroundView}>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => handleCloseModal()}
              activeOpacity={0.8}
            >
              <FontAwesome
                style={styles.xModal}
                name="close"
                size={20}
              ></FontAwesome>
            </TouchableOpacity>
            <TextInput
              placeholder="Nommez votre rayon"
              onChangeText={(value) => setNewCatName(value)}
              value={newCatName}
            />
            <TouchableOpacity
              onPress={() => handleAdd()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.globalViewContainer}>
          <View style={styles.header}>
            <FontAwesome
              name="chevron-left"
              size={30}
              onPress={() => handleQuit()}
            />
            <Text style={styles.title}>{listName}</Text>
          </View>
          <Text>Préparez votre liste par rayon</Text>
          <KeyboardAwareScrollView contentContainerStyle={styles.sections}>
            {viewSections}
            <View style={styles.add}>
              <FontAwesome
                name="plus-circle"
                size={90}
                onPress={() => {
                  handleOpenModal();
                }}
              ></FontAwesome>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const makeStyles = (height, width, fontScale) => {
  const adaptToHeight = (size) => {
    return (height * size) / 844 / fontScale;
  };

  const normalize = (size) => {
    return (width * size) / 390 / fontScale;
  };

  return StyleSheet.create({
    backgroundView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100%",
      minWidth: "100%",
    },
    safeAreaViewContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100%",
      minWidth: "100%",
    },
    globalViewContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      paddingHorizontal: normalize(5),
      paddingVertical: normalize(20),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      width: normalize(350),
      justifyContent: "flex-start",
      marginBottom: normalize(30),
    },
    title: {
      width: normalize(290),
      marginLeft: normalize(50),
      fontSize: normalize(25),
    },
    sections: {
      margin: normalize(10),
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
    },
    sectionContainer: {
      margin: normalize(10),
    },
    picture: {
      width: normalize(150),
      height: normalize(150),
    },
    head: {
      paddingVertical: normalize(5),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    add: {
      alignItems: "center",
      justifyContent: "center",
      margin: normalize(10),
      width: normalize(150),
      height: normalize(180),
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: normalize(20),
      padding: normalize(20),
      alignItems: "center",
      shadowColor: "black",
      shadowOffset: {
        width: normalize(10),
        height: normalize(10),
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      width: normalize(150),
      alignItems: "center",
      marginTop: normalize(20),
      paddingTop: normalize(8),
      backgroundColor: "#F1A100",
      borderRadius: normalize(10),
    },
    textButton: {
      color: "black",
      height: normalize(24),
      fontWeight: "600",
      fontSize: normalize(15),
    },
    xModal: {
      marginBottom: normalize(15),
    },
  });
};
