
      // Function to create the "someone is typing" effect
    function isTypingEffect(el) {
        let dots = 0;
        return setInterval(() => {
          //el.textContent = "`<strong>${(sender == 'Chatbot' ? 'HC Chatbot' : sender) }:</strong> `;" + ".".repeat(dots);
          el.innerHTML = "<strong>Chatbot: </strong>" + "<span class ='dots'>" + ".".repeat(dots) + "</span>";
          dots = (dots + 1) % 4; // Reset dots after the third dot
          el.scrollIntoView(false);
        }, 500); // Change typing speed here (milliseconds)
    }

    function findAndStrip(inputString, regex) {
    // Find the matching pattern
      const match = inputString.match(regex);

      if (match) {
          // Strip the matched part from the input string
          const strippedString = inputString.replace(regex, '');

          // Return the matched part
          return [strippedString, match[0]];
      } else {
          return [inputString, null]; // No match found
      }
    }

    function removeElementsByClass(className){
      const elements = document.getElementsByClassName(className);
      while(elements.length > 0){
          elements[0].parentNode.removeChild(elements[0]);
      }
    }

    function getDestUrl(destination, endpoint="generatetext") {

        switch (destination) {
            case "localhost":
                website = "http://localhost:7071/api/" + endpoint;
                params = "fred=blah"
                break;
            case "dev":
                website = "https://nga-d-weu-genai-rag-api.azurewebsites.net/api/" + endpoint;
                params = "";
                break;
            case "newdev":
                website = "https://alg-t-weu-genai-rag-api-05.azurewebsites.net/api/" + endpoint;
                params = "";
                break;
        }

        return {"website": website, "queryParams": params}

    }


    function assemble_params(prompt, chatHandle="") {
         var payload = {
          "UserParams": {
            "SuppliedPrompt": prompt
          },
          "TechnicalParams": {
            "type": "ragchat",
            //"Model": "gpt-4o",
            "SearchIndexName": "demo_help_centre",
            "ReturnSystemMessage": true,
            "ChatHandle": chatHandle
          }
         }
         return payload;


    }


    function sendAjax(url, params, callback, method='GET', payload=null) {
        var xmlhttp;

        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        }else{
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                callback(xmlhttp);
            }
            if (xmlhttp.readyState == 4 && xmlhttp.status == 500) {
                console.log("error 500 encountered");
                callback(xmlhttp);
            }
        }

        xmlhttp.open(method,url + '?' + params,true);
        if (payload === null) {
            xmlhttp.send();
        }
        else {
          try {
              xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
              xmlhttp.send(JSON.stringify(payload));
          }
          catch (e) {
              console.log("ajax send failed");
              callback(xmlhttp);

          }
        }


     }


