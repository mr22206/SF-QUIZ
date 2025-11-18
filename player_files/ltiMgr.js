
ltiMgr = {
	fLtiConnectionId: null,

	fLtiReturnUrl: null,

	fPath: null,

	fRecordsConf: {},

	fBC: null,

	fDistribRecordsAssmnt: null,

	fDistribRecordsFields: null,

	fDistribRecordsSuspendData: null,

	CONFIG: {
		ltiSessionUrl: null
	},

	/**
	 * Configuration de l'engine, pConfig :
	 * {
	 * 	ltiSessionUrl : "..."
	 * }
	 */
	setConfig: function (pConfig) {
		this.CONFIG = pConfig;
	},

	getLtiParams: function (pParams, cb) {
		var req = io.openHttpRequest(this.CONFIG.ltiSessionUrl + "?cdaction=GetLtiParam" + (ltiMgr.fLtiConnectionId ? "&param=" + ltiMgr.fLtiConnectionId : "") + "&ltiParams=" + encodeURIComponent(JSON.stringify(pParams)));
		req.onload = function () {cb.call(null, req)};
		req.send();
	},

	init: function (pParams) {
		if (pParams && pParams.ltiConnectionId) ltiMgr.fLtiConnectionId = pParams.ltiConnectionId;
	},

	onSessionLoaded: function (pParams) {
		var vEndReq = io.openHttpRequest(this.CONFIG.ltiSessionUrl + "?cdaction=GetReturnUrl" + (ltiMgr.fLtiConnectionId ? "&param=" + ltiMgr.fLtiConnectionId : ""));
		vEndReq.onload = function () {
			ltiMgr.fLtiReturnUrl = JSON.parse(vEndReq.response)['launch_presentation_return_url'];
		};
		vEndReq.send();
		try { //API non supportés par vieux navigateurs.
			ltiMgr.fBC = new BroadcastChannel("distribChannel");


			if (pParams && pParams.warn)
				if (pParams.warn === "previousSessionClosed") ltiMgr.fBC.postMessage({"reloadWarning": "all:projects"});
				else if (pParams.warn === "previousConnectionClosed") ltiMgr.fBC.postMessage({"reloadWarning": ltiMgr.fLtiConnectionId});


			ltiMgr.fBC.onmessage = function (pEvent) {
				if (pEvent.data.reloadWarning === "all:projects" || pEvent.data.reloadWarning == ltiMgr.fLtiConnectionId)
					showArea(sc$("reloadWarning"));
			}
		} catch (pError) {
		}
	},

	endLtiSession: function () {
		distribEngine.setMainDepotPath(null);
		distribEngine.logout();
	},
	onEngineEvent: function (pEvent) {
		if (pEvent.type === "logoutDone") window.location = this.fLtiReturnUrl;
	},
	cbError: function (pEvt) {
		if (!ltiMgr.fAlertSent) {
			ltiMgr.fAlertSent = true;
			var vAlertMsg;
			if (pEvt.target.status === 403) vAlertMsg = "Votre session n\'est plus active. Veuillez recharger l\'activité.";
			else vAlertMsg = "Le serveur rencontre une erreur. Veuillez recharger l\'activité.";
			window.alert(vAlertMsg);
			window.location = ltiMgr.fLtiReturnUrl;
		}
	},
	findMainDepotPath: function () {
		return jsonPath(distribEngine.getSession().projects[io.parseQueryString(window.location.search).ltiConnectionId], "$..depotPath")[0];
	},
	getPartIds: function () {
		const partIds = [];
		for (var key in distribEngine.getSession().participants) {
			if (distribEngine.getSession().participants[key].projectId === ltiMgr.fLtiConnectionId) partIds.push(key);
		}
		return partIds;
	},
	initReports: function () {
		this.fPath = this.findMainDepotPath();
		let reportPartId = null;
		ltiMgr.getPartIds().forEach(partId => distribEngine.getSession().participants[partId].comps.forEach(comp => {
			if (comp.reports) reportPartId = partId;
		}));
		if (reportPartId) {
			distribEngine.sendParticipantMsgs(reportPartId, [{"type": "reportGetList", "path": this.fPath}], false, function (pEvt) {
				if (pEvt.target.responseText) {
					JSON.parse(pEvt.target.responseText).forEach(msg => {
						if (msg.type === "reportList" && msg.result != null) {
							const keys = Object.keys(msg.result);
							if (keys.length === 0) return;
							let bar = `<div class="reports bar" id="reportsBar">`
							bar += `<span class="barTitle">${keys.length === 1 ? "Rapport à télécharger : " : "Rapports à télécharger : "}</span>`
							for (let key in msg.result) {
								const report = msg.result[key];
								bar += `<button class="report" title="Télécharger le rapport \'${report.title}\'" data-part="${reportPartId}" data-report="${key}" onclick="ltiMgr.downloadReport(this);"><span>${report.title}</span></button>`
							}
							bar += `</div>`;
							const reportBars = sc$("reportsBar");
							if (reportBars) reportBars.remove();
							sc$("contentBox").insertAdjacentHTML("afterbegin", bar);
							sc$("contentFrame").style.top = sc$("reportsBar").offsetHeight + "px"
						}
					});
				}
			});
		}
	},
	downloadReport: function (btn) {

		const opt = {
			"skeletonType": "participant",
			"include": [
				{"field": "firstName", "title": "Prénom"},
				{"field": "lastName", "title": "Nom"}
			]
		}
		distribEngine.sendParticipantMsgs(btn.getAttribute("data-part"), [
			{"type": "reportGetCsv", "path": this.fPath, "code": btn.getAttribute("data-report"), "opt": opt}], false, function (pEvt) {
			if (pEvt.target.responseText) {
				JSON.parse(pEvt.target.responseText).forEach(msg => {
					if (msg.type === "reportCsvData" && msg.result != null) {
						var lnk = document.createElement("a");
						lnk.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(msg.result));
						lnk.setAttribute("download", btn.getAttribute("data-report") + ".csv");
						document.body.appendChild(lnk);
						lnk.click();
						lnk.remove()
					}
				});
			}
		});
	},
	initDistribRecords: async function () {
		this.fPath = this.findMainDepotPath();
		distribEngine.getSession().participants[ltiMgr.getPartIds()[0]].comps.forEach(comp => {
			if ("recordModel" in comp) ltiMgr.fRecordsConf[comp.recordModel] = comp;
		});
		return new Promise((resolve, reject) => {
			ltiMgr.fDistribRecordsAssmnt = {}
			ltiMgr.fDistribRecordsFields = []
			ltiMgr.fDistribRecordsSuspendData = []

			if (
				(!ltiMgr.fRecordsConf.assmnt || ltiMgr.fRecordsConf.assmnt.readOnly || ltiMgr.fRecordsConf.assmntSuspendData.access === "message") &&
				(!ltiMgr.fRecordsConf.assmntFields || ltiMgr.fRecordsConf.assmntFields.readOnly || ltiMgr.fRecordsConf.assmntFields.access === "message") &&
				(!ltiMgr.fRecordsConf.assmntSuspendData || ltiMgr.fRecordsConf.assmntSuspendData.readOnly || ltiMgr.fRecordsConf.assmntSuspendData.access === "message")
			) resolve();
			else distribEngine.sendParticipantMsgs(this.getPartIds()[0], [
				{"type": "assmnt_recordsGet", "anchor": this.fPath},
				{"type": "assmntFields_recordsGet", "anchor": this.fPath, "fetchChildren": true},
				{"type": "assmntSuspendData_recordsGet", "anchor": this.fPath, "fetchChildren": true},
			], false, function (pEvt) {
				try {
					if (!pEvt.target.responseText) resolve();
					else {
						JSON.parse(pEvt.target.responseText).forEach(msg => {
							if (msg.content === -1) msg.content = undefined;
							if (msg.type === "assmnt_recordDatas") ltiMgr.fDistribRecordsAssmnt = msg.records[0] || {}
							else if (msg.type === "assmntFields_recordDatas") {
								msg.records.forEach(r => {
									r.assmntId = decodeURIComponent(r.anchor.substring(ltiMgr.fPath.length + 1));
									r.data = JSON.parse(r.data);
									ltiMgr.fDistribRecordsFields.push(r);
								});
							} else if (msg.type === "assmntSuspendData_recordDatas") {
								msg.records.forEach(r => {
									r.assmntId = decodeURIComponent(r.anchor.substring(ltiMgr.fPath.length + 1));
									r.content = JSON.parse(r.content);
									ltiMgr.fDistribRecordsSuspendData.push(r);
								});
							}
						});
						resolve();
					}
				} catch (e) {
					console.error(e);
					reject(e);
				}
			});
		});
	},
	getAssmnt() {
		return this.fDistribRecordsAssmnt;
	},
	getAssmntFields() {
		return this.fDistribRecordsFields;
	},
	getAssmntSuspendData() {
		return this.fDistribRecordsSuspendData;
	},
	setAssmnt(assmntMsg) {
		if (!ltiMgr.fRecordsConf.assmnt || ltiMgr.fRecordsConf.assmnt.readOnly || ltiMgr.fRecordsConf.assmntSuspendData.access === "message") return;
		assmntMsg.type = "assmnt_recordPut";
		assmntMsg.anchor = this.fPath;
		if (assmntMsg.content === undefined) assmntMsg.content = -1;
		if (!assmntMsg.location) assmntMsg.location = "";
		if (!assmntMsg.exitStatus) assmntMsg.exitStatus = "";
		if (!assmntMsg.status) assmntMsg.status = "";
		distribEngine.sendParticipantMsgs(this.getPartIds()[0], assmntMsg);
	},
	setAssmntFields(msg) {
		if (!ltiMgr.fRecordsConf.assmntFields || ltiMgr.fRecordsConf.assmntFields.readOnly || ltiMgr.fRecordsConf.assmntSuspendData.access === "message") return;
		const msgs = Array.isArray(msg) ? msg : [msg];
		const msgsToSend = []
		msgs.forEach(m => {
			const msg2Send = Object.assign({}, m);
			msg2Send.parentAnchor = this.fPath;
			msg2Send.anchor = `${this.fPath}${this.fPath.indexOf("?") === -1 ? '?' : '&'}${encodeURIComponent(m.assmntId)}`
			if (m.type === "remove")
				msg2Send.type = "assmntFields_recordDelete"
			else {
				msg2Send.type = "assmntFields_recordPut";
				msg2Send.data = JSON.stringify(m.data);
				if (Object.keys(m.data).length === 1) {
					const sessKey = Object.keys(m.data).pop();
					if (typeof m.data[sessKey].sc === "number") msg2Send.content = m.data[sessKey].sc;
				}
			}
			if (msg2Send.content == null || msg2Send.content === Number.NaN) msg2Send.content = -1;
			msgsToSend.push(msg2Send)
		});
		distribEngine.sendParticipantMsgs(this.getPartIds()[0], msgsToSend);
	},
	setAssmntSuspendData(msg) {
		if (!ltiMgr.fRecordsConf.assmntSuspendData || ltiMgr.fRecordsConf.assmntSuspendData.readOnly || ltiMgr.fRecordsConf.assmntSuspendData.access === "message") return;
		const msgs = Array.isArray(msg) ? msg : [msg];
		const msgsToSend = []
		msgs.forEach(m => {
			const msg2Send = Object.assign({}, m);
			msg2Send.parentAnchor = this.fPath;
			msg2Send.anchor = `${this.fPath}${this.fPath.indexOf("?") === -1 ? '?' : '&'}${encodeURIComponent(m.assmntId)}`
			if (m.type === "remove") msg2Send.type = "assmntSuspendData_recordDelete";
			else {
				msg2Send.type = "assmntSuspendData_recordPut";
				msg2Send.content = JSON.stringify(m.content);
			}
			msgsToSend.push(msg2Send)
		});
		distribEngine.sendParticipantMsgs(this.getPartIds()[0], msgsToSend);
	}
}

distribEngine.addEngineListener(ltiMgr);
