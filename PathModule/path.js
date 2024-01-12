const path=require('path');
// C:/Users/This PC/Desktop/NODEJS BACKEND PROJECT/PathModule/path.js
console.log(path.dirname('C:/Users/This PC/Desktop/NODEJS BACKEND PROJECT/PathModule/path.js'));
console.log(path.extname('C:/Users/This PC/Desktop/NODEJS BACKEND PROJECT/PathModule/path.js'));
console.log(path.basename('C:/Users/This PC/Desktop/NODEJS BACKEND PROJECT/PathModule/path.js'));

// console.log(path.parse('C:/Users/This PC/Desktop/NODEJS BACKEND PROJECT/PathModule/path.js'));
const myPath=path.parse('C:/Users/This PC/Desktop/NODEJS BACKEND PROJECT/PathModule/path.js');
console.log(myPath.name);
