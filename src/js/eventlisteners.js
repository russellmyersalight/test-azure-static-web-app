
    function sendButtonClicked(event) {

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


    function ajaxReturned(xmlhttp) {
        var parsed = JSON.parse(xmlhttp.responseText);
        console.log('Got stuff. Result: ' + parsed["GeneratedText"]);
        botResponse(parsed["GeneratedText"]);
        setChatHandle(parsed["Chat"]["ChatHandle"]);
        showTechInfo(parsed);
        return parsed

    }


