"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MailScrollItemNew = void 0);
const UE = require("ue"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	DAY_GAP = 7;
class MailScrollItemNew extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.R4e = void 0),
			(this.Uyi = void 0),
			(this.Ayi = void 0),
			(this.SelectTrigger = !1),
			(this.IsInit = !1),
			(this.Xy = -1),
			(this.Pe = void 0),
			(this.OnExtendToggleStateChanged = (e) => {
				1 === e && this?.Uyi(this.Xy, this.Pe);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = []);
	}
	Update(e, t) {
		var i;
		(this.Xy = t),
			(this.Pe = e),
			this.SelectTrigger
				? (this.OnSelected(!0), (this.SelectTrigger = !1))
				: t === this.Ayi?.()
					? this.OnSelected(!1)
					: this.OnDeselected(!1),
			this.GetText(1).SetText(e.Title),
			this.GetText(3).SetText(e.Sender),
			(t = TimeUtil_1.TimeUtil.CalculateDayGapBetweenNow(
				e.Time,
				e.Time > TimeUtil_1.TimeUtil.GetServerTime(),
			)) > 7
				? ((i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(e.Time)),
					this.GetText(4).SetText(`${i.Year}/${i.Month}/` + i.Day))
				: 1 <= t
					? LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(4),
							"Text_FriendOfflineSomeDay_Text",
							t,
						)
					: LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(4),
							"Text_Today_Text",
						),
			this.GetItem(5).SetUIActive(!e.GetWasScanned()),
			this.GetItem(2).SetUIActive(2 === e.GetMailLevel()),
			e.GetWasScanned() || 2 !== e.GetAttachmentStatus()
				? e.GetWasScanned() && 2 === e.GetAttachmentStatus()
					? ((i =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								"SP_IconRewardA",
							)),
						this.SetSpriteByPath(i, this.GetSprite(0), !1),
						this.GetItem(6).SetAlpha(1))
					: e.GetWasScanned() && 1 === e.GetAttachmentStatus()
						? ((t =
								ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
									"SP_IconRewardB",
								)),
							this.SetSpriteByPath(t, this.GetSprite(0), !1),
							this.GetItem(6).SetAlpha(0.4))
						: e.GetWasScanned() || 0 !== e.GetAttachmentStatus()
							? e.GetWasScanned() &&
								0 === e.GetAttachmentStatus() &&
								((i =
									ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
										"SP_IconMailB",
									)),
								this.SetSpriteByPath(i, this.GetSprite(0), !1),
								this.GetItem(6).SetAlpha(0.4))
							: ((t =
									ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
										"SP_IconMailA",
									)),
								this.SetSpriteByPath(t, this.GetSprite(0), !1),
								this.GetItem(6).SetAlpha(1))
				: ((e =
						ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
							"SP_IconRewardA",
						)),
					this.SetSpriteByPath(e, this.GetSprite(0), !1),
					this.GetItem(6).SetAlpha(1));
	}
	BindSelectCall(e) {
		this.Uyi = e;
	}
	BindGetSelectedIndexFunction(e) {
		this.Ayi = e;
	}
	OnSelected(e) {
		this.RootActor.GetComponentByClass(
			UE.UIExtendToggle.StaticClass(),
		).SetToggleState(1, e);
	}
	OnDeselected(e) {
		(this.SelectTrigger = !1),
			this.RootActor.GetComponentByClass(
				UE.UIExtendToggle.StaticClass(),
			).SetToggleState(0, e);
	}
	GetUsingItem(e) {
		return this.GetRootItem().GetOwner();
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0),
			(this.R4e = this.RootActor.GetComponentByClass(
				UE.UIExtendToggle.StaticClass(),
			)),
			this.R4e.OnStateChange.Add(this.OnExtendToggleStateChanged),
			(this.IsInit = !0);
	}
	ClearItem() {
		this.R4e.OnStateChange.Clear(), (this.Uyi = void 0), this.Destroy();
	}
}
exports.MailScrollItemNew = MailScrollItemNew;
