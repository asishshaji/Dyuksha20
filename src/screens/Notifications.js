import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";

class Notifications extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ padding: 10, }}>
                    <Text style={{ fontFamily: 'Black', fontSize: 30, color: 'white' }}>Notifications</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{ margin: 10, backgroundColor: '#363333', borderRadius: 10, elevation: 3, minHeight: 100, padding: 12 }}>
                            <Text style={{ color: 'white', fontFamily: 'Black', fontSize: 26 }}>Report at D2</Text>
                            <Text style={{ color: 'white', fontFamily: 'Light', fontSize: 16 }}>Irure veniam
                            eiusmod nisi deserunt.Sint ad nulla eu occaecat amet velit.
                            Sunt cupidatat velit id fugiat dolore mollit exercitation reprehenderit aliquip.
                            Dolore enim dolor et duis quis deserunt et velit. Sit sint sunt veniam
                             do elit ullamco reprehenderit enim laborum. Et
                             voluptate minim culpa sunt esse quis eiusmod laboris veniam. Aute culpa consequat
                             duis proident officia do in elit pariatur excepteur consectetur non.
                             Anim dolor reprehenderit cillum ad elit nostrud.</Text>
                        </View>
                        <View style={{ margin: 10, backgroundColor: '#363333', borderRadius: 10, elevation: 3, minHeight: 100, padding: 12 }}>
                            <Text style={{ color: 'white', fontFamily: 'Black', fontSize: 26 }}>Report at D2</Text>
                            <Text style={{ color: 'white', fontFamily: 'Light', fontSize: 16 }}>Irure veniam
                            eiusmod nisi deserunt.Sint ad nulla eu occaecat amet velit.
                            Sunt cupidatat velit id fugiat dolore mollit exercitation reprehenderit aliquip.
                            </Text>
                        </View>
                        <View style={{ margin: 10, backgroundColor: '#363333', borderRadius: 10, elevation: 3, minHeight: 100, padding: 12 }}>
                            <Text style={{ color: 'white', fontFamily: 'Black', fontSize: 26 }}>Report at D2</Text>
                            <Text style={{ color: 'white', fontFamily: 'Light', fontSize: 16 }}>Irure veniam
                           </Text>
                        </View>
                        <View style={{ margin: 10, backgroundColor: '#363333', borderRadius: 10, elevation: 3, minHeight: 100, padding: 12 }}>
                            <Text style={{ color: 'white', fontFamily: 'Black', fontSize: 26 }}>Report at D2</Text>
                            <Text style={{ color: 'white', fontFamily: 'Light', fontSize: 16 }}>Irure veniam
                            eiusmod nisi deserunt.Sint ad nulla eu occaecat amet velit.
                            Sunt cupidatat velit id fugiat dolore mollit exercitation reprehenderit aliquip.
                           </Text>
                        </View>
                        <View style={{ margin: 10, backgroundColor: '#363333', borderRadius: 10, elevation: 3, minHeight: 100, padding: 12 }}>
                            <Text style={{ color: 'white', fontFamily: 'Black', fontSize: 26 }}>Report at D2</Text>
                            <Text style={{ color: 'white', fontFamily: 'Light', fontSize: 16 }}>Irure veniam
                            eiusmod nisi deserunt.Sint ad nulla eu occaecat amet velit.
                            Sunt cupidatat velit id fugiat dolore mollit exercitation reprehenderit aliquip.
                           </Text>
                        </View>
                        <View style={{ margin: 10, backgroundColor: '#363333', borderRadius: 10, elevation: 3, minHeight: 100, padding: 12 }}>
                            <Text style={{ color: 'white', fontFamily: 'Black', fontSize: 26 }}>Report at D2</Text>
                            <Text style={{ color: 'white', fontFamily: 'Light', fontSize: 16 }}>Irure veniam
                            eiusmod nisi deserunt.Sint ad nulla eu occaecat amet velit.
                            Sunt cupidatat velit id fugiat dolore mollit exercitation reprehenderit aliquip.
                            Dolore enim dolor et duis quis deserunt et velit. Sit sint sunt veniam
                             do elit ullamco reprehenderit enim laborum. Et
                             voluptate minim culpa sunt esse quis eiusmod laboris veniam. Aute culpa consequat
                             duis proident officia do in elit pariatur excepteur consectetur non.
                             Anim dolor reprehenderit cillum ad elit nostrud.</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222'

    }
});