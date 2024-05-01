
    function sendButtonClicked(event) {

      const userMessage = userInput.value.trim();
      if (userMessage !== '') {

          var destUrl = getDestUrl(destination);
          sendAjax(destUrl.website, destUrl.queryParams, ajaxReturned, method = "POST", payload = assemble_params(userMessage, chatHandle = chatHandle));

          appendMessage('You', userMessage);
          clearUserInput();
      }
    }

    function clearChatButtonClicked(event) {
        initChatContainerHTML();
        setChatHandle("");

    }


    function ajaxReturned(xmlhttp) {
        var parsed = JSON.parse(xmlhttp.responseText);
        console.log('Got stuff. Result: ' + parsed["GeneratedText"]);
        botResponse(parsed["GeneratedText"]);
        setChatHandle(parsed["Chat"]["ChatHandle"]);
        return parsed

    }


