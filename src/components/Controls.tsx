import {
  Button,
  Card,
  CardActions,
  CardContent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { useDebounce } from "../hooks/useDebounce";

export const Controls = () => {
  const [text, setText] = useState("");
  const [autoPlay, setAutoPlay] = useState(false);
  const { speak } = useTextToSpeech();

  const debouncedText = useDebounce(speak, 500);

  const handleAutoplaySwitch = useCallback(() => {
    setAutoPlay(!autoPlay);
  }, [autoPlay]);

  const handleSubmit = useCallback(() => {
    speak(text);
  }, [speak, text]);

  const handleKeyboardSubmit = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      if (autoPlay) {
        debouncedText(e.target.value);
      }
    },
    [debouncedText, autoPlay]
  );

  return (
    <div className="flex">
      <Card className="p-10 w-full max-md:p-2">
        <CardContent>
          <TextField
            className="w-full"
            id="outlined-multiline-flexible"
            label="Type your text here"
            value={text}
            onChange={handleTextChange}
            multiline
            rows={5}
            onKeyDown={handleKeyboardSubmit}
          />
        </CardContent>
        <CardActions className="flex flex-col">
          <div className="flex items-center mr-auto">
            <Switch value={autoPlay} onChange={handleAutoplaySwitch} />
            <Typography>Enable Auto Play</Typography>
          </div>
          <Button
            className="mx-auto"
            variant="contained"
            startIcon={<VolumeUpIcon />}
            onClick={handleSubmit}
            disabled={!text || autoPlay}
          >
            Translate
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
