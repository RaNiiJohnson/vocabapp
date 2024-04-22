"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import { ContentTextArea } from "./ContentTextArea";
import { SubmitButton } from "./SubmitButton";
import { addVocabAction } from "./vocab.action";

export const VocabForm = () => {
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    await addVocabAction(formData);

    router.refresh();
    form.reset();
  };
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
          <Input name="definition" placeholder="Définition" required />
          <ContentTextArea name="example" placeholder="Exemple" required />
          <SubmitButton>Valider</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};
