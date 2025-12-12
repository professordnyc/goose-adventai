/* ===================================
   THE WINTER PATH HOME - STORY DATA
   All story nodes, choices, and branching logic
   =================================== */

export const story = {
  
  // ============ START NODE ============
  start: {
    text: "The school bell rings, signaling the end of another day. As students rush past you toward the exit, you notice your teacher struggling with an armful of books near her desk. Outside the window, snow has begun to fall.",
    choices: [
      { text: "Head home right away", next: "choose_path" },
      { text: "Help your teacher with the books", next: "help_loop" }
    ]
  },
  
  // ============ LOOP NODES (Force Progression) ============
  
  help_loop: {
    text: "You gather some of the books and help your teacher organize them on the shelf. She smiles warmly. 'Thank you! You're very kind. Now hurry home before the snow gets too heavy.'",
    choices: [
      { text: "Head home", next: "choose_path" }
    ]
  },
  
  usual_loop: {
    text: "You start walking down the familiar sidewalk, but something feels different. The mysterious path calls to you, its soft glow growing brighter. You feel an irresistible pull drawing you back...",
    choices: [
      { text: "Turn back and take the mysterious path", next: "meet_keeper" }
    ]
  },
  
  refuse_loop: {
    text: "The cloaked figure doesn't move. The path behind you has vanished into swirling snow. 'There is no other way forward,' the voice says gently but firmly. 'You must choose.'",
    choices: [
      { text: "Accept the challenge", next: "riddle_1" }
    ]
  },
  
  // ============ CHOICE NODES ============
  
  choose_path: {
    text: "Outside, the winter air is crisp and cold. Before you stretches the familiar sidewalk that leads home. But wait—to your left, you notice something strange: a narrow path between two buildings that you've never seen before. It glows faintly with a soft, silvery light, and snowflakes seem to dance around it.",
    choices: [
      { text: "Take the usual path home", next: "usual_loop" },
      { text: "Explore the mysterious glowing path", next: "meet_keeper" }
    ]
  },
  
  meet_keeper: {
    text: "The mysterious path winds through a world transformed by winter magic. Crystalline trees shimmer with frost, and the air sparkles with tiny ice crystals. Suddenly, a figure appears before you—cloaked in white and blue, their face hidden in shadow. 'Welcome, young traveler,' a gentle voice says. 'To pass through my domain and find your way home, you must answer my riddles. Will you play my game?'",
    choices: [
      { text: "Accept the challenge", next: "riddle_1" },
      { text: "Politely refuse and ask for another way", next: "refuse_loop" }
    ]
  },
  
  // ============ RIDDLE NODES ============
  
  riddle_1: {
    text: "The figure nods approvingly. 'Very well. Here is your first riddle: I fall from the sky without ever getting hurt. I am white and cold, yet I warm hearts and bring joy. What am I?'",
    riddle: true,
    choices: [
      { text: "Rain", correct: false, next: "riddle_2" },
      { text: "Snow", correct: true, next: "riddle_2" },
      { text: "A star", correct: false, next: "riddle_2" }
    ]
  },
  
  riddle_2: {
    text: "The mysterious figure gestures toward the swirling snowflakes around you. 'And now, your second riddle: I exist only when you are not awake, yet I can feel more real than reality itself. I can take you anywhere, show you anything. What am I?'",
    riddle: true,
    choices: [
      { text: "A memory", correct: false, next: "check_ending" },
      { text: "A dream", correct: true, next: "check_ending" },
      { text: "A shadow", correct: false, next: "check_ending" }
    ]
  },
  
  // ============ ROUTER NODE ============
  
  check_ending: {
    text: "The figure considers your answers...",
    choices: []
  },
  
  // ============ ENDING NODES ============
  
  success_ending: {
    text: "The cloaked figure steps aside, and the path ahead clears. The mysterious glow fades, revealing the familiar streets of your neighborhood. 'You have done well enough,' the voice says softly. 'Go home safely.' You walk forward as the winter sunset paints the snow in shades of orange and pink. Soon, you see your house in the distance, warm light glowing from its windows. You're home.\n\nTHE END",
    ending: true
  },
  
  dream_ending: {
    text: "The cloaked figure reaches out and touches your forehead gently. Suddenly, brilliant light floods your vision, warm and bright. You blink...\n\n...and find yourself sitting at your desk in the classroom. Your teacher is standing nearby, looking at you with concern. 'You fell asleep during quiet reading time,' she says kindly. 'Are you feeling alright?'\n\nYou look around, disoriented. The classroom is full of students packing their bags. It's the end of the school day. Was it all a dream?\n\nThen you notice something on your desk that wasn't there before: a small, perfectly formed crystalline snowflake that doesn't melt, catching the light like a tiny star. You pick it up carefully, and it feels cool in your palm.\n\nWas it real? You may never know for certain.\n\nTHE END",
    ending: true,
    artifact: true
  }
};
