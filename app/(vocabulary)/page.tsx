import { prisma } from "@/lib/prisma";
import { VocabForm } from "./VocabForm";
import { VocabItem } from "./VocabItem";

export default async function Home() {
  const vocabularies = await prisma.vocab.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <VocabForm />
      <ul className="mt-5 space-y-3">
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
    </div>
  );
}
