"use server";

import { prisma } from "@/lib/prisma";

export const addVocabAction = async (formData: FormData) => {
  const vocabulary = formData.get("vocabulary") as string;
  const meaning = formData.get("definition") as string;
  const example = formData.get("example") as string;
  const type = formData.get("type") as string;

  if (!vocabulary || !meaning) return;

  await prisma.vocab.create({
    data: {
      example: example ?? "",
      vocabulary,
      meaning,
      type,
    },
  });
};

export const deleteVocabAction = async (vocabId: string) => {
  if (typeof vocabId !== "string") {
    throw new Error("vocabId must be a string");
  }

  await prisma.vocab.delete({
    where: {
      id: vocabId,
    },
  });
};
