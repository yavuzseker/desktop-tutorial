import * as React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import style from "src/css"
import Swiper from 'react-native-deck-swiper';

import { AntDesign } from "@expo/vector-icons"
import { useSwipper } from 'src/hst/hooks';
import { Props } from 'src/router';
import { useSelector , useDispatch } from 'react-redux';
import { RootState, removeBumbiScore } from 'src/store';

import { ProfileViewModal, BumbiScoreModal } from 'src/components';

export default function Index({ navigation, route }: Props) {

    const dispatch = useDispatch()

    const [refreshing, setRefreshing] = React.useState(false)
    const [swipeComplate, setSwipeComplate] = React.useState(false)
    const [matchModal, setMatchModal] = React.useState(false)
    const [matchData, setMatchData] = React.useState(null)
    const swipe = React.useRef(null)

    const [cardIndex, setCardIndex] = React.useState(0)

    const [profileModal, setProfileModal] = React.useState(false)
    const [scoreView, setScoreView] = React.useState(false)
    const [viewProfileData, setViewProfileData] = React.useState(null)

    const swipper = useSwipper({ navigation, route })
    const user = useSelector((e: RootState) => e.user.user)
    const data = useSelector((e: RootState) => e.swipper.swipperList)

    React.useEffect(() => {
        swipper.findUser({
            userId: user.id,
            skep: 1
        });
    }, [])

    const goToMessage = () => {
        setMatchModal(false)
        setMatchData(null)
        navigation.navigate("MessageScreens")
    }

    const viewProfile = (card: any) => {
        setViewProfileData(card)
        setProfileModal(true)
    }

    const onSwipe = (index: number) => {
        if (user.bumbiScore <= 0) {
            setCardIndex(0)
            setScoreView(true)
            //@ts-ignore
            swipe.current.swipeBack()
            return
        }

        dispatch(removeBumbiScore())

        swipper.swipe({
            userId: user.id,
            favoriUserId: data[index].id
        }).then(res => {
            //@ts-ignore
            if (res.tableName == "Match") {
                setMatchModal(true)
                //@ts-ignore
                setMatchData(res)
            }
        }).catch(err => {

        })
    }

    const onRefresh = () => {
        swipper.findUser({
            userId: user.id,
            skep: 1
        });
        setSwipeComplate(false)
    };

    return (
        <View style={styles.container}>
            {
                !swipeComplate && data.length > 0 ?
                    <Swiper
                        cards={data}
                        ref={swipe}
                        keyExtractor={e => e.id.toString()}
                        disableTopSwipe={true}
                        renderCard={(card, index) => {
                            return (
                                <View style={styles.card} key={index}>
                                    <Image source={{ uri: card.profile.photoUrl }} style={{ width: "100%", height: "100%" }} resizeMode='cover' />
                                    <View style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: 12, backgroundColor: style.Color.background_dark + "80" }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <View>
                                                <Text style={{ fontWeight: "600", fontSize: 16, color: style.Color.white }}>{card.fullName}</Text>
                                                <Text style={{ fontWeight: "500", fontSize: 14, color: style.Color.white }}>{card.filter.country}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                <Text style={{ color: "#b2bec3", marginRight: 12, fontWeight: '600' }}>English Level</Text>
                                                {
                                                    card.levelsId == 1 ?
                                                        <View style={{ flexDirection: "row", gap: 12 }}>
                                                            <AntDesign name="star" size={24} color={style.Color.grey_6} />
                                                            <AntDesign name="star" size={24} color={style.Color.grey_6} />
                                                            <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                                        </View>
                                                        : card.levelsId == 6 ?
                                                            <View style={{ flexDirection: "row", gap: 12 }}>
                                                                <AntDesign name="star" size={24} color={style.Color.grey_6} />
                                                                <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                                                <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                                            </View>
                                                            :
                                                            <View style={{ flexDirection: "row", gap: 12 }}>
                                                                <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                                                <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                                                <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                                            </View>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ position: "absolute", top: 10, right: 10, padding: 6, borderRadius: 6, backgroundColor: style.Color.white }}>
                                        <TouchableOpacity onPress={() => viewProfile(card)}>
                                            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                                                <Image source={{ uri: card.profile.photoUrl }} style={{ width: 42, height: 42, borderRadius: 42 }} resizeMode='cover' />
                                                <View>
                                                    <Text style={{ fontWeight: "500", fontSize: 14, color: style.Color.grey }}>{card.fullName}</Text>
                                                    <Text style={{ fontWeight: "500", fontSize: 12, color: style.Color.grey }}>View Profile</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                        onSwipedRight={(cardIndex) => onSwipe(cardIndex)}
                        overlayLabels={{
                            left: {
                                title: "NOPE",
                                style: {
                                    label: {
                                        backgroundColor: "red",
                                        color: "#FFF",
                                        fontSize: 24
                                    },
                                    wrapper: {
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        justifyContent: "flex-start",
                                        marginTop: 80,
                                        marginLeft: -20
                                    }
                                }
                            },
                            right: {
                                title: "LIKE",
                                style: {
                                    label: {
                                        backgroundColor: "green",
                                        color: "#FFF",
                                        fontSize: 24
                                    },
                                    wrapper: {
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        justifyContent: "flex-start",
                                        marginTop: 80,
                                        marginLeft: 20
                                    }
                                }
                            }
                        }}
                        disableBottomSwipe

                        onSwipedAll={() => { setSwipeComplate(true) }}
                        cardIndex={cardIndex}
                        cardVerticalMargin={0}
                        cardHorizontalMargin={0}
                        backgroundColor="transparent"
                        stackSize={3} />
                    :
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 24 }}>
                        <Text style={{ fontWeight: "600", color: style.Color.grey, fontSize: 16 }}>There is no one else left in the area.</Text>
                        <TouchableOpacity style={{ padding: 12, width: "60%", backgroundColor: style.Color.background_yellow, borderRadius: 50 }} onPress={onRefresh}>
                            <Text style={{ textAlign: "center" }}>Please tap to refresh</Text>
                        </TouchableOpacity>
                    </View>
            }

            <ProfileViewModal visible={profileModal} onRequestClose={setProfileModal} data={viewProfileData} />

            <Modal
                animationType="slide"
                visible={matchModal}
                presentationStyle={"formSheet"}
                onRequestClose={() => {
                    setMatchModal(!matchModal);
                }}>
                {
                    matchData && <View style={{ padding: 24, flex: 1, backgroundColor: style.Color.background_yellow }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontWeight: "600", fontSize: 20 }}>Tiningo</Text>
                            <TouchableOpacity onPress={() => setMatchModal(false)}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12, }}>
                            <View style={{ flexDirection: "row", gap: -50 }}>
                                <Image source={{ uri: matchData.user.profile.photoUrl }} style={{ width: 120, height: 120, borderRadius: 120, borderColor: style.Color.white, borderWidth: 2 }} />
                                <Image source={{ uri: matchData.favoriUser.profile.photoUrl }} style={{ width: 120, height: 120, borderRadius: 120, borderColor: style.Color.white, borderWidth: 2 }} />
                            </View>
                            <View style={{ alignItems: "center", gap: 12 }}>
                                <Text style={{ fontWeight: "600", fontSize: 20 }}>{matchData.user.name} & {matchData.favoriUser.name}</Text>
                                <Text style={{ fontWeight: "500", fontSize: 14 }}>You are matched. start an unforgettable conversation between the two of you.</Text>
                                <TouchableOpacity style={{ backgroundColor: style.Color.white, padding: 12, paddingHorizontal: 50, borderRadius: 60 }} onPress={goToMessage}>
                                    <Text>Start Chat</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            </Modal>

            <BumbiScoreModal visible={scoreView} onRequestClose={setScoreView} data={null} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 500,
        flex: 1,
        backgroundColor: "transparent"
    },
    card: {
        width: "100%",
        height: 500,
        flex: .8,
        padding: 0,
        position: "relative"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
});