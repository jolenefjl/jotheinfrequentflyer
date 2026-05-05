import { CategoryLanding } from "@/components/editorial-atoms";

export const revalidate = 60;

export default function FoodPage() {
  return <CategoryLanding category="food" />;
}
