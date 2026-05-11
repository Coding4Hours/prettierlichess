//Top Navigation

const TAB_SELECTOR = document.querySelectorAll("#topnav section>a");
const TAB_GROUP = document.querySelectorAll('[role="group"]');

// Navbar Animations
TAB_SELECTOR.forEach((item, index) => {
	item.addEventListener("mouseenter", (_e) => {
		if (item.nextSibling === TAB_GROUP[index]) {
			item.nextSibling.classList.add("topnavHover");
		}
	});

	item.addEventListener("mouseleave", (_e) => {
		if (item.nextSibling === TAB_GROUP[index]) {
			item.nextSibling.classList.remove("topnavHover");
		}
	});

	item.nextSibling.addEventListener("mouseenter", (_e) => {
		if (item.nextSibling === TAB_GROUP[index]) {
			item.nextSibling.classList.add("topnavHover");
		}
	});

	item.nextSibling.addEventListener("mouseleave", (_e) => {
		if (item.nextSibling === TAB_GROUP[index]) {
			item.nextSibling.classList.remove("topnavHover");
		}
	});
});
