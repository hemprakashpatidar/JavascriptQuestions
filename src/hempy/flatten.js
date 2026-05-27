const flatten = (arr, res=[]) => {
    console.log(res, '___>>')
    arr.forEach(element => {
        if(Array.isArray(element)){
            flatten(element, res)
        }
        else {
            res.push(element)
        }
    });
   return res
}

const flatten2 = (arr) => {
    let res=[]
    arr.forEach((item) => {
        if(Array.isArray(item)){
             res.push(...flatten2(item))
        }
        else{
            res.push(item)
        }
    })
    return res
}

console.log(flatten([1, 2, 3, 4, [5, 6, [7, 8, 9], [10]], 11]));
console.log(flatten2([1, 2, 3, 4, [5, 6, [7, 8, 9], [10]], 11]));