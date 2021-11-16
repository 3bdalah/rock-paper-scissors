let rulesEl = document.querySelector('.modal'),
    overlayEl = document.querySelector('.overlay'),
    modalCloseBtn = document.querySelector('.modal__close'),
    openBtn = document.querySelector('#open-modal'),
    pagesEl = document.querySelector('.pages'),
    playerChoicePage = document.querySelector('.choice-page__player .wrap'),
    playerRipple = document.querySelector('.choice-page__player .ripple'),
    agentPlaceHolder = document.querySelector('.choice-page__agent .placeholder'),
    playAgainEl = document.querySelector('.playagain'),
    agentChoicePage = document.querySelector('.choice-page__agent .wrap'),
    agentRipple = document.querySelector('.choice-page__agent .ripple'),
    resultPage = document.querySelector('.main__page:nth-child(2)'),
    scoreEl = document.querySelector('.header__score__value');
    score = 0;

[openBtn,overlayEl, modalCloseBtn].forEach(el => {
    el.addEventListener('click', () => {
        overlayEl.classList.toggle('overlay--active');
        rulesEl.classList.toggle('modal--active');
    });
});



function agentPick(){
    let pick = Math.floor(Math.random() * 3 + 1);
    return (
        pick === 2 ? 'PAPER' :
        pick === 3 ? 'ROCK' : 
        pick === 1 ? 'SCISSORS' : 'ERROR' 
    );
}

function winOrLoss(player, agent){

    switch(player){
        case 'PAPER':
            return (
                agent === 'ROCK' ? 'W' : 
                agent === 'PAPER' ? 'D' : 'L'
            );
        case 'ROCK':
            return (
                agent === 'SCISSORS' ? 'W' :
                agent === 'ROCK' ? 'D': 'L'
            );
        case 'SCISSORS':
            return (
                agent === 'PAPER' ? 'W':
                agent === 'SCISSORS' ? 'D': 'L'
            );
    }
}

function judge(player){

    pagesEl.classList.add('main--bg-hiden');

    playerChoicePage.classList.add(`main__${player.toLowerCase()}`);
    
    playerChoicePage.innerHTML = `
        <img class="" src="./images/icon-${player.toLowerCase()}.svg" alt="scissor">
    `;

    pagesEl.scrollTo({
        left: resultPage.offsetLeft,
        behavior: 'smooth'
    });

    setTimeout(() => {
    
        let agent = agentPick();
        let result = winOrLoss(
            player,
            agent
        );

        agentPlaceHolder.classList.add('placeholder--hiden');
        agentChoicePage.classList.remove('wrap--hiden');
        agentChoicePage.classList.add(`main__${agent.toLowerCase()}`);
        agentChoicePage.innerHTML = `
            <img class="" src="./images/icon-${agent.toLowerCase()}.svg" alt="scissor">
        `;

        playAgainEl.classList.remove('playagain--hiden');
        playAgainEl.querySelector('span').innerText = `${
            result === 'D' ? 'DRAW' : 
            result === 'W' ? 'YOU WIN' :
            'YOU LOSE'
        }`;

        if(result === 'W'){
            playerRipple.classList.add('wrap--win');
        }else if(result === 'L'){
            playAgainEl.classList.add('playagain--lose');
            agentRipple.classList.add('wrap--win');
        }
        
        if(result === 'W'){
            score ++;
        }else if( result === 'L'){
            score = 0;
        }
    
        updateScore();
        console.log(result, player, agent);
    }, 1500);
}

function updateScore(){
    scoreEl.innerText = score;
}

function cleanUp(){

    pagesEl.scrollTo({
        left: 0,
        behavior: 'smooth'
    });

    playerChoicePage.innerHTML = '';
    agentChoicePage.innerHTML = '';
    pagesEl.classList.remove('main--bg-hiden');
    playerRipple.classList.remove('wrap--win');
    agentPlaceHolder.classList.remove('placeholder--hiden');
    playAgainEl.classList.add('playagain--hiden');
    playAgainEl.classList.remove('playagain--lose');
    agentRipple.classList.remove('wrap--win');
    playerChoicePage.setAttribute('class', 'wrap');
    agentChoicePage.setAttribute('class', 'wrap wrap--hiden');

}

