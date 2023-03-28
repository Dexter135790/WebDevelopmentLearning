
exports.getDate = function(){
// Date object 
const today = new Date();
    
// Date format object 
const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

// Get today date format in specific options format 
return today.toLocaleDateString("en-US", options);
}

exports.getDay = function(){
    const today = new Date();
        
    const options = {
        weekday: "long"
    };
    
    return today.toLocaleDateString("en-US", options);
    }

