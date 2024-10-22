"use client"

import { CldImage } from "next-cloudinary"

type Props = {
  photo_id: string
}

export default function DestinationImg({ photo_id }: Props) {

  return (
    <CldImage
      src={photo_id}
      width="500"
      height="500"
      alt='Foto del usuario en el infierno del codigo'
      data-loaded='false'
      className="my-5 data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-300"
      onLoad={event => {
        event.currentTarget.setAttribute('data-loaded', 'true')
      }}
      replaceBackground={"hell of code"}
      replace={{from:"clothing", to:"a mummy clothing", preserveGeometry: true}}
    />
  )
}