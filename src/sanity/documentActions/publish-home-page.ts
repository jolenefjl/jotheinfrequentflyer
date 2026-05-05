import { type DocumentActionComponent, useDocumentOperation } from "sanity";

export const publishHomePageAction: DocumentActionComponent = (props) => {
  const { publish } = useDocumentOperation(props.id, props.type);
  const hasDraftChanges = Boolean(props.draft);
  const isDisabled = publish.disabled || !hasDraftChanges;

  return {
    label: hasDraftChanges ? "Publish home page" : "Home page published",
    tone: "positive",
    disabled: Boolean(isDisabled),
    title: isDisabled && typeof isDisabled === "string" ? isDisabled : undefined,
    onHandle: () => {
      publish.execute();
      props.onComplete();
    },
  };
};

publishHomePageAction.displayName = "PublishHomePageAction";
