const fs = require('fs');
const multer = require("multer")
const path = require("path")
const { v4: uuid } = require("uuid");
const {initializeApp} = require("firebase/app")
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage")


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.ST_BUCKET,
    messagingSenderId: process.env.MSG_SENDER_ID,
    appId: process.env.APP_ID
};

const appFire = initializeApp(firebaseConfig);
const storageFire = getStorage(appFire);
const profilePicsRef = ref(storageFire, 'images/profilepics');
const productPicsRef = ref(storageFire, 'images/productpics');

const uploadFire = async (req, file, next) => {
    try {
        const filenames = file.req.files
        const values = Object.values(filenames)

        if (values.length < 1) {
            throw new Error('Only .png, .svg, .webp, .jpg and .jpeg format allowed or file missing')
        }

        const data = Object.values(values)
        const result = Object.keys(data).map((key) => [Number(key), data[key]]);
        const result2 = Array(result)
        const elementArr = result2[0][0][1]

        const localPath = []

        for (let index = 0; index < elementArr.length; index++) {
            localPath.push(elementArr[index].path);
        }

        const uploader = []
        for (let index = 0; index < elementArr.length; index++) {
            const finalRef = elementArr[index].fieldname === 'profilePic' ? profilePicsRef : productPicsRef
            const spaceRef2 = ref(finalRef, elementArr[index].filename);
            let metadata = {
                contentType: elementArr[index].mimetype
            }
            uploader.push(uploadBytes(spaceRef2, fs.readFileSync(localPath[index]), metadata))
        }
        const urls = []
        const picsArr = []
        Promise.all(uploader)
            .then(snapshot => {
                snapshot.map(
                    (snap) => {
                        urls.push(getDownloadURL(snap.ref)
                            .then((downloadURL) => {
                                picsArr.push(downloadURL);
                            }))
                    });
            })
            .then(() => {
                Promise.all(urls)
                    .then((result) => {
                        req.body.pics = picsArr;
                        localPath.forEach((item) => {
                            fs.unlink(item, (err) => {
                                console.log('Deleted: ', item);
                            })
                        })
                        next()
                    })
            });
    } catch (error) {
        file.status(404).json({ message: error.message });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, callback) {
        const destFilename = uuid() + path.extname(file.originalname);
        callback(null, destFilename,);
    }
});

const uploadLocalSingle = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        if (
            file.mimetype == "image/png"
            || file.mimetype == "image/jpg"
            || file.mimetype == "image/jpeg"
            || file.mimetype == "image/svg+xml"
            || file.mimetype == "image/webp"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}).fields(
    [
        { name: 'profilePic', maxCount: 1 },
        { name: 'productPic', maxCount: 8 }
    ]
)
const checkMultipart = async (req, file, next) => {

    if (file.req.headers["content-type"] !== 'application/x-www-form-urlencoded') {
        await uploadLocalSingle(req, file, function (err) {
            if (err) {
                return file.status(404).json({ message: err.message });
            }
            next()
        })
    }
    if (file.req.headers["content-type"] === 'application/x-www-form-urlencoded') {
        next()
    }
}

const handleUploadFirebase = (req, file, next) => {
    if (file.req.headers["content-type"] !== 'application/x-www-form-urlencoded') {
        uploadFire(req, file, next)
    }
    if (file.req.headers["content-type"] === 'application/x-www-form-urlencoded') {
        next()
    }
}

module.exports = {
    uploadFire,
    uploadLocalSingle,
    checkMultipart,
    handleUploadFirebase
}