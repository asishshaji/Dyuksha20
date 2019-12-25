import React, { Component, useState, useEffect } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { BGCOLOR } from '../../Styles/Colors';

// demo purposes only
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i
    }
}

const { height, width } = Dimensions.get('window')


export default class Memories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [
                { url: 'https://source.unsplash.com/1024x768/?nature' },
                { url: 'https://source.unsplash.com/1024x768/?water' },
                { url: 'https://source.unsplash.com/1024x768/?fire' },
                { url: 'https://source.unsplash.com/1024x768/?old' },
                { url: 'https://source.unsplash.com/1024x768/?forest' },
            ],
            swipedAllCards: false,
            swipeDirection: '',
            cardIndex: 0
        }
    }

    renderCard = (card, index, item) => {
        return (
            <View style={styles.card}>
                {/* <Text style={styles.text}>{card} - {index}</Text> */}
                <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: card.url }} resizeMode="cover" />
                <View style={{padding:3, zIndex: 5000, width: 50, elevation: 10 }}>
                    <TouchableOpacity onPress={() => this.swiper.swipeBack()} >
                        <View style={{ elevation: 10, backgroundColor: BGCOLOR, width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name={'ios-arrow-dropright'} color={'white'} size={30} style={{}} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    onSwiped = (type) => {
        console.log(`on swiped ${type}`)
    }

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        })
    };

    swipeLeft = () => {
        this.swiper.swipeLeft()
    };


    render() {
        return (
            <View style={styles.container}>

                <Swiper
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    cardStyle={{
                        height: height / 2,
                        top: 20

                    }}
                    containerStyle={{
                        backgroundColor: BGCOLOR,

                    }}
                    onSwiped={() => this.onSwiped('general')}
                    onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedRight={() => this.onSwiped('right')}
                    onSwipedTop={() => this.onSwiped('top')}
                    onSwipedBottom={() => this.onSwiped('bottom')}
                    onTapCard={this.swipeLeft}
                    cards={this.state.cards}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={150}
                    renderCard={this.renderCard}
                    onSwipedAll={this.onSwipedAllCards}
                    stackSize={4}
                    showSecondCard={true}
                    stackAnimationFriction={7}
                    stackAnimationTension={40}
                    stackSeparation={12}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    swipeBackCard
                    infinite
                >
                </Swiper>




            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    card: {
        flex: 1,
        borderRadius: 7,
        borderWidth: 0,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: BGCOLOR, //'white'
        elevation: 10
    },


})