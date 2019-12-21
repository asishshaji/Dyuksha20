import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    FlatList,
    TouchableWithoutFeedback
} from "react-native";
import Card from '../../components/Card';


const { height, width } = Dimensions.get('window')


let cardList = [
    { "title": "Events", "url": "https://image.freepik.com/free-vector/retro-rays-comic-red-gradient-halftone-background-pop-art-style_51543-555.jpg" },
    { "title": "Workshops", "url": "https://thumbs.dreamstime.com/z/old-vector-round-gradient-retro-vintage-label-sunrays-background-eps-74094010.jpg" },
    { "title": "Workshops", "url": "https://thumbs.dreamstime.com/z/retro-rays-comic-yellow-background-raster-gradient-halftone-pop-art-style-retro-rays-comic-yellow-background-raster-gradient-87472290.jpg" },
    { "title": "Workshops", "url": "https://thumbs.dreamstime.com/b/retro-comic-blue-background-raster-gradient-halftone-pop-art-style-71615289.jpg" },
    { "title": "Workshops", "url": "http://takshak.in/home-assets/assets/img/prime-events/telei.jpg" },
    { "title": "Workshops", "url": "http://takshak.in/home-assets/assets/img/prime-events/telei.jpg" },
    { "title": "Workshops", "url": "https://thumbs.dreamstime.com/b/retro-comic-blue-background-raster-gradient-halftone-pop-art-style-71615289.jpg" },
    { "title": "Workshops", "url": "http://takshak.in/home-assets/assets/img/prime-events/telei.jpg" },

]

class AllPosts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,

        };
    }

    render() {



        return (
            <ScrollView style={{  backgroundColor:'black' }} contentContainerStyle={{}} >
                {/* <Text style={{ color: 'black' }}>ALL SHOTS</Text> */}

                <View style={{ height: height, justifyContent:'center' }}>

                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            horizontal={false}
                            numColumns={2}
                            data={cardList}
                            extraData={cardList}
                            renderItem={({ item, index }) => this.renderList(item, index)}
                        />
                    </View>

                </View>
            </ScrollView>
        );
    }

    renderList(item, index) {

        const nav = this.props.navigation;
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState(previousIndex => {
                        return {
                            selectedIndex: index
                        };
                    });
                }}>
                <View style={{ }}>
                    <Card
                        nav={nav}
                        height={110}
                        width={width / 2 - 20}
                        title={item['title']}
                        image={item['url']}
                    />

                </View>
            </TouchableWithoutFeedback>
        );
    }

}

export default AllPosts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    }
});