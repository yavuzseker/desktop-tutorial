import * as React from "react"
import { View, Text } from "react-native"
import style from "src/css"
import { Uploader, WarningModal } from "src/components"

import { useSelector } from "react-redux"
import { RootState } from "src/store"
import { useProfile, useLogin } from "src/hst/hooks"
import { TouchableOpacity } from "react-native-gesture-handler"

export default function EditProfile() {

    const [deleteWarning, setDeleteWarning] = React.useState(false)
    const user = useSelector((state: RootState) => state.user.user);
    const profile = useProfile()
    const login = useLogin()

    const setPhotos = function (image: string, id: number) {
        profile.changePhotos({
            id: id,
            profileId: user.profile.id,
            url: image
        })
    }

    const deleteAccount = function () {
        login.deleteAccount(user.id)
    }

    return (
        <View style={{ padding: 24, gap: 12, flex: 1 }}>
            <View style={{ flex: 1, gap: 12 }}>
                <Text style={{ color: style.Color.grey, fontSize: 18 }}>Edit your profile to look its best. It's helpful to choose photos that best describe you.</Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                    {
                        user.profile.images[0] ? <Uploader setPhotos={(e: string) => setPhotos(e, user.profile.images[0].id)}
                            images={user.profile.images[0].url} /> :
                            <Uploader setPhotos={(e: string) => setPhotos(e, user.profile.images[0].id)}
                            />
                    }
                    {
                        user.profile.images[1] ? <Uploader setPhotos={(e: string) => setPhotos(e, user.profile.images[0].id)}
                            images={user.profile.images[1].url} /> :
                            <Uploader setPhotos={(e: string) => setPhotos(e, user.profile.images[1].id)}
                            />
                    }
                </View>
            </View>
            <Text style={{ color: style.Color.grey, fontSize: 18 }}>
                You can delete your account from Tiningo. However, we are very pleased to see you among us. If you still want to delete it, I wish you to come again.
            </Text>
            <TouchableOpacity style={{ backgroundColor: style.Color.red, padding: 12, borderRadius: 6 }} onPress={() => setDeleteWarning(true)}>
                <Text style={{ color: style.Color.white, textAlign: "center" }}>Delete Account</Text>
            </TouchableOpacity>

            <WarningModal message="Hesabını silmek üzeresin" show={deleteWarning} onShow={setDeleteWarning} onConfirm={deleteAccount} />
        </View>
    )

}