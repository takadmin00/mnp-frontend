import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'

import { useSelector } from 'react-redux'
import { AllGuidesState } from '../../reducers/allGuides'
import { useState } from 'react'

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'



export default function CategoryScreen({ navigation, route }) {

    const { height, width, fontScale }: { height: number, width: number, fontScale: number } = useWindowDimensions();
    const styles: any = makeStyles(height, width, fontScale)

    const allGuides = useSelector((state: { allGuides: AllGuidesState }) => state.allGuides.value)

    const [globalImages, setGlobalImages] = useState({
        balsalmicVinegar: require('../../assets/products/balsamic-vinegar.jpg'),
        beef: require('../../assets/products/beef.jpg'),
        biscuits: require('../../assets/products/biscuits.jpg'),
        bread: require('../../assets/products/bread.jpg'),
        butter: require('../../assets/products/butter.jpg'),
        cereals: require('../../assets/products/cereals.jpg'),
        charcuterie: require('../../assets/products/charcuterie.jpg'),
        chicken: require('../../assets/products/chicken.jpg'),
        eggs: require('../../assets/products/eggs.jpg'),
        exoticFruits: require('../../assets/products/exotic-fruits.jpg'),
        fish: require('../../assets/products/fish.jpg'),
        fromages: require('../../assets/products/fromages.jpg'),
        fruitJuices: require('../../assets/products/fruit-juices.jpg'),
        fruits: require('../../assets/products/fruits.jpg'),
        honey: require('../../assets/products/honey.jpg'),
        milk: require('../../assets/products/milk.jpg'),
        mustard: require('../../assets/products/mustard.jpg'),
        oliveOil: require('../../assets/products/olive-oil.jpg'),
        pasta: require('../../assets/products/pasta.jpg'),
        pastries: require('../../assets/products/pastries.jpg'),
        readyMeals: require('../../assets/products/ready-meals.jpg'),
        rice: require('../../assets/products/rice.jpg'),
        salt: require('../../assets/products/salt.jpg'),
        spices: require('../../assets/products/spices.jpg'),
        spirits: require('../../assets/products/spirits.jpg'),
        terrines: require('../../assets/products/terrines.jpg'),
        vegetables: require('../../assets/products/vegetables.jpg'),
        vegetalOils: require('../../assets/products/vegetal-oils.jpg'),
        viennoiseries: require('../../assets/products/viennoiseries.jpg'),
        vinegar: require('../../assets/products/vinegar.jpg'),
        wines: require('../../assets/products/wines.jpg'),
        yogourts: require('../../assets/products/yogourts.jpg'),
    })


    let categoryName: string = 'Nos guides conso'
    let categoryLetter: string = '?'
    let categoryColor: object = { backgroundColor : 'white' }

    switch (route.params.category) {
        case 'generalities':
            categoryName = 'Guides généraux'
            categoryLetter = 'G'
            categoryColor = { backgroundColor: '#004FC9' }
            break
        case 'products':
            categoryName = 'Fiches produits'
            categoryLetter = 'P'
            categoryColor = { backgroundColor: '#00993F' }
            break
        case 'labels':
            categoryName = 'Labels & Co'
            categoryLetter = 'L'
            categoryColor = { backgroundColor: '#B69B02' }
            break
        case 'interviews':
            categoryName = 'Entretiens'
            categoryLetter = 'E'
            categoryColor = { backgroundColor: '#C9007A' }
            break
    }


    const allCategoryGuides: JSX.Element[] = allGuides.filter(e => e.category === route.params.category).map((e, i) => {
        return(
            <TouchableOpacity style={styles.categoryCard} key={i} onPress={() => navigation.navigate('Article', { _id: e._id, ref: i + 1 })}>
                <View style={styles.categoryCardMain}>
                    <Image
                        style={styles.categoryCardImage}
                        source={globalImages[`${e.images.main}`]}
                        // defaultSource={globalImages[`${e.images.main}`]}
                    />
                    <Text style={styles.categoryCardTitle}>{e.title}</Text>
                </View>
                <View style={[styles.categoryCardCategoryContainer, categoryColor]}>
                    <Text style={styles.categoryCardCategory}>{categoryLetter}</Text>
                </View>
            </TouchableOpacity>
        )
    })


    return (
        <View style={styles.globalBackgroundView}>
            <SafeAreaView style={styles.globalSafeAreaViewContainer}>
                <View style={styles.globalViewContainer}>
                    <View style={styles.categoryContainer}>

                        <View style={styles.categoryTitleContainer}>
                            <TouchableOpacity style={styles.categoryBackIconContainer} onPress={() => navigation.goBack()}>
                                <MaterialCommunityIcon name='chevron-left' style={styles.categoryBackIcon}/>
                            </TouchableOpacity >
                            <Text style={styles.categoryTitle}>{categoryName}</Text>
                            <View style={styles.categoryEmptyContainer}></View>
                        </View>

                        <View style={styles.categoryScrollViewWrapper}>
                            <ScrollView
                                style={styles.categoryScrollViewContainer}
                                contentContainerStyle={styles.categoryScrollViewContent}
                            >
                                {allCategoryGuides}
                            </ScrollView>
                        </View>

                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}



const makeStyles = (height: number, width: number, fontScale: number) => {

    const adaptToHeight = (size: number) => {
        return ((height * size) / 844)
    }

    const adaptToWidth = (size: number) => {
        return ((width * size) / 390)
    }

    const normalizeText = (size: number) => {
        return ((width * size) / 390) / fontScale
    }

    return StyleSheet.create({


        globalBackgroundView: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            minWidth: '100%',
            backgroundColor: '#E5E5E5',
        },
        globalSafeAreaViewContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
        },
        globalViewContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '100%',
            width: '100%',
            paddingHorizontal: adaptToHeight(19.5),
            paddingBottom: adaptToHeight(20),
        },


        categoryContainer: {
            height: '100%',
            alignItems: 'center',
        },
        categoryTitleContainer: {
            marginTop: adaptToHeight(6),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: width - adaptToWidth(30),
        },
        categoryBackIconContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: adaptToHeight(50),
            width: adaptToHeight(50),
        },
        categoryBackIcon: {
            fontSize: adaptToHeight(40), // Laisser adaptToHeight(), insensible au fontScale
        },
        categoryTitle: {
            fontWeight: '600',
            fontSize: normalizeText(20),
            textAlign: 'center',
            marginTop: adaptToHeight(24),
            marginBottom: adaptToHeight(24),
            width: width - adaptToWidth(140),
        },
        categoryEmptyContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: adaptToHeight(50),
            width: adaptToHeight(50),
        },
        categoryScrollViewWrapper: {
            borderTopWidth: adaptToHeight(1),
            borderBottomWidth: adaptToHeight(1),
            borderColor: 'grey',
            height: '88%',
            width: width - adaptToHeight(40),
        },
        categoryScrollViewContainer: {
            paddingTop: adaptToHeight(10),
        },
        categoryScrollViewContent: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: adaptToHeight(10),
        },
        categoryCard: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            height: adaptToHeight(80),
            width: width - adaptToHeight(80),
            marginBottom: adaptToHeight(10),
            backgroundColor: '#F2F2F2',
            borderRadius: adaptToHeight(6),
        },
        categoryCardMain: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderTopWidth: adaptToHeight(0.5),
            borderBottomWidth: adaptToHeight(0.5),
            borderLeftWidth: adaptToHeight(0.5),
            borderTopLeftRadius: adaptToHeight(6),
            borderBottomLeftRadius: adaptToHeight(6),
            borderColor: 'grey',
            height: '100%',
            width: width - adaptToHeight(110),
            paddingLeft: adaptToHeight(10),
        },
        categoryCardImage: {
            borderRadius: adaptToHeight(6),
            borderWidth: adaptToHeight(0.5),
            borderColor: 'grey',
            width: adaptToHeight(60),
            height: adaptToHeight(60),
            backgroundColor: '#F2F2F2',
        },
        categoryCardTitle: {
            fontWeight: '600',
            fontSize: normalizeText(15),
            marginLeft: adaptToHeight(10),
            width: adaptToHeight(190),
        },
        categoryCardCategoryContainer: {
            height: '100%',
            width: adaptToHeight(30),
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'grey',
            borderWidth: adaptToHeight(0.5),
            borderBottomRightRadius: adaptToHeight(6),
            borderTopRightRadius: adaptToHeight(6),
        },
        categoryCardCategory: {
            fontWeight: '500',
            fontSize: normalizeText(15),
            color: 'white',
        },


    })
}
