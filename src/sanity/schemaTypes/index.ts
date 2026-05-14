import { blogPost } from "./blogPost";
import { cityGuide } from "./cityGuide";
import { destination } from "./destination";
import { experience } from "./experienceReview";
import { foodEntry } from "./foodReview";
import { homePage } from "./homePage";
import { kidsContent } from "./kidsContent";
import { newsletterSettings, siteSettings, socialSharingSettings } from "./settings";
import { siteChrome } from "./siteChrome";
import { sitePage } from "./sitePage";
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
  siteChrome,
  homePage,
  sitePage,
  blogPost,
  cityGuide,
  destination,
  stayReview,
  experience,
  foodEntry,
  kidsContent,
  topTip,
  topList,
];
