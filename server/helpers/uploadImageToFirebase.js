const { getStorage, ref, getDownloadURL, uploadBytes } = require('firebase/storage')
const { initializeApp } = require("firebase/app");
const app = require("../DBconfing/firebaseConfig")



initializeApp(app);

module.exports.uploadToFirebase = async function (files){
    const storage = getStorage()
    let images = [];
    for(let i=0; i< files.length;i++){
        const storageRef = ref(storage, `files/${files[i].originalname + Date.now()}`)
        const metaData = {
            contentType: files[i].mimetype
        }
        const snapshot = await uploadBytes(storageRef, files[i].buffer, metaData)
        const fileUrl = await getDownloadURL(snapshot.ref)
        images.push(fileUrl)
    }
    return images
} 
