// import一定要在最上面

// 匿名匯入
// import numbers from './default.js'

// 具名各個匯入
// 可以用as換變數名字
// 可用 * 一次匯入
// import {food1 as fruit1,food2,add}from './givename.js'
import * as fruits from './givename.js'

// console.log(numbers.number1);
// console.log(numbers.number2);
// console.log(numbers.add(5,10));

// console.log(food1);
// console.log(food2);
// console.log(add(2,3));

console.log(fruits.food1);
console.log(fruits.food2);
console.log(fruits.add(2,3));