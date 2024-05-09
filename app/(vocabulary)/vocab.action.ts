"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type VocabType = {
  id: string;
  example: string | null;
  vocabulary: string;
  meaning: string;
  type: string | null;
  gotIt: Boolean | null;
  favorite: Boolean | null;
  createdAt: Date;
};

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

export const toggleFavoriteVocabAction = async (vocabId: string) => {
  const vocab = await prisma.vocab.findUnique({
    where: {
      id: vocabId,
    },
  });

  await prisma.vocab.update({
    where: {
      id: vocabId,
    },
    data: {
      favorite: !vocab?.favorite,
    },
  });

  revalidatePath("/");
};

export const toggleGotItVocabAction = async (vocabId: string) => {
  const vocab = await prisma.vocab.findUnique({
    where: {
      id: vocabId,
    },
  });

  await prisma.vocab.update({
    where: {
      id: vocabId,
    },
    data: {
      gotIt: !vocab?.gotIt,
    },
  });
};

export const editVocab = async ({
  vocab,
  formData,
}: {
  vocab: VocabType;
  formData: FormData;
}) => {
  const vocabulary = formData.get("vocabulary") as string;
  const meaning = formData.get("definition") as string;
  const example = formData.get("example") as string;
  const type = formData.get("type") as string;

  if (!vocabulary || !meaning || !type) {
    return {
      error: "an error required",
    };
  }

  await prisma.vocab.update({
    where: {
      id: vocab.id,
    },
    data: {
      example: example ?? "",
      vocabulary,
      meaning,
      type,
    },
  });

  revalidatePath("/");
  return {
    message: "Post updated successfully",
  };
};
