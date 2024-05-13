// ==UserScript==
// @name         SLY Market Bot Sniper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       SLY
// @match        https://play.staratlas.com/market/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const botList = ['4p5tQd9JJxdGFkbXmKjAaMzmdH9Bv9JD4TADM6YaLAeH',
                     '6vC5BWPvqw1pkU7yP2vVM9AEUBJsVo3uViejhDNPbbJD',
                     'ENJqN4hrwRKBuaKQnfWrhsj4K45j6TEYNHa2uXtjJazo',
                     'Eczba7WuUbCZqzKSKTmvKmfFFmGHPjikoGPDQAHSo7yH',
                     'D4ZaBnckGhtgQ5SkbrqFL7YXjSf9UjqDeyqYvSJQnnoq',
                     'Ftvf1fFjhJaGj4M4kWPg9GDB2gagJhE55Tsbz8ri9unS',
                     'GuLfmqHR4Naqer9zDevA5gvMM3jwmJfns3Fp9AkppcAD',
                     'ADGKK4Ccmrb9JYocUNUXCHbnWhhuvZAB21YYVBKXP78h',
                     '3smaMQSxA3DYXSgVcWYnveiXEo7B9BQ9bgnjQfJMu88u',
                     '4NGqeSxu8aE4GRaiEUoVzq7mKP5C4Pxo5GLGjqMSnxaA',
                     'HzBx8PP86pyPrrboTHqPYWhxnEB5vXDHDBP8femWfPTS',
                     'BESTa8udW1ZLUV6b66uJJVyqmhKy7t8hud67ymVYfkKf'
                    ];

    let observer = new MutationObserver(waitForLabs);
    function waitForLabs(mutations, observer){
        if(document.querySelectorAll('#item-orders-sell').length > 0) {
            observer && observer.disconnect();
            let sellRows = Array.from(document.querySelectorAll('#item-orders-sell tr'));
            let buyRows = Array.from(document.querySelectorAll('#item-orders-buy tr'));

            for (let botAddr of botList) {
                let foundRows = [];

                let foundSellRows = sellRows.filter(row => {
                    let temp1 = row.querySelector('div > span > span > span');
                    let temp2 = temp1 && temp1.innerHTML;
                    let shortAddr = botAddr.slice(0,4) + '...' + botAddr.slice(-4);
                    return (temp2 === shortAddr);
                });
                foundRows = foundRows.concat(foundSellRows);

                let foundBuyRows = buyRows.filter(row => {
                    let temp1 = row.querySelector('div > span > span > span');
                    let temp2 = temp1 && temp1.innerHTML;
                    let shortAddr = botAddr.slice(0,4) + '...' + botAddr.slice(-4);
                    return (temp2 === shortAddr);
                });
                foundRows = foundRows.concat(foundBuyRows);

                for (let row of foundRows) {
                    for (let cell of row.cells) {
                        cell.style.backgroundColor = '#A41623';
                    }
                    let botTag = row.querySelector('.botTag');
                    if (!botTag) {
                        let botText = document.createElement('span');
                        botText.classList.add('botTag');
                        botText.style.color = 'white';
                        botText.style.display = 'inline';
                        botText.style.marginRight = '10px';
                        botText.textContent = 'SUSPECTED BOT';
                        let botDiv = row.children[1].children[0].children[0].prepend(botText);
                    }
                }
            }
            let targetNode = document.getElementById('galactic-marketplace-container');
            observer.observe(document, {childList: true, subtree: true});
        }
    }
    observer.observe(document, {childList: true, subtree: true});

})();
