$( document ).ready(function() {
    f("#app",rootNode)
});
function f(DOMId,treeNode){
    let fId = "f"+treeNode.fullId
    let cId = "c"+treeNode.fullId
    if(treeNode.files){
        $(DOMId).append("<div id='"+fId+"' class='files'><p>点击下载资料</p></div>")
        for (let i=0;i<treeNode.files.length;i++){
            let file=treeNode.files[i]
            let src=treeNode.fullId+'-'+file
            let name=treeNode.fullId+treeNode.fullName+'-'+file
            $("#"+fId).append('<p><a target="_blank" download="'+name+'" href="./files/'+src+'">'+file+'</a></p>')
        }
    }
    if(treeNode.children){
        $(DOMId).append("<div id='"+cId+"'></div>")
        for (let i=0;i<treeNode.children.length;i++){
            let child=treeNode.children[i]
            let name = child.fullId+" "+child.name
            let xId = 'x'+child.fullId
            let btnCls="btn btn-primary uBtn"
            if(child.fullId.length===2 || child.fullId.length===5){
                btnCls="btn btn-primary uBtn"
            }else if(child.fullId.length===3 || child.fullId.length===7){
                btnCls="btn btn-danger uBtn"
            }
            if(child.files || child.children){
                $("#"+cId).append('<div><button class="'+btnCls+'" type="button" data-toggle="collapse" data-target="#'+xId+'" aria-expanded="true" aria-controls="'+xId+'">'+name+'</button></div>')
                $("#"+cId).append('<div class="content collapse" id="'+xId+'" ></div>')
                f("#"+xId,child)
            }else{
                $("#"+cId).append('<div><button class="btn btn-secondary uBtn" type="button" disabled>'+name+'</button></div>')
            }
        }
    }
}