let folerList = [{"name":"jvncvnzj","creat_time":"1992-06-29 23:58:58","folder_id":0,"id":1},{"name":"lkibojr","creat_time":"1995-11-15 06:22:14","folder_id":0,"id":2},{"name":"evdccmfq","creat_time":"1996-05-30 19:52:45","folder_id":0,"id":3},{"name":"ghjmhnup","creat_time":"1988-02-23 16:29:46","folder_id":1,"id":4},{"name":"jkyigqs","creat_time":"1975-01-27 03:16:30","folder_id":2,"id":5}];

let fileList = [{"name":"门成细人具","creat_time":"1971-08-24 22:48:51","folder_id":1,"id":10000},{"name":"新他必专育","creat_time":"1974-02-10 06:32:45","folder_id":3,"id":10001},{"name":"产没引如集","creat_time":"1985-01-25 08:33:40","folder_id":4,"id":10002},{"name":"受千世变装","creat_time":"2014-06-10 19:30:21","folder_id":1,"id":10003},{"name":"而机相即属","creat_time":"1981-03-04 06:49:34","folder_id":3,"id":10004},{"name":"史况形次农","creat_time":"2009-10-25 16:57:11","folder_id":5,"id":10005},{"name":"分八交须用","creat_time":"2015-09-20 00:55:16","folder_id":4,"id":10006},{"name":"识又气技种","creat_time":"1992-05-26 17:29:28","folder_id":1,"id":10007},{"name":"农交导走至","creat_time":"1978-12-17 01:03:11","folder_id":3,"id":10008},{"name":"层百他从文","creat_time":"2017-10-28 21:32:50","folder_id":1,"id":10009}];


function putFileInFolder (folderList, fileList) => {
  const folderListCloned = clonedeep(folderList)
  const fileListCloned = clonedeep(fileList)

  let f  = folderListCloned.map((item) => {
    let folder_id = item.id;
    fileListCloned.forEach((item2) => {
      if(folder_id == item.folder_id) {
        if(!item.children) {
          item.children = []
        }
        item.children.push(item2)
      }
    })
    item.type = 'folderId'
  })
  return f
}

function putFileInFolder2 (folderList, fileList) => {
  const folderListCloned = clonedeep(folderList)
  const fileListCloned = clonedeep(fileList)
  let f  = folderListCloned.map((item) => {
    let folder_id = item.id;
    fileListCloned.forEach((item2) => {
      if(folder_id == item.folder_id) {
        if(!item.children) {
          item.children = []
        }
        item.children.push(item2)
      }
    })
    item.type = 'folderId'
  })
  return f
}


let right = putFileInFolder(folerList, fileList)

let my = putFileInFolder2(folerList, fileList)


console.log(right)
console.log(right)






