// Arquivo: src/hooks/useSound.js
import { Howl } from 'howler';
import { useCallback } from 'react';

// Pré-carrega todos os sons para que não haja atraso na primeira vez que forem tocados
// Lembre-se de colocar seus arquivos de áudio na pasta public/sfx
const sound_pack = {
  hover: new Howl({ src: ['/sfx/hover.mp3'], volume: 0.3 }),
  click: new Howl({ src: ['/sfx/click.mp3'], volume: 0.5 }),
  success: new Howl({ src: ['/sfx/success.mp3'], volume: 0.7 }),
  error: new Howl({ src: ['/sfx/error.mp3'], volume: 0.7 }),
};

export const useSound = () => {
  const playHover = useCallback(() => {
    sound_pack.hover.play();
  }, []);

  const playClick = useCallback(() => {
    sound_pack.click.play();
  }, []);
  
  const playSuccess = useCallback(() => {
    sound_pack.success.play();
  }, []);

  const playError = useCallback(() => {
    sound_pack.error.play();
  }, []);

  return { playHover, playClick, playSuccess, playError };
};