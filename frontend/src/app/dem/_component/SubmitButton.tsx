interface SubmitButtonProps {
  isSubmitting: boolean;
}

export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
      {isSubmitting ? (
        <span className="loading loading-spinner"></span>
      ) : (
        "Create Article"
      )}
    </button>
  );
}
