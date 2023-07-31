export const useTextToSpeech = () => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text); 
    speechSynthesis.speak(utterance);
  };

  return { speak };
};
