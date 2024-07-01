"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GenericPromptFloatTipsBase = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class GenericPromptFloatTipsBase extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.TickDuration = 0),
			(this.TickTime = 0),
			(this.Data = void 0),
			(this.CYt = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	OnBeforeCreate() {
		(this.Data = this.OpenParam),
			(this.CYt =
				ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(
					this.Data.TypeId,
				));
	}
	OnStart() {
		var t = this.Data.MainTextParams ?? [];
		this.SetMainText(...t), (t = this.Data.ExtraTextParams ?? []);
		this.SetExtraText(...t), this.gYt(), this.nYt();
	}
	SetMainText(...t) {
		var e = this.GetText(0);
		!this.Data.MainTextObj && !this.Data.PromptId && t?.length && t[0]
			? StringUtils_1.StringUtils.IsEmpty(t[0])
				? e.SetUIActive(!1)
				: (e.SetText(t[0]), e.SetUIActive(!0))
			: this.Data.MainTextObj
				? (LguiUtil_1.LguiUtil.SetLocalTextNew(
						e,
						this.Data.MainTextObj.TextKey,
						...t,
					),
					e.SetUIActive(!0))
				: StringUtils_1.StringUtils.IsBlank(this.CYt.GeneralText)
					? e.SetUIActive(!1)
					: (LguiUtil_1.LguiUtil.SetLocalTextNew(e, this.CYt.GeneralText, ...t),
						e.SetUIActive(!0));
	}
	SetExtraText(...t) {
		var e = this.GetText(1);
		!this.Data.ExtraTextObj && !this.Data.PromptId && t?.length && t[0]
			? (e.SetText(t[0]), e.SetUIActive(!0))
			: this.Data.ExtraTextObj
				? (LguiUtil_1.LguiUtil.SetLocalTextNew(
						e,
						this.Data.ExtraTextObj.TextKey,
						...t,
					),
					e.SetUIActive(!0))
				: StringUtils_1.StringUtils.IsBlank(this.CYt.GeneralExtraText)
					? e.SetUIActive(!1)
					: (LguiUtil_1.LguiUtil.SetLocalTextNew(
							e,
							this.CYt.GeneralExtraText,
							...t,
						),
						e.SetUIActive(!0));
	}
	gYt() {
		var t;
		this.Data.PromptId &&
			((t = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
				this.Data.PromptId,
			)),
			(this.TickDuration = t.Duration)),
			0 === this.TickDuration && (this.TickDuration = this.CYt.Duration),
			0 === this.TickDuration && (this.TickTime = CommonDefine_1.INVALID_VALUE);
	}
	nYt() {
		var t;
		this.Data.TypeId &&
			0 !==
				(t =
					ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(
						this.Data.TypeId,
					)).OffsetY &&
			this.RootItem.SetAnchorOffsetY(t.OffsetY);
	}
	OnTick(t) {
		this.ClosePromise
			? (this.TickTime = CommonDefine_1.INVALID_VALUE)
			: this.TickTime < 0 ||
				((this.TickTime = this.TickTime + t),
				this.TickTime >
					this.TickDuration * CommonDefine_1.MILLIONSECOND_PER_SECOND &&
					this.CloseMe((t) => {
						t && this.Data.CloseCallback?.();
					}));
	}
	get MainText() {
		return this.GetText(0);
	}
	get ExtraText() {
		return this.GetText(1);
	}
}
exports.GenericPromptFloatTipsBase = GenericPromptFloatTipsBase;
