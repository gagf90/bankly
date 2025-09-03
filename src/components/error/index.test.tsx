import { render } from "@testing-library/react";
import { Error } from ".";

test("should render as expected", () => {
  const { asFragment } = render(<Error />);

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <span
    aria-live="polite"
    role="alert"
  >
    We couldn't load the data. Please try again later.
  </span>
</DocumentFragment>
`);
});
