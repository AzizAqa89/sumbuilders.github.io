document.addEventListener('DOMContentLoaded', function() {
    const allCards = document.querySelectorAll('.trainingCardText');
    const firstCard = document.getElementById('content-1'); 
    const firstToggle = firstCard.previousElementSibling.querySelector('.toggle');
    const firstVline = firstCard.querySelector(".vline");
    const firstTrainingCard = firstCard.closest('.trainingCard');
    
    // Close all cards initially
    allCards.forEach(cardContent => {
        cardContent.style.height = '0';
        cardContent.style.opacity = '0';
    });

    // Open the first card by default
    openCard(firstCard, firstVline, firstTrainingCard);
    firstTrainingCard.style.backgroundColor = "#08FF6C"; 
    firstToggle.src = "./icons/minus.svg";
});

function toggleCard(cardNumber) {
    const content = document.getElementById(`content-${cardNumber}`);
    const toggle = content.previousElementSibling.querySelector('.toggle');
    const vline = content.querySelector('.vline');
    const card = content.closest(".trainingCard");

    if (content.style.height !== "0px" && content.style.height !== "") {
        closeCard(content, toggle, vline, card, cardNumber);
    } else {
        closeOtherCards(cardNumber); 
        openCard(content, vline, card);
        toggle.src = "./icons/minus.svg";
    }
}

function closeCard(content, toggle, vline, card, cardNumber) {
    let height = content.offsetHeight;
    let halfwayClosed = false;  // Flag to open next card midway
    const interval = setInterval(() => {
        if (height > 0) {
            height -= 3;
            content.style.height = height + "px";
            vline.style.marginTop = "0px";
            card.style.backgroundColor = "#f3f3f3"; 
            
            // Open the next card when halfway through closing
            if (!halfwayClosed && height < content.scrollHeight / 2) {
                openNextCard(cardNumber);
                halfwayClosed = true;
            }
        } else {
            clearInterval(interval);
            content.style.height = "0";
            content.style.opacity = "0"; 
            toggle.src = "./icons/plus.svg";
        }
    }, 10);
}

function openCard(content, vline, card) {
    content.style.opacity = "1";
    let height = 0;
    const targetHeight = content.scrollHeight;
    card.style.transition = "background-color 0.3s"; 
    const interval = setInterval(() => {
        if (height < targetHeight) {
            height += 3;
            content.style.height = height + "px";
            vline.style.marginTop = "30px";
            card.style.backgroundColor = "#08FF6C"; 
        } else {
            clearInterval(interval);
            content.style.height = "auto";  
        }
    }, 10);
}

function closeOtherCards(exceptCardNumber) {
    const allCards = document.querySelectorAll('.trainingCard');
    allCards.forEach((card, index) => {
        const cardNumber = index + 1;
        const content = card.querySelector('.trainingCardText');
        const toggle = card.querySelector('.toggle');
        const vline = content.querySelector('.vline');

        if (cardNumber !== exceptCardNumber && content.style.height !== "0px" && content.style.height !== "") {
            closeCard(content, toggle, vline, card);
        }
    });
}

function openNextCard(currentCardNumber) {
    const nextCardNumber = (currentCardNumber % document.querySelectorAll('.trainingCard').length) + 1;
    const nextCardContent = document.getElementById(`content-${nextCardNumber}`);
    const nextVline = nextCardContent.querySelector(".vline");
    const nextToggle = nextCardContent.previousElementSibling.querySelector('.toggle');
    const nextCard = nextCardContent.closest('.trainingCard');

    openCard(nextCardContent, nextVline, nextCard);
    nextToggle.src = "./icons/minus.svg";
}
