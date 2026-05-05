import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-05-04" });

async function publishHomePage() {
  const draft = await client.getDocument("drafts.homePage");

  if (!draft) {
    console.log("No homepage draft found. Nothing to publish.");
    return;
  }

  const { _createdAt, _updatedAt, _rev, ...document } = draft;

  await client
    .transaction()
    .createOrReplace({
      ...document,
      _id: "homePage",
    })
    .delete("drafts.homePage")
    .commit();

  console.log("Published homepage draft.");
}

publishHomePage().catch((error) => {
  console.error(error);
  process.exit(1);
});
