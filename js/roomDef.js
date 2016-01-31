// room 480 x 160

var roomDef = {
    // special
    "empty":{
        bg:"",
        props:[]
    },
    // tutorial
    "spawnStreet1":{
        bg:"street",
        props:[]
    },
    "home1":{
        bg:"home",
        props:[
            {name:"bookGeneric", type:"enemy", x:240, y:100}
        ]
    },
    "spawnStreet2":{
        bg:"street",
        props:[]
    },
    "home2":{
        bg:"home",
        props:[
            {name:"milkBottle", type:"food", x:240, y:100}
        ]
    },
    "home3":{
        bg:"home",
        props:[
            {name:"milkBottle", type:"food", x:240, y:100},
            {name:"bookGeneric", type:"food", x:140, y:100}
        ]
    },
    // teen
    "school":{
        bg:"schoolbackground",
        props:[
            {name:"schoolmateWithHeart", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"book", type:"enemy", x:240, y:100},
            {name:"rocketBook", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },
    "street":{
        bg:"street",
        props:[
            {name:"schoolmateWithHeart", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"gangsterWithDrug", type:"character", x:240, y:100},  // with drugs
            {name:"gangsterWithMoney", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },
    //adult
    "office":{
        bg:"office",
        props:[
            {name:"crush", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"gangsterWithDrug", type:"character", x:240, y:100},  // with drugs
            {name:"gangsterWithMoney", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },
    "office":{
        bg:"office",
        props:[
            {name:"crush", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"gangsterWithDrug", type:"character", x:240, y:100},  // with drugs
            {name:"gangsterWithMoney", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },
    "hospital":{
        bg:"hospital",
        props:[
            {name:"crush", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"gangsterWithDrug", type:"character", x:240, y:100},  // with drugs
            {name:"gangsterWithMoney", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },
    "nasa":{
        bg:"nasa",
        props:[
            {name:"crush", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"gangsterWithDrug", type:"character", x:240, y:100},  // with drugs
            {name:"gangsterWithMoney", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },
    "park":{
        bg:"park",
        props:[
        ]
    },



    "home2":{
        bg:"home",
        props:[
            {name:"milkBottle", type:"food", x:240, y:100}
        ]
    },
    "houseWithWife":{
        bg:"home",
        props:[
            {name:"baby", type:"character", x:240, y:100},
            {name:"wife", type:"character", x:240, y:100},
            {name:"gameController", type:"food", x:240, y:100}
        ]
    },
    "houseWithoutWife":{
        bg:"home",
        props:[
            {name:"gameController", type:"food", x:240, y:100}
        ]
    }

};

var roomDefArray = [];

for(var key in roomDef){
    if(roomDef.hasOwnProperty(key)){
        roomDef[key].name = key;
        roomDefArray.push(roomDef[key]);
    }
}
