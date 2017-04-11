var PouchDB = require("pouchdb")
var db = new PouchDB("koko")


function showDocs(){
    db.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        let data = ""
        result.rows.map((obj)=>{
            data+=JSON.stringify(obj)+"<br/>"
        })
        document.getElementById("results").innerHTML = data
    }).catch(function (err) {
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
        age : age.value
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



