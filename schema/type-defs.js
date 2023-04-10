const { gql } = require('apollo-server');

const typeDefs = gql`

#admin---------------------------------------------------------
type admin {
    id:ID
    fName: String
    lName: String
    contact: Int
    email: String
    username: String
    password: String
    createdDateTime: String
    status: String
}

input adminInput {
    fName: String
    lName: String
    contact: Int
    email: String
    username: String
    password: String
}

type adminAuth{
    adminId: ID
    adminToken: String
    adminTokenExpire: String
}

#user------------------------------------------------------
type user {
    id:ID
    fName: String
    lName: String
    contact: String
    email: String
    password: String
    address:  String 
    city:  String 
    state:  String 
    pincode:  Int 
    longitude:  Int 
    latitude:  Int 
    subscriptionType:  String 
    subscriptionDateTime:  String 
    subscriptionAmount:  String 
    subscriptionName:  String 
    deviceToken:  String 
    createdDateTime:  String 
    status:  String 
}

input userInput {
    fName: String
    lName: String
    contact: String
    email: String
    password: String
    address:  String 
    city: String 
    state: String 
    pincode: Int 
    longitude: Int 
    latitude:  Int 
    subscriptionType: String 
    subscriptionDateTime: String 
    subscriptionAmount: String 
    subscriptionName: String 
    deviceToken:  String 
}

type userOtpAuth{
    userId: ID
    userToken: String
    userTokenExpiration: String
}
#Booking-------------------------------------------------

type booking {
    id:ID
    paymentId : String 
    bookingNo : String 
    userId: ID
    vendorId: ID
    vendorName: String
    serviceName: String
    servicePrice: String
    totalAmount: String
    scheduleDate: String 
    scheduleTime: String 
    createDateTime: String 
    status: String 
}

input bookingInput {
    paymentId : String 
    bookingNo : String 
    userId: ID
    vendorId: ID
    vendorName: String
    serviceName: String
    servicePrice: String
    totalAmount: String
    scheduleDate: String 
    scheduleTime: String 
    createDateTime: String 
    status: String 
}

#vendor-------------------------------------------------------
type vendor {
    id:ID
    fName: String   
    lName: String 
    contact: String 
    username: String
    password: String
    type: String
    image: String
    alternativeContact: String 
    email: String 
    address: String 
    city: String 
    state: String 
    pincode: Int 
    experience: String 
    services: [vendorService] 
    Expertise: [ExpertiseDetails]
    description: String 
    availability: String 
    availableTiming: String 
    createdDateTime: String 
    status: String 
}

input vendorInput {
    fName: String   
    lName: String 
    contact: String 
    username: String
    password: String
    alternativeContact: String 
    email: String 
    address: String 
    type: String
    image: String
    city: String 
    state: String 
    pincode: Int 
    experience: String 
    services: [vendorServiceInput] 
    Expertise: [ExpertiseDetailsInput] 
    description: String 
    availability: String 
    availableTiming: String 
}

type vendorService {
    id : ID
    serviceType : String
    servicePrice : String
    serviceStatus : String
}

input vendorServiceInput {
    serviceType : String
    servicePrice : String
    serviceStatus : String
}

type ExpertiseDetails {
    id : ID
    ExpertiseName : String
    ExpertisPrice : String
}

input ExpertiseDetailsInput {
    ExpertiseName : String
    ExpertisPrice : String
}

type vendorOtpAuth{
    vendorId :ID
    vendorToken : String
    vendorTokenExpire : String
}

type vendorAuth{
    vendorId :ID
    vendorToken : String
    vendorTokenExpire : String
}

#Notication--------------------------------------------------
type notification {
    id:ID
    userId: ID
    vendorId: ID
    title: String
    description: String
    createDateTime : String
    status: String
}

input notificationInput {
    userId: ID
    vendorId: ID
    title: String
    description: String
}

input vServiceInput{
    vendorId:ID
    services: [vendorServiceInput]
}


input vServiceInput_2{
    vendorId:ID
    serviceId:ID
    serviceType: String
    servicePrice: String
}


input vendorUpdateInput {
    id:ID
    fName: String   
    lName: String 
    contact: String 
    username: String
    password: String
    image: String
    alternativeContact: String 
    email: String 
    address: String 
    city: String 
    state: String 
    pincode: Int 
    experience: String 
    description: String 
    availability: String 
    availableTiming: String 
    createdDateTime: String 
    status:  String 
}

input updateUserInput {
    id:ID
    fName: String
    lName: String
    contact: String
    email: String
    password: String
    address:  String 
    city:  String 
    state:  String 
    pincode:  Int 
    longitude:  Int 
    latitude:  Int 
    subscriptionType: String 
    subscriptionDateTime: String 
    subscriptionAmount: String 
    subscriptionName: String 
    deviceToken:  String 
}


input updateBookingInput {
    id:ID
    paymentId : String 
    bookingNo : String 
    userId: ID
    vendorId: ID
    vendorName: String
    serviceName: String
    servicePrice: String
    totalAmount: String
    scheduleDate: String 
    scheduleTime: String 
    createDateTime: String 
    status: String 
}
#Request-----------------------------------------------------

type request {
    id:ID
    fName: String
    lName: String
    contact: String
    email: String
    message: String
    createdDateTime: String
    status: String
}

input requestInput {
    fName: String
    lName: String
    contact: String
    email: String
    message: String
}

#parsaweb----------------------------------------------------
 type user1  {
    id:ID
fName:String
lName:String
contact:String
email:String
password:String
address:String
city:String
state:String
pincode:String
createdDateTime:String
status:String
}

 input user1Input  {
fName:String
lName:String
contact:String
email:String
password:String
address:String
city:String
state:String
pincode:String
}

type userAuth{
   userId: ID
   userToken: String
   userTokenExpire:String
}

#courses------------------------------------------------------

type courses {
    id:ID
    courseTitle:String
    courseDescrition:String
    completePercentage:String
    complete:String
    createDateTime:String
    status:String
}
input coursesInput{
    courseTitle:String
    courseDescrition:String
    completePercentage:String
    complete:String
    createDateTime:String
    status:String
}

type couseObjective {
            id:ID
            title: String
            description: String
            answer: String
            marks: String
            video: String
}
input couseObjectiveInput{
            title: String
            description: String
            answer: String
            marks: String
            video: String
}

input courseObjectInput{
    courseId:ID
    services: [couseObjectiveInput]
}

 type topic{
    id:ID
    courseId:ID
    courseTitle:String
    topicTitle:String
    topicDescription:String
    completionPercentage:String
    complete:String
    createDateTime:String
    status:String
 }

 input topicInput{
    courseId:ID
    courseTitle:String
    topicTitle:String
    topicDescription:String
    completionPercentage:String
    complete:String
    createDateTime:String
    status:String
 }

 input updateTopicInput{
    topicId:ID
    topicTitle:String
    topicDescription:String
 }

 type subTopic{
    id:ID
    courseId:ID
    courseTitle:String
    topicId:ID
    topicTitle:String
    subTopicTitle:String
    subTopicTopicDescription:String
    questions:[quest]
    completionPercentage:String
    complete:String
    createDateTime:String
    status:String
 }

 type quest{
    id:ID
    questionTitle:String
    objective:[String]
    correctAnswer:String
    answer:String
    mark:String
    questionType:String
    video:String
    status:String
 }

 input subTopicInput{
    courseId:ID
    courseTitle:String
    topicId:ID
    topicTitle:String
    subTopicTitle:String
    subTopicTopicDescription:String
    questions:[questInput]
    completionPercentage:String
    complete:String
    createDateTime:String
    status:String
 }

 input questInput{
    questionTitle:String
    objective:[String]
    correctAnswer:String
    answer:String
    mark:String
    questionType:String
    video:String
    status:String

 }

 input addQuestionInput{
  subTopicId:ID
  questions:[question]
 }

input question{
    questionTitle:String
    objective:[String]
    correctAnswer:String
    answer:String
    mark:String
    questionType:String
    video:String
    status:String

}


#Query--------------------------------------------------------
type Query {
    getAdmin:[admin]
    getUser:[user]
    getUser1:[user1]
    getBooking:[booking]
    getSubTopicById(subTopicId:ID):subTopic
    getBookingByUserId(userId:ID):[booking]
    getVendor:[vendor]
    getNotification:[notification]
    getVendorByVendorName(serviceType: String):[vendor]
    getVendorById(vendorId:ID):vendor
    getUserById(userId:ID):user
    getNotificationByVendorID(vendorId:ID):[notification]
    getBookingByVendorID(vendorId:ID):[booking]
    getUserDataByUserID(userId:ID):user
    getCompleteBookingByVendorID(vendorId:ID):[booking]
    getCancelBookingByVendorID(vendorId:ID):[booking]
    getRequest:[request]
    getCourses:[courses]
    getTopicByCourseId(courseId:ID):[topic]
    getAllSubTopic:[subTopic]
}

#Mutations-----------------------------------------------------
type Mutation {
    createAdmin(AdminInput:adminInput):admin
    createUser(UserInput:userInput):user
    createBooking(BookingInput:bookingInput):booking
    adminLogin(username:String, password:String):adminAuth
    sendOtp(contact:String, otp:String):String
    userOtpLogin(contact:String , otp:String):userOtpAuth
    createVendor(VendorInput:vendorInput):vendor
    createNotification(NotificationInput:notificationInput):notification
    sendVendorOtp(contact:String, otp:String):String
    vendorOtpLogin(contact:String , otp:String):vendorOtpAuth
    vendorLogin(username:String, password:String):vendorAuth
    createVendorService(VServiceInput:vServiceInput):vendor
    deleteVendor(vendorId:ID):vendor
    deleteVendorService(vendorId:ID,vServiceId:ID):vendor
    updateVendor(VendorUpdateInput:vendorUpdateInput):vendor
    updateUser(UpdateUserInput:updateUserInput):user
    updateBooking(UpdateBookingInput:updateBookingInput):booking
    updateStatusByBookingId(bookingId:ID, status:String):booking
    createRequest(RequestInput:requestInput):request
    deleteRequest(requestId:ID):request
    createUser1(User1Input:user1Input):user1
    loginUser(email:String,password:String):userAuth
    createCourses(CoursesInput:coursesInput):courses
    createCourseObjective(CourseObjectInput:courseObjectInput):courses
    createTopic(TopicInput:topicInput):topic
    createSubTopic(SubTopicInput:subTopicInput):subTopic
    updateTopic(UpdateTopicInput:updateTopicInput):topic
    deleteTopic(topicId:ID):topic
    addQuestion(AddQuestionInput:addQuestionInput):subTopic
    deleteSubTopic(id:ID):topic
    deleteCourse(id:ID):courses
    deleteQuestion(subTopicId:ID,questionId:ID):subTopic
    updateQuestion(subTopicId:ID,questionId:ID,questionTitle:String, answer:String,correctAnswer:String,mark:String,video:String):subTopic


}
`
module.exports = { typeDefs }