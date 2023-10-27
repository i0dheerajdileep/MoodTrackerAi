// store.js

import { writable } from "svelte/store";

// Happy Tasks
export const happyTasks = [
    {
      "id" : "1",
      "mood": "happy",
      "task": "Expressive Art Session",
      "description": "Engage in a creative activity, like painting, drawing, or crafting, to express and celebrate your happiness.",
      "purpose": "Artistic expression can amplify positive emotions and provide a joyful outlet for creativity."
    },
    {
        "id" : "2",
      "mood": "happy",
      "task": "Gratitude Jar",
      "description": "Write down a happy moment on a small piece of paper and add it to your gratitude jar. Reflect on these moments regularly.",
      "purpose": "Focusing on positive experiences and expressing gratitude can reinforce and prolong feelings of happiness."
    },
    {
        "id" : "3",
      "mood": "happy",
      "task": "Dance Party",
      "description": "Put on your favorite music and have a spontaneous dance party. Let loose and enjoy the rhythm.",
      "purpose": "Dancing is a great way to release endorphins and boost your mood, turning happiness into a celebration."
    }
  ];
  
  // Sad Tasks
  export const sadTasks = [
    {
        "id" : "1",
      "mood": "sad",
      "task": "Reflective Journaling",
      "description": "Write about your feelings and thoughts in a journal. Allow yourself to process and express your emotions.",
      "purpose": "Journaling provides a healthy outlet for emotions and can promote self-awareness and understanding during sad moments."
    },
    {
        "id" : "2",
      "mood": "sad",
      "task": "Nature Walk",
      "description": "Take a gentle walk in nature. Observe the surroundings, breathe in fresh air, and allow the peacefulness of nature to soothe your sadness.",
      "purpose": "Connecting with nature has therapeutic effects and can help alleviate feelings of sadness."
    },
    {
        "id" : "3",
      "mood": "sad",
      "task": "Reach Out to a Friend",
      "description": "Call or message a friend you trust. Share your feelings and let them offer support and companionship.",
      "purpose": "Social connection is vital, and sharing your emotions with a friend can provide comfort and understanding."
    }
  ];
  
  // Neutral Tasks
  export const neutralTasks = [
    {
        "id" : "1",
      "mood": "neutral",
      "task": "Mindful Breathing",
      "description": "Take a few minutes to practice mindful breathing. Inhale deeply, hold, and exhale slowly, focusing on each breath.",
      "purpose": "Mindful breathing can help bring a sense of calm and centeredness, reducing stress and promoting a neutral mood."
    },
    {
        "id" : "2",
      "mood": "neutral",
      "task": "Digital Detox",
      "description": "Disconnect from digital devices for at least an hour. Use this time for quiet reflection or engaging in non-screen activities.",
      "purpose": "A digital detox allows for mental rest, reducing information overload and promoting a neutral mental state."
    },
    {
        "id" : "3",
      "mood": "neutral",
      "task": "Nature Observation",
      "description": "Spend time outdoors observing nature without any specific agenda. Pay attention to the sights, sounds, and sensations around you.",
      "purpose": "Connecting with nature without a particular goal can help reset your mind and bring a sense of balance to your mood."
    }
  ];

    export const moodVal = writable(0);
  