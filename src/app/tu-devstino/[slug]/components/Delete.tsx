"use client"
import { useUserDataContext } from "@/context/user";
import { deleteDevstino } from "../actions";
import Icon from "@/components/Icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Delete({id, userId, slug}: { id: string, userId: string, slug: string }) {
  const { userData, dataLoaded, updateUserData } = useUserDataContext();
  const isOwner = userData.id === userId;
  const { toast } = useToast()
  const router = useRouter()

  const handleDelete = async () => {
    toast({title: "Eliminando tu devstino..", variant: "default"})
    const { redirect } = await deleteDevstino(id, slug)
    updateUserData({devstinationSlug: ""})
    router.push(redirect)
  }
  return (dataLoaded && isOwner) && (
    <AlertDialog>
      <AlertDialogTrigger>
        <Icon id="delete" title="Eliminar Devstino" size={45} className="fill-red-800 hover:fill-red-600"/>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black text-zinc-100">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Vas a Eliminar la DB de produccion.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-600">Me dio miedo</AlertDialogCancel>
          <AlertDialogAction  className="bg-red-800 hover:bg-red-600" onClick={handleDelete}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}