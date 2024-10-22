"use client";
import { useState, useEffect, useRef } from "react";

export default function Audio({ onClick, ...props}: React.SVGProps<SVGSVGElement>): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const handleClick = ({ currentTarget }: React.MouseEvent<SVGSVGElement>) => {
    const { children } = currentTarget
    const playToPause = children.namedItem('from_play_to_pause') as SVGAnimateElement
    const circle = children.namedItem('circle') as SVGCircleElement
    const line2 = children.namedItem('line2') as SVGPathElement
    const pauseToPlay = line2.children.namedItem('from_pause_to_play') as SVGAnimateElement

    if (!isPlaying) {
      circle.classList.add('play')
      playToPause.beginElement()
      setIsPlaying(true)
    } else {
      circle.classList.remove('play')
      pauseToPlay.beginElement()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} loop src="/audio/eyesWide.mp3"></audio>
      <svg width="104" height="104" viewBox="0 0 104 104" onClick={onClick ? onClick : handleClick} {...props} >
        <title>{isPlaying ? "Pausar audio" : "Reproducir audio"}</title>
        <circle
          cx="51"
          cy="51"
          r="50"
          stroke="#d4d4d8"
          strokeDasharray="314"
          strokeDashoffset="0"
          strokeWidth="2"
          id='circle'
        ></circle>
        <path
          stroke="#d4d4d8" 
          strokeLinecap="round"
          strokeWidth="4"
          d="M38 30L38 70"
          id='line1'
        ></path>
        <path
          fill="#d4d4d8"
          stroke="#d4d4d8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M66 30v40"
          id='line2'
        >
          <animate
            fill="freeze"
            attributeName="d"
            dur="300ms"
            from="M 66 30 L 66 50 L 66 70"
            to="M 38 30 L 70 50 L 38 70"
            id="from_pause_to_play"
            begin={!isPlaying ? "0s" : "indefinite"}
          ></animate>
        </path>
        <animate
          xlinkHref="#line2"
          fill="freeze"
          attributeName="d"
          begin="indefinite"
          dur="300ms"
          id="from_play_to_pause"
          from="M 38 30 L 70 50 L 38 70"
          to="M 66 30 L 66 50 L 66 70"
        ></animate>
      </svg>
    </>
  );
}