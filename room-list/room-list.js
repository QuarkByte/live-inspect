var request = require("request")
var async = require("async")
var _ = require("lodash")
function getOnePageOfRoomLists(page,callback){
    request
        .post({
            url: 'https://m.douyu.com/roomlists',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            form: { page }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                callback(null,info)
            }else{
                callback(true)
            }
        })
}

function getRoomLists(callback){
    var is_not_finished = true;
    var page=1;
    var room_list_total=[]
    async.whilst(
        function() { return is_not_finished && page<20 },
        function(callback) {
            getOnePageOfRoomLists(page,(err,roomlist)=>{
                if(!err){
                    console.log(page)
                    page++;
                    is_not_finished=(parseInt(roomlist.nowPage)<parseInt(roomlist.pageCount))
                    //_.assign(room_list_total,roomlist)
                    room_list_total=_.union(room_list_total,roomlist.result)
                    callback(null)
                }else{
                    callback(true)
                }
            })
        },
        function (err, n) {            
            callback(err,room_list_total)
        }
    );
}

// getRoomLists((err,roomlist)=>{
// console.log(roomlist)
// })
module.exports.getRoomLists=getRoomLists