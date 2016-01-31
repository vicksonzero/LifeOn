
// empty room = {roomName:"empty", weight:1},
var directorRules = [
    {
        name:"tutorial",
        condition: function(state){
            console.log("directorRules");
            return state.currentIndex.x==0;
        },
        maxRooms:1,
        mustHaveRooms:[
            {roomName:"spawnStreet1", weight:1},
        ]
    },
    {
        name:"tutorial",
        condition: function(state){
            return state.currentIndex.x==1;
        },
        maxRooms:2,
        mustHaveRooms:[
            {roomName:"spawnStreet2", weight:1},
            {roomName:"home1", weight:1},
        ]
    },
    {
        name:"tutorial",
        condition: function(state){
            return state.currentIndex.x==2;
        },
        maxRooms:1,
        mustHaveRooms:[
            {roomName:"home1", weight:1}
        ]
    },
















    
    {
        name:"house stay for 2 rounds",
        condition: function(state){
            return state.stat.seenHouse==1;
        },
        maxRooms:2,
        mustHaveRooms:[
            {roomName:"house", weight:1},
        ]
    },
    {
        name:"house small with wife",
        condition: function(state){
            interactive item called 地產
            return false;
        },
        maxRooms:1,
        mustHaveRooms:[
            {roomName:"empty", weight:1},
            {roomName:"empty", weight:1},
            {roomName:"empty", weight:1},
        ]
    },
    {
        name:"house big with wife",
        condition: function(state){
            return false;
        },
        maxRooms:1,
        mustHaveRooms:[
            {roomName:"house", weight:1},
        ]
    },
    {
        name:"others",
        condition: function(state){
            return false;
        },
        maxRooms:1,
        mustHaveRooms:[
            {roomName:"empty", weight:1},
            {roomName:"empty", weight:1},
            {roomName:"empty", weight:1},
        ]
    },
    {
        name:"church marriage",
        condition: function(state){
            return false;
        },
        maxRooms:1,
        mustHaveRooms:[
            {roomName:"empty", weight:1},
            {roomName:"empty", weight:1},
            {roomName:"empty", weight:1},
        ]
    },
];