    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const clearBtn = document.getElementById('clear-btn');


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

    function clearUserInput() {
        userInput.value = '';
    }

    function initChatContainerHTML() {
        chatContainer.innerHTML = "<p className=\"message\"><i>Hello! How can I assist you with queries on the Alight Help centre?</i></p>";
    }


