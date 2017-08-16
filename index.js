var room_list = require("./room-list/room-list.js")
room_list.getRoomLists((err,roomlist)=>{
    console.log(roomlist)
})