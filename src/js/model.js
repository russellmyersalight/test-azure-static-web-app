
   var chatHandle = "";
   var chatNum = -1;
   var destination = "newdev";  // (or "dev" or "localhost")
   var isTypingInterval = null; // interval timer for "is typing" effect
   var showTechnicalInfo = false;

   function setChatHandle(ch) {
      chatHandle = ch;
      showChatHandle(ch);
   }

   function setChatNum(n) {
      chatNum = n;
   }