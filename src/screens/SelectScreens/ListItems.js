import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions
} from "react-native";
import CardSelect from '../../components/CardSelect';


const { height, width } = Dimensions.get('window')

let Event0 = [
    { "date": "Feb 14", "title": "DANCE", "url": "https://thumbs.dreamstime.com/z/retro-rays-comic-yellow-background-raster-gradient-halftone-pop-art-style-retro-rays-comic-yellow-background-raster-gradient-87472290.jpg" },
    { "date": "Feb 14", "title": "other", "url": "https://thumbs.dreamstime.com/b/retro-comic-blue-background-raster-gradient-halftone-pop-art-style-71615289.jpg" },
    { "date": "Feb 14", "title": "Event", "url": "https://image.freepik.com/free-vector/retro-rays-comic-red-gradient-halftone-background-pop-art-style_51543-555.jpg" },
    { "date": "Feb 14", "title": "Workshop", "url": "https://thumbs.dreamstime.com/z/old-vector-round-gradient-retro-vintage-label-sunrays-background-eps-74094010.jpg" },
    { "date": "Feb 14", "title": "Workshop", "url": "https://thumbs.dreamstime.com/z/retro-rays-comic-yellow-background-raster-gradient-halftone-pop-art-style-retro-rays-comic-yellow-background-raster-gradient-87472290.jpg" },
    { "date": "1.00 pm", "title": "Special", "url": "https://thumbs.dreamstime.com/b/retro-comic-blue-background-raster-gradient-halftone-pop-art-style-71615289.jpg" },
    { "date": "6.00 pm", "title": "other", "url": "https://thumbs.dreamstime.com/b/retro-comic-blue-background-raster-gradient-halftone-pop-art-style-71615289.jpg" },
]
let Event1 = [
    { "date": "Feb 14", "title": "DANCE", "url": "https://thumbs.dreamstime.com/z/retro-rays-comic-yellow-background-raster-gradient-halftone-pop-art-style-retro-rays-comic-yellow-background-raster-gradient-87472290.jpg" },
    { "date": "Feb 15", "title": "other", "url": "https://thumbs.dreamstime.com/b/retro-comic-blue-background-raster-gradient-halftone-pop-art-style-71615289.jpg" },
    { "date": "Feb 16", "title": "Event", "url": "https://image.freepik.com/free-vector/retro-rays-comic-red-gradient-halftone-background-pop-art-style_51543-555.jpg" },
    { "date": "Feb 14", "title": "Workshop", "url": "https://thumbs.dreamstime.com/z/old-vector-round-gradient-retro-vintage-label-sunrays-background-eps-74094010.jpg" },
]
let Event2 = [
    { "date": "Feb 14", "title": "DANCE", "url": "https://thumbs.dreamstime.com/z/retro-rays-comic-yellow-background-raster-gradient-halftone-pop-art-style-retro-rays-comic-yellow-background-raster-gradient-87472290.jpg" },
    { "date": "Feb 15", "title": "other", "url": "https://thumbs.dreamstime.com/b/retro-comic-blue-background-raster-gradient-halftone-pop-art-style-71615289.jpg" },
]


let workshops = [{ "key": "Workshop1" }, { "key": "Workshop2" }, { "key": "Workshop3" },]

class ListItems extends Component {

    constructor(props) {
        super(props);

        this.state = {
            eventData: this.eventSwitch(),
            workshopData: this.workshopSwitch(),
            selectedTopTapBarIndex: 0,
            selectedEventTapBarIndex: 0,
            selectedWorkshopTapBarIndex: 0,

        };
    }

    eventSwitch = index => {
        switch (index) {
            case 0: this.setState(previousIndex => {
                return {
                    eventData: Event0
                };
            });
                break;
            case 1: this.ONE();
                break;
            case 2: this.TWO();
                break;
            case 3: this.THREE();
                break;
            case 4: this.FOUR();
                break;
            case 5: this.FIVE();
                break;
            default: Alert.alert("error");
        }
    }

    ZERO = () => {
        Alert.alert("Mechanical");
    }

    ONE = () => {
        Alert.alert(JSON.stringify(this.state.eventData));
    }

    TWO = () => this.state.eventData

    THREE = () => {
        Alert.alert("Computer");
    }

    FOUR = () => {
        Alert.alert("Civil");
    }

    FIVE = () => {
        Alert.alert("Instrumentation");
    }

    workshopSwitch = () => { }


    render() {

        let eventIndex = this.props.selectedEventTapBarIndex;
        let workshopIndex = this.props.selectedWorkshopTapBarIndex;

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ marginTop: 50 }}>
                        <Text style={{ color: 'white' }}>{this.props.selectedTopTapBarIndex}</Text>
                        <Text style={{ color: 'white' }}>{eventIndex}</Text>
                        <Text style={{ color: 'white' }}>{workshopIndex}</Text>
                    </View>

                    <View style={{ marginTop: 10 }}>

                        {
                            this.props.selectedTopTapBarIndex === 0 ?
                                <View >
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={this.eventSwitch(eventIndex)}
                                        extraData={this.state.eventData}
                                        renderItem={({ item, index }) => this.renderList(item, index)}
                                    />
                                </View>
                                :
                                <View >
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={this.workshopSwitch(workshopIndex)}
                                        extraData={workshops}
                                        renderItem={({ item, index }) => this.renderList(item, index)}
                                    />
                                </View>
                        }

                    </View>
                </View>
            </ScrollView>
        );
    }

    renderList(item, index) {

        return (
            <TouchableWithoutFeedback>
                <View style={{}}>
                    <CardSelect
                        height={100}
                        width={width / 2 - 40}
                        date={item['date']}
                        title={item['title']}
                        image={item['url']}
                    />

                </View>
            </TouchableWithoutFeedback>
        );
    }

}
export default ListItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
    }
});