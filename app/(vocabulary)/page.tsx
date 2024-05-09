import { prisma } from "@/lib/prisma";
import { VocabItem } from "./VocabItem";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { VocabForm } from "./VocabForm";

export default async function Home() {
  const vocabularies = await prisma.vocab.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <VocabForm />
      <Tabs defaultValue="tout" className="relative">
        <TabsList className="grid w-full grid-cols-6 ">
          <TabsTrigger className="max-sm:text-xs" value="tout">
            Tout
          </TabsTrigger>
          <TabsTrigger className="max-sm:text-xs" value="verbe">
            Verbes
          </TabsTrigger>
          <TabsTrigger className="max-sm:text-xs" value="adjectif">
            Adjectifs
          </TabsTrigger>
          <TabsTrigger className="max-sm:text-xs" value="nom">
            Noms
          </TabsTrigger>
          <TabsTrigger className="max-sm:text-xs" value="idiomatique">
            Idiomatiques
          </TabsTrigger>
          <TabsTrigger className="max-sm:text-xs" value="autres">
            Autres
          </TabsTrigger>
          <TabsTrigger
            className={clsx(
              "absolute top-10 right-2 max-sm:text-xs",
              buttonVariants({ variant: "secondary" })
            )}
            value="favoris"
          >
            <StarFilledIcon
              className={cn("text-yellow-500 size-6 dark:text-yellow-400", {
                "text-secondary-foreground dark:text-secondary-foreground":
                  vocabularies.filter((vocab) => vocab.favorite).length === 0,
              })}
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tout">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="text-xl">Tout</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-3">
                {vocabularies.length === 0 ? (
                  <p className="text-secondary-foreground/45">
                    Pas de vocabulaire pour le moment
                  </p>
                ) : (
                  vocabularies.map((vocabulary) => (
                    <li key={vocabulary.id}>
                      <VocabItem vocab={vocabulary} />
                    </li>
                  ))
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="verbe">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="text-xl">Verbes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-3">
                {vocabularies.filter((vocab) => vocab.type === "verbe")
                  .length === 0 ? (
                  <p>Pas de vocabulaire pour le moment</p>
                ) : (
                  vocabularies
                    .filter((vocab) => vocab.type === "verbe")
                    .map((vocabulary) => (
                      <li key={vocabulary.id}>
                        <VocabItem vocab={vocabulary} />
                      </li>
                    ))
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="adjectif">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="text-xl">Adjectifs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-3">
                {vocabularies.filter((vocab) => vocab.type === "adjectif")
                  .length === 0 ? (
                  <p>Pas de vocabulaire pour le moment</p>
                ) : (
                  vocabularies
                    .filter((vocab) => vocab.type === "adjectif")
                    .map((vocabulary) => (
                      <li key={vocabulary.id}>
                        <VocabItem vocab={vocabulary} />
                      </li>
                    ))
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="nom">
          <Card>
            <CardHeader>
              {" "}
              <CardTitle>
                <span className="text-xl">Noms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-3">
                {vocabularies.filter((vocab) => vocab.type === "nom").length ===
                0 ? (
                  <p>Pas de vocabulaire pour le moment</p>
                ) : (
                  vocabularies
                    .filter((vocab) => vocab.type === "nom")
                    .map((vocabulary) => (
                      <li key={vocabulary.id}>
                        <VocabItem vocab={vocabulary} />
                      </li>
                    ))
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="idiomatique">
          <Card>
            <CardHeader>
              {" "}
              <CardTitle>
                <span className="text-xl">Idiomatiques</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-3">
                {vocabularies.filter((vocab) => vocab.type === "idiomatique")
                  .length === 0 ? (
                  <p>Pas d{"'"}expression Idiomatique pour le moment</p>
                ) : (
                  vocabularies
                    .filter((vocab) => vocab.type === "idiomatique")
                    .map((vocabulary) => (
                      <li key={vocabulary.id}>
                        <VocabItem vocab={vocabulary} />
                      </li>
                    ))
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="favoris">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="text-xl">Favoris</span>
              </CardTitle>
              <CardDescription>Vos favoris.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-3">
                {vocabularies.filter((vocab) => vocab.favorite).length === 0 ? (
                  <p className="text-secondary-foreground/45">
                    Pas de vocabulaire favoris pour le moment
                  </p>
                ) : (
                  vocabularies
                    .filter((vocab) => vocab.favorite)
                    .map((vocabulary) => (
                      <li key={vocabulary.id}>
                        <VocabItem vocab={vocabulary} />
                      </li>
                    ))
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="autres">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="text-xl">Autres</span>
              </CardTitle>
              <CardDescription>
                Adverbes, locution adverbiale, etc.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-3">
                {vocabularies.filter((vocab) => vocab.type === "autres")
                  .length === 0 ? (
                  <p>Pas de vocabulaire pour le moment</p>
                ) : (
                  vocabularies
                    .filter((vocab) => vocab.type === "autres")
                    .map((vocabulary) => (
                      <li key={vocabulary.id}>
                        <VocabItem vocab={vocabulary} />
                      </li>
                    ))
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
