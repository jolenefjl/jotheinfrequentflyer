import { blogPost } from "./blogPost";
import { destination } from "./destination";
import { experience } from "./experienceReview";
import { foodEntry } from "./foodReview";
import { kidsContent } from "./kidsContent";
import { newsletterSettings, siteSettings, socialSharingSettings } from "./settings";
import { stayReview } from "./stayReview";
import { imageLayout, imageWithMeta, pageMetadata, richText } from "./shared";
import { topList } from "./topList";
import { topTip } from "./travelTip";

export const schemaTypes = [
  imageWithMeta,
  imageLayout,
  richText,
  pageMetadata,
  siteSettings,
  socialSharingSettings,
  newsletterSettings,
  blogPost,
  destination,
  stayReview,
  experience,
  foodEntry,
  kidsContent,
  topTip,
  topList,
];
