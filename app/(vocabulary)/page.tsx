import { prisma } from "@/lib/prisma";
import { VocabItem } from "./VocabItem";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <Tabs defaultValue="tout" className="">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tout">Tout</TabsTrigger>
          <TabsTrigger value="verbe">Verbe</TabsTrigger>
          <TabsTrigger value="adjectif">Adjectif</TabsTrigger>
          <TabsTrigger value="nom">Nom</TabsTrigger>
          <TabsTrigger value="autres">Autres</TabsTrigger>
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
                  <p>Pas de vocabulaire pour le moment</p>
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
                {vocabularies.length === 0 ? (
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
                {vocabularies.length === 0 ? (
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
              <CardTitle>
                <span className="text-xl">Nom</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-3">
                {vocabularies.length === 0 ? (
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
        <TabsContent value="autres">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="text-xl">Autres</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-3">
                {vocabularies.length === 0 ? (
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
