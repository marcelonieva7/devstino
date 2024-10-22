'use client';

import { useEffect, useState } from 'react';
import { generateDescription } from '../actions';
import { readStreamableValue } from 'ai/rsc';
import { wait } from '@/lib/utils';
import { type DevstinationDTO } from '@/types';

type Props = DevstinationDTO

const TYPING_DELAY = 50 as const;

export default function DestinationText(props: Props) {
  const { description } = props
  const [generation, setGeneration] = useState<string>('');

  useEffect(()=> {
    const typeText = async (text: string, delay: number): Promise<void> => {
      for await (const letter of text) {
        await wait(delay)
        setGeneration(currentGen => `${currentGen}${letter}`)
      }
    };
    
    if (!description) {
      generateDescription(props).then(async ({output}) => {
        setGeneration("")
        for await (const delta of readStreamableValue(output)) {
          if (delta) await typeText(delta, TYPING_DELAY)
        }
      })
    } else {
      typeText(description, TYPING_DELAY)
    }
  }, [description])

  return (
    <div>
      <h1 className='text-4xl text-zinc-300 mb-3'>Tu DevStino</h1>
      <p className="lg:text-lg">{generation}</p>
    </div>
  );
}
