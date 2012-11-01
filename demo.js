var gel = require('gel-js'),
    cli = require('readline').createInterface(process.stdin, process.stdout, completer),
    context = {};

cli.setPrompt("> ", 2);
cli.on('line', function(line) {
    try{
    
    
        /*************************
            ******************
                **********
                    */
                    
        var result = gel.parse(line, context);
        
                    /*
                **********
            ******************
        *************************/

        
        console.log(''+result);
    }catch(err){    
        console.log(err);    
    }
    console.log(""); 
    cli.prompt();
});
cli.prompt();













































gel.functions["stupidFunction"] = function(value){
    return "this function is stupid: " + value;
};



















































gel.tokenConverters.primitives["myStupidToken"] = function(expression){
    
    if(expression.indexOf("OMG") === 0){
    
        var value = "WTF",
            index = 3, //3 characters were processed
            type = 'OMG',
            callback = function(value, scope){
                var date = new Date();
                return value + " IT'S " + date.getHours() % 12 + ":" + date.getMinutes() + (date.getHours() >= 12 ? 'PM' : 'AM' ) + " ALREADY!";
            };
       
        return gel.tokenResult(value, index, type, callback);
        
    }

    return;
};




















































function completer(line){
    var lastToken = line.match(/[$A-Z_][0-9A-Z_$]*$/i),
        restOfLine = line.replace(/[$A-Z_][0-9A-Z_$]*$/i, ''),
        hits =[],
        completions = [];
        
    for(var key in gel.functions){
        completions.push(key);
        if (key.indexOf(lastToken) == 0) {
            // console.log('bang! ' + key);
            hits.push(restOfLine + key + " ");
        }
    }
    
    return [hits && hits.length ? hits : completions, line];
};







































//gel.functions['='] = gel.functions['=='];





















































context.newLine = "                                                                                                                                                                                                           ";

context.attendies = [
    {
        firstname: "John",
        surnam: "Smith",
        age: 20
    },
    {
        firstname: "Bob",
        surnam: "Down",
        age: 90
    }
];

context.time = new Date(2012, 10, 5, 18, 0);

context.address = "Toowong Library";

context.sponsors = [
    "ninefold",
    "YOW!"
];

context.topics = [
    {
        speaker: "Jonathan Gros-Dubois",
        title: "Introducing nCombo: a new Node Framework",
        tags: ["node", "framework", "nCombo"]
    },
    {
        speaker: "Tim Oxley",
        title: "Harmony in Node: New JavaScript features you can use in Node today",
        tags: ["node"]
    },
    {
        speaker: "Thomas Davis",
        title: "Node as a Chrome extension, a Node server wherever you go",
        tags: ["node", "chrome", "extendion"]
    },
    {
        speaker: "Damon Oehlman",
        title: "Better than MVC: Think about other approaches before picking up the MVC hammer (from his talk at Web Directions South)",
        tags: ["MVC", "Hammer"]
    }
];













//(last (filter topics {topic (== topic.speaker "Tim Oxley")})).title







//(concat "  topics including 'node'> " (fold (filter topics {topic (contains topic.tags "node")}) " " {result current (concat result current.title "," newLine)}))








// (timeBetween dateTimeNow time 'days')






















function toArray(args){
    return Array.prototype.slice.call(args);
}


gel.functions["fold"] = function fold(){
    var args = toArray(arguments),
        fn = args.pop(),
        seed = args.pop(),
        array = args[0],
        result = seed;
    
    if(args.length > 1){
        array = args;
    }
        
    for(var i = 0; i < array.length; i++){
        result = fn.call(this, result, array[i]);
    }
    
    return result;
};


    
gel.functions['timeBetween'] = function toStrings(date1, date2, units){
    var result = Math.max(date1, date2) - Math.min(date1, date2),
        seconds = 1000,
        hours = minutes = 60,
        days = 24;
    
    if(units == 'days'){
        result = result / seconds / minutes / hours/ days;
    }
    
    if(units == 'hours'){
        result = result / seconds / minutes / hours;
    }
    
    if(units == 'minutes'){
        result = result / seconds / minutes;
    }
    
    if(units == 'seconds'){
        result = result / seconds;
    }
    
    return result;
};





gel.tokenConverters.primitives["dateTimeNow"] = function(expression){
    
    if(expression.indexOf("dateTimeNow") === 0){
    
        var value = "dateTimeNow",
            index = value.length,
            type = 'dateTimeNow',
            callback = function(value, scope){
                return new Date();
            };
       
        return gel.tokenResult(value, index, type, callback);
        
    }

    return;
};





















