"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CdnServerDebugConfig = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	TestModuleBridge_1 = require("../../Bridge/TestModuleBridge"),
	PublicUtil_1 = require("../../Common/PublicUtil");
class CdnServerDebugConfig {
	constructor() {
		(this.aFt = !1),
			TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
				(e) => {
					e && e.CdnServerAddress
						? (this.hFt = e.CdnServerAddress)
						: (this.aFt = !1);
				},
			);
	}
	TryGetMarqueeDebugUrl(e) {
		return this.aFt
			? PublicUtil_1.PublicUtil.GetMarqueeUrl2(
					PublicUtil_1.PublicUtil.GetGameId(),
					this.hFt.MarqueeServerId,
				)
			: e;
	}
	TryGetGachaDetailDebugUrl(e, r, t) {
		return this.aFt
			? StringUtils_1.StringUtils.Format(
					e,
					this.hFt?.GachaDetailServerAddressPrefix,
					this.hFt?.GachaDetailServerId,
				)
			: StringUtils_1.StringUtils.Format(e, r, t);
	}
	TryGetGachaRecordDebugUrl(e, r, t) {
		return this.aFt
			? StringUtils_1.StringUtils.Format(
					e,
					this.hFt?.GachaRecordServerAddressPrefix,
					this.hFt?.GachaRecordServerId,
				)
			: StringUtils_1.StringUtils.Format(e, r, t);
	}
	TryGetGachaInfoDebugUrl(e, r, t) {
		return this.aFt
			? StringUtils_1.StringUtils.Format(
					e,
					this.hFt?.GachaInfoServerPrefixAddress,
					this.hFt?.GachaInfoServerId,
				)
			: StringUtils_1.StringUtils.Format(e, r, t);
	}
	TryGetNoticeServerPrefixAddress(e) {
		return this.aFt ? this.hFt?.NoticeServerPrefixAddress : e;
	}
}
(exports.CdnServerDebugConfig = CdnServerDebugConfig).Singleton =
	new CdnServerDebugConfig();
