import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, { Component } from "react";

import ProShowDetails from '../components/ProShowDetails'
import firebase from 'react-native-firebase'

{/* <BackButton navigation={navigation} /> */ }
const { width, height } = Dimensions.get('window')
class ProShow extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props)
        this.state = {
            activePage: 0,
            numImage: 2,
            ProShow: []
        }
        this.pro = firebase.firestore().collection("ProShow")

    }
    componentDidMount() {
        this.pro.onSnapshot(query => {
            this.setState({
                ProShow: []
            })
            query.forEach((doc) => {
                this.setState({
                    ProShow: this.state.ProShow.concat(doc.data())
                })
            })
        })
        setInterval(() => {
            if (this.state.activePage != this.state.ProShow.length - 1) {
                this.setState({
                    activePage: this.state.activePage + 1
                })
            }
        }, 8000)




    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.ProShow != prevState.ProShow) {
            this.setState({
                numImage: this.state.ProShow.length
            })
        }
    }
    render() {
        const navigation = this.props.navigation
        const barWidth = (width / this.state.numImage)
        const ryan = "https://wallpapercave.com/wp/wp1917448.jpg"
        const gowri = "https://kalakaars-com-prod.s3.amazonaws.com/uploads/business/profile_image/239/51607317_2717651121608905_8456992752754753536_n.jpg"
        var bars = []
        for (var i = 0; i < this.state.numImage; i++) {
            bars.push(<View style={{
                backgroundColor: 'white', width: barWidth, opacity: this.state.activePage === i ? 1 : 0.4, margin: 1,
                borderRadius: 2, height: this.state.activePage === i ? 3 : 2,
            }} />)
        }
        var comp;
        this.state.ProShow.forEach((elem) => {
            if (elem.id == this.state.activePage) {
                comp =
                    <ProShowDetails imageUrl={elem.imageUrl} title={elem.title} details={elem.details} />
            }
        })
        return (
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, position: 'absolute', top: 10, zIndex: 1000000, flexDirection: 'row', left: 0, right: 0, }}>
                    {bars}
                </View>
                {
                    comp
                }
                <View style={{ height: height, position: 'absolute', top: 0, left: 5, bottom: 0, width: (width / 2) - 20, justifyContent: 'center', }}>
                    <TouchableOpacity onPress={() => {
                        if (this.state.activePage != 0)
                            this.setState({ activePage: this.state.activePage - 1 })
                    }} style={{ height: height, width: width / 2 - 20 }} />
                </View>
                <View style={{ height: height, position: 'absolute', top: 0, right: 5, bottom: 0, width: (width / 2) - 20, justifyContent: 'center', alignItems: 'flex-end', }}>
                    <TouchableOpacity onPress={() => {
                        if (this.state.activePage != this.state.numImage - 1)
                            this.setState({ activePage: this.state.activePage + 1 })
                    }} style={{ height: height, width: width / 2 - 20 }} />
                </View>
            </View>
        );
    }
}
export default ProShow;
