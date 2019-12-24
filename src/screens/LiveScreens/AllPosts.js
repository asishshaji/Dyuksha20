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
import { BGCOLOR } from "../../Styles/Colors";


const { height, width } = Dimensions.get('window')


let cardList = [
    { "time": "5.00 pm", "title": "DANCE", "url": "https://thumbs.dreamstime.com/z/retro-rays-comic-yellow-background-raster-gradient-halftone-pop-art-style-retro-rays-comic-yellow-background-raster-gradient-87472290.jpg" },
    { "time": "6.00 pm", "title": "other", "url": "https://thumbs.dreamstime.com/b/retro-comic-blue-background-raster-gradient-halftone-pop-art-style-71615289.jpg" },
    { "time": "10.00 am", "title": "Event", "url": "https://image.freepik.com/free-vector/retro-rays-comic-red-gradient-halftone-background-pop-art-style_51543-555.jpg" },
    { "time": "2.00 pm", "title": "Workshop", "url": "https://thumbs.dreamstime.com/z/old-vector-round-gradient-retro-vintage-label-sunrays-background-eps-74094010.jpg" },
    { "time": "5.00 pm", "title": "Workshop", "url": "https://thumbs.dreamstime.com/z/retro-rays-comic-yellow-background-raster-gradient-halftone-pop-art-style-retro-rays-comic-yellow-background-raster-gradient-87472290.jpg" },
    { "time": "1.00 pm", "title": "Special", "url": "https://thumbs.dreamstime.com/b/retro-comic-blue-background-raster-gradient-halftone-pop-art-style-71615289.jpg" },
   


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
            <ScrollView style={{ backgroundColor: BGCOLOR, }} contentContainerStyle={{}} >
                {/* <Text style={{ color: 'white' }}>ALL SHOTS</Text> */}

                <View style={{ height: height, justifyContent: 'center' }}>

                    <ScrollView>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={false}
                            numColumns={2}
                            data={cardList}
                            extraData={cardList}
                            renderItem={({ item, index }) => this.renderList(item, index)}
                        />
                    </ScrollView>

                </View>
            </ScrollView>
        );
    }

    renderList(item, index) {

        return (
            <TouchableWithoutFeedback>
                <View style={{}}>
                    <Card
                        height={110}
                        width={width / 2 - 40}
                        time={item['time']}
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