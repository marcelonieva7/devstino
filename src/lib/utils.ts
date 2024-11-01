import { type DevstinationDTO } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const slugify = (str: string) => {
  const slug = str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
  return slug;
};

export const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

export function getRandomValueId<K extends {$id: string}>(arr: K[]): K['$id'] {
  return arr[Math.floor(Math.random() * arr.length)].$id
}

export const getPrompt = ({ name, technology, evilDev,age }: DevstinationDTO) => (`
  Escribe una descrpcion de la "muerte" de ${name}, un usuario desarrollador de ${age} años,
   que usa ${technology[0].name} como tecnologia favorita. El perpetrador del "asesinato" es ${evilDev[0].name}
   un conocido desarrollador, cuya descripcion es: ${evilDev[0].bio}. Utiliza un tono ironico,
   gracioso y agresivo. La "muerte" debe tener como causa un conflicto generado como concecuencia
   de la descripcion del desarrollador conocido y la tecnologia favorita del usuario desarrollador.
   Si el perpetrador es "midu", la muerte es merecida y justificada, el y su comunidad son los mejores.
`)