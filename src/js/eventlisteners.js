
    function sendButtonClicked(event) {

      document.getElementById("ratings-buttons").style.visibility = "hidden";
      document.getElementById("feedback-logged").innerHTML = "";
      const userMessage = userInput.value.trim();
      if (userMessage !== '') {

          var destUrl = getDestUrl(destination);
          sendAjax(destUrl.website, destUrl.queryParams, ajaxReturned, method = "POST", payload = assemble_params(userMessage, chatHandle = chatHandle));

          appendMessage('You', userMessage);
          clearUserInput();
          deleteAllRows();
      }
    }

    function clearChatButtonClicked(event) {
        initChatContainerHTML();
        setChatHandle("");
        setChatNum(-1);

    }


    // function versClicked(event) {
    //     $('#exampleModal').modal('show');
    // }
    //
    function userInputDone(event) {
      if (event.key === 'Enter') {
        console.log('Enter key pressed!');
        sendButtonClicked(event);

      }
    }

    function techInfoButtonClicked(event) {
       showTechnicalInfo = !showTechnicalInfo;
       toggleTechInfo();
    }

    function ratingsButtonClicked(event) {
       //alert(event.value);

       var ratings = {
           1: {"unicodeChar": "&#128078;", "reaction": "ThumbsDown"},
           3: {"unicodeChar": "&#128528;", "reaction": "Neutral"}, //"&#128578;",
           5: {"unicodeChar": "&#128077;", "reaction": "ThumbsUp"}, //"&#128077;"
       }
       var ratingsChar = ratings[event.value].unicodeChar;

       var chatContainer = document.getElementById("chat-container");
       var latestMessage = chatContainer.lastChild;
       var insertPos = latestMessage.innerHTML.indexOf("<br>["); // beginning of citations
       if (insertPos == -1) {
           latestMessage.innerHTML += ratingsChar;
       }
       else {
           latestMessage.innerHTML = latestMessage.innerHTML.slice(0, insertPos) + ratingsChar + latestMessage.innerHTML.slice(insertPos);
       }
       document.getElementById("ratings-buttons").style.visibility = "hidden";

       var destUrl = getDestUrl(destination, endpoint="feedback");
       var payload =
           {"ChatHandle": chatHandle,
            "ChatNum": chatNum,
            "Reaction": ratings[event.value].reaction,
            "Comment": ""}
       sendAjax(destUrl.website, destUrl.queryParams, feedbackAjaxReturned, method = "POST", payload = payload);


    }



    function ajaxReturned(xmlhttp) {
        var parsed = JSON.parse(xmlhttp.responseText);
        console.log('Got stuff. Result: ' + parsed["GeneratedText"]);
        botResponse(parsed["GeneratedText"]);
        setChatHandle(parsed["Chat"]["ChatHandle"]);
        setChatNum(parsed["Chat"]["ChatNum"]);
        showTechInfo(parsed);
        return parsed

    }

    function feedbackAjaxReturned(xmlhttp) {
        console.log('Feedback logged. Result: ' + xmlhttp.responseText);
        if (xmlhttp.status == 200) {
            document.getElementById("feedback-logged").innerHTML = "f";
        }
        else {
           document.getElementById("feedback-logged").innerHTML = "x";
        }
    }


