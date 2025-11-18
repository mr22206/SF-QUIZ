class AppMgr {
	constructor() {
		scDynUiMgr.collBlk.fMode = 1;
		this.initDom();
		// Init tools
		const tools = this.fTools = scPaLib.findNode("ide:tools");
		if (tools){
			const bd = dom.newBd(tools)
			bd.elt("a", "cbkOpenBtn")
				.att("href", "#")
				.att("title", "Afficher toutes les sections qui sont refermées")
				.att("role", "button")
				.elt("span")
				.text("Tout afficher")
				.up()
				.listen("click", (pEvent) => {
					pEvent.preventDefault()
					this.openCbks()
				})
			bd.up()
			bd.elt("a", "cbkCloseBtn")
				.att("href", "#")
				.att("title", "Réduire toutes les sections qui sont ouvertes")
				.att("role", "button")
				.elt("span")
				.text("Tout réduire")
				.up()
				.listen("click", (pEvent) => {
					pEvent.preventDefault()
					this.closeCbks()
				})
		}
		if (sc$("outSec")) {
			this.outSecLinks = scPaLib.findNodes("des:a", sc$("outSec"));
			this.outSecTargets = [];
			this.outSecLinks.forEach((link) => {
				this.outSecTargets.push({link:link, target: sc$(link.getAttribute("href").substring(1))});
				link.addEventListener("click", (pEvent) => {
					for (const pLink of appMgr.outSecLinks) {
						pLink.classList.remove("sel_yes")
					}
					link.classList.add("sel_yes")
					this.gotoSection(link.href, pEvent)
				})
			});
			window.addEventListener("scroll", function (evt){
				const wScrollTop	= Math.round(window.scrollY || document.body.scrollTop);
				let currentTarget = null;
				appMgr.outSecTargets.forEach((obj) => {
					const targetOffset = scSiLib.getOffsetTop(obj.target.parentNode, document.body) - sc$("outCat").getBoundingClientRect().height - sc$("outSec").getBoundingClientRect().height;
					if (targetOffset<=wScrollTop) currentTarget = obj;
				});
				if (document.documentElement.scrollHeight - document.documentElement.clientHeight === wScrollTop) currentTarget = appMgr.outSecTargets[appMgr.outSecTargets.length-1];
				for (const pLink of appMgr.outSecLinks) {
					pLink.classList.remove("sel_yes")
				}
				if (currentTarget) currentTarget.link.classList.add("sel_yes");
			});
		}
	}

	openCbks(){
		const cbks = scPaLib.findNodes("des:.collBlk_closed");
		for (let i=0; i<cbks.length; i++) cbks[i].fTitle.onclick();
	}

	closeCbks(){
		const cbks = scPaLib.findNodes("des:.collBlk_open");
		for (let i=0; i<cbks.length; i++) cbks[i].fTitle.onclick();
	}

	gotoSection(url, event) {
		event.preventDefault()
		const rootElement = document.querySelector('#header')
		const target = document.querySelector(`#${url.split('#')[1]}`)
		const targetTop = 0
		target.style.position = 'relative'
		target.style.top = `-${sc$("outCat").getBoundingClientRect().height + sc$("outSec").getBoundingClientRect().height}px`
		target.scrollIntoView({ behavior: 'smooth' })
		target.style.top = targetTop
	}
	initDom(root) {
		const cbks = scPaLib.findNodes("des:.collapsed", root || document.body);
		for (let i=0; i<cbks.length; i++) {
			const cbk = cbks[i];
			const tgl = cbk.fTgl = scPaLib.findNode("des:a", cbk);
			const co = scPaLib.findNode("chl:div", cbk);
			co.fClassName = co.className;
			co.fTitle = tgl;
			co.className = co.fClassName + " " + scDynUiMgr.collBlk.fClassPrefix + "open";
			co.fCollapsed = false;
		}
		// Close collapsable blocks that are closed by default.
		const closed = scPaLib.findNodes("des:.cbk-closed", root || document.body);
		for (let i in closed) {
			const tgl = scPaLib.findNode("des:a", closed[i]);
			if (tgl) tgl.onclick();
		}
	}
}

window.appMgr = new AppMgr();
