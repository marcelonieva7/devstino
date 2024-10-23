"use client"

import { CldImage } from "next-cloudinary"

type Props = {
  photo_id: string
  name: string
}

export default function DestinationImg({ photo_id, name }: Props) {

  return (
    <CldImage
      src={photo_id}
      width="350"
      height="350"
      alt={`Foto de ${name} en el infierno de los devs, oleo sobre pixels.`}
      title={`Foto de ${name} en el infierno de los devs, oleo sobre pixels.`}
      data-loaded='false'
      className="my-5 mx-auto data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-300
        max-[420px]:w-[300px] max-[420px]:h-[300px] min-[680px]:float-left min-[680px]:mr-7"
      onLoad={({currentTarget}) => {currentTarget.setAttribute('data-loaded', 'true')}}
      replaceBackground={"hell of code"}
      replace={{from:"clothing", to:"a mummy clothing", preserveGeometry: true}}
    />
  )
}