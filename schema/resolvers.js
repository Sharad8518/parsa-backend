const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AWS = require("aws-sdk");
const Admin = require('../models/Admin');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Vendor = require('../models/Vendor');
const Notification = require('../models/Notification');
const Request = require('../models/Request');
const User1 = require('../models/User1');
const Courses = require('../models/Courses');
const Topic = require("../models/topic")
const SubTopic =require("../models/subTopic")
const { arch } = require('os');


const resolvers = {
    Query: {
        getAdmin: async () => {
            return await Admin.find();
        },

        getUser: async () => {
            return await User.find();
        },
        getUser1: async () => {
            return await User1.find();
        },
        getBooking: async () => {
            return await Booking.find();
        },
        getBookingByUserId: async (_,{userId}) => {
            return await Booking.find({ userId: userId })
        },
        getVendor: async () => {
            return await Vendor.find();
        },
        getNotification: async () => {
            return await Notification.find();
        },
        getVendorByVendorName: async (req, args) => {
            let data = await Vendor.find()

            let neqData = [];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i]['services'].length; j++) {
                    if (args.serviceType === data[i]['services'][j].serviceType) {
                        data[i]['services'] = [data[i]['services'][j]]
                        neqData.push(data[i])
                        break;
                    }
                }
            }

            return neqData;
        },


        getVendorById: async (_, { vendorId }) => {
            return await Vendor.findById({ _id: vendorId })
        },
        getUserById: async (_, { userId }) => {
            return await User.findById({ _id: userId })
        },
        getNotificationByVendorID: async (_,{vendorId}) => {
            return await Notification.find({vendorId:vendorId})
        },
        getBookingByVendorID: async (_,{vendorId}) => {
            return await Booking.find({vendorId:vendorId, status:'pending'})
        },
        getCompleteBookingByVendorID: async (_,{vendorId}) => {
            return await Booking.find({vendorId:vendorId, status:'complete'}) 
        },
        getCancelBookingByVendorID: async (_,{vendorId}) => {
            return await Booking.find({vendorId:vendorId, status:'cancel'}) 
        },
        getUserDataByUserID: async (_,{userId}) => {
            return await User.findById({_id: userId})
        },
        getRequest: async () => {
            return await Request.find();
        },
        getCourses:async () => {
            return await Courses.find();
        },

        getTopicByCourseId:async(_,{courseId})=>{
            return await Topic.find({courseId:courseId})
        },

        getAllSubTopic:async()=>{
            return await SubTopic.find();
        },

        getSubTopicById:async(_,{subTopicId})=>{
            return await SubTopic.findOne({_id:subTopicId})
        }

    },

    // Mutations-----------------------------------------------------------------
    Mutation: {

        // admin--------------------------------------------------------------------------------

        createAdmin: async (_, args) => {
            const today = new Date();
            return Admin.findOne({ username: args.AdminInput.username }).then(async (userName) => {
                if (userName) {
                    throw new Error('Username already exist!!!');
                }
                else {
                    return bcrypt.hash(args.AdminInput.password, 12).then(changePass => {
                        const newAdmin = new Admin({
                            fName: args.AdminInput.fName,
                            lName: args.AdminInput.lName,
                            contact: args.AdminInput.contact,
                            email: args.AdminInput.email,
                            username: args.AdminInput.username,
                            password: changePass,
                            createdDateTime: today,
                            status: "active",
                        })
                        return newAdmin.save()
                    })
                }
            })
        },

        adminLogin: async (_, { username, password }) => {
            const admin = await Admin.findOne({ username: username });

            if (!admin) {
                throw new Error('Admin Not Exist')
            }

            const isEqual = await bcrypt.compare(password, admin.password);

            if (!isEqual) {
                throw new Error('Password Incorrect');
            }

            const token = jwt.sign({ adminId: admin.id }, 'adminLoginSecretKey', {
                expiresIn: '1h'
            })

            return {
                adminId: admin.id,
                adminToken: token,
                adminTokenExpire: '1h'
            }
        },

// User---------------------------------------------------------------------------------------
        
       
        createUser: async (_, args) => {
            const today = new Date();
            return User.findOne({ email: args.UserInput.email }).then(async (Email) => {
                if (Email) {
                    throw new Error('Email already exist!!!');
                }
                else {
                    return bcrypt.hash(args.UserInput.password, 12).then(changePass => {
                        const newUser = new User({
                            fName: args.UserInput.fName,
                            lName: args.UserInput.lName,
                            contact: args.UserInput.contact,
                            email: args.UserInput.email,
                            password: changePass,
                            address: args.UserInput.address,
                            city: args.UserInput.city,
                            state: args.UserInput.state,
                            pincode: args.UserInput.pincode,
                            longitude: args.UserInput.longitude,
                            latitude: args.UserInput.latitude,
                            subscriptionType: args.UserInput.subscriptionType,
                            subscriptionDateTime: args.UserInput.subscriptionDateTime,
                            subscriptionAmount: args.UserInput.subscriptionAmount,
                            subscriptionName: args.UserInput.subscriptionName,
                            deviceToken: args.UserInput.deviceToken,
                            createdDateTime: today,
                            status: "active",

                        })
                        return newUser.save()
                    })
                }
            })
        },

        createUser1: async (_, args) => {
            const today = new Date();
            return User1.findOne({ email: args.User1Input.email }).then(async (Email) => {
                if (Email) {
                    throw new Error('Email already exist!!!');
                }
                else {
                    return bcrypt.hash(args.User1Input.password, 12).then(changePass => {
                        const newUser = new User1({
                            fName: args.User1Input.fName,
                            lName: args.User1Input.lName,
                            contact: args.User1Input.contact,
                            email: args.User1Input.email,
                            password: changePass,
                            address: args.User1Input.address,
                            city: args.User1Input.city,
                            state: args.User1Input.state,
                            pincode: args.User1Input.pincode,
                            createdDateTime: today,
                            status: "active",
                        })
                        return newUser.save()
                    })
                }
            })
        },

        loginUser: async (_, { email, password }) => {
            const user1 = await User1.findOne({ email: email })
            if (!user1) {
                throw new Error('User Not Found')
            }
            const passwordMatch = await bcrypt.compare(password, user1.password)
            if (!passwordMatch) {
                throw new Error('Email & Password Not Match')
            }
            const token = jwt.sign({ userId: user1.id }, 'userLoginSecretKey', {
                expiresIn: '1h'
            })
            return {
                userId: user1.id,
                userToken: token,
                userTokenExpire: '1h'
            }
        },

        userOtpLogin: async (parent, { contact }) => {
            const contactNo = await User.findOne({ contact: contact });
            if (!contactNo) {
                let today = new Date();

                const newUser = new User({
                    contact: contact,
                    createdDateTime: today,
                    status: "tempUser",
                })
                return newUser.save()
                    .then(async (userData) => {
                        const token = jwt.sign({ userId: userData.id, contact: userData.contact, status: userData.status }, 'userOtpLoginSecretKey', {
                            expiresIn: '1h'
                        })
                        return userData = {
                            userId: userData.id,
                            userToken: token,
                            userTokenExpiration: '1h'
                        }
                    })
            }
            else {
                const token = jwt.sign({ userId: contactNo.id, contact: contactNo.contact, status: contactNo.status }, 'userOtpLoginSecretKey', {
                    expiresIn: '1h'
                })
                return landlordAuthData = {
                    userId: contactNo.id,
                    userToken: token,
                    userTokenExpiration: '1h'
                }
            }
        },

        // User sent otp 
        sendOtp: async (parent, { contact, otp }) => {
            var http = require("https");

            var options = {
                method: "POST",
                hostname: "api.msg91.com",
                port: null,
                path: "/api/v5/flow/",
                headers: {
                    authkey: "368910A97VqS4T635a8620P1",
                    "content-type": "application/JSON",
                },
            };

            var req = http.request(options, function (res) {
                var chunks = [];
                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });
                res.on("end", function () {
                    var body = Buffer.concat(chunks);
                    // console.log(body.toString());
                });
            });

            const countryCode = "91";
            const addString = countryCode.concat(contact);

            const write = req.write(
                `{\n  \"flow_id\": \"61c2f27e137c57415715a669\",\n  \"sender\": \"SSIPIC\",\n  \"mobiles\": ${addString},\n  \"otp\": ${otp},\n  \"VAR2\": \"VALUE 2\"\n}`
            );
            // console.log("write", addString);
            req.end();
            return "ok";
        },


        // Booking------------------------------------------------------------------

        createBooking: async (_, args) => {
            const today = new Date();
            const Booking_no = Math.floor(100000 + Math.random() * 900000);

            const newBooking = new Booking({
                paymentId: args.BookingInput.paymentId,
                bookingNo: Booking_no,
                userId: args.BookingInput.userId,
                vendorId: args.BookingInput.vendorId,
                vendorName: args.BookingInput.vendorName,
                serviceName: args.BookingInput.serviceName,
                servicePrice: args.BookingInput.servicePrice,
                totalAmount: args.BookingInput.totalAmount,
                scheduleDate: args.BookingInput.scheduleDate,
                scheduleTime: args.BookingInput.scheduleTime,
                createDateTime: today,
                status: "pending"
            })
            return newBooking.save()
        },
