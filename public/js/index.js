const admin = {
    //^Variables
    //buttons
    btnCreateElement: document.querySelector('.btn-create'),
    btnUpdateElement: document.querySelector('.btn-update'),
    btnDeleteElement: document.querySelector('.btn-delete'),
    //cards
    cardCreateElement: document.querySelector('.card-body-create'),
    cardUpdateElement: document.querySelector('.card-body-update'),
    cardDeleteElement: document.querySelector('.card-body-delete'),
    //^INIT
    init() {
        admin.displayCreateBoard();
        admin.displayUpdateBoard();
        // admin.displayDeleteBoard();
    },
    //^Methods
    displayCreateBoard() {
        admin.btnCreateElement.addEventListener("click", admin.handleCheckedCreateEvent);
    },
    displayUpdateBoard() {
        admin.btnUpdateElement.addEventListener("click", admin.handleCheckedUpdateEvent);
    },
    displayDeleteBoard() {
        admin.btnDeleteElement.addEventListener("click", admin.handleCheckedDeleteEvent);
    },
    handleCheckedCreateEvent(event) {

        admin.btnCreateElement.classList.add('checked');
        console.log(event.target);

        if (btnUpdateElement.classList.contains('checked') || btnDeleteElement.classList.contains('checked')) {
            admin.btnCreateElement.classList.remove('checked');
            admin.cardCreateElement.style.display = 'none';
        };

        this.cardCreateElement.style.display = 'block';
        return cardCreateElement;

    },
    handleCheckedUpdateEvent(event) {

        this.cardUpdateElement.classList.add('checked');
        console.log(event.target);

        this.cardUpdateElement.style.display = 'block';

        if (cardCreateElement.classList.contains('checked') || cardDeleteElement.classList.contains('checked')) {
            admin.cardUpdateElement.classList.remove('checked');
            admin.cardUpdateElement.style.display = 'none';
        };

        return cardUpdateElement;

    },
    handleCheckedDeleteEvent(event) {

        this.cardDeleteElement.classList.add('checked');
        console.log(event.target);

        this.cardDeleteElement.style.display = 'block';

        if (cardUpdateElement.classList.contains('checked') || cardCreateElement.classList.contains('checked')) {
            admin.cardDeleteElement.classList.remove('checked');
            admin.cardDeleteElement.style.display = 'none';
        };


        return cardDeleteElement;

    },

}

// document.addEventListener('DOMContentLoaded', admin.init);