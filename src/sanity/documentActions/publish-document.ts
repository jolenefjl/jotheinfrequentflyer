import { type DocumentActionComponent, useDocumentOperation } from "sanity";

export const publishDocumentAction: DocumentActionComponent = (props) => {
  const { publish } = useDocumentOperation(props.id, props.type);
  const hasDraftChanges = Boolean(props.draft);
  const disabledReason = publish.disabled || (!hasDraftChanges ? "No draft changes to publish" : false);

  return {
    label: hasDraftChanges ? "Publish changes" : "Published",
    tone: "positive",
    disabled: Boolean(disabledReason),
    title: typeof disabledReason === "string" ? disabledReason : undefined,
    onHandle: () => {
      publish.execute();
      props.onComplete();
    },
  };
};

publishDocumentAction.displayName = "PublishDocumentAction";
