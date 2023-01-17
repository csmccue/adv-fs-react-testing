export default function ShoppingListItemForm({
  body,
  onBodyChanged,
  onSubmit
}) {
  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(body);
      }}>
        <textarea value={body} onChange={(e) => {
          onBodyChanged(e.target.value);
        }}/>
        <button type="submit" data-testid={'submit-button'}>submit</button>
      </form>;
    </>
  );
}
