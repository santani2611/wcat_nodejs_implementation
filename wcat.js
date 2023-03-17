//sabse pehle input ko manage karunga
let fs=require('fs');
let inputArr=process.argv.slice(2);
console.log(inputArr)
//mujhe options alag identify karne honge aur file alag
let optionsArr=[];
let filesArr=[];
//opt. start hote hai - se to jo bhi - se start ho wo option

for(let i=0;i<inputArr.length;i++)
{
    //firstChar nikal liya
let firstChar=inputArr[i].charAt(0);
//agar aapka first char - hai to wo ek option hai
//warna ek file hai
if(firstChar=='-')
{
    optionsArr.push(inputArr[i]);
}else{
    filesArr.push(inputArr[i]);
}
}
//console.log(optionsArr+"               "+filesArr)
if(optionsArr.includes("-n")&&optionsArr.includes("-b"))
{
    console.log("option can be either -n or -b");
    return;
}
for(let i=0;i<filesArr.length;i++)
{
let isFilePresent=fs.existsSync(filesArr[i]);
if(!isFilePresent)
{
    console.log( `file${filesArr[i]} is not present`);
    return;
}



}






//file ko read karne ke liye readfilesync
let content="";
for(let i=0;i<filesArr.length;i++)
{
let bufferContent=fs.readFileSync(filesArr[i]);
content+=bufferContent+'\n';



}
console.log(content);
//wcat -s flepath ye agar multiple line breaks honge to unko remove kar ek single line break lga dega
 //hum contnt to split karte hai line breaks ke basis pe
let contentArr=content.split("\r\n");
//console.log(contentArr);

//-s ka case
//heck karo ki user ne -s bola hai kya karne ko
let is_sPresent=optionsArr.includes("-s");
console.log(is_sPresent)
let flag=false;
if(is_sPresent)
{
    for(let i=0;i<contentArr.length;i++)
{
    
    if(contentArr[i]==''&&flag==false)
    {
       flag=true;
       continue;
    }
    else if(flag==true&&contentArr[i]=='')
    {
        let noofempty=0;
        let startIndex=i;
     while(contentArr[i]=='')
     {
     noofempty++;
     i++;
     }
     
     i--;
     contentArr.splice(startIndex,noofempty);
    }
  
    flag=false;
}
}
//console.log(contentArr.join('\n'));
//-n ka case
let is_nPresent=optionsArr.includes("-n");
if(is_nPresent)
{
    for(let i=0;i<contentArr.length;i++)
    {
        let num=i+1;
        contentArr[i]=num+"-"+contentArr[i]; 
    }
}
//console.log(contentArr);
//-b ka case

let is_bPresent=optionsArr.includes("-b");
if(is_bPresent)
{
    let counter=1;
    for(let i=0;i<contentArr.length;i++)
    {
    if(contentArr[i]!='')
        {contentArr[i]=counter+"-"+contentArr[i];
        counter++; }
    }
}
console.log(contentArr);


