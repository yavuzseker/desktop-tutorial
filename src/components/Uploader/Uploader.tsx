import * as React from "react"
import { TouchableOpacity, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons"

import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

import { service } from "src/hst/Configurations"

type uploader = {
    setPhotos: Function
    onChange?: Function
    images?: string
}

export default function PhotoUpload({ setPhotos, images, onChange }: uploader) {

    const [image, setImage] = React.useState("" + images);

    React.useEffect(() => {
        /*if (images) {
            setImage(image)
        }*/
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            await resizeImage(result.assets[0].uri)
        }
    };

    const resizeImage = async (image: string) => {
        const manipulatedImage = await manipulateAsync(
            image,
            [{ resize: { width: 600 } }],
            { compress: 1, format: SaveFormat.JPEG }
        );

        let formData = new FormData();
        let localUri = manipulatedImage.uri;
        let filename = localUri.split('/').pop() as string;

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        //@ts-ignore
        formData.append('File', { uri: localUri, name: filename, type });
        formData.append('Uid', filename.split('.')[0]);

        service.post("api/File/file", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            setImage(manipulatedImage.uri)
            setPhotos(res.data);
            if (onChange) {
                onChange(res.data)
            }
        })


    };

    return (
        <TouchableOpacity style={{ width: "48%", height: 190, backgroundColor: "#fff", borderRadius: 8, justifyContent: "center", alignItems: "center" }} onPress={pickImage}>
            {
                image ? <Image source={{ uri: image }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 8 }} /> : <Ionicons name="add" color="#222" size={50} />
            }
        </TouchableOpacity>
    );
}