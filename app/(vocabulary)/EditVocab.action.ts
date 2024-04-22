"use server";

import { prisma } from "@/lib/prisma";

export const editVocab = async ({
  vocabId,
  formData,
}: {
  vocabId: string;
  formData: FormData;
}) => {
  const vocabulary = formData.get("vocabulary") as string;
  const meaning = formData.get("definition") as string;
  const example = formData.get("example") as string;
  const type = formData.get("type") as string;

  if (!vocabulary || !meaning || type) return;

  await prisma.vocab.update({
    where: {
      id: vocabId,
    },
    data: {
      example: example ?? "",
      vocabulary,
      meaning,
      type,
    },
  });
};
