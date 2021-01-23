module.exports = function check(str, bracketsConfig) {
    let arr = str.slice('');
    const map = {};
    let counter = 0;

    for (let i = 0; i < bracketsConfig.length; i++) {
        if(bracketsConfig[i][0] === bracketsConfig[i][1]) {
            map[bracketsConfig[i][0]] = {type: 2,counter: []}
        } else {
            map[bracketsConfig[i][0]] = {type: 0,counter: []}
            map[bracketsConfig[i][1]] = {type: 1,opener: bracketsConfig[i][0]}
        }
    }

    for (let i = 0; i < arr.length; i++) {
        if(typeof map[arr[i]] === 'object') {
            if (map[arr[i]].type === 2) {
                if(map[arr[i]].counter.length > 0)  {
                    if (map[arr[i]].counter.pop() !== counter-1) return false;
                    counter--;
                } else {
                    map[arr[i]].counter.push(counter++);
                }
            }
            if (map[arr[i]].type === 0) {
                map[arr[i]].counter.push(counter++);
            }
            if (map[arr[i]].type === 1) {
                if (map[map[arr[i]].opener].counter.pop() !== counter-1) return false;
                else counter--;
            }
        }
    }

    for (let i = 0; i < bracketsConfig.length; i++) {
        if(map[bracketsConfig[i][0]].counter.length > 0) return false;
    }

    return true;

}
