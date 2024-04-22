"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteVocabAction } from "./vocab.action";

export type VocabItemProps = {
  vocab: {
    id: string;
    example: string;
    vocabulary: string;
    meaning: string;

    createdAt: Date;
  };
};

export const VocabItem = ({ vocab }: VocabItemProps) => {
  const router = useRouter();
  return (
    <div className="relative p-4 bg-card">
      <div className="absolute transition right-1 top-1 ">
        <form>
          <Button
            formAction={async () => {
              const result = await deleteVocabAction(vocab.id);

              console.log("result");

              router.refresh();
            }}
            variant={"ghost"}
            size={"icon"}
            className="hover:text-destructive hover:bg-destructive/15"
          >
            <X />
          </Button>
        </form>
      </div>
      <div className="text-2xl font-semibold text-primary">
        {vocab.vocabulary} :
      </div>
      <div>
        {"> "}
        {vocab.meaning}
      </div>
      <div className="text-sm text-secondary-foreground/45">
        {'" '}
        {vocab.example}
        {' "'}
      </div>
    </div>
  );
};
