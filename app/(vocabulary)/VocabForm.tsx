"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import { ContentTextArea } from "./ContentTextArea";
import { SubmitButton } from "./SubmitButton";
import { addVocabAction } from "./vocab.action";

export const VocabForm = () => {
  const router = useRouter();

  //onSubmit function
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    await addVocabAction(formData);

    router.refresh();
    form.focus();
    form.reset();
  };

  //onChange function
  return (
    <Card>
      <CardHeader>Avez-vous dissimulé un nouveau vocabulaire?</CardHeader>
      <CardContent>
        <form className="space-y-3" onSubmit={onSubmit}>
          <Input
            name="vocabulary"
            autoFocus
            placeholder="Vocabulaire"
            required
          />
          <Input name="definition" placeholder="Signification" required />
          <ContentTextArea name="example" placeholder="Exemple" />
          <Select name="type" defaultValue="verbe">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="verbe">Verbe</SelectItem>
                <SelectItem value="adjectif">Adjectif</SelectItem>
                <SelectItem value="nom">Nom</SelectItem>
                <SelectItem value="autres">Autres</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <SubmitButton>Valider</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};
