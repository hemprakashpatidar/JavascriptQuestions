// Partial Applicatiob -> to fill the some predefined values -> multiplyByTwo 
// Specific context

const hasRole = role => user => role == user.role

const isAdmin = hasRole("Admin")

users= [{
    name:"ABC",
    role: "Admin"
},{
    name:"QWE",
    role: "mod"
}

]

console.log(users.filter(isAdmin))

// Generic Curry Utiliyy function


function curry(fn) {
    console.log(fn.length)
    return function curried (...args){
        if(args.length >=fn.length ){
            return fn.apply(this,args)
        }
        return (...more) => curried(...args,...more)
    }

}





// const add = curry((a,b,c) => a+b+c)
const add = curry((a, b, c) => a + b + c);
console.log("curr-> ", add(1, 2,3))
console.log("curr-> ", add(1, 2)(3))
console.log("curr-> ", add(1)(2)(3))
console.log("curr-> ", add(1, 2))


// infinier 


const infiniteSumCurry = a => b => b ?  infiniteSumCurry(b+a) : a

console.log('inig', infiniteSumCurry(1)(2)(3)())


