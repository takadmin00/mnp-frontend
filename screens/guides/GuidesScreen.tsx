import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useEffect, useRef, useState } from "react";

import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function GuidesScreen({ navigation }) {
  const {
    height,
    width,
    fontScale,
  }: { height: number; width: number; fontScale: number } =
    useWindowDimensions();
  const styles: any = makeStyles(height, width, fontScale);

  const initialSearchInputPlaceholder: string = "🔍  Rechercher un guide conso";
  const [searchInputPlaceholder, setSearchInputPlaceholder] = useState<string>(
    initialSearchInputPlaceholder
  );
  const [searchInput, setSearchInput] = useState<string>("");

  const scrollRef = useRef<any>();
  const firstCardOffset: number = width - (width * 39) / 390;
  const [scrollViewOffset, setScrollViewOffset] =
    useState<number>(firstCardOffset);
  const [scrollViewScrollListening, setScrollViewScrollListening] =
    useState<boolean>(false);
  const [isScrollViewTouched, setIsScrollViewTouched] =
    useState<boolean>(false);

  const initialPostingInputPlaceholder: string =
    "Notre application vous plaît? Partagez vos retours et vos suggestions. 🧺🌱";
  const [postingInputPlaceholder, setPostingInputPlaceholder] =
    useState<string>(initialPostingInputPlaceholder);
  const [postingInput, setPostingInput] = useState<string>("");

  const newsCards: JSX.Element[] = [
    <View key={0} style={[styles.newsCard, styles.newsPremium]}>
      <Text style={styles.newsPremiumTitle}>Devenir Premium</Text>
      <Text style={styles.newsPremiumTeaser}>
        Soutenez notre projet éco-responsable, et débloquez toutes les
        fonctionnalités !
      </Text>
      <Text style={styles.newsPremiumPricing}>
        <Text style={styles.newsPremiumPricingAmount}>20€ / </Text>
        <Text style={styles.newsPremiumPricingFrequency}>an</Text>
      </Text>
      <TouchableOpacity style={styles.newsPremiumBtn}>
        <Text style={styles.newsPremiumBtnText}>En savoir plus</Text>
      </TouchableOpacity>
    </View>,
    <ImageBackground
      key={1}
      style={[styles.newsCard, styles.newsFirst]}
      source={require("../../assets/guides/news-welcome.jpg")}
      defaultSource={require("../../assets/guides/news-welcome.jpg")}
    >
      <View style={[styles.newsFirstOpacity, styles.newsCard]}>
        <Text style={styles.newsFirstTitle}>Bienvenue !</Text>
        <Text style={styles.newsFirstTeaser}>
          L'application mobile Mon Nouveau Panier est enfin disponible !
          Découvrez le message de bienvenue de notre équipe.
        </Text>
        <TouchableOpacity style={styles.newsFirstBtn}>
          <Text style={styles.newsFirstBtnText}>Voir notre annonce</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>,
    <ImageBackground
      key={2}
      style={[styles.newsCard, styles.newsSecond]}
      source={require("../../assets/guides/news-honey.jpg")}
      defaultSource={require("../../assets/guides/news-honey.jpg")}
    >
      <View style={[styles.newsSecondOpacity, styles.newsCard]}>
        <Text style={styles.newsSecondTitle}>Le saviez-vous ?</Text>
        <Text style={styles.newsSecondTeaser}>
          Le miel est le produit alimentaire le plus fraudé au monde. Afin
          d'éviter les pièges, nous avons mené l'enquête pour vous.
        </Text>
        <TouchableOpacity style={styles.newsSecondBtn}>
          <Text style={styles.newsSecondBtnText}>Voir l'article</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>,
    <ImageBackground
      key={3}
      style={[styles.newsCard, styles.newsThird]}
      source={require("../../assets/guides/news-conserves.jpg")}
      defaultSource={require("../../assets/guides/news-conserves.jpg")}
    >
      <View style={[styles.newsThirdOpacity, styles.newsCard]}>
        <Text style={styles.newsThirdTitle}>Quelle différence ?</Text>
        <Text style={styles.newsThirdTeaser}>
          Quand il faut choisir entre surgelés et conserves, on entend tout et
          son contraire. Démêlez le vrai du faux grâce à notre article.
        </Text>
        <TouchableOpacity style={styles.newsThirdBtn}>
          <Text style={styles.newsThirdBtnText}>Voir l'article</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>,
  ];
  const newsCardWidth: object = { width: `${100 / (newsCards.length + 2)}%` };
  const newsLoopCardsIndexes: number[] = [
    newsCards.length - 1,
    ...newsCards.map((e, i) => i),
    0,
  ];
  const newsLoopCards: JSX.Element[] = [
    <View key={0} style={[styles.newsLoopCard, newsCardWidth]}>
      {newsCards[newsLoopCardsIndexes[0]]}
    </View>,
    ...newsCards.map(
      (e, i) =>
        (e = (
          <View key={i + 1} style={[styles.newsLoopCard, newsCardWidth]}>
            {newsCards[newsLoopCardsIndexes[i + 1]]}
          </View>
        ))
    ),
    <View
      key={newsLoopCardsIndexes.length - 1}
      style={[styles.newsLoopCard, newsCardWidth]}
    >
      {newsCards[newsLoopCardsIndexes[newsLoopCardsIndexes.length - 1]]}
    </View>,
  ];

  const handleScrollViewBulletPoints = (i: number) => {
    scrollRef.current?.scrollTo({
      x: firstCardOffset * (i + 1),
      animated: true,
    });
  };

  const newsBulletPoints: JSX.Element[] = newsCards.map((e, i) => {
    let bulletPointColor: object;
    let bulletPointSize: object;
    if (Math.round(scrollViewOffset / firstCardOffset) === i + 1) {
      bulletPointColor = { backgroundColor: "#F1A100" };
      bulletPointSize = { height: (width * 7) / 390, width: (width * 7) / 390 };
    } else {
      bulletPointColor = { backgroundColor: "#AFAFAF" };
      bulletPointSize = { height: (width * 5) / 390, width: (width * 5) / 390 };
    }
    return (
      <TouchableWithoutFeedback
        key={i}
        onPress={() => handleScrollViewBulletPoints(i)}
      >
        <View style={styles.newsBulletPointBtn}>
          <View
            style={[
              {
                ...styles.newsBulletPoint,
                ...bulletPointColor,
                ...bulletPointSize,
              },
            ]}
          ></View>
        </View>
      </TouchableWithoutFeedback>
    );
  });

  useEffect(() => {
    setTimeout(() => {
      setScrollViewScrollListening(true);
    }, 1000);
  });

  useEffect(() => {
    if (!isScrollViewTouched) {
      const scrollViewInterval = setTimeout(() => {
        scrollRef.current?.scrollTo({
          x: scrollViewOffset + firstCardOffset,
          animated: true,
        });
      }, 10000);

      return () => clearInterval(scrollViewInterval);
    }
  }, [isScrollViewTouched, scrollViewOffset]);

  const handleScrollViewPagination = (event: any) => {
    if (scrollViewScrollListening) {
      const scrollPositionIndex: number =
        event.nativeEvent.contentOffset.x / firstCardOffset;

      let cardIndex: number = 0;
      if (scrollPositionIndex >= 1) {
        cardIndex = Math.round(scrollPositionIndex - 0.49);
      } else {
        cardIndex = Math.round(scrollPositionIndex + 0.49);
      }

      if (cardIndex === 0) {
        scrollRef.current?.scrollTo({
          x: firstCardOffset * (newsLoopCards.length - 2),
          animated: false,
        });
      } else if (cardIndex === newsLoopCards.length - 1) {
        scrollRef.current?.scrollTo({
          x: firstCardOffset,
          animated: false,
        });
      }
    }
  };

  const handleScrollViewScrollEnd = (event: any) => {
    setIsScrollViewTouched(false);

    const newOffset =
      Math.round(event.nativeEvent.contentOffset.x / firstCardOffset) *
      firstCardOffset;

    if (
      newOffset >= firstCardOffset &&
      newOffset <= (newsLoopCards.length - 2) * firstCardOffset
    ) {
      setScrollViewOffset(newOffset);
    } else if (newOffset > (newsLoopCards.length - 2) * firstCardOffset) {
      setScrollViewOffset(firstCardOffset);
    } else if (newOffset < firstCardOffset) {
      setScrollViewOffset(firstCardOffset * (newsLoopCards.length - 2));
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.globalBackgroundView}>
        <SafeAreaView style={styles.globalSafeAreaViewContainer}>
          <View style={styles.globalViewContainer}>
            <ImageBackground
              source={require("../../assets/guides/search-bg.jpg")}
              defaultSource={require("../../assets/guides/search-bg.jpg")}
              style={styles.searchContainer}
              imageStyle={styles.searchBackgroundImage}
            >
              <View style={styles.searchBackgroundImageOpacity}>
                <TextInput
                  style={styles.searchInput}
                  placeholder={searchInputPlaceholder}
                  placeholderTextColor="grey"
                  onFocus={() => setSearchInputPlaceholder("")}
                  onBlur={() =>
                    setSearchInputPlaceholder(initialSearchInputPlaceholder)
                  }
                  onChangeText={(e: string) => setSearchInput(e)}
                  value={searchInput}
                />
              </View>
            </ImageBackground>

            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              scrollEnabled={scrollViewScrollListening}
              showsHorizontalScrollIndicator={false}
              disableIntervalMomentum={true}
              decelerationRate="fast"
              contentContainerStyle={[
                styles.newsCardContainer,
                { width: `${100 * newsLoopCards.length}%` },
              ]}
              style={styles.newsContainer}
              contentOffset={{ x: firstCardOffset, y: 0 }}
              ref={scrollRef}
              onScroll={(event) => handleScrollViewPagination(event)}
              onScrollBeginDrag={() => setIsScrollViewTouched(true)}
              onMomentumScrollEnd={(event) => handleScrollViewScrollEnd(event)}
              scrollEventThrottle={5}
            >
              {newsLoopCards}
            </ScrollView>

            <View style={styles.newsBulletPointsContainer}>
              {newsBulletPoints}
            </View>

            <View style={styles.guidesContainer}>
              <Text style={styles.guidesTitle}>Découvrez nos guides conso</Text>
              <View style={styles.guidesCardsContainer}>
                <TouchableWithoutFeedback>
                  <ImageBackground
                    style={styles.guidesCard}
                    imageStyle={styles.guidesCardImageBackground}
                    source={require("../../assets/guides/guides-generalities.jpg")}
                    defaultSource={require("../../assets/guides/guides-generalities.jpg")}
                  >
                    <View style={styles.guidesCardTitleContainer}>
                      <Text style={styles.guidesCardTitle}>
                        Guides{"\n"}généraux
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                  <ImageBackground
                    style={styles.guidesCard}
                    imageStyle={styles.guidesCardImageBackground}
                    source={require("../../assets/guides/guides-products.jpg")}
                    defaultSource={require("../../assets/guides/guides-products.jpg")}
                  >
                    <View style={styles.guidesCardTitleContainer}>
                      <Text style={styles.guidesCardTitle}>
                        Fiches{"\n"}produits
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                  <ImageBackground
                    style={styles.guidesCard}
                    imageStyle={styles.guidesCardImageBackground}
                    source={require("../../assets/guides/guides-labels.jpg")}
                    defaultSource={require("../../assets/guides/guides-labels.jpg")}
                  >
                    <View style={styles.guidesCardTitleContainer}>
                      <Text style={styles.guidesCardTitle}>Labels & Co</Text>
                    </View>
                  </ImageBackground>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                  <ImageBackground
                    style={styles.guidesCard}
                    imageStyle={styles.guidesCardImageBackground}
                    source={require("../../assets/guides/guides-interviews.jpg")}
                    defaultSource={require("../../assets/guides/guides-interviews.jpg")}
                  >
                    <View style={styles.guidesCardTitleContainer}>
                      <Text style={styles.guidesCardTitle}>Entretiens</Text>
                    </View>
                  </ImageBackground>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View style={styles.postingContainer}>
              <Text style={styles.postingTitle}>Dites-nous en plus</Text>
              <TextInput
                style={styles.postingInput}
                placeholder={postingInputPlaceholder}
                placeholderTextColor="grey"
                onFocus={() => setPostingInputPlaceholder("")}
                onBlur={() =>
                  setPostingInputPlaceholder(initialPostingInputPlaceholder)
                }
                onChangeText={(e: string) => setPostingInput(e)}
                value={postingInput}
                multiline={true}
              />
              <TouchableOpacity style={styles.postingBtn}>
                <Text style={styles.postingBtnText}>Publier votre message</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.postsContainer}>
              <Text style={styles.postsTitle}>Qu'en pensez-vous ?</Text>
              <View style={styles.postsCardsContainer}>
                <View style={styles.postsCard}>
                  <View style={styles.postsCardHeader}>
                    <View style={styles.postsCardAvatarContainer}>
                      <Image
                        style={styles.postsCardAvatar}
                        source={require("../../assets/avatars/type2.png")}
                      />
                    </View>
                    <View style={styles.postsCardInfos}>
                      <Text style={styles.postsCardUsername}>Mickaël B.</Text>
                      <Text style={styles.postsCardDate}>Il y a 5 heures</Text>
                    </View>
                  </View>
                  <View style={styles.postsCardMessageContainer}>
                    <Text style={styles.postsCardMessage}>
                      Vous êtes au top, l'équipe ! J'adore l'appli, c'est de la
                      bombe ! Enfin des infos claires et transparentes ! 😄
                    </Text>
                  </View>
                  <View style={styles.postsCardFooter}>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="heart"
                            style={styles.postsCardReactionIconHeart}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>24</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="arrow-up-bold"
                            style={styles.postsCardReactionIconUp}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>126</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="arrow-down-bold"
                            style={styles.postsCardReactionIconDown}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>0</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="alert"
                            style={styles.postsCardReactionIconAlert}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>0</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>

                <View style={styles.postsCard}>
                  <View style={styles.postsCardHeader}>
                    <View style={styles.postsCardAvatarContainer}>
                      <Image
                        style={styles.postsCardAvatar}
                        source={require("../../assets/avatars/type1.png")}
                      />
                    </View>
                    <View style={styles.postsCardInfos}>
                      <Text style={styles.postsCardUsername}>Aboubacar D.</Text>
                      <Text style={styles.postsCardDate}>
                        Il y a 14 minutes
                      </Text>
                    </View>
                  </View>
                  <View style={styles.postsCardMessageContainer}>
                    <Text style={styles.postsCardMessage}>
                      Pas mal, en TypeScript, mais ça serait encore mieux si
                      vous passiez en "strict: true" en retirant tous ces
                      "any"...{" "}
                    </Text>
                  </View>
                  <View style={styles.postsCardFooter}>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="heart"
                            style={styles.postsCardReactionIconHeart}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>6</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="arrow-up-bold"
                            style={styles.postsCardReactionIconUp}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>68</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="arrow-down-bold"
                            style={styles.postsCardReactionIconDown}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>1472</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="alert"
                            style={styles.postsCardReactionIconAlert}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>13</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>

                <View style={styles.postsCard}>
                  <View style={styles.postsCardHeader}>
                    <View style={styles.postsCardAvatarContainer}>
                      <Image
                        style={styles.postsCardAvatar}
                        source={require("../../assets/avatars/type3.png")}
                      />
                    </View>
                    <View style={styles.postsCardInfos}>
                      <Text style={styles.postsCardUsername}>Julien O.</Text>
                      <Text style={styles.postsCardDate}>Il y a 2 heures</Text>
                    </View>
                  </View>
                  <View style={styles.postsCardMessageContainer}>
                    <Text style={styles.postsCardMessage}>
                      Gg les payots ! Vous pouvez rajouter un guide sur la
                      bière? C'est pour un ami 🍻
                    </Text>
                  </View>
                  <View style={styles.postsCardFooter}>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="heart"
                            style={styles.postsCardReactionIconHeart}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>37</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="arrow-up-bold"
                            style={styles.postsCardReactionIconUp}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>59</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="arrow-down-bold"
                            style={styles.postsCardReactionIconDown}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>12</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                      <View style={styles.postsCardReaction}>
                        <View style={styles.postsCardReactionIconContainer}>
                          <MaterialCommunityIcon
                            name="alert"
                            style={styles.postsCardReactionIconAlert}
                          />
                        </View>
                        <Text style={styles.postsCardReactionCount}>2</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.postsLoadingBtn}>
                <Text style={styles.postsLoadingBtnText}>
                  Charger plus de messages
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  );
}

