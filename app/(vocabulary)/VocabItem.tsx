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
import { cn } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Check, Edit, Star, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useRef, useState } from "react";
import { toast } from "sonner";
import { ContentTextArea } from "./ContentTextArea";
import { SubmitButton } from "./SubmitButton";
import {
  deleteVocabAction,
  editVocab,
  toggleFavoriteVocabAction,
  toggleGotItVocabAction,
} from "./vocab.action";

export type VocabItemProps = {
  vocab: {
    id: string;
    example: string | null;
    vocabulary: string;
    meaning: string;
    type: string | null;
    gotIt: Boolean | null;
    favorite: Boolean | null;
    createdAt: Date;
  };
};

export const VocabItem = ({ vocab }: VocabItemProps) => {
  const router = useRouter();
  const [editPost, setEditPost] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLInputElement>(null);

  const handleEdit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = await editVocab({ vocab, formData });

    if (result.error) {
      toast.error(result.error);
      return;
    }

    setEditPost(false);
    router.refresh();
    toast.success(result.message);
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     inputRef.current &&
  //     !formRef.current &&
  //     !inputRef.current.contains(event.target as Node)
  //   ) {
  //     setEditPost(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div
      className={cn(
        "relative p-4 overflow-hidden rounded-md shadow-md group bg-card",
        { "bg-primary/15": vocab.gotIt }
      )}
    >
      <div className="absolute transition-all opacity-0 group-hover:opacity-100 -top-11 backdrop-blur-sm group-hover:top-1 right-1 ">
        <div className="flex flex-row">
          <div>
            <form className="space-x-1">
              <Button
                formAction={async () => {
                  await toggleFavoriteVocabAction(vocab.id);

                  // router.refresh();
                }}
                variant={"ghost"}
                size={"icon"}
                className="hover:text-foreground text-foreground/40 hover:bg-primary/15"
              >
                {vocab.favorite ? (
                  <StarFilledIcon className="text-yellow-500 dark:text-yellow-300" />
                ) : (
                  <Star size={18} />
                )}
              </Button>
              <Button
                formAction={async () => {
                  await toggleGotItVocabAction(vocab.id);

                  router.refresh();
                }}
                variant={"ghost"}
                size={"icon"}
                className={cn(
                  "hover:text-foreground text-foreground/40 hover:bg-primary/15",
                  {
                    "bg-primary/55 hover:bg-primary/65": vocab.gotIt,
                  }
                )}
              >
                <Check size={18} />
              </Button>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  setEditPost(!editPost);
                }}
                variant={"ghost"}
                size={"icon"}
                className="hover:text-foreground text-foreground/40 hover:bg-primary/15"
              >
                <Edit size={18} />
              </Button>
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
      </div>

      {!editPost ? (
        <div className="space-y-1 md:space-y-2">
          <div className="flex flex-row font-semibold prose md:text-2xl text-primary">
            <div>
              <span>{vocab.vocabulary}</span>
              {vocab.favorite && <span className="text-destructive">*</span>}:
            </div>
          </div>
          <div>
            {"> "}
            {vocab.meaning}
          </div>
          <div className="text-sm text-secondary-foreground/45">
            {vocab.example && (
              <>
                {'"'}
                {vocab.example}
                {'"'}
              </>
            )}
          </div>
        </div>
      ) : (
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
          <Button
            className="mx-2"
            variant={"destructive"}
            onClick={() => setEditPost(false)}
          >
            Annuler
          </Button>
        </form>
      )}
    </div>
  );
};
