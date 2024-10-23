"use client"

import Icon from "@/components/Icon"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"

type Props = {
  name: string
}
export default function Share({ name }: Props) {
  const [canShare, setCanShare] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const toShare = {
      url: window.location.href,
      title: `Devstino - ${name}`,
      text: `Conoce el DevStino Final de ${name}`
    } as const
    if (navigator.canShare && navigator.canShare(toShare)) {
      setCanShare(true)
    }
  }, [name])
  const handleShare = () => {
    navigator.share({
      url: window.location.href,
      title: `Devstino - ${name}`,
      text: `Conoce el DevStino Final de ${name}`
    }).catch((e) => {
      toast({title: "Error al compartir", description: "Por favor, intenta de nuevo.", variant: "destructive"})
      console.error(e)
    })
  }

  return canShare && (
    <Icon
      id="share"
      title="Compartir Devstino"
      size={40}
      onClick={handleShare}
      className="fill-red-800 hover:fill-red-600 transition-colors"
    />
  );
}