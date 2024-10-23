'use server';

import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { devstinationRepository } from '@/lib/db';
import { type DevstinationDTO } from '@/types';
import { revalidatePath } from 'next/cache';
import { getPrompt } from '@/lib/utils';
import { ROUTES } from '@/enums';

export async function generateDescription(devstino: DevstinationDTO) {  
  const stream = createStreamableValue('');

  (async () => {
    const { textStream, text } = await streamText({
      model: google('gemini-1.5-flash'),
      prompt: getPrompt(devstino),
      system: "La descripcion que vas a generar no debe superar los 500 caracteres"
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
    const description = (await text).slice(0, 500);
    await devstinationRepository.update(devstino.$id, {description})
  })();
  revalidatePath('/tu-devstino/[slug]', 'page')

  return { output: stream.value };
}

export async function deleteDevstino(id: string) {
  await devstinationRepository.update(id, {isDeleted: true})
  revalidatePath('/tu-devstino/[slug]', 'page')
  return {
    redirect: ROUTES.HOME}
}
