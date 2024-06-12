type emailandpassword = {
    emailAddress: string;
    password: string;
}

type signUp = emailandpassword & {
    repassword: string;
    fullName: string
}

type Images = {
    id: number
    url: string
    profileId?: number
}

type Address = {
    id: number
    city: string
    town: string
    country: string
    fullAddress: string
    postCode: number
    userId: number
    personId: number
    name: string
}

type Profile = {
    id: number
    photoUrl: string
    phone: string
    fax: string
    sex: string
    birthDay: string
    images: Array<Images>
}

type WelcomeQuestions = {
    id: number
    question: string
    type: number
    pageName: string
    userId: number
}

type user = emailandpassword & {
    id: number
    fullName: string
    signToken: string
    emailStatus: string
    isSuperAdmin: boolean
    isDisable: boolean
    name: string
    lastname: string
    isLogin: boolean
    lang: string
    try: boolean
    city: string
    country: string
    filterId: number
    bumbiScore: number
    experiance: number
    levelsId: number
    profile: Profile
    address: Array<Address>
    welcomeQuestions: Array<WelcomeQuestions>
    profileComplate: boolean
    ProfileComplateIndex: number
    levels: Level
    filter: Filter
}

type Filter = {
    country: string
}

type createAccount = {
    email: string
    password: string
    name: string
    lastname: string
    phone: string
    photoUrl: string
    city: string
    country: string
    repassword: string
}

type Level = {
    defination: string
    experiance: number
    id: number
    name: string
}

type ChatType = {
    id: number
    userId: number
    favoriUserId: number
    favoriUser: user
    user: user
    message: Array<Message>
}

type Message = {
    id: number
    sendId: number
    reciverId: number
    messageText: string
    matchId: number
    createDate: string
    createTime: string
    questionId : number
    question : {
        question : string
        category : string
        answer : string
        levelId : number
    }
}

export { emailandpassword, user, signUp, Images, Profile, createAccount, Level, ChatType, Message }