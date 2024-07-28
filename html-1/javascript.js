class MyCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const card = document.createElement('div');
        card.classList.add('card');

        const header = document.createElement('div');
        header.classList.add('header');
        const imgHeader = document.createElement('img');
        imgHeader.src = 'Jalasoft.png';
        header.appendChild(imgHeader)

        const main = document.createElement('div');
        main.classList.add('main');
        const img = document.createElement('img');
        img.src = 'lion.jpg';
        const name = document.createElement('div')
        name.textContent = 'Lion';
        main.appendChild(img)
        main.appendChild(name);

        const footer = document.createElement('div');
        footer.classList.add('footer');
        footer.textContent = 'Developer'


        card.appendChild(header);
        card.appendChild(main);
        card.appendChild(footer)

        const style = document.createElement('style');
        style.textContent = `
            .card {
                display: flex;
                flex-direction: column;
                width: 350px;
                border: 3px solid #000;
                font-family: Arial, sans-serif;
                font-size: 40px;
                margin-top: 90px;
            }

            .main {
                padding: 8px;
                text-align: center;
                background-color: #000;
                color: white;
            }

            .main img{
                border-radius: 50px;
                margin: 30px 0; 
            }

            img {
                max-width: 100%;
            }

            .footer {
                height: 60px;
                text-align: center;
                background-color: red;
                color: white;
            }

        `;
        this.shadowRoot.append(style, card)
    }
}

customElements.define('my-card', MyCard)