export class Chat {
    constructor({position = 'bottom-right'} = {}) {
        this.position = this.getPosition(position);
        this.open = false;
        this.initialize();
        this.createStyles(position);
    }
    getPosition(position) {
        const [vertical, horizontal] = position.split('-');
        this.vertical = [vertical];
        this.horizontal = [horizontal];
        return {
            [vertical]: '30px',
            [horizontal]: '30px'
        }
    }
    initialize() {
        const widgetContainer = document.createElement('div');
        widgetContainer.style.position = 'fixed';
        Object.keys(this.position).forEach(key => {
            widgetContainer.style[key] = this.position[key];
        })
        document.body.appendChild(widgetContainer);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const chatIcon = document.createElement('img');
        chatIcon.src = 'assets/chat.svg';
        chatIcon.classList.add('icon');
        this.chatIcon = chatIcon;

        const closeIcon = document.createElement('img');
        closeIcon.src = 'assets/cross.svg';
        closeIcon.classList.add('icon', 'hidden');
        this.closeIcon = closeIcon;

        this.messageContainer = document.createElement('div');
        this.messageContainer.classList.add('hidden', 'message-container');

        this.createMessageContainerContent();

        buttonContainer.appendChild(chatIcon);
        buttonContainer.appendChild(closeIcon);
        buttonContainer.addEventListener('click', this.toggleOpen.bind(this));

        widgetContainer.appendChild(buttonContainer);
        widgetContainer.appendChild(this.messageContainer);

    }

    createStyles(position) {
        const styleTag = document.createElement('style');
        document.head.appendChild(styleTag);
        styleTag.innerHTML =
        `.message-container {
            width: 400px;
            max-height: 400px;
            box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1);
            transition: max-height 0.2 ease;
            font-family: Helvetica, Arial, sans-serif;
            ${this.horizontal}: -25px;
            ${this.vertical}: 75px;
            position: absolute;
        }
        .message-container.hidden {
            max-height: 0px;
        }
        .button-container {
            width: 70px;
            height: 70px;
            background-color: #04b73f;
            border-radius: 50%;            
        }
        .hidden {
            transform: scale(0);
        }
         .icon {
            cursor: pointer;
            width: 70%;
            position: absolute;
            top: 9px;
            left: 9px;
            transition: transform .3s ease;
        }
         .message-container h2 {
           margin: 0;
           padding: 20px;
           color: #fff;
           background-color: #04b73f;
        }
         .message-container .content {
           margin: 20px 10px;
           border: 1px solid #dbdbdb;
           padding: 10px;
           display: flex;
           background-color: white;
           flex-direction: column;
        }   
          .message-container form * {
               margin: 5px 0;
            }
            
            .message-container form input {
               padding: 10px;
            }
            
            .message-container form textarea {
               height: 100px;
               padding: 10px;
            }
            
            .message-container form textarea::placeholder {
               font-family: Helvetica, Arial, sans-serif;
            }
            
            .message-container form button {
               cursor: pointer;
               background-color: #04b73f;
               color: white;
               border: 0;
               border-radius: 4px;
               padding: 10px;
            }
            .message-container form button:hover {
               background-color: #16632f;
            }
        `
    }

    createMessageContainerContent() {
       this.messageContainer.innerHTML = '';
       const title = document.createElement('h2');
       title.textContent = 'Send us your feedback';

       const form = document.createElement('form');
       form.classList.add('content');

       const email = document.createElement('input');
        email.required = 'true';
        email.id = 'email';
        email.type = 'email';
        email.placeholder = 'Enter your email address';

       const message = document.createElement('textarea');
        message.required = 'true';
        message.id = 'message';
        message.placeholder = 'Your message';

        const btn = document.createElement('button');
        btn.textContent = 'Submit';

        form.appendChild(email);
        form.appendChild(message);
        form.appendChild(btn);
        form.addEventListener('submit', this.submit.bind(this));

        this.messageContainer.appendChild(title);
        this.messageContainer.appendChild(form);

    }

    submit(e) {
        e.preventDefault();
        const formSubmission =  {
            email: e.srcElement.querySelector('#email').value,
            message: e.srcElement.querySelector('#message').value,
        }

        this.messageContainer.innerHTML = '<h2> Thanks for your submission! </h2>';
        console.log(formSubmission);
    }

    toggleOpen() {
        this.open = !this.open;
        if(this.open) {
            this.chatIcon.classList.add('hidden');
            this.closeIcon.classList.remove('hidden');
            this.messageContainer.classList.remove('hidden');
        } else {
            this.createMessageContainerContent();
            this.chatIcon.classList.remove('hidden');
            this.closeIcon.classList.add('hidden');
            this.messageContainer.classList.add('hidden');
        }
    }
}