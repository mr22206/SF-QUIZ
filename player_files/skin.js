// Skin specific Javascript
if ("scImageMgr" in window) scImageMgr.fOverAlpha=.9;

// Navigation Sticky
window.addEventListener("scroll", function (evt){
	const vBody = document.body,
		title = sc$('title'),
		wScrollTop = window.scrollY || vBody.scrollTop,
		scrollValue = title.offsetHeight;

	if ( wScrollTop > scrollValue) {
		vBody.classList.add("nav_stuck_yes");
		vBody.classList.remove("nav_stuck_no");
	}

	if ( wScrollTop < scrollValue) {
		vBody.classList.remove("nav_stuck_yes");
		vBody.classList.add("nav_stuck_no");
	}
});
