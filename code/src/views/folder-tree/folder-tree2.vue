<template>
  <div class="folder-wrapper">
    <!-- <Tree :data="folderTree" :render="renderFunc"></Tree> -->
    <folder-tree
      :folder-list.sync="folderList"
      :file-list.sync="fileList"
      :folder-drop="folderDrop"
      :file-drop="fileDrop"
      :beforeDelete="beforeDelete"
    />
  </div>
</template>

<script>
import { getFolderList, getFileList } from '@/api/data'
import FolderTree from '_c/folder-tree'
import {putFileInFolder, putFileInFolder2} from '@/lib/util2'
export default {
  components: {
    FolderTree
  },
  data () {
    return {
      folderList: [],
      fileList: [],
      folderDrop: [
        {
          name: 'rename',
          title: '重命名'
        },
        {
          name: 'delete',
          title: '删除文件夹'
        }
      ],
      fileDrop: [
        {
          name: 'rename',
          title: '重命名'
        },
        {
          name: 'delete',
          title: '删除文件'
        }
      ]
    }
  },
  methods: {
    beforeDelete () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let error = new Error('error')
          if (!error) {
            resolve()
          } else reject(error)
        }, 2000)
      })
    }
  },
  mounted () {
    Promise.all([getFolderList(), getFileList()]).then(res => {
      this.folderList = res[0]
      this.fileList = res[1]


      // 测试我写的数据处理
      let a = putFileInFolder(this.folderList, this.fileList)
      let b = putFileInFolder2(this.folderList, this.fileList)

      console.log(JSON.stringify(a))
      console.log(JSON.stringify(b))
    })

    
    
  }
}
</script>

<style lang="less">
.folder-wrapper{
  width: 300px;
}
</style>
