import * as React from 'react';
import { View, SafeAreaView, Platform, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import style from "src/css"
import { StatusBar } from 'expo-status-bar';
import { Props } from "src/router"
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import { Stepper, Uploader } from "src/components"
import { useSelector } from 'react-redux';
import { RootState } from "src/store"
import { useWelcome } from "src/hst/hooks"
import { user } from 'src/hst/types';

export default function FirstName({ navigation, route }: Props) {

    const [photos, setPhotos] = React.useState("")
    const [uploadsPhotos, setUploadPhotos] = React.useState(new Array<string>())
    const welcome = useWelcome({ navigation, route });
    const user = useSelector((state: RootState) => state.user.user) as user

    const [image_1, setImage_1] = React.useState("")
    const [image_2, setImage_2] = React.useState("")

    React.useEffect(() => {
        user.profile.images.forEach((element, index) => {
            if (index == 0) {
                setImage_1(element.url)
            } else {
                setImage_2(element.url)
            }
        })
    }, [user])

    React.useEffect(() => {
        welcome.Photo({
            photoUrl: photos,
            userId: user.id
        })
    }, [photos])

    function onChangePhoto(params: string) {
        setUploadPhotos(e => [params, ...e])
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ backgroundColor: style.Color.background_yellow, flex: 1 }}>
                <View style={{ marginTop: Platform.OS == "android" ? 25 : 0, flex: 1 }}>
                    <Stepper page={7} step={2} />

                    {
                        user && <View style={{ padding: 25, gap: 4, flex: 1 }}>
                            <Text style={{ fontSize: 28, fontWeight: "600", color: style.Color.black }}>Add your first 2 photos</Text>
                            <Text style={{ fontSize: 16, fontWeight: "500", color: style.Color.black }}>2 photos are better than 1, it's Tiningo science. You can change these later.</Text>
                            <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
                                <Uploader setPhotos={setPhotos} images={image_1} onChange={onChangePhoto} />
                                <Uploader setPhotos={setPhotos} images={image_2} onChange={onChangePhoto} />
                            </View>
                        </View>
                    }

                    <View
                        style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 25, paddingVertical: 12 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <AntDesign name="eye" size={24} color="black" />
                            <Text style={{ fontSize: 14, fontWeight: "500", color: style.Color.black }}>This will be shown on your profile.</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Age")}
                            disabled={uploadsPhotos.length < 2}>
                            <View style={{
                                padding: 12,
                                backgroundColor: uploadsPhotos.length < 2 ? style.Color.white + "30" : style.Color.white,
                                borderRadius: 50,
                            }}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <StatusBar style='dark' />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}