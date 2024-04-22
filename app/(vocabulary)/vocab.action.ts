"use server";

import { prisma } from "@/lib/prisma";

export const addVocabAction = async (formdata: FormData) => {
  const vocabulary = formdata.get("vocabulary") as string;
  const meaning = formdata.get("definition") as string;
  const example = formdata.get("example") as string;

  if (!vocabulary || !meaning || !example) return;

  await prisma.vocab.create({
    data: {
      example,
      vocabulary,
      meaning,
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
