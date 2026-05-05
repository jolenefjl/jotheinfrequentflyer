import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-05-04" });

const stayDefaults = [
  {
    id: "marriott-pulau-perhentian",
    fields: {
      websiteUrl: "https://www.marriott.com/",
      price: "$$$$ - from MYR 1,650 / night",
      goodFor: "Couples, divers, slow-pace travelers",
      bestTime: "April - early October",
      loved: [
        "Reef quite literally fifteen feet from your villa",
        "Genuinely warm staff who learn your name on day one",
        "Outdoor bathrooms designed by someone who actually showers outdoors",
        "The breakfast nasi lemak is reason enough to stay",
      ],
      lessSo: [
        "Wi-Fi is... atmospheric, let's say",
        "Boat transfer logistics need a rethink",
        "Spa menu is short and prices feel KL-not-island",
        "No shade on the main pool deck until 4pm",
      ],
      disclosure:
        "Stay paid for in full. No comped nights, no press rate, no partnership. Infrequent Flyer takes no money from any place it covers.",
      heroCaption:
        "Fig. 01 - the view from villa 207 at first light. Coffee not pictured. Mosquito repellent applied.",
      stayScores: {
        walletCry: 3.8,
        breakfastTest: 3.6,
        gramWorthy: 4.7,
        welcomeFactor: 3.4,
        worthDaysOff: 4.0,
      },
    },
  },
  {
    id: "casa-bosques",
    fields: {
      websiteUrl: "https://www.casabosques.com/",
      price: "$$$ - varies by season",
      goodFor: "Design people, book lovers, Roma Norte wandering",
      bestTime: "November - April",
      loved: ["Quiet rooms above a bookstore", "Excellent coffee within arm's reach"],
      lessSo: ["Not a full-service hotel", "Limited public spaces"],
      disclosure: "Starter disclosure text. Replace with Jo's actual booking details.",
      heroCaption: "Fig. 01 - courtyard light doing most of the work.",
      stayScores: {
        walletCry: 4.3,
        breakfastTest: 4.1,
        gramWorthy: 4.8,
        welcomeFactor: 4.5,
        worthDaysOff: 4.6,
      },
    },
  },
  {
    id: "aman-kyoto",
    fields: {
      websiteUrl: "https://www.aman.com/resorts/aman-kyoto",
      price: "$$$$$ - serious splurge territory",
      goodFor: "Anniversaries, garden people, one big splurge",
      bestTime: "Late autumn or early spring",
      loved: ["The garden setting is extraordinary", "Service feels deeply considered"],
      lessSo: ["The price will follow you home", "Remote if you want downtown Kyoto"],
      disclosure: "Starter disclosure text. Replace with Jo's actual booking details.",
      heroCaption: "Fig. 01 - expensive garden silence.",
      stayScores: {
        walletCry: 2.8,
        breakfastTest: 4.7,
        gramWorthy: 5,
        welcomeFactor: 4.8,
        worthDaysOff: 4.7,
      },
    },
  },
];

async function patchStayReviewFields() {
  for (const stay of stayDefaults) {
    for (const id of [stay.id, `drafts.${stay.id}`]) {
      const doc = await client.getDocument(id);

      if (!doc) {
        continue;
      }

      await client.patch(id).setIfMissing(stay.fields).commit();
      console.log(`Patched ${id}`);
    }
  }
}

patchStayReviewFields().catch((error) => {
  console.error(error);
  process.exit(1);
});