const makeStyles = (height: number, width: number, fontScale: number) => {
  const adaptToHeight = (size: number) => {
    return (height * size) / 844;
  };

  const adaptToWidth = (size: number) => {
    return (width * size) / 390;
  };

  const normalizeText = (size: number) => {
    return (width * size) / 390 / fontScale;
  };

  return StyleSheet.create({
    globalBackgroundView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100%",
      minWidth: "100%",
    },
    globalSafeAreaViewContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    },
    globalViewContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100%",
      width: "100%",
      paddingHorizontal: adaptToWidth(19.5),
      paddingVertical: adaptToWidth(20),
    },

    searchContainer: {
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: adaptToWidth(20),
      height: adaptToWidth(180),
      width: "100%",
      borderRadius: adaptToWidth(10),
    },
    searchBackgroundImage: {
      height: "100%",
      width: "100%",
      resizeMode: "cover",
      borderRadius: adaptToWidth(10),
      position: "absolute",
    },
    searchBackgroundImageOpacity: {
      height: "100%",
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "rgba(50, 50, 50, 0.3)",
      borderRadius: adaptToWidth(10),
    },
    searchInput: {
      fontSize: normalizeText(15),
      width: "90%",
      textAlign: "left",
      padding: adaptToWidth(14),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
      borderRadius: adaptToWidth(8),
      marginBottom: adaptToWidth(22),
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },

    newsContainer: {
      marginBottom: adaptToWidth(20),
      height: adaptToWidth(240),
      width: "100%",
      borderRadius: adaptToWidth(10),
      backgroundColor: "white",
    },
    newsCardContainer: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    newsCard: {
      width: "100%",
      height: "100%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    newsPremium: {
      backgroundColor: "#002654",
      paddingVertical: adaptToWidth(30),
      paddingHorizontal: adaptToWidth(20),
    },
    newsPremiumTitle: {
      fontWeight: "600",
      fontSize: normalizeText(20),
      color: "#F1A100",
      marginBottom: adaptToWidth(4),
    },
    newsPremiumTeaser: {
      fontSize: normalizeText(15),
      color: "white",
      textAlign: "center",
      lineHeight: normalizeText(20),
    },
    newsPremiumPricing: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginBottom: adaptToWidth(6),
    },
    newsPremiumPricingAmount: {
      fontSize: normalizeText(18),
      fontWeight: "500",
      color: "white",
    },
    newsPremiumPricingFrequency: {
      fontSize: normalizeText(20),
      fontWeight: "500",
      color: "#F1A100",
    },
    newsPremiumBtn: {
      height: adaptToWidth(40),
      width: adaptToWidth(220),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F1A100",
      borderRadius: adaptToWidth(8),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
    },
    newsPremiumBtnText: {
      color: "black",
      fontWeight: "500",
      fontSize: normalizeText(15),
    },
    newsFirst: {
      resizeMode: "cover",
    },
    newsFirstOpacity: {
      backgroundColor: "rgba(50, 50, 40, 0.4)",
      paddingVertical: adaptToWidth(30),
      paddingHorizontal: adaptToWidth(20),
    },
    newsFirstTitle: {
      fontWeight: "600",
      fontSize: normalizeText(20),
      color: "#F1A100",
    },
    newsFirstTeaser: {
      fontSize: normalizeText(15),
      color: "white",
      textAlign: "center",
      lineHeight: normalizeText(20),
      marginBottom: adaptToWidth(4),
    },
    newsFirstBtn: {
      height: adaptToWidth(40),
      width: adaptToWidth(220),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: adaptToWidth(8),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
    },
    newsFirstBtnText: {
      color: "black",
      fontWeight: "500",
      fontSize: normalizeText(15),
    },
    newsSecond: {
      resizeMode: "cover",
    },
    newsSecondOpacity: {
      backgroundColor: "rgba(50, 50, 60, 0.7)",
      paddingVertical: adaptToWidth(30),
      paddingHorizontal: adaptToWidth(20),
    },
    newsSecondTitle: {
      fontWeight: "600",
      fontSize: normalizeText(20),
      color: "#F1A100",
    },
    newsSecondTeaser: {
      fontSize: normalizeText(15),
      color: "white",
      textAlign: "center",
      lineHeight: normalizeText(20),
      marginBottom: adaptToWidth(4),
    },
    newsSecondBtn: {
      height: adaptToWidth(40),
      width: adaptToWidth(220),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.74)",
      borderRadius: adaptToWidth(8),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
    },
    newsSecondBtnText: {
      color: "black",
      fontWeight: "500",
      fontSize: normalizeText(15),
    },
    newsThird: {
      resizeMode: "cover",
    },
    newsThirdOpacity: {
      backgroundColor: "rgba(50, 50, 60, 0.7)",
      paddingVertical: adaptToWidth(30),
      paddingHorizontal: adaptToWidth(20),
    },
    newsThirdTitle: {
      fontWeight: "600",
      fontSize: normalizeText(20),
      color: "#F1A100",
    },
    newsThirdTeaser: {
      fontSize: normalizeText(15),
      color: "white",
      textAlign: "center",
      lineHeight: normalizeText(20),
    },
    newsThirdBtn: {
      height: adaptToWidth(40),
      width: adaptToWidth(220),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: adaptToWidth(8),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
    },
    newsThirdBtnText: {
      color: "black",
      fontWeight: "500",
      fontSize: normalizeText(15),
    },
    newsLoopCard: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    newsBulletPointsContainer: {
      marginBottom: adaptToWidth(20),
      height: adaptToWidth(10),
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    newsBulletPointBtn: {
      width: adaptToWidth(25),
      height: adaptToWidth(32),
      justifyContent: "center",
      alignItems: "center",
    },
    newsBulletPoint: {
      borderRadius: adaptToWidth(50),
    },

    guidesContainer: {
      backgroundColor: "rgba(175, 175, 175, 0.2)",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      borderRadius: adaptToWidth(10),
      paddingHorizontal: adaptToWidth(10),
      paddingTop: adaptToWidth(30),
      paddingBottom: adaptToWidth(10),
      marginBottom: adaptToWidth(20),
      borderColor: "grey",
      borderWidth: adaptToWidth(0.5),
    },
    guidesTitle: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: normalizeText(20),
      width: "100%",
      marginBottom: adaptToWidth(20),
    },
    guidesCardsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      height: adaptToWidth(414),
      width: "100%",
      borderRadius: adaptToWidth(10),
    },
    guidesCard: {
      justifyContent: "center",
      alignItems: "center",
      height: "45%",
      width: "45%",
      margin: adaptToWidth(8),
      borderRadius: adaptToWidth(8),
    },
    guidesCardImageBackground: {
      resizeMode: "cover",
      height: "100%",
      width: "100%",
      borderRadius: adaptToWidth(8),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
    },
    guidesCardTitleContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: adaptToWidth(80),
      width: adaptToWidth(110),
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderWidth: adaptToWidth(0.5),
      borderColor: "black",
    },
    guidesCardTitle: {
      textAlign: "center",
      fontSize: normalizeText(15),
      fontWeight: "600",
    },

    postingContainer: {
      backgroundColor: "rgba(175, 175, 175, 0.2)",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: adaptToWidth(30),
      paddingHorizontal: adaptToWidth(20),
      paddingBottom: adaptToWidth(20),
      width: "100%",
      borderRadius: adaptToWidth(10),
      marginBottom: adaptToWidth(20),
      borderColor: "grey",
      borderWidth: adaptToWidth(0.5),
    },
    postingTitle: {
      fontWeight: "600",
      fontSize: normalizeText(20),
      marginBottom: adaptToWidth(20),
      color: "black",
    },
    postingInput: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      height: adaptToWidth(160),
      width: "100%",
      marginVertical: adaptToWidth(8),
      borderColor: "grey",
      borderWidth: adaptToWidth(0.5),
      borderRadius: adaptToWidth(8),
      paddingHorizontal: "5%",
      paddingTop: adaptToWidth(14),
      paddingBottom: adaptToWidth(14),
      fontSize: normalizeText(15),
    },
    postingBtn: {
      marginTop: adaptToWidth(14),
      height: adaptToWidth(40),
      width: adaptToWidth(220),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F1A100",
      borderRadius: adaptToWidth(8),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
      marginBottom: adaptToWidth(8),
    },
    postingBtnText: {
      color: "black",
      fontWeight: "500",
      fontSize: normalizeText(15),
    },

    postsContainer: {
      backgroundColor: "rgba(175, 175, 175, 0.2)",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: adaptToWidth(30),
      paddingHorizontal: adaptToWidth(20),
      paddingBottom: adaptToWidth(20),

      width: "100%",
      borderRadius: adaptToWidth(10),
      borderColor: "grey",
      borderWidth: adaptToWidth(0.5),
    },
    postsTitle: {
      fontWeight: "600",
      fontSize: normalizeText(20),
      marginBottom: adaptToWidth(20),
    },
    postsCardsContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      width: "100%",
      marginTop: adaptToWidth(8),
      borderRadius: adaptToWidth(8),
      borderWidth: adaptToWidth(0.5),
      borderColor: "grey",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    postsCard: {
      width: "90%",
      borderBottomColor: "grey",
      borderBottomWidth: adaptToWidth(0.5),
      paddingTop: adaptToWidth(10),
      paddingBottom: adaptToWidth(4),
    },
    postsCardHeader: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      height: adaptToWidth(50),
      width: "100%",
    },
    postsCardAvatarContainer: {
      height: adaptToWidth(36),
      width: adaptToWidth(36),
      borderColor: "#AFAFAF",
      borderWidth: adaptToWidth(0.5),
      borderRadius: adaptToWidth(50),
      justifyContent: "center",
      alignItems: "center",
      marginRight: adaptToWidth(10),
      backgroundColor: "#F1F1F1",
    },
    postsCardAvatar: {
      height: "150%",
      width: "150%",
      resizeMode: "contain",
    },
    postsCardInfos: {
      height: "100%",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    postsCardUsername: {
      fontSize: normalizeText(15),
      fontWeight: "600",
      color: "black",
    },
    postsCardDate: {
      fontSize: normalizeText(12),
      color: "grey",
      fontWeight: "500",
    },
    postsCardMessageContainer: {
      width: "100%",
    },
    postsCardMessage: {
      fontSize: normalizeText(15),
    },
    postsCardFooter: {
      width: "100%",
      height: adaptToWidth(48),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    postsCardReaction: {
      height: "100%",
      width: "25%",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    postsCardReactionIconContainer: {
      height: adaptToWidth(24),
      width: adaptToWidth(24),
      borderRadius: adaptToWidth(50),
      borderWidth: adaptToWidth(0.5),
      borderColor: "grey",
      justifyContent: "center",
      alignItems: "center",
      marginRight: adaptToWidth(5),
    },
    postsCardReactionIconHeart: {
      marginTop: adaptToWidth(1),
      color: "rgba(241, 161, 0, 1)",
      fontSize: adaptToWidth(12), // Laisser adaptToWidth(), insensible au fontScale
    },
    postsCardReactionIconUp: {
      marginBottom: adaptToWidth(1),
      color: "rgba(0, 220, 0, 1)",
      fontSize: adaptToWidth(16), // Laisser adaptToWidth(), insensible au fontScale
    },
    postsCardReactionIconDown: {
      marginTop: adaptToWidth(1),
      color: "rgba(240, 20, 20, 1)",
      fontSize: adaptToWidth(16), // Laisser adaptToWidth(), insensible au fontScale
    },
    postsCardReactionIconAlert: {
      marginBottom: adaptToWidth(1),
      color: "rgba(0, 0, 0, 1)",
      fontSize: adaptToWidth(12), // Laisser adaptToWidth(), insensible au fontScale
    },
    postsCardReactionCount: {
      fontSize: normalizeText(13),
      fontWeight: "500",
    },
    postsLoadingBtn: {
      height: adaptToWidth(40),
      width: adaptToWidth(220),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F1A100",
      borderRadius: adaptToWidth(8),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
      marginTop: adaptToWidth(24),
      marginBottom: adaptToWidth(10),
    },
    postsLoadingBtnText: {
      color: "black",
      fontWeight: "500",
      fontSize: normalizeText(15),
    },
  });
};
