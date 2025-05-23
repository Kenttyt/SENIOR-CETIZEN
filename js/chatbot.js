document.addEventListener('DOMContentLoaded', function() {
        // Get DOM elements
        const chatWidget = document.getElementById('chat-widget');
        const chatBubble = document.getElementById('chat-bubble');
        const chatContainer = document.getElementById('chat-container');
        const chatClose = document.getElementById('chat-close');
        const chatMessages = document.getElementById('chat-messages');
        const chatInputField = document.getElementById('chat-input-field');
        const chatSendBtn = document.getElementById('chat-send-btn');
        const typingIndicator = document.getElementById('typing-indicator');
        
        // Sample responses for the offline AI in Bisaya (Cebuano)
        const botResponses = [
            "Ako imong offline AI assistant. Unsay akong ikatabang?",
            "Maayo na nga pangutana. Pahuway sa kadiyot kay maghunahuna ko.",
            "Wala koy access sa internet, pero makatabang ko sa mga pangutana nimo.",
            "Gidesinyo ko para makatabang sa lainlaing buluhaton. Unsay laing gusto nimo mahibal-an?",
            "Ania ko para motabang! Pangutana lang unsay imong gusto.",
            "Nindot na nga pangutana! Malipay ko nga motabang ana.",
            "Nasabtan nako imong hangyo. Mao ni akong masulti bahin ana...",
            "Salamat sa pagpaambit niana kanako. Naay piho nga gusto ka mahibal-an?",
            "Giproseso nako imong hangyo offline. Ang akong mga tubag kay nakaprograma na daan.",
            "Salamat sa imong pagpailob. Unsay laing ikatabang nako nimo karon?"
        ];
        
        // Toggle chat widget visibility
        chatBubble.addEventListener('click', function() {
            chatWidget.classList.toggle('expanded');
            if (chatWidget.classList.contains('expanded')) {
                chatInputField.focus();
            }
        });
        
        // Close chat widget
        chatClose.addEventListener('click', function() {
            chatWidget.classList.remove('expanded');
        });
        
        // Send message function
        function sendMessage() {
            const message = chatInputField.value.trim();
            if (message === '') return;
            
            // Add user message
            addMessage(message, 'user');
            chatInputField.value = '';
            
            // Auto resize the textarea
            autoResizeTextarea();
            
            // Show typing indicator
            typingIndicator.style.display = 'block';
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate bot response after a delay
            setTimeout(function() {
                typingIndicator.style.display = 'none';
                
                // Get random response from the array
                const randomIndex = Math.floor(Math.random() * botResponses.length);
                const botResponse = botResponses[randomIndex];
                
                addMessage(botResponse, 'bot');
            }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
        }
        
        // Add message to chat
        function addMessage(message, sender) {
            const messageContainer = document.createElement('div');
            messageContainer.className = `message-container ${sender}-container`;
            
            const messageElement = document.createElement('div');
            messageElement.className = `message ${sender}-message`;
            messageElement.textContent = message;
            
            const timestamp = document.createElement('span');
            timestamp.className = 'timestamp';
            timestamp.textContent = getCurrentTime();
            
            messageContainer.appendChild(messageElement);
            messageContainer.appendChild(timestamp);
            
            chatMessages.appendChild(messageContainer);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Get current time in format HH:MM
        function getCurrentTime() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12
            minutes = minutes < 10 ? '0' + minutes : minutes;
            
            return `${hours}:${minutes} ${ampm}`;
        }
        
        // Auto resize textarea as user types
        function autoResizeTextarea() {
            chatInputField.style.height = 'auto';
            const newHeight = Math.min(chatInputField.scrollHeight, 80);
            chatInputField.style.height = newHeight + 'px';
        }
        
        // Event listeners
        chatSendBtn.addEventListener('click', sendMessage);
        
        chatInputField.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        chatInputField.addEventListener('input', autoResizeTextarea);
        
        // Auto resize textarea initially
        autoResizeTextarea();
    });
