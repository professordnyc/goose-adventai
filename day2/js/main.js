/* ===================================
   THE WINTER PATH HOME - GAME ENGINE
   =================================== */

import { story } from './story.js';

class Game {
  constructor() {
    this.currentNode = 'start';
    this.score = 0;
    this.turns = 0;
    this.correct = 0;
    
    this.storyEl = document.getElementById('story');
    this.choicesEl = document.getElementById('choices');
    this.statsEl = document.getElementById('stats');
    
    this.createSnowflakes();
    this.checkSavedGame();
  }
  
  checkSavedGame() {
    const saved = localStorage.getItem('game_save');
    if (saved) {
      const modal = document.getElementById('continue-modal');
      modal.classList.remove('hidden');
      
      document.getElementById('continue-btn').onclick = () => {
        this.loadGame();
        modal.classList.add('hidden');
        this.render();
      };
      
      document.getElementById('new-game-btn').onclick = () => {
        localStorage.removeItem('game_save');
        modal.classList.add('hidden');
        this.render();
      };
    } else {
      this.render();
    }
  }
  
  createSnowflakes() {
    for (let i = 0; i < 20; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = '❄';
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
      snowflake.style.animationDelay = Math.random() * 5 + 's';
      snowflake.style.fontSize = (Math.random() * 1 + 1) + 'rem';
      document.body.appendChild(snowflake);
    }
  }
  
  render() {
    const node = story[this.currentNode];
    
    if (this.currentNode === 'check_ending') {
      this.currentNode = (this.score === 2) ? 'dream_ending' : 'success_ending';
      this.render();
      return;
    }
    
    this.storyEl.innerHTML = `<p class="fade-in">${node.text}</p>`;
    this.choicesEl.innerHTML = '';
    
    if (node.ending) {
      this.showEnding(node);
    } else {
      this.showChoices(node);
    }
    
    this.updateStats();
    this.saveGame();
  }
  
  showChoices(node) {
    node.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn fade-in';
      btn.textContent = choice.text;
      btn.style.animationDelay = `${index * 0.1}s`;
      btn.onclick = () => this.choose(choice, node);
      this.choicesEl.appendChild(btn);
    });
  }
  
  choose(choice, node) {
    this.turns++;
    
    if (node.riddle && choice.correct) {
      this.score++;
      this.correct++;
    }
    
    if (node.riddle) {
      const btns = this.choicesEl.querySelectorAll('button');
      btns.forEach((btn, idx) => {
        if (idx === node.choices.indexOf(choice)) {
          btn.className = choice.correct ? 'choice-btn correct' : 'choice-btn incorrect';
        }
        btn.disabled = true;
      });
      
      setTimeout(() => {
        this.currentNode = choice.next;
        this.render();
      }, 1500);
    } else {
      this.currentNode = choice.next;
      this.render();
    }
  }
  
  showEnding(node) {
    if (node.artifact) {
      const snowflakeSVG = `<svg class="snowflake-img" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5 L50 95 M5 50 L95 50 M15 15 L85 85 M85 15 L15 85 M50 20 L40 10 M50 20 L60 10 M20 50 L10 40 M20 50 L10 60 M50 80 L40 90 M50 80 L60 90 M80 50 L90 40 M80 50 L90 60" stroke="#64B5F6" stroke-width="2" fill="none"/>
        <circle cx="50" cy="50" r="8" fill="#64B5F6"/>
      </svg>`;
      this.storyEl.innerHTML += snowflakeSVG + '<p class="artifact fade-in">✨ ARTIFACT FOUND ✨</p>';
    }
    
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = '🔄 Play Again';
    btn.onclick = () => this.restart();
    this.choicesEl.appendChild(btn);
  }
  
  restart() {
    this.currentNode = 'start';
    this.score = 0;
    this.turns = 0;
    this.correct = 0;
    localStorage.removeItem('game_save');
    this.render();
  }
  
  updateStats() {
    this.statsEl.classList.remove('hidden');
    document.getElementById('turns').textContent = this.turns;
    document.getElementById('correct').textContent = this.correct;
    document.getElementById('score-display').textContent = this.score;
  }
  
  saveGame() {
    try {
      localStorage.setItem('game_save', JSON.stringify({
        node: this.currentNode,
        score: this.score,
        turns: this.turns,
        correct: this.correct
      }));
    } catch (e) {
      console.warn('Could not save game:', e);
    }
  }
  
  loadGame() {
    try {
      const saved = localStorage.getItem('game_save');
      if (saved) {
        const data = JSON.parse(saved);
        this.currentNode = data.node || 'start';
        this.score = data.score || 0;
        this.turns = data.turns || 0;
        this.correct = data.correct || 0;
      }
    } catch (e) {
      console.warn('Could not load save:', e);
    }
  }
}

new Game();
