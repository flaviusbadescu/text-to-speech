/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

// Type definitions for global SpeechRecognition (currently non-standard)
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const useSpeechToText = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    // Enable experimental webkit version
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join("");

      setTranscript(transcript);
    };

    if (isListening) {
      recognition.start();
      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };
    } else {
      recognition.stop();
      recognition.onend = () => {};
    }

    // Clean-up function - runs when component is unmounted
    return () => {
      recognition.stop();
      recognition.onend = () => {};
    };
  }, [isListening]);

  return { transcript, isListening, setIsListening };
};

export default useSpeechToText;
