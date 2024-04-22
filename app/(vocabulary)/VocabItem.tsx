"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { ContentTextArea } from "./ContentTextArea";
import { editVocab } from "./EditVocab.action";
import { SubmitButton } from "./SubmitButton";
import { deleteVocabAction } from "./vocab.action";

export type VocabItemProps = {
  vocab: {
    id: string;
    example: string | null;
    vocabulary: string;
    meaning: string;
    type: string | null;
    createdAt: Date;
  };
};

export const VocabItem = ({ vocab }: VocabItemProps) => {
  const router = useRouter();
  const [editPost, setEditPost] = useState(false);

  const handleEdit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    await editVocab({ vocabId: vocab.id, formData });

    console.log(vocab.id, formData);
    setEditPost(false);
    router.refresh();
  };

  return (
    <div className="relative p-4 rounded-md shadow-md group bg-card">
      <div className="absolute hidden transition-all backdrop-blur-sm group-hover:block right-1 top-1 ">
        <div className="flex flex-row">
          <Button
            onClick={() => setEditPost(!editPost)}
            variant={"ghost"}
            size={"icon"}
            className="hover:text-foreground text-foreground/40 hover:bg-primary/15"
          >
            <Edit size={18} />
          </Button>
          <form>
            <Button
              formAction={async () => {
                const result = await deleteVocabAction(vocab.id);

                router.refresh();
              }}
              variant={"ghost"}
              size={"icon"}
              className="hover:text-destructive text-foreground/40 hover:bg-destructive/15"
            >
              <X size={18} />
            </Button>
          </form>
        </div>
      </div>

      {editPost ? (
        <form className="space-y-3" onSubmit={handleEdit}>
          <Input
            defaultValue={vocab.vocabulary}
            name="vocabulary"
            autoFocus
            placeholder="Vocabulaire"
            required
          />
          <Input
            name="definition"
            defaultValue={vocab.meaning}
            placeholder="Signification"
            required
          />
          <ContentTextArea
            name="example"
            defaultValue={vocab.example ?? ""}
            placeholder="Exemple"
          />
          <Select name="type" defaultValue={vocab.type ?? ""}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="verbe">Verbe</SelectItem>
                <SelectItem value="adjectif">Adjectif</SelectItem>
                <SelectItem value="autres">Autres</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <SubmitButton>Valider</SubmitButton>
        </form>
      ) : (
        <>
          <div className="text-2xl font-semibold text-primary">
            {vocab.vocabulary} :
          </div>
          <div>
            {"> "}
            {vocab.meaning}
          </div>
          <div className="text-sm text-secondary-foreground/45">
            {vocab.example && (
              <>
                {'" '}
                {vocab.example}
                {' "'}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
