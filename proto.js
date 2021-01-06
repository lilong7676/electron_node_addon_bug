// const addon = require('bindings')('node-addon')
const addon = require('./node-addon.node')
let proto = new addon.Proto();

let logined = false;

//////////////////////////// test

let clientId = proto.getClientId();
console.log('----clientId ', clientId);

proto.setEventListener(function (event, data) {
    console.log("事件 setEventListener ", event, " data ", data);
})

proto.setConnectionStatusListener(function (status) {
    console.log('js -- 连接状态 ', status);
})

proto.setReceiveMessageListener(
    // onReceiveMessage
    function (msg, hasMore) {
        console.log('js -- 收到消息 hasMore ', hasMore ,"  ", msg);
        const msgArr = JSON.parse(msg);
        msgArr.forEach(obj => {
            console.log(obj);
        })
    },
    // onRecallMessage
    function (operatorId, recallMsgUId) {
        console.log("js -- 撤回消息 operatorId ", operatorId, "recallMsgUId ", recallMsgUId);
    }
)

proto.setGroupInfoUpdateListener(function (groupInfoList) {
    console.log("js setGroupInfoUpdateListener -- 收到群组信息更新");
    console.log(JSON.parse(groupInfoList));
})

proto.setGroupMemberUpdateListener(function (groupId) {
    console.log("js setGroupMemberUpdateListener -- 收到群组成员更新", groupId);
})

// set
proto.setServerAddressAndPort('im.erplus.co', 80);
// connect by companyInfoId token
proto.connect('10038624', 'l/5sbXBAoHDvUyoH0KMH0qgQqldlqnbTVOBKKMPetleW9Cg1KEx4Z7lqiPoscp4M37KwbyYNVQ9j0QdIXHHxY1XRDNZNPkCiNFGYJEImo2aQ7Mh6v6OOdPtHS9XvZQBw1Dltz2D45MIX1WnFEfpXXbf5I4d/FlAfIYief8N1vymx4sWgTJZmwSKpr73fdoRV')

// setTimeout(function () {
//     console.log('---- 首次断开');
//     proto.disconnect(false);
// }, 5000);

// 获取会话列表
setTimeout(function () {
    let cl = proto.getConversationInfos([0,1,2,3],[0]);
    cl = JSON.parse(cl);
    if (cl) {
        cl.forEach(conv => {
            console.log("会话 ", conv);
        })
    }
}, 3000);
//
// setTimeout(function () {
//     let payload = '';
//     proto.quitGroup("mVpimiEE", [0], '', () => {
//         console.log('-------退群成功');
//     }, (errorCode) => {
//         console.log('-------退群失败 ', errorCode);
//     });
//
// }, 5000);

// 获取会话详情
// setTimeout(function () {
//     let conv = proto.getConversationInfo(JSON.stringify({"type": 0, "target": "10002001", "line": 0}));
//     console.log("conv --- ", JSON.parse(conv));
// }, 8000);
//
//
// setTimeout(function () {
//     let groupInfo = proto.getGroupInfo("AtAaAaqq", false); // refresh = false;
//     console.log("getGroupInfo --- ", JSON.parse(groupInfo));
// }, 10000);


// getMessages
// setTimeout(function () {
//     const msg = proto.getMessages(
//         // conv
//         JSON.stringify({"type": 0, "target": "10002001", "line": 0}),
//         // fromIndex
//         0,
//         // before
//         true,
//         // count
//         2,
//         // withUser
//         "",
//         // contentTypes
//         []
//
//         );
//     const msgArr = JSON.parse(msg);
//     console.log("获取到消息", msgArr);
// }, 11000);

// getRemoteMessage
// setTimeout(function () {
//     proto.getRemoteMessage(
//         // conv
//         JSON.stringify({"type": 0, "target": "10002001", "line": 0}),
//         // beforeMessageUid
//         '0',
//         // count
//         5,
//         // successCb
//         function (messageListStr) {
//             let list = JSON.parse(messageListStr);
//             console.log("收到远程消息", list);
//         },
//         // failCb
//         function (failStr) {
//             console.log("远程消息加载失败 ", failStr);
//         }
//     );
// }, 12000);
//
// sendMessage
setTimeout(function () {
    console.log('js -- sendMessage');
    proto.sendMessage(
        // conv
        JSON.stringify({"type": 0, "target": "10002001", "line": 0}),
        // content
        JSON.stringify({
            "type": 1,
            "searchableContent": "from desktop" + Math.random(),
            "extra": JSON.stringify({"uniqueId" : Math.random().toString()})
        }),
        // toUsers
        [],
        // expireDuration
        0,
        // prepareCb
        function(messageId, timestamp) {
            console.log("发送prepareCb", messageId, " timestamp ", timestamp);
        },
        // successCb
        function (messageUid, timestamp) {
            console.log("发送成功", messageUid, " timestamp ", timestamp);
        },
        // failcb
        function (code) {
            console.log("发送失败 ", code);
        }
    )
    }, 5000);

setTimeout(function () {

}, 1000000);
