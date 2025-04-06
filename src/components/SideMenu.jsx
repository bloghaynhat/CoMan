import React from 'react'
import MenuItem from './MenuItem'

const SideMenu = () => {
  return (
    <div className="w-1/12 border-r flex flex-col gap-3 p-2 sticky top-16 h-[calc(100vh-4rem)]">

        <MenuItem content="Khóa học"/>
        <MenuItem content="Bài viết "/>
        <MenuItem content="Hỏi đáp"/>
    </div>
  )
}

export default SideMenu