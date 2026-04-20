function getExactTime({createdAt}){
   console.log(createdAt);
   const now = new Date();

   const years = Math.floor(( now-createdAt)/(1000*60*60*24*30*12));
   const months = Math.floor(( now-createdAt)/(1000*60*60*24*30));
   const days = Math.floor(( now-createdAt)/(1000*60*60*24));
   const hours = Math.floor(( now-createdAt)/(1000*60*60));
   const minutes = Math.floor(( now-createdAt)/(1000*60));
   const seconds = Math.floor(( now-createdAt)/(1000));

   if(years>0){
    return `${years} year`;
   }else if(months>0){
    return `${months} months`;
   }else if(days>0){
    return `${days} days`;
   }else if(hours>0){
    return `${hours} hours`;
   }else if(minutes>0){
    return `${minutes} minutes`;
   }
   
   return `${seconds} seconds`;

};


module.exports = getExactTime;