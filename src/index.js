var PouchDB = require("pouchdb")
PouchDB.plugin(require('pouchdb-find'))

var db = new PouchDB("koko")
console.log(db)


function showDocs(){
    db.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        let data = ""
        result.rows.map((obj)=>{
            data+=JSON.stringify(obj.doc)+"<br/>"
        })
        document.getElementById("results").innerHTML = data
    }).catch(function (err) {
        document.getElementById("results").innerHTML = err
    })
}

function findOlder(){
	
    db.find({selector: {age:{$gte: Number(document.getElementById("age").value)}}}).then((result)=>{
    	let data = ""
    	result.docs.map((obj)=>{
            data+=JSON.stringify(obj)+"<br/>"
        })
        document.getElementById("results").innerHTML = data
    }).catch((err)=>{
    	document.getElementById("results").innerHTML = err
    })
}

function addUser(){
    const slug = document.getElementById("slug")
    const fullname = document.getElementById("fullname")
    const age = document.getElementById("age")
    const execution_result = document.getElementById("execution_result")

    db.put({
        _id: slug.value,
        fullname : fullname.value,
        age : Number(age.value)
    }).then(() => {
        execution_result.innerHTML = "<strong style='color:green'>Inserted successfully</strong>"
        slug.value = ""
        fullname.value = ""
        age.value = 0
    }).catch((err) => {
        execution_result.innerHTML = "<strong style='color:red'>"+err+"</strong>"
    })
}

document.getElementById("showBtn").addEventListener("click",showDocs)
document.getElementById("addBtn").addEventListener("click",addUser)
document.getElementById("findBtn").addEventListener("click",findOlder)

window.PouchDB = PouchDB



