"use client"

import Icon from "@/components/Icon"
import { ROUTES } from "@/enums"
import { useRouter } from "next/navigation"

const Edit = ({slug}: { slug: string}) => {
  const router = useRouter()

  const handleEdit = () => {
    router.push(`${ROUTES.EDIT}/${slug}`) 
  }
  return (
    <Icon
      id="edit"
      title="Editar Devstino"
      size={40}
      onClick={handleEdit}
      className="fill-red-800 hover:fill-red-600 transition-colors"
    />
  )
}

export default Edit