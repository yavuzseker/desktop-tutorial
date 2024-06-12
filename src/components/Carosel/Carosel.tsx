import React from "react"
import { View, StyleSheet, Dimensions, Animated, FlatList, ImageBackground } from "react-native"
import { Images } from "src/hst/types"

let data = [] as Array<Images>;

// @ts-ignore
export default function Carosel({ images }) {

    data = images;

    const [currentIndex, setCurrentIndex] = React.useState(0);

    // @ts-ignore
    const renderItem = ({ item }) => {
        return (
            <ImageBackground source={{ uri: item.url }} resizeMode="cover" style={[styles.slide, { height: 350 }]} />
        );
    };

    // @ts-ignore
    const handleScroll = (event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(contentOffset / slideSize);
        setCurrentIndex(currentIndex);
    };


    const renderIndicator = () => {
        return (
            <View style={styles.indicatorContainer}>
                {data.map((_, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.indicator,
                            { opacity: currentIndex === index ? 1 : 0.5 },
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => "" + index}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={Dimensions.get('window').width}
                snapToAlignment="start"
                decelerationRate="fast"
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />
            {renderIndicator()}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'white',
        marginHorizontal: 4,
    },
});