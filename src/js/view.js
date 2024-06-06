    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const clearBtn = document.getElementById('clear-btn');
    const tBody = document.getElementById('technical-table-body');
    const techInfoButton = document.getElementById('tech-info-button');


    function appendChatBotResponseMessage(messageElement, message) {
        result  = findAndStrip(message, /\[.*?\]/);
        message = result[0];
        citations = result[1];

        // Remove  chatbot "is typing" effect
        removeElementsByClass("typing-text");
        clearInterval(isTypingInterval);

        // Now write chatbot response with typewriter feel
        let i = 0;
        const typingEffect = setInterval(() => {
          messageElement.innerHTML += message[i];
          i++;
          if (i === message.length) {
            clearInterval(typingEffect);
            if (citations != null) {
              messageElement.innerHTML += ('<br>' + citations);
            }
            document.getElementById("ratings-buttons").style.visibility = "visible";
          }
          messageElement.scrollIntoView(false);
        }, 20);

    }

    function appendUserMessage(messageElement, message) {

        // Output user message
        messageElement.innerHTML += message;
        messageElement.scrollIntoView(false);

        // Kick off chatbot "is typing" effect
        const messageTypingElement = document.createElement('p');
        messageTypingElement.classList.add('typing-text');
        isTypingInterval = isTypingEffect(messageTypingElement);
        chatContainer.appendChild(messageTypingElement);



    }

    function appendMessage(sender, message) {
      var messageElement = document.createElement('p');
      messageElement.classList.add('message');
      messageElement.innerHTML = `<strong>${(sender == 'Chatbot' ? 'Chatbot' : sender) }:</strong> `;
      chatContainer.appendChild(messageElement);

      if (sender == 'Chatbot') {
          appendChatBotResponseMessage(messageElement, message);
      }
      else {
          appendUserMessage(messageElement, message);
      }
      return;

      if (sender == 'Chatbot') {
        result  = findAndStrip(message, /\[.*?\]/);
        message = result[0];
        citations = result[1];
      }

      // Typewriter effect

      var useTypewriter = false;
      if (sender == 'Chatbot') {
          useTypewriter = true;
      }
      if (useTypewriter) {
        result  = findAndStrip(message, /\[.*?\]/);
        message = result[0];
        citations = result[1];

        removeElementsByClass("typing-text");
        clearInterval(isTypingInterval);

        let i = 0;
        const typingEffect = setInterval(() => {
          messageElement.innerHTML += message[i];
          i++;
          if (i === message.length) {
            clearInterval(typingEffect);
            if (citations != null) {
              messageElement.innerHTML += ('<br>' + citations);
            }

          }
        }, 20);

      }
      else {
        messageElement.innerHTML += message;
        const messageTypingElement = document.createElement('p');
        messageTypingElement.classList.add('typing-text');
        isTypingInterval = isTypingEffect(messageTypingElement);
        chatContainer.appendChild(messageTypingElement);
        messageElement.scrollIntoView(false);
      }


    }


    function botResponse(botMessage) {

      setTimeout(() => {
        appendMessage('Chatbot',botMessage);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 50);
    }


    function showChatHandle(ch) {
        document.getElementById("chat-handle").innerHTML = ch == "" ?  "" : ("Chat handle: " + ch);
    }

    function showTechInfo(parsed) {
        j = parsed.TechnicalParamsUsed;
        var usefulParams = ["AIService", "APICodeVersion", 'Embedding Model (relevant for type "ragchat" only)',
                             "Azure OpenAI endpoint used (relevant for AIService AzureOpenAI only)", "Model", "type"];
        var infoTable = [["Chat Handle", parsed.Chat["ChatHandle"]], ['Chat Num', parsed.Chat["ChatNum"]]];
        for (const [key, value] of Object.entries(j)) {
           var row = [key, JSON.stringify(value)];
           infoTable.push(row);
        }

        if ("ContextList" in parsed) {
             var searchScores = [];
             j2 = parsed.ContextList;
             for (item of j2) {
                 searchScores.push(item["search_score"].toFixed(3));
             }
             var searchScoresStr = searchScores.join(', ');
             infoTable.push(["SearchScores", searchScoresStr]);


        }


        for (i=0;i<infoTable.length;++i) {
            infoTable[i][0] = infoTable[i][0].replace('(relevant for type "ragchat" only)', '');
            infoTable[i][0] = infoTable[i][0].replace('(relevant for AIService AzureOpenAI only)', '');
        }


        populateTable(infoTable);


    }

    // Function to delete all rows from the technical info table
    function deleteAllRows() {
        tBody.innerHTML = ''; // Clear all rows
        var row = tBody.insertRow();
          row.insertCell(0).textContent = '';
          row.insertCell(1).textContent = 'Query in process';

    }

      // Function to populate the table with JSON data
    function populateTable(data) {
        tBody.innerHTML = ''; // Clear existing rows


        data.forEach(function(item) {
          var row = tBody.insertRow();
          row.insertCell(0).textContent = item[0];
          row.insertCell(1).textContent = item[1];

        });
    }


    function clearUserInput() {
        userInput.value = '';
    }

    function initChatContainerHTML() {
        chatContainer.innerHTML = "<p className=\"message\"><i>Hello! How can I assist you with queries on the Alight Help centre?</i>";  //<br><br><small><i>(Hint: Click 'clear chat' button when changing conversation topics for better performance)</i></small></p>";
    }

    function toggleTechInfo() {
        techInfoDiv = document.getElementById("tech-info-div");
        techInfoDiv.style.visibility = showTechnicalInfo ? 'visible' : 'hidden';


    }


