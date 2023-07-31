import { Button, Card, Typography } from "@mui/material";
import useSpeechRecognition from "../hooks/useSpeechToText";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { useCallback } from "react";

export const Record = () => {
  const { transcript, isListening, setIsListening } = useSpeechRecognition();

  const startListening = useCallback(() => {
    setIsListening(!isListening);
  }, [setIsListening, isListening]);

  return (
    <div className="flex">
      <Card className="p-10 w-full max-md:p-2">
        <Button
          variant="contained"
          onClick={startListening}
          startIcon={!isListening ? <MicIcon /> : <StopIcon />}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </Button>
        <Typography className="pt-14" variant="body2">Transcript: {transcript}</Typography>
      </Card>
    </div>
  );
};
