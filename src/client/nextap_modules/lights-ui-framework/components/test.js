


var cauculatePosition = function (id, command) {
    //need how many byte to store the id 
    var result = [];
    var needBytes = parseInt(id / 8) + 1
    var packetLength = parseInt(4 + needBytes).toString(16);

    if (parseInt(packetLength, 16) < 16) {
        packetLength = "0" + packetLength;
    }

    var remainder = id - (needBytes - 1) * 8

    var binarArray = [0, 0, 0, 0, 0, 0, 0, 0]


    binarArray[remainder] = 1;

    var binarString = ''
    binarArray.map(function (item) {
        binarString += item;
    })
    console.log(binarString)
    var hexString = parseInt(binarString, 2).toString(16);



    if (command === "group_assign") {
        if (remainder > 3) {
            hexString = "0" + hexString;
        }
    }

    if (command === "save_scene") {
        if (remainder > 3) {
            hexString = "0" + hexString;
        }
    }


    for (var i = 0; i < needBytes - 1; i++) {
        hexString = "00" + hexString;
    }
    result.push(hexString);
    result.push(packetLength);
    return result;
}

//console.log(cauculatePosition(5, "save_scene"));
//console.log(parseInt(10, 10).toString(16));
var sceneTime = parseInt(3600, 10).toString(16);
if (sceneTime.length < 4) {
    var zeroCounter = 4 - sceneTime.length;
    for (var i = 0; i < zeroCounter; i++) {
        sceneTime = '0' + sceneTime
    }
}
//console.log(sceneTime);

var test = function (str) {

    var paserRes = parseInt(str);
    if (paserRes < 16 && paserRes > 0) {
        return "0" + paserRes.toString(16);
    } else {
        return paserRes.toString(16);
    }
}

//console.log(test(255));

var arry = "12,13".split(",");
console.log(arry[1]);