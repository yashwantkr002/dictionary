const btn=document.getElementById("btn");
let cors='https://cors-anywhere.herokuapp.com/';
const api_endpiont="https://od-api.oxforddictionaries.com/api/v2/";
const options = {
	method: 'GET',
	headers: {
		      "Accept": "application/json",
	 	      "app_id": "ead7898e",
		      "app_key": "24758543ab5ff00d9def0ec437bd6dc8"

	         }
}



function fun(){
	let word=document.getElementById('input').value;
	let result=document.getElementById("result");
	let sound=document.getElementById("audio");
	let detail=document.getElementById("detail");
	let meaning =document.getElementById("meaning");
	let exmple =document.getElementById("exmple");
	let err=document.getElementById("err");


	apipath={
		tranlation:`${cors}${api_endpiont}translations/en/hi/${word}?strictMatch=false`,
		Sentences:`${cors}${api_endpiont}sentences/en/${word}?strictMatch=false`,
		Audio:`${cors}${api_endpiont}words/en-gb?q=${word}`
	}

    if(word.length>1){

       fetch(apipath.tranlation,options)
	   .then(res=>res.json())
	   .then(res=>{
		  resps=res.results;
		  if(Array.isArray(resps)&&resps.length){
			  
			  
			detail.innerHTML=  resps[0].lexicalEntries[0].lexicalCategory.text;
			meaning.innerHTML=resps[0].lexicalEntries[0].entries[0].senses[0].translations[0].text;
			 sound.style.display="block"; 
		//   console.log(resps)
			err.innerHTML="";
		  }
		  else{
			err.innerHTML="your word not found"
		  }
	   })
	   .catch(error=>console.error(error))
	

		// console.log(word);
		// err.innerHTML="";
	}
	else{
		err.innerHTML="please input valid word";
	}
	if(word.length>1){
	fetch(apipath.Sentences,options)
	.then(res=>res.json())
	.then(res=>{
		resps=res.results;
		if(Array.isArray(resps)&&resps.length){
            sent=resps[0].lexicalEntries[0].sentences[0].text;
			exmple.innerHTML=sent;
			// console.log(sent)
			
		}
		else{
			exmple.innerHTML='';
			
		}

	})
	.catch(error=>console.error(error))


	}

	if(word.length>1){
	fetch(apipath.Audio,options)
	.then(res=>res.json())
	.then(res=>{

		resps=res.results;
		// console.log(resps)
		if(Array.isArray(resps)&&resps.length){

	      mp3=resps[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile;

			document.getElementById("play").src=mp3;
			
		}

	})
	.catch(error=>console.error(error))

	}



}

btn.addEventListener("click",fun);
function start(abc){
       document.getElementById("play").play();
}