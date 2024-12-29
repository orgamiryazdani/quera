import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

describe("comments", () => {
	beforeEach(() => (window.HTMLElement.prototype.scrollIntoView = jest.fn()));

	test("reply button should show name correctly", () => {
		const { container } = render(<App />);
		fireEvent.click(getButton(container));
		expect(getCommentTitle(container)).toContain("Erfan");
	});
});

function getButton(container, id = 0) {
	// eslint-disable-next-line testing-library/no-container
	return container.querySelectorAll("div.header>button")[id];
}

function getCommentTitle(container) {
	// eslint-disable-next-line testing-library/no-container
	return container.querySelector(".addCommentTitle").innerHTML;
}
