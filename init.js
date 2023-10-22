const fs=require("fs")
const assert = require('assert');
function tree2dic(preId,node){
    node.fullId=preId+node.id
    if (node.id){
        dic[node.fullId] =node
    }
    if(node.fullId.length===2){
        node.fullName=node.name
    }else if(node.fullId.length>2){
        node.fullName=dic[preId].fullName+node.name
    }
    if(node.year){
        if(!node.children){
            node.children=[]
        }
        for (let i in node.year){
            let y =node.year[i]
            node.children.push({
                id:y,
                name:y+"年"
            })
        }
    }
    if (node.children){
        node.children.forEach((e)=>tree2dic(node.fullId,e))
    }

}
const rootNode = JSON.parse(fs.readFileSync("./src/tree.json").toString())
const dic={}
tree2dic("",rootNode)

fs.readdirSync('./src/files/').forEach((file)=>{
    let fileArray=file.split('-')
    assert(fileArray.length===2, file+": '-' must appear only once in the file name")
    let id=fileArray[0],fileName=fileArray[1]
    assert(id in dic, file+": index not in tree.json ")
    assert(id)
    assert(fileName)
    const  node = dic[id]
    if (!node.files){
        node.files=[]
    }
    node.files.push(fileName)
})
fs.writeFileSync('./src/temp.js',"var rootNode="+JSON.stringify(rootNode))