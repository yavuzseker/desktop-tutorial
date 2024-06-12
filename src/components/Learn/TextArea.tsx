import * as React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Video } from 'expo-av';
import { Daily } from "src/hst/types";
import style from "src/css"
import { Linking } from 'react-native';

export default function TextArea({ data, visibleLink }: { data: Daily, visibleLink: boolean }) {

    const video = React.useRef(null);
    const [finish, setFinish] = React.useState(false);

    const openLink = (url: string) => {
        Linking.openURL(url)
            .catch((error) => console.error('Link açılamadı:', error));
    };

    const handleVideoPlaybackStatusUpdate = (status: any) => {
        if (status.didJustFinish) {
            setFinish(true)
        }
        if (status.isPlay) {
            setFinish(false)
        }
    };

    return (
        <>
            <Text style={{ fontSize: 24, marginTop: 12, color: "#3498db", marginVertical: 12 }}>{data.name}</Text>
            {
                data.videoSupport ? (
                    <>
                        <Video
                            ref={video}
                            style={{ width: "100%", height: 200 }}
                            source={{
                                uri: data.videoUrl,
                            }}
                            useNativeControls
                            isLooping
                            onPlaybackStatusUpdate={handleVideoPlaybackStatusUpdate}
                        />
                        {
                            finish ?
                            <Text style={{ fontSize: 18, marginTop: 12, color: style.Color.grey, marginVertical: 12 }}>{data.subTitle}</Text> :
                            <Text style={{ fontSize: 18, marginTop: 12, color: style.Color.grey, marginVertical: 12 }}>Please watch the whole video for subtitles.</Text>
                        }
                    </>

                ) : (<></>)
            }
            <Text style={{ fontSize: 18, marginTop: 12 , fontWeight : "400"}}>{data.text.trim()}</Text>

            {
                visibleLink &&
                <View>
                    <Text style={{ fontSize: 24, marginTop: 12, color: style.Color.grey, marginVertical: 12 }}>News Link</Text>
                    <TouchableOpacity onPress={() => { openLink(data.link) }}>
                        <Text>{data.link}</Text>
                    </TouchableOpacity>
                </View>
            }
        </>
    )
}