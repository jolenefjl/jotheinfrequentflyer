import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-05-04" });
const documentId = process.argv[2];

if (!documentId) {
  console.error("Usage: sanity exec scripts/publish-document.ts --with-user-token -- <documentId>");
  process.exit(1);
}

async function publishDocument(id: string) {
  const draftId = id.startsWith("drafts.") ? id : `drafts.${id}`;
  const publishedId = id.replace(/^drafts\./, "");
  const draft = await client.getDocument(draftId);

  if (!draft) {
    console.log(`No draft found for ${publishedId}. Nothing to publish.`);
    return;
  }

  const { _createdAt, _updatedAt, _rev, ...document } = draft;

  await client
    .transaction()
    .createOrReplace({
      ...document,
      _id: publishedId,
    })
    .delete(draftId)
    .commit();

  console.log(`Published ${publishedId}.`);
}

publishDocument(documentId).catch((error) => {
  console.error(error);
  process.exit(1);
});
