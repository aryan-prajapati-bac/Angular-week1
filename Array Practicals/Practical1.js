
/////////----- Practical 2A-----///////////////

let arr1=[1,2,3,4,5,6]
arr1=arr1.map(num=>num*2);
console.log(arr1);




////////----- Practical 2B ------////////////

let input=[0,23,0,0,0,4,6,0,8,10,0,0,0,12]

// sorting input array
input.sort((a,b)=>a-b);   
let i;            

// finding first non-zero index
for(let element of input){
   
    if(element !== 0) 
    {
        i=input.indexOf(element);
        break;
    }
}

// slicing input arrays into values and zeroes based on index
let values=input.slice(i);
let zeroes=input.slice(0,i);

// storing last element of values into an variable
let lastElement=values[values.length-1];

// copying elements into an index before
for(let i=values.length-1;i>0;i--){
    values[i]=values[i-1];
}

// setting first element 
values[0]=lastElement;

// concatinating values and zeroes arrays into finalArray
let finalArray=values.concat(zeroes);

console.log(finalArray);