// #Notification------------------------------------------------------
// Notification-----------------------------------------------
createNotification: async (_, args) => {
    const today = new Date();

    const newNotification = new Notification({
        userId: args.NotificationInput.userId,
        vendorId: args.NotificationInput.vendorId,
        title: args.NotificationInput.title,
        description: args.NotificationInput.description,
        createDateTime: today,
        status: "active"
    })
    return newNotification.save()
},

// #Vendor-------------------------------------------------------------
createVendor: async (_, args) => {
    const today = new Date();

    const vendorName = args.VendorInput.fName
    const inlowerCase = vendorName.toLowerCase();
    const firstThreeLetter = inlowerCase.slice(0, 3);
    const four = Math.floor(1000 + Math.random() * 9000);
    const Pass = Math.floor(100000 + Math.random() * 900000);
    const finalVendorName = firstThreeLetter + four


    return Vendor.findOne({ username: args.VendorInput.username }).then(async (Username) => {
        if (Username) {
            throw new Error('Username already exist!!!');
        }
        else {
            const newVendor = new Vendor({
                fName: args.VendorInput.fName,
                lName: args.VendorInput.lName,
                contact: args.VendorInput.contact,
                username: finalVendorName,
                password: Pass,
                alternativeContact: args.VendorInput.alternativeContact,
                image: args.VendorInput.image,
                email: args.VendorInput.email,
                address: args.VendorInput.address,
                city: args.VendorInput.city,
                state: args.VendorInput.state,
                pincode: args.VendorInput.pincode,
                experience: args.VendorInput.experience,
                services: args.VendorInput.services,
                Expertise: args.VendorInput.Expertise,
                description: args.VendorInput.description,
                availability: args.VendorInput.availability,
                availableTiming: args.VendorInput.availableTiming,
                createdDateTime: today,
                status: "tempUser"
            })
            return newVendor.save()
        }

    })
},

sendVendorOtp: async (parent, { contact, otp }) => {
    var http = require("https");

    var options = {
        method: "POST",
        hostname: "api.msg91.com",
        port: null,
        path: "/api/v5/flow/",
        headers: {
            authkey: "368910A97VqS4T635a8620P1",
            "content-type": "application/JSON",
        },
    };

    var req = http.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function () {
            var body = Buffer.concat(chunks);
            // console.log(body.toString());
        });
    });

    const countryCode = "91";
    const addString = countryCode.concat(contact);

    const write = req.write(
        `{\n  \"flow_id\": \"61c2f27e137c57415715a669\",\n  \"sender\": \"SSIPIC\",\n  \"mobiles\": ${addString},\n  \"otp\": ${otp},\n  \"VAR2\": \"VALUE 2\"\n}`
    );
    // console.log("write", addString);
    req.end();
    return "ok";
},


// vendor otp login
vendorOtpLogin: async (parent, { contact }) => {
    const contactNo = await Vendor.findOne({ contact: contact });
    if (!contactNo) {
        let today = new Date();

        const newUser = new Vendor({
            contact: contact,
            createdDateTime: today,
            status: "tempUser",
        })
        return newUser.save()
            .then(async (vendorData) => {
                const token = jwt.sign({ vendorId: vendorData.id, contact: vendorData.contact, status: vendorData.status }, 'vendorLoginSecretKey', {
                    expiresIn: '1h'
                })
                return vendorData = {
                    vendorId: vendorData.id,
                    vendorToken: token,
                    vendorTokenExpire: '1h'
                }
            })
    }
    else {
        const token = jwt.sign({ vendorId: contactNo.id, contact: contactNo.contact, status: contactNo.status }, 'vendorLoginSecretKey', {
            expiresIn: '1h'
        })
        return landlordAuthData = {
            vendorId: contactNo.id,
            vendorToken: token,
            vendorTokenExpire: '1h',
        }
    }
},

    //  vendor login with username && password
    vendorLogin: async (_, { username, password }) => {
        const vendor = await Vendor.findOne({ username: username });
        if (!vendor) {
            throw new Error('vendor Not Exist')
        }
        const isEqual = (password == vendor.password);
        // console.log( "sss" , password, vendor.password)

        if (!isEqual) {
            throw new Error('Password Incorrect');
        }
        const token = jwt.sign({ vendorId: vendor.id }, 'vendorLoginSecretKey', {
            expiresIn: '1h'
        })
        return {
            vendorId: vendor.id,
            vendorToken: token,
            vendorTokenExpire: '1h'
        }
    },


    createVendorService: async (parent, args) => {
        const filter = { _id: args.VServiceInput.vendorId };
        return await Vendor.findOneAndUpdate(filter, { $push: { services: args.VServiceInput.services } }, { new: true })
    },
    deleteVendor: async (_, { vendorId }) => {
        return await Vendor.findOneAndDelete({ _id: vendorId })
    },
    deleteVendorService: async (parent, { vendorId, vServiceId }) => {
        const vendor = await Vendor.findOne({ _id: vendorId })
        await vendor.services.pull({ _id: vServiceId })
        return vendor.save()
    },
    updateVendor: async (_, args) => {

        const oldData = await Vendor.findOne({ _id: args.VendorUpdateInput.id })
        console.log(oldData.image)

        const ID = "AKIA6GB4RFKTM63VVHEK"
        const SECRET = "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"
        const BUCKET_NAME = "panditbulao"

        const s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET,
        })

        s3.deleteObject({
            Bucket: BUCKET_NAME,
            Key: oldData.image
        }, function (err, data) { })


        const today = new Date();
        const filter = { _id: args.VendorUpdateInput.id }
        const update = {
            fName: args.VendorUpdateInput.fName,
            lName: args.VendorUpdateInput.lName,
            contact: args.VendorUpdateInput.contact,
            password: args.VendorUpdateInput.password,
            image: args.VendorUpdateInput.image,
            alternativeContact: args.VendorUpdateInput.alternativeContact,
            email: args.VendorUpdateInput.email,
            address: args.VendorUpdateInput.address,
            city: args.VendorUpdateInput.city,
            state: args.VendorUpdateInput.state,
            pincode: args.VendorUpdateInput.pincode,
            experience: args.VendorUpdateInput.experience,
            description: args.VendorUpdateInput.description,
            availability: args.VendorUpdateInput.availability,
            availableTiming: args.VendorUpdateInput.availableTiming,
            createdDateTime: today,
            status: "active"
        }
        return await Vendor.findOneAndUpdate(filter, update, { new: true })

    },

    
    updateUser: async (_, args) => {
        const today = new Date();
        const filter = { _id: args.UpdateUserInput.id }
        const update = {
            fName: args.UpdateUserInput.fName,
            lName: args.UpdateUserInput.lName,
            contact: args.UpdateUserInput.contact,
            alternativeContact: args.UpdateUserInput.alternativeContact,
            email: args.UpdateUserInput.email,
            address: args.UpdateUserInput.address,
            city: args.UpdateUserInput.city,
            state: args.UpdateUserInput.state,
            pincode: args.UpdateUserInput.pincode,
            createdDateTime: today,
            status: "active"
        }
        return await User.findOneAndUpdate(filter, update, { new: true })
    },
    
    updateBooking: async (_, args) => {
        const today = new Date();
        const filter = { _id: args.UpdateBookingInput.id }
        const update = {
            paymentId: args.UpdateBookingInput.paymentId,
            bookingNo: args.UpdateBookingInput.bookingNo,
            userId: args.UpdateBookingInput.userId,
            vendorId: args.UpdateBookingInput.vendorId,
            vendorName: args.UpdateBookingInput.vendorName,
            serviceName: args.UpdateBookingInput.serviceName,
            servicePrice: args.UpdateBookingInput.servicePrice,
            totalAmount: args.UpdateBookingInput.totalAmount,
            scheduleDate: args.UpdateBookingInput.scheduleDate,
            scheduleTime: args.UpdateBookingInput.scheduleTime,
            createDateTime: today,
            status: args.UpdateBookingInput.status
        }
        return await Booking.findOneAndUpdate(filter, update, { new: true })
    },
     
    updateStatusByBookingId: async (_, { bookingId ,status}) => {
        const filter = { _id: bookingId }
        const update = {
            status: status
        }
        return Booking.findOneAndUpdate(filter, update, { new: true })
    },
    
     createRequest: async (_, args) => {
        const today = new Date();
    
        const newRequest = new Request({
            fName: args.RequestInput.fName,
            lName: args.RequestInput.lName,
            contact: args.RequestInput.contact,
            email: args.RequestInput.email,
            message: args.RequestInput.message,
            createDateTime: today,
            status: "active"
            
        })
        return newRequest.save()
    },
    deleteRequest: async (_, { requestId }) => {
        return await Request.findOneAndDelete({ _id: requestId })
    },

    // createCourses==============================================

    createCourses: async (parent,args) => {
        const today = new Date();
        const newCourse = new Courses({
        courseTitle:args.CoursesInput.courseTitle,
        courseDescrition:args.CoursesInput.courseDescrition,
        completePercentage:args.CoursesInput.completePercentage,
        complete:args.CoursesInput.complete,
        createDateTime:today,
        status:"active"
        })
        return newCourse.save()
    },
    createCourseObjective: async (parent, args) => {
        const filter = { _id: args.CourseObjectInput.courseId };
        return await Courses.findOneAndUpdate(filter, { $push: { objective: args.CourseObjectInput.objective } }, { new: true })
    },
  
    createTopic:async(parent,args)=>{
        const date = new Date();

        const newTopic =  new Topic({
            courseId:args.TopicInput.courseId,
            courseTitle:args.TopicInput.courseTitle,
            topicTitle:args.TopicInput.topicTitle,
            topicDescription:args.TopicInput.topicDescription,
            completionPercentage:args.TopicInput.completionPercentage,
            complete:args.TopicInput.complete,
            createDateTime:date,
            status:"pending",
        })

        return newTopic.save();
    },

    createSubTopic:async(parent,args)=>{
     
        const date = new Date()

        const newSubTopic = new SubTopic({
            courseId:args.SubTopicInput.courseId,
            courseTitle:args.SubTopicInput.courseTitle,
            topicId:args.SubTopicInput.topicId,
            topicTitle:args.SubTopicInput.topicTitle,
            subTopicTitle:args.SubTopicInput.subTopicTitle,
            subTopicTopicDescription:args.SubTopicInput.subTopicTopicDescription,
            questions:args.SubTopicInput.questions,
            completionPercentage:args.SubTopicInput.completionPercentage,
            complete:args.SubTopicInput.complete,
            createDateTime:date,
            status:"pending",
        })

         return newSubTopic.save();

    },

    updateTopic:async(parent,args)=>{
    const filter ={_id:args.UpdateTopicInput.topicId}
    const update ={
        topicTitle:args.UpdateTopicInput.topicTitle,
        topicDescription:args.UpdateTopicInput.topicDescription,
    }
    return Topic.findOneAndUpdate(filter,update,{new:true})
    },

    deleteTopic:async(_,{topicId})=>{
        return await Topic.findOneAndDelete({_id:topicId})
    },

    addQuestion:async(parent,args)=>{
     const filter ={_id:args.AddQuestionInput.subTopicId}
    
    return SubTopic.findOneAndUpdate(filter,{ $push: {  questions:args.AddQuestionInput.questions, } },{new:true})

    },

    deleteSubTopic:async(parent,{id})=>{
      return SubTopic.findOneAndDelete({_id:id})
    },

    deleteCourse:async(parent,{id})=>{
        return Courses.findOneAndDelete({_id:id})
    },

    deleteQuestion:async(parent,{subTopicId,questionId})=>{
        return SubTopic.findOneAndDelete({_id:subTopicId,"questions._id":questionId})
    },

    updateQuestion:async(parent,{subTopicId,questionId,questionTitle,answer,correctAnswer,mark,video})=>{
        return SubTopic.findOneAndUpdate({_id:subTopicId,"questions._id":questionId},{
            '$set': {
                "questions.$.questionTitle": questionTitle,
                "questions.$.correctAnswer": correctAnswer,
                "questions.$.answer": answer,
                "questions.$.mark": mark,
                "questions.$.video": video
              }, 

        },{ new: true })
    }
  
   



    }
}
module.exports = { resolvers }